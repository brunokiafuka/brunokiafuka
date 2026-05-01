import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'content/site.yml');
const outDir = resolve(root, 'data');
const out = resolve(outDir, 'site.json');

const data = parse(readFileSync(src, 'utf8'));

mkdirSync(outDir, { recursive: true });
writeFileSync(out, JSON.stringify(data, null, 2) + '\n');

const summary = Object.entries(data)
  .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.length : 1}`)
  .join(', ');

console.log(`build-content → data/site.json (${summary})`);
