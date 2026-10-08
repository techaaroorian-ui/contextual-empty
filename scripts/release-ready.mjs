import { readdir, readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const changeDir = new URL('.changeset/', root);
const records = [];
for (const name of await readdir(changeDir)) {
  if (name.endsWith('.md') && name !== 'README.md' && (await readFile(new URL(name, changeDir), 'utf8')).startsWith('---')) records.push(name);
}
if (records.length) throw new Error(`Version pending changesets before publishing: ${records.join(', ')}`);
let prerelease;
try { prerelease = JSON.parse(await readFile(new URL('pre.json', changeDir), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const name of await readdir(new URL('packages/', root))) {
  const pkg = JSON.parse(await readFile(new URL(`packages/${name}/package.json`, root), 'utf8'));
  if (pkg.private) continue;
  if (!/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(pkg.version)) throw new Error(`Invalid version for ${pkg.name}`);
  if (prerelease?.mode === 'pre' && !pkg.version.includes(`-${prerelease.tag}.`)) throw new Error(`${pkg.name} is outside the ${prerelease.tag} channel`);
  if ((!prerelease || prerelease.mode !== 'pre') && pkg.version.includes('-')) throw new Error(`Enter prerelease mode before publishing ${pkg.name}`);
  console.log(`${pkg.name}@${pkg.version} -> ${prerelease?.mode === 'pre' ? prerelease.tag : 'latest'}`);
}
