const container = document.getElementById("stories");

STORIES.forEach(story => {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <h3>${story.title}</h3>
    <p>${story.theme}</p>
    <a href="story.html?id=${story.id}">Оқу</a>
  `;

  container.appendChild(div);
});
