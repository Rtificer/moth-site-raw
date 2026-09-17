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
      img.onerror = () => {
        img.alt = `Image failed to load: ${img.src}`;
        img.style.border = "2px dashed red";
      };
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
