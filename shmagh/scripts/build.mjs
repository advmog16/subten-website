#!/usr/bin/env node
/**
 * Zero-dependency production build: src/ → dist/
 *  - copies everything from src/
 *  - flattens css/main.css @imports into one minified stylesheet (removes the partials)
 *  - strips comments / indentation from the JS modules
 */
import { cp, readFile, writeFile, rm, readdir, stat } from "node:fs/promises";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const dist = join(root, "dist");

const minifyCSS = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();

// Conservative: only drops block comments, full-line // comments and indentation.
const minifyJS = (js) =>
  js
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("//"))
    .join("\n");

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const p = join(dir, name);
    if ((await stat(p)).isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

async function bundleCSS() {
  const cssDir = join(dist, "css");
  const entry = await readFile(join(cssDir, "main.css"), "utf8");
  const parts = [];
  const imported = [];
  for (const m of entry.matchAll(/@import url\("([^"]+)"\);/g)) {
    imported.push(m[1]);
    parts.push(await readFile(join(cssDir, m[1]), "utf8"));
  }
  await writeFile(join(cssDir, "main.css"), minifyCSS(parts.join("\n")));
  await Promise.all(imported.map((f) => rm(join(cssDir, f))));
}

async function minifyScripts() {
  for (const file of await walk(join(dist, "js"))) {
    if (extname(file) !== ".js") continue;
    await writeFile(file, minifyJS(await readFile(file, "utf8")));
  }
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

await rm(dist, { recursive: true, force: true });
await cp(src, dist, { recursive: true });
await bundleCSS();
await minifyScripts();

const files = await walk(dist);
const sizes = await Promise.all(files.map(async (f) => [f.slice(dist.length + 1), (await stat(f)).size]));
const total = sizes.reduce((a, [, s]) => a + s, 0);
const code = sizes.filter(([f]) => /\.(html|css|js)$/.test(f));
console.log("dist/ built");
for (const [f, s] of code) console.log(`  ${f.padEnd(28)} ${kb(s)}`);
console.log(`  code total: ${kb(code.reduce((a, [, s]) => a + s, 0))} · everything: ${kb(total)} (${files.length} files)`);
