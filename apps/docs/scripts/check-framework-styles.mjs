import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const failures = [];
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes:true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) { await inspect(url); continue; }
    const source = await readFile(url, 'utf8');
    if (entry.name.endsWith('.css') && source.replace(/@import\s+["'][^"']+["'];?/g, '').trim()) failures.push(`${url.pathname}: private CSS declarations`);
    if (!/\.tsx?$/.test(entry.name)) continue;
    const file = ts.createSourceFile(fileURLToPath(url), source, ts.ScriptTarget.Latest, true, entry.name.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const variables = new Map();
    function collect(node) {
      if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) variables.set(node.name.text,node.initializer);
      ts.forEachChild(node, collect);
    }
    collect(file);
    function checkStyle(expression, seen = new Set()) {
      if (!expression) return;
      if (ts.isIdentifier(expression)) {
        if (seen.has(expression.text)) return;
        seen.add(expression.text);
        const value=variables.get(expression.text);
        if (value) checkStyle(value,seen);
        else failures.push(`${entry.name}: unresolved style input ${expression.text}`);
        return;
      }
      if (ts.isObjectLiteralExpression(expression)) {
        for (const property of expression.properties) {
          if (!ts.isPropertyAssignment(property) || !ts.isStringLiteral(property.name) || !property.name.text.startsWith('--aar-')) failures.push(`${entry.name}: presentation must use Aar Loom classes; style inputs are limited to --aar-* variables`);
        }
        return;
      }
      if (expression.kind === ts.SyntaxKind.UndefinedKeyword || ts.isIdentifier(expression) && expression.text === 'undefined') return;
      if (ts.isConditionalExpression(expression)) { checkStyle(expression.whenTrue,seen); if (expression.whenFalse.getText(file) !== 'undefined') checkStyle(expression.whenFalse,seen); return; }
      if (ts.isAsExpression(expression) || ts.isParenthesizedExpression(expression)) checkStyle(expression.expression,seen);
    }
    function walk(node) {
      if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
        const name=node.moduleSpecifier.text;
        if (name.includes('.css') && !name.startsWith('@techaaroorian-ui/aar-loom/') && !name.endsWith('?raw') && !name.startsWith('highlight.js/')) failures.push(`${entry.name}: non-framework CSS import ${name}`);
      }
      if (ts.isJsxAttribute(node) && node.name.getText(file)==='style' && node.initializer && ts.isJsxExpression(node.initializer)) checkStyle(node.initializer.expression);
      ts.forEachChild(node,walk);
    }
    walk(file);
  }
}
await inspect(new URL('src/', root));
await inspect(new URL('.storybook/', root));
if (failures.length) throw new Error(failures.join('\n'));
console.log('Docs styling check passed: Aar Loom CSS only; explicit token/geometry inputs.');
