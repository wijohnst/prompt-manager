import { parse } from 'smol-toml';
import * as fs from 'fs';
import * as path from 'path';

export interface SkillEntry {
  name: string;
  path: string;
  include: 'inline' | 'by-reference';
}

export interface VocationEntry {
  name: string;
  path: string;
  include: 'inline' | 'by-reference';
}

export interface WorkflowEntry {
  name: string;
  path: string;
  include: 'inline' | 'by-reference';
}

export interface DirectiveEntry {
  name: string;
  path: string;
  include: 'inline';
}

export interface Role {
  skills?: SkillEntry[];
}

export interface AgentMemory {
  path: string;
  files: string[];
}

export interface Agent {
  base: string;
  platform: string;
  roles?: string[];
  vocations?: VocationEntry[];
  skills?: SkillEntry[];
  workflows?: WorkflowEntry[];
  memory?: AgentMemory;
}

export interface Build {
  output: string;
  directives?: DirectiveEntry[];
}

export interface PmConfig {
  build: Build;
  roles?: Record<string, Role>;
  agents: Record<string, Agent>;
}

export function loadConfig(rootDir: string): PmConfig {
  const configPath = path.join(rootDir, 'pm.toml');

  if (!fs.existsSync(configPath)) {
    console.error(`error: pm.toml not found at ${configPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(configPath, 'utf-8');

  let parsed: unknown;
  try {
    parsed = parse(raw);
  } catch (e) {
    console.error(`error: failed to parse pm.toml: ${(e as Error).message}`);
    process.exit(1);
  }

  const config = parsed as PmConfig;

  if (!config.build?.output) {
    console.error('error: pm.toml missing required field [build].output');
    process.exit(1);
  }

  if (!config.agents) {
    console.error('error: pm.toml missing required section [agents]');
    process.exit(1);
  }

  return config;
}
