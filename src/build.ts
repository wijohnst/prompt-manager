import * as fs from 'fs';
import * as path from 'path';
import { loadConfig, SkillEntry } from './config';

function readFile(filePath: string, rootDir: string): string {
  const absPath = path.resolve(rootDir, filePath);
  if (!fs.existsSync(absPath)) {
    console.error(`error: file not found: ${absPath} (referenced as "${filePath}")`);
    process.exit(1);
  }
  return fs.readFileSync(absPath, 'utf-8').trimEnd();
}

function generateFrontmatter(
  agentName: string,
  platform: string,
  skills: SkillEntry[]
): string {
  const lines: string[] = [
    '---',
    '[agent]',
    `name = "${agentName}"`,
    `platform = "${platform}"`,
  ];

  for (const skill of skills) {
    lines.push('');
    lines.push('[[skills]]');
    lines.push(`name = "${skill.name}"`);
    lines.push(`include = "${skill.include}"`);
    lines.push(`path = "${skill.path}"`);
  }

  lines.push('---');
  return lines.join('\n');
}

export function build(agentName: string, rootDir: string): void {
  const config = loadConfig(rootDir);

  const agent = config.agents[agentName];
  if (!agent) {
    const available = Object.keys(config.agents).join(', ');
    console.error(
      `error: agent "${agentName}" not found in pm.toml (available: ${available})`
    );
    process.exit(1);
  }

  // Resolve role skills (RBAC: merge into agent skill list, roles are then discarded)
  const roleSkills: SkillEntry[] = [];
  for (const roleName of agent.roles ?? []) {
    const role = config.roles?.[roleName];
    if (!role) {
      console.error(
        `error: role "${roleName}" assigned to agent "${agentName}" is not defined in pm.toml`
      );
      process.exit(1);
    }
    for (const skill of role.skills ?? []) {
      roleSkills.push(skill);
    }
  }

  // Full resolved skill list: role skills first, then agent-direct skills
  const allSkills: SkillEntry[] = [...roleSkills, ...(agent.skills ?? [])];

  // Ensure output directory exists
  const outputDir = path.resolve(rootDir, config.build.output);
  fs.mkdirSync(outputDir, { recursive: true });

  // Build body sections in strict composition order
  const sections: string[] = [];

  // 1. Directives — org-wide behavioral principles, frame everything, always inline
  for (const directive of config.build.directives ?? []) {
    const content = readFile(directive.path, rootDir);
    sections.push(`<!-- directive: ${directive.name} -->\n${content}`);
  }

  // 2. Resources — org-wide shared data (staff directory, vocabularies, etc), always inline
  for (const resource of config.build.resources ?? []) {
    const content = readFile(resource.path, rootDir);
    sections.push(`<!-- resource: ${resource.name} -->\n${content}`);
  }

  // 3. Base — agent identity
  const baseContent = readFile(agent.base, rootDir);
  sections.push(`<!-- base -->\n${baseContent}`);

  // 4. Vocations — orientation before capabilities
  for (const vocation of agent.vocations ?? []) {
    if (vocation.include === 'inline') {
      const content = readFile(vocation.path, rootDir);
      sections.push(`<!-- vocation: ${vocation.name} | inline -->\n${content}`);
    } else {
      sections.push(`<!-- vocation: ${vocation.name} | by-reference | ${vocation.path} -->`);
    }
  }

  // 5. Skills — role-resolved skills, then agent-direct skills
  for (const skill of allSkills) {
    if (skill.include === 'inline') {
      const content = readFile(skill.path, rootDir);
      sections.push(`<!-- skill: ${skill.name} | inline -->\n${content}`);
    } else {
      // by-reference: pointer only — no content, no summary
      sections.push(`<!-- skill: ${skill.name} | by-reference | ${skill.path} -->`);
    }
  }

  // 6. Workflows
  for (const workflow of agent.workflows ?? []) {
    if (workflow.include === 'inline') {
      const content = readFile(workflow.path, rootDir);
      sections.push(`<!-- workflow: ${workflow.name} | inline -->\n${content}`);
    } else {
      sections.push(`<!-- workflow: ${workflow.name} | by-reference | ${workflow.path} -->`);
    }
  }

  // Generate TOML frontmatter (agent reads this — knows its skills, platform)
  const frontmatter = generateFrontmatter(agentName, agent.platform, allSkills);

  // Compose final output: frontmatter + blank line + body
  const body = sections.join('\n\n');
  const output = `${frontmatter}\n\n${body}\n`;

  const outputPath = path.join(outputDir, `${agentName}.md`);
  fs.writeFileSync(outputPath, output, 'utf-8');

  console.log(`built: ${outputPath}`);
}
