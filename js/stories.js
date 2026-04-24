const container = document.getElementById("stories");

STORIES.forEach(story => {
  const div = document.createElement("div");
  div.className = "story-card";

  div.innerHTML = `
    <div class="icon">📖</div>
    <h3>${story.title}</h3>
    <p class="meta">${story.grade} сынып • ${story.type}</p>
    <p class="theme">${story.theme}</p>
    <a class="btn" href="story.html?id=${story.id}">Оқу</a>
  `;

  container.appendChild(div);
});
