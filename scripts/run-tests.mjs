#!/usr/bin/env node
import path from 'node:path';
import { readdir } from 'node:fs/promises';
import { run } from 'node:test';
import { spec } from 'node:test/reporters';

const variant = process.argv[2] ?? 'unit';
const root = path.resolve('build', 'tests', 'tests', variant);

async function collectTests(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return collectTests(fullPath);
      }
      if (entry.isFile() && entry.name.endsWith('.test.js')) {
        return [fullPath];
      }
      return [];
    })
  );
  return files.flat();
}

let tests;
try {
  tests = await collectTests(root);
} catch (error) {
  console.error(`Failed to read tests from "${root}":`, error.message);
  process.exit(1);
}

if (tests.length === 0) {
  console.error(`No compiled tests were found under "${root}".`);
  process.exit(1);
}

const files = tests.map((file) => path.resolve(file));
const stream = run({ files });
stream.compose(spec()).pipe(process.stdout);

stream.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});

stream.on('exit', ({ code }) => {
  process.exit(code);
});
