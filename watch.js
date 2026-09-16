// Rebuilds the site automatically whenever a file in src/ or docs/ changes.
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ignoredPrefixes = [
  path.join(__dirname, "dist"),
  path.join(__dirname, "docs", "posts", "index.json"),
];

function build() {
  try {
    execSync("node build.js", { cwd: __dirname, stdio: "inherit" });
  } catch (err) {
    console.error("Build failed:", err.message);
  }
}

let debounce;
function scheduleBuild(source, filename) {
  // Debounce so rapid saves (e.g. from an editor, or multiple files
  // changing at once) don't trigger many rebuilds in quick succession
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`Change detected in ${source}: ${filename}`);
    build();
  }, 100);
}

function isIgnored(filename) {
  if (!filename) return false;
  const fullPath = path.join(__dirname, filename);
  return ignoredPrefixes.some(
    (ignored) =>
      fullPath === ignored || fullPath.startsWith(ignored + path.sep),
  );
}

function watchDir(dir, label) {
  if (!fs.existsSync(dir)) {
    console.warn(`Skipping watch: ${dir} does not exist`);
    return;
  }
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (isIgnored(filename)) return;
    scheduleBuild(label, filename);
  });
  console.log(`Watching ${dir} for changes...`);
}

build(); // initial build

watchDir(__dirname, "project");

console.log("(Ctrl+C to stop)");
