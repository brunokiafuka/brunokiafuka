import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'content/site.yml');
const outDir = resolve(root, 'data');
const outJson = resolve(outDir, 'site.json');
const outLlms = resolve(root, 'llms.txt');

const data = parse(readFileSync(src, 'utf8'));

mkdirSync(outDir, { recursive: true });
writeFileSync(outJson, JSON.stringify(data, null, 2) + '\n');

writeFileSync(outLlms, buildLlmsTxt(data));

const summary = Object.entries(data)
  .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.length : 1}`)
  .join(', ');

console.log(`build-content → data/site.json + llms.txt (${summary})`);

// llms.txt — https://llmstxt.org
function buildLlmsTxt(d) {
  const sections = [
    ['Tools', d.tools],
    ['Writing', d.writing],
    ['Elsewhere', d.elsewhere]
  ];

  const out = [];
  out.push('# Bruno Kiafuka');
  out.push('');
  out.push(
    '> Software engineer at Fin.ai (Intercom). Previously Meta and Shopify. ' +
    'Based in Dublin, Ireland. Builds developer tools and writes essays on software craft.'
  );
  out.push('');
  out.push(
    'Personal site of Bruno Kiafuka. Single page with sections for tools ' +
    '(open-source projects), writing (essays on Substack), and elsewhere ' +
    '(social and professional links).'
  );
  out.push('');

  for (const [name, items] of sections) {
    if (!Array.isArray(items) || !items.length) continue;
    out.push(`## ${name}`);
    out.push('');
    for (const item of items) {
      const meta = item.tag ? ` (${item.tag})` : '';
      out.push(`- [${item.name}](${item.href}): ${item.desc}${meta}`);
    }
    out.push('');
  }

  return out.join('\n');
}
