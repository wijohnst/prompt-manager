import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { build } from '../src/build';

function walkDir(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

describe('build — path boundary', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pm-test-'));
    fs.mkdirSync(path.join(tmpDir, '.pm/prompts/base'), { recursive: true });
    fs.writeFileSync(
      path.join(tmpDir, 'pm.toml'),
      [
        '[build]',
        'output = ".pm/build"',
        '',
        '[agents.test-agent]',
        'base = ".pm/prompts/base/test-agent.md"',
        'platform = "test"',
      ].join('\n')
    );
    fs.writeFileSync(
      path.join(tmpDir, '.pm/prompts/base/test-agent.md'),
      '# Test Agent'
    );
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('writes output only within .pm/build/', () => {
    const before = new Set(walkDir(tmpDir));

    build('test-agent', tmpDir);

    const newFiles = walkDir(tmpDir).filter(f => !before.has(f));
    const buildDir = path.join(tmpDir, '.pm/build');

    expect(newFiles.length).toBeGreaterThan(0);
    for (const file of newFiles) {
      expect(
        file.startsWith(buildDir),
        `unexpected write outside .pm/build/: ${file}`
      ).toBe(true);
    }
  });

  it('output file is named <agent>.md', () => {
    build('test-agent', tmpDir);
    const outputPath = path.join(tmpDir, '.pm/build/test-agent.md');
    expect(fs.existsSync(outputPath)).toBe(true);
  });

  it('output file begins with TOML frontmatter', () => {
    build('test-agent', tmpDir);
    const content = fs.readFileSync(
      path.join(tmpDir, '.pm/build/test-agent.md'),
      'utf-8'
    );
    expect(content.startsWith('---\n')).toBe(true);
    expect(content).toContain('[agent]');
    expect(content).toContain('name = "test-agent"');
    expect(content).toContain('platform = "test"');
  });

  it('exits with code 1 for unknown agent name', () => {
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(((code?: number) => {
        throw new Error(`exit:${code}`);
      }) as unknown as () => never);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => build('nonexistent', tmpDir)).toThrow('exit:1');

    exitSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
