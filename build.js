import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = path.join(__dirname, "src");
const pagesDir = path.join(srcDir, "pages");
const partialsDir = path.join(srcDir, "partials");
const outDir = path.join(__dirname, "dist");

// Folders inside src/ that should be copied as-is into dist/
// (add/remove names here to match your project)
const assetFolders = ["css", "assets", "javascript", "vendor"];

const INCLUDE_RE = /<!--\s*include:([\w./-]+)\s*-->/g;

/**
 * Reads a partial and recursively resolves any includes inside it.
 * `seen` tracks the include chain so we can detect circular includes
 * (e.g. a.html includes b.html which includes a.html again).
 */
function resolveIncludes(html, seen = []) {
  return html.replace(INCLUDE_RE, (match, name) => {
    const partialPath = path.join(partialsDir, `${name}.html`);

    if (!fs.existsSync(partialPath)) {
      console.warn(`  Warning: partial "${name}" not found at ${partialPath}`);
      return match; // leave the comment in place so it's easy to spot
    }

    if (seen.includes(partialPath)) {
      throw new Error(
        `Circular include detected: ${[...seen, partialPath].join(" -> ")}`,
      );
    }

    const partialHtml = fs.readFileSync(partialPath, "utf-8");
    // Recurse so partials can include other partials
    return resolveIncludes(partialHtml, [...seen, partialPath]);
  });
}

function buildPages() {
  if (!fs.existsSync(pagesDir)) {
    console.warn(`No pages directory found at ${pagesDir}`);
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });

  for (const file of fs.readdirSync(pagesDir)) {
    if (!file.endsWith(".html")) continue;

    const inputPath = path.join(pagesDir, file);
    const html = fs.readFileSync(inputPath, "utf-8");
    const finalHtml = resolveIncludes(html, [inputPath]);

    fs.writeFileSync(path.join(outDir, file), finalHtml);
    console.log(`Built ${file}`);
  }
}

function copyAssets() {
  for (const folder of assetFolders) {
    const src = path.join(srcDir, folder);
    if (!fs.existsSync(src)) continue;

    fs.cpSync(src, path.join(outDir, folder), { recursive: true });
    console.log(`Copied ${folder}/`);
  }
}

function build() {
  console.log("Building site...");
  buildPages();
  copyAssets();
  console.log("Done. Output in dist/");
}

build();
