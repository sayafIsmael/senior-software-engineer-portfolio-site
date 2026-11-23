import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const required = [
  'src/pages/index.astro',
  'src/layouts/BaseLayout.astro',
  'src/pages/work/commerce-platform.astro',
  'src/pages/work/automation-system.astro',
  'src/pages/notes/architecture-decisions.astro',
  'src/pages/notes/ai-assisted-engineering.astro',
  'src/data/site.ts',
  'src/data/engineering.ts',
  'src/scripts/main.ts',
  'src/styles/global.css',
  'public/images/avatar-placeholder.svg',
  'public/images/og-cover.png',
  'public/icons.svg',
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing: ${file}`);
}
const home = read('src/pages/index.astro');
const layout = read('src/layouts/BaseLayout.astro');
const script = read('src/scripts/main.ts');
const icons = read('public/icons.svg');
const data = read('src/data/engineering.ts');
const site = read('src/data/site.ts');

for (const anchor of ['work','architecture','approach','upwork','videos','notes','contact']) {
  if (!(home.includes(`id="${anchor}"`) || (anchor==='contact' && read('src/components/layout/Footer.astro').includes('id="contact"')))) throw new Error(`Missing anchor ${anchor}`);
}
for (const endpoint of ['/work/commerce-platform/','/work/automation-system/','/notes/architecture-decisions/','/notes/ai-assisted-engineering/']) {
  const file = path.join(root,'src/pages',endpoint.replace(/^\//,'').replace(/\/$/,'')+'.astro');
  if (!fs.existsSync(file)) throw new Error(`Broken local route ${endpoint}`);
}
for (const section of ['Why teams hire me','Architecture thinking','How I engineer','My process','Engineering videos','Engineering notes']) {
  if (!home.includes(section)) throw new Error(`Missing section: ${section}`);
}
for (const handler of ['[data-menu-toggle]','[data-orbit]','[data-project-diagram]','[data-architecture-stage]','[data-process]']) {
  if (!script.includes(handler)) throw new Error(`Missing interaction logic for ${handler}`);
}
for (const tag of ['application/ld+json','og:title','twitter:card','rel="canonical"']) {
  if (!layout.includes(tag)) throw new Error(`Missing SEO tag: ${tag}`);
}
const symbolIds=new Set([...icons.matchAll(/<symbol\s+id="([\w-]+)"/g)].map(m=>m[1]));
const names=new Set([...home.matchAll(/<Icon\s+name="([\w-]+)"/g)].map(m=>m[1]));
for (const item of [...data.matchAll(/icon:\s*'([\w-]+)'/g)]) names.add(item[1]);
for (const file of ['src/components/ui/SocialLink.astro','src/components/layout/Footer.astro','src/components/sections/ProjectDiagram.astro']) {
  for (const match of read(file).matchAll(/(?:name|icon)="([\w-]+)"/g)) {
    if (match[1] !== '"') names.add(match[1]);
  }
}
for (const name of names) {
  if (name==='icon' || name==='name') continue;
  if (!symbolIds.has(name)) throw new Error(`Missing SVG symbol: ${name}`);
}
if (!site.includes('links:')) throw new Error('Missing editable profile links');
console.log(`Source audit passed: ${required.length} required assets, ${symbolIds.size} local SVG icons, all internal page routes and primary interactive features.`);
