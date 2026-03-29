#!/usr/bin/env node
import { Command } from 'commander';
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

program.parse(process.argv);
