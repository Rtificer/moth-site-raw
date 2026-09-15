// Rebuilds the site automatically whenever a file in src/ changes.
// Uses Node's built-in fs.watch, so no extra npm packages are required.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

function build() {
  try {
    execSync('node build.js', { cwd: __dirname, stdio: 'inherit' });
  } catch (err) {
    console.error('Build failed:', err.message);
  }
}

console.log(`Watching ${srcDir} for changes... (Ctrl+C to stop)`);
build(); // initial build

let debounce;
fs.watch(srcDir, { recursive: true }, (eventType, filename) => {
  // Debounce so rapid saves (e.g. from an editor) don't trigger many rebuilds
  clearTimeout(debounce);
  debounce = setTimeout(() => {
    console.log(`Change detected: ${filename}`);
    build();
  }, 100);
});
