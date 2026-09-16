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