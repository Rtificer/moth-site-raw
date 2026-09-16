import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcDir = path.join(__dirname, "src");
const pagesDir = path.join(srcDir, "pages");
const partialsDir = path.join(srcDir, "partials");
const postsDir = path.join(__dirname, "docs/posts"); // markdown source posts live here
const outDir = path.join(__dirname, "dist");

// Folders inside src/ that should be copied as-is into dist/
// (add/remove names here to match your project)
const assetFolders = ["css", "assets", "javascript", "vendor"];

const INCLUDE_RE = /<!--\s*include:([\w./-]+)\s*-->/g;
const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;

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

/**
 * Parses simple "key: value" frontmatter delimited by --- lines.
 * Returns { meta, content }. If no frontmatter block is found,
 * meta is {} and content is the raw input.
 */
function parseFrontmatter(raw) {
  const match = raw.match(FRONTMATTER_RE);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    if (key) meta[key] = value;
  }

  return { meta, content: match[2] };
}

/**
 * Builds dist/posts/index.json from each post's frontmatter,
 * sorted newest first. Does not touch/copy the .md files themselves.
 */
function buildPosts() {
  if (!fs.existsSync(postsDir)) {
    console.warn(`No posts directory found at ${postsDir}`);
    return;
  }

  fs.mkdirSync(postsDir, { recursive: true });

  const index = [];

  for (const file of fs.readdirSync(postsDir)) {
    if (!file.endsWith(".md")) continue;

    const slug = file.slice(0, -3);
    const inputPath = path.join(postsDir, file);
    const raw = fs.readFileSync(inputPath, "utf-8");
    const { meta } = parseFrontmatter(raw);

    if (!meta.title || !meta.date) {
      console.warn(
        `  Warning: "${file}" is missing title/date/hidden frontmatter, skipping from index`,
      );
      continue;
    }

    if (meta.hidden === "true") {
      continue;
    }

    index.push({ slug, title: meta.title, date: meta.date });
  }

  index.sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first

  fs.writeFileSync(
    path.join(postsDir, "index.json"),
    JSON.stringify(index, null, 2),
  );

  console.log(`Built posts/index.json (${index.length} posts)`);
}

function build() {
  console.log("Building site...");
  buildPages();
  copyAssets();
  buildPosts();
  console.log("Done. Output in dist/");
}

build();
