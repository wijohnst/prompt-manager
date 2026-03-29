#!/usr/bin/env node
import { Command } from 'commander';
import { execSync } from 'child_process';
import * as path from 'path';
import { build } from './build';

const program = new Command();

program
  .name('pm')
  .description('prompt-manager CLI')
  .version('0.1.0');

program
  .command('build <agent>')
  .description('compose and build a prompt for the named agent')
  .action((agent: string) => {
    build(agent, process.cwd());
  });

const sessionCmd = program.command('session');
sessionCmd.description('manage agent sessions with git worktree isolation');

sessionCmd
  .command('start <agent>')
  .description('start a new session for the named agent')
  .action((agent: string) => {
    const pmSessionScript = path.join(__dirname, '..', 'bin', 'pm-session');
    try {
      execSync(`${pmSessionScript} start ${agent}`, {
        cwd: process.cwd(),
        stdio: 'inherit',
      });
    } catch {
      process.exit(1);
    }
  });

sessionCmd
  .command('end <agent>')
  .description('end the session for the named agent, push branch, and open draft PR')
  .action((agent: string) => {
    const pmSessionScript = path.join(__dirname, '..', 'bin', 'pm-session');
    try {
      execSync(`${pmSessionScript} end ${agent}`, {
        cwd: process.cwd(),
        stdio: 'inherit',
      });
    } catch {
      process.exit(1);
    }
  });

program.parse(process.argv);
