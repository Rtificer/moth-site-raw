async function loadPost() {
  const slug = new URLSearchParams(location.search).get("slug");
  const res = await fetch('posts/{$slug}.json');
  const post = await res.json();

  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-content').innerHTML = post.content;
  document.title = post.title;

  // rough estimate of word count
  const words = post.content.replace(/<[^>]+/g, ' ').trim().split(/\s+/).length;
  document.getElementById('word-count').textContent = `${words} words`;
  document.getElementById('post-date').textContent = post.date;
}

loadPost();