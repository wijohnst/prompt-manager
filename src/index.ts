#!/usr/bin/env node
import { Command } from 'commander';
import { build } from './build';
import { sessionStart, sessionEnd } from './session';

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
    sessionStart(agent, process.cwd());
  });

sessionCmd
  .command('end <agent>')
  .description('end the session for the named agent, push branch, and open draft PR')
  .action((agent: string) => {
    sessionEnd(agent, process.cwd());
  });

program.parse(process.argv);
