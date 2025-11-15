#!/usr/bin/env node
import path from 'node:path';
import { readdirSync } from 'node:fs';
import { spawn } from 'node:child_process';

const variant = process.argv[2] ?? 'unit';
const root = path.resolve('build', 'tests', 'tests', variant);

function collectTests(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return collectTests(fullPath);
    }
    if (entry.isFile() && entry.name.endsWith('.test.js')) {
      return [fullPath];
    }
    return [];
  });
}

let files = [];
try {
  files = collectTests(root);
} catch (error) {
  console.error(`Failed to read tests from "${root}": ${error.message}`);
  process.exit(1);
}

if (files.length === 0) {
  console.error(`No compiled tests were found under "${root}".`);
  process.exit(1);
}

const child = spawn(process.execPath, ['--expose-gc', '--test', '--test-reporter=spec', ...files], {
  stdio: 'inherit',
});

child.on('close', (code) => {
  process.exit(code);
});
