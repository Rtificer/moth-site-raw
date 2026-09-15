# site-build

A tiny static site builder: write pages with `<!-- include:name -->` comments,
put reusable pieces (navbar, footer, etc.) in `src/partials/`, and it stitches
everything together into a `dist/` folder you can deploy as-is.

## Folder structure

```
src/
  partials/     reusable HTML snippets (navbar.html, footer.html, ...)
  pages/        full pages that use includes (index.html, about.html, ...)
  css/          copied into dist/css/ untouched
  assets/       copied into dist/assets/ untouched
build.js        the build script
watch.js        optional: rebuilds automatically on file changes
dist/           generated output (created by build.js, safe to delete/regenerate)
```

## Usage

Requires Node.js (any recent version, no npm install needed — no external
dependencies).

```bash
node build.js        # one-off build
# or
node watch.js         # rebuilds automatically while you edit files
```

With the included `package.json` you can also run:

```bash
npm run build
npm run watch
```

Then deploy the `dist/` folder (that's what you'd point GitHub Pages, Netlify,
etc. at — not `src/`).

## Writing includes

In any page or partial, drop a comment like:

```html
<!-- include:navbar -->
```

This pulls in `src/partials/navbar.html` and inserts it in place.

### Nested includes

Partials can include other partials. In this example project,
`footer.html` includes `social-icons.html`:

```html
<!-- src/partials/footer.html -->
<footer class="site-footer">
  <!-- include:social-icons -->
  <p class="copyright">&copy; 2026 moth site</p>
</footer>
```

The build script resolves includes recursively, so this "just works" —
no matter how many levels deep you nest partials. If a partial ever includes
itself (directly or through a chain), the script throws a clear error instead
of infinite-looping.

### Includes in subfolders

Since the include name maps to a file path under `src/partials/`, you can
organize partials into subfolders and reference them like:

```html
<!-- include:components/card -->
```

which resolves to `src/partials/components/card.html`.

## Copying CSS/assets

Everything in `src/css/` and `src/assets/` is copied byte-for-byte into
`dist/css/` and `dist/assets/`. Edit the `assetFolders` array at the top of
`build.js` if you want to copy additional top-level folders (e.g. `fonts`,
`js`).

## Notes / gotchas

- **Paths in your HTML**: because everything ends up flattened into `dist/`
  (pages and partials no longer live in separate subfolders the way your
  original `pages/` folder did), use paths *relative to `dist/`* in your
  `href`/`src` attributes — e.g. `css/common.css` and
  `assets/images/favicon.ico`, not `../css/common.css`. The included example
  pages already do this.
- **`.html` extension** is assumed for both pages and partials.
- **`watch.js`** uses Node's built-in `fs.watch` with `recursive: true`.
  This is well-supported on macOS and Windows. On Linux, recursive watching
  can be flaky depending on your Node version — if you find changes aren't
  triggering rebuilds, swap in the `chokidar` package (`npm i chokidar`) for
  more reliable cross-platform watching.
- Missing partials produce a console warning and leave the `<!-- include:... -->`
  comment in place in the output, so broken references are easy to spot.

## Example included

This project ships with a working example based on a "moth site": a shared
`navbar.html`, a `footer.html` that nests in `social-icons.html`, and two
pages (`index.html`, `about.html`) that both use them. Run `node build.js`
and check `dist/` to see the result.
