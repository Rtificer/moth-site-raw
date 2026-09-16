---
title: website documention
date: 2026-09-15
hidden: false
---

This website has been built using raw html, css and javascript.

It was built for Mass Academy Computer Science class, where heavy restrictions were placed on our use of external libraries.

When developing, I found myself frequently copy-pasting code, so I wrote a quick javascript build file to insert html fragments into page files.

```js
// build.js

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

// ...

function build() {
  console.log("Building site...");
  buildPages();
  copyAssets();
  // ...
  console.log("Done. Output in dist/");
}

build();
```

This allows for extremely concise html files, and reuse of shared code. Take, for example, the html code of the home page.

```html
<!doctype html>
<html lang="en">
  <head>
    <!-- include:common_head -->
    <link rel="stylesheet" href="css/index.css" />
  </head>

  <body class="home-page">
    <!-- include:navbar -->

    <div class="home-island">
      <h1>moth site</h1>
      <p class="subtext">hi :3</p>

      <!-- include:social_icons -->
    </div>
  </body>
</html>
```

Then these pieces are all abstracted and easy to modify individually. Common head and navbar are shared by all pages. This dramitcally cuts down on code re-use and means there is a central location to modify all elements.

Given the structure of our class, we are only allowed to modify our site before a single upload date. As such, I needed to set up a system to dynamically load blog content, including images, and traditional text. Originally I was going to directly pull html code for these pages from an external source, but given the tedium of writing these posts I decided instead to use a vendored version of the marked.js package to convert this markdown data to html code. That way, I could simply write markdown blog posts, and they would be fetched and rendered as html on my main site.

My site as two places where this content needs to be dynamically loaded.
- On the list of posts
- On the post page itself

To avoid fetching the entire body of every post in the list, `build.js` is also responsible for generating a index.json file which contains the `slug`, `title`, and `date` of the that post. The slug is used to generate the specific post url and to fetch the `.md` post content file.
```json
// index.json

[
  {
    "slug": "website_docs",
    "title": "website documention",
    "date": "2026-09-15"
  }, 
  // ...
]
```

```javascript
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
```

First, the slug is derived from the `.md` file name. Then `parseFrontmatter()` parses the title, date, and hidden attributes at the top of the post files, throwing en error if the post is missing a title or data, and hiding the post by ommitting it from `index.json`. This is used for `about.md` and other files that use the blog post infrastructure but aren't blog posts in of themselves.

Then the actual post list simply needs to fetch this json file, group it by year, and render the data as html elements:
```javascript
// load_post_list.js

async function loadPostList() {
    try {
        const res = await fetch(`${CONTENT_BASE}posts/index.json`);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const posts = await res.json();

        // group by year
        const byYear = {};
        posts.forEach(p => {
            const year = p.date.slice(0, 4);
            (byYear[year] ??= []).push(p);
        });

        const container = document.getElementById('post-list');
        Object.keys(byYear).sort().reverse().forEach(year => {
            const group = document.createElement('div');
            group.className = 'post-group';
            group.innerHTML = `
            <div class="post-year subtext">${year}</div>
            <ul class="posts-list">
                ${byYear[year].map(p => `
                <li class="post-item">
                    <a href="post.html?slug=${p.slug}" class="post-item-inner">
                        <span class="post-title">${p.title}</span>
                        <span class="post-day subtext">${formatDay(p.date)}</span>
                        </a>
                </li>`).join('')}
            </ul>`;
            container.appendChild(group);
        })
    } catch (err) {
        console.error('Failed to load post list:', err);
        document.getElementById('post-list').textContent = 'Could not load posts.';
    }
}

function formatDay(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

loadPostList();
```

For loading the posts themselves, the procedure is much simpler:

```javascript
// load_post.js

function parseFrontmatter(raw) {
  // seperate meta content
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  // put data into meta object
  const meta = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (key) meta[key.trim()] = rest.join(":").trim();
  });

  return { meta, content: match[2] };
}

async function loadPost() {
  const slug = new URLSearchParams(location.search).get("slug");
  try {
    const res = await fetch(`${CONTENT_BASE}posts/${slug}.md`);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

    const raw = await res.text();
    const { meta, content } = parseFrontmatter(raw);

    document.title = meta.title;
    document.getElementById("post-title").textContent = meta.title;
    document.getElementById("post-content").innerHTML = marked.parse(content);

    // word count + date, matching post_info.html
    const words = content.trim().split(/\s+/).length;
    document.querySelector("#word-count-text").textContent = `${words} words`;
    document.querySelector("#post-date-text").textContent = meta.date;

    // rewrite relative image paths to the GitHub Pages host
    document.querySelectorAll("#post-content img").forEach((img) => {
      const src = img.getAttribute("src");
      if (src && !/^([a-z]+:)?\/\//i.test(src)) {
        img.src = `${CONTENT_BASE}posts/${src}`;
      }
    });

    // syntax highlighting
    document
      .querySelectorAll("pre code")
      .forEach((block) => hljs.highlightElement(block));
  } catch (err) {
    console.error("Failed to load post!", err);
    document.getElementById("post-title").textContent = "Could not load post!";
  }
}

loadPost();
```

We simply fetch the data from the frontmatter, and then modify the elements by id.
- The title is simply that from the frontmatter
- We use `marked.js` to parse the content of the actual post `.md` file into html
- We calculate an estimate of the word count, grab the date from the frontmatter, and set them as the text content of the different postinfo divs.

Here you can see also that I included a vendored downlaod of the hljs library. This is used for code highlighting like the one you see on this very post!

This means that post entries are simple `.md` files. They're easy to edit and modify, and can be changed dynamically, as the site fetches them on page load.

Here's an example from the start of this very post:

```md

---
title: website documention
date: 2026-09-15
hidden: false
---

This website has been built using raw html, css and javascript.

It was built for Mass Academy Computer Science class, where heavy restrictions were placed on our use of external libraries.

When developing, I found myself frequently copy-pasting code, so I wrote a quick javascript build file to insert html fragments into page files.

```js
// build.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// ...
```

The last matter is images. Because images are also content that needs top be loaded dynamically, and because `marked.js` will simply translate the image path provided in markdown directly into html, `load_post.js` has to insert the base link where files are fetched from before the image path:
```javascript
// load_post.js

// ...

async function loadPost() {

  // ...

  // rewrite relative image paths to the GitHub Pages host
  document.querySelectorAll("#post-content img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && !/^([a-z]+:)?\/\//i.test(src)) {
      img.src = `${CONTENT_BASE}posts/${src}`;
    }
  });

  // ...
}

// ...
```

This means that images are stored at `${CONTENT_BASE}posts/${src}`. For example, the float image earlier is at `