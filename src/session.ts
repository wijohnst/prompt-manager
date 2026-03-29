import { execSync, spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Create a new agent session with git worktree isolation.
 *
 * This creates an isolated working directory (git worktree) with a feature branch.
 * The operator runs this before handing off to a chatbot agent, or any agent runs
 * it to ensure branch isolation for their work.
 *
 * Branch naming: feat/<agent>-<timestamp>
 */
export function sessionStart(agentName: string, rootDir: string): void {
  // Validate that we're in a git repository
  try {
    execSync('git rev-parse --git-dir', {
      cwd: rootDir,
      stdio: 'pipe',
    });
  } catch (e) {
    console.error('error: not in a git repository');
    process.exit(1);
  }

  // Generate branch name: feat/<agent>-<timestamp>
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const branchName = `feat/${agentName}-${timestamp}`;

  // Worktree path: .pm/worktrees/<agent>-<timestamp>
  const worktreePath = path.join(rootDir, '.pm', 'worktrees', `${agentName}-${timestamp}`);

  // Ensure .pm/worktrees directory exists
  const workTreesDir = path.dirname(worktreePath);
  fs.mkdirSync(workTreesDir, { recursive: true });

  // Create worktree with new branch
  try {
    execSync(`git worktree add "${worktreePath}" -b "${branchName}"`, {
      cwd: rootDir,
      stdio: 'inherit',
    });
  } catch (e) {
    console.error(`error: failed to create worktree at ${worktreePath}`);
    process.exit(1);
  }

  console.log(`session started: ${branchName}`);
  console.log(`worktree created at: ${worktreePath}`);
  console.log(`branch created: ${branchName}`);
  console.log('');
  console.log(`To work in this session, cd to: ${worktreePath}`);
  console.log(`To end this session, run: pm session end ${agentName}`);
}

/**
 * End an agent session: push branch, open draft PR, tear down worktree.
 *
 * This:
 * 1. Pushes the feature branch to origin
 * 2. Opens a draft PR using gh pr create --draft
 * 3. Tears down the git worktree
 *
 * The agent name is used to locate the most recent worktree for that agent.
 */
export function sessionEnd(agentName: string, rootDir: string): void {
  // Validate that we're in a git repository
  try {
    execSync('git rev-parse --git-dir', {
      cwd: rootDir,
      stdio: 'pipe',
    });
  } catch (e) {
    console.error('error: not in a git repository');
    process.exit(1);
  }

  // Find the most recent worktree for this agent
  const workTreesDir = path.join(rootDir, '.pm', 'worktrees');
  let latestWorktree: string | null = null;
  let latestTimestamp = '';

  if (fs.existsSync(workTreesDir)) {
    const entries = fs.readdirSync(workTreesDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.startsWith(`${agentName}-`)) {
        const timestamp = entry.name.slice(agentName.length + 1);
        if (timestamp > latestTimestamp) {
          latestTimestamp = timestamp;
          latestWorktree = path.join(workTreesDir, entry.name);
        }
      }
    }
  }

  if (!latestWorktree) {
    console.error(`error: no active session found for agent "${agentName}"`);
    console.error('run: pm session start <agent>');
    process.exit(1);
  }

  // Get the branch name from the worktree
  let branchName: string;
  try {
    branchName = execSync('git rev-parse --abbrev-ref HEAD', {
      cwd: latestWorktree,
      stdio: 'pipe',
      encoding: 'utf-8',
    }).trim();
  } catch (e) {
    console.error(`error: failed to determine branch name from worktree`);
    process.exit(1);
  }

  console.log(`ending session for agent "${agentName}"`);
  console.log(`branch: ${branchName}`);
  console.log(`worktree: ${latestWorktree}`);
  console.log('');

  // Step 1: Check if there are any commits to push
  let hasChanges = false;
  try {
    const ahead = execSync(
      `git rev-list --count origin/main..${branchName}`,
      {
        cwd: rootDir,
        stdio: 'pipe',
        encoding: 'utf-8',
      }
    );
    hasChanges = parseInt(ahead, 10) > 0;
  } catch {
    hasChanges = true; // Assume changes if we can't determine
  }

  if (!hasChanges) {
    console.log('no changes detected on this branch');
  } else {
    // Step 2: Push the branch
    console.log(`pushing branch "${branchName}" to origin...`);
    try {
      execSync(`git push -u origin "${branchName}"`, {
        cwd: rootDir,
        stdio: 'inherit',
      });
    } catch (e) {
      console.error(`error: failed to push branch "${branchName}"`);
      process.exit(1);
    }

    // Step 3: Open draft PR
    console.log(`opening draft PR for branch "${branchName}"...`);
    try {
      execSync(
        `gh pr create --draft --base main --head "${branchName}" --title "WIP: ${branchName}" --body "Session work in progress"`,
        {
          cwd: rootDir,
          stdio: 'inherit',
        }
      );
    } catch (e) {
      // gh pr create might fail if PR already exists, which is okay
      // The branch is still pushed, which is the important part
      console.log('(PR creation skipped or already exists)');
    }
  }

  // Step 4: Tear down worktree
  console.log(`removing worktree at ${latestWorktree}...`);
  try {
    execSync(`git worktree remove "${latestWorktree}"`, {
      cwd: rootDir,
      stdio: 'inherit',
    });
  } catch (e) {
    console.error(`error: failed to remove worktree at ${latestWorktree}`);
    console.error('you may need to manually run: git worktree remove <path>');
    process.exit(1);
  }

  console.log('session ended');
}
