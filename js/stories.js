const list = document.getElementById("storiesList");
let currentAge = "all";

function renderStories() {
  list.innerHTML = "";

  STORIES.forEach(story => {
    if (currentAge !== "all" && story.age !== currentAge) return;

    const card = document.createElement("a");
    card.href = `story.html?id=${story.id}`;
    card.className = "card";

   card.innerHTML = `
  <div class="icon">📘</div>
  <h3>${story.title}</h3>
  <p>${story.type}</p>
  <p>${story.theme}</p>
  <button>Открыть</button>
`;

    list.appendChild(card);
  });
}

function filterStories(age, btn) {
  currentAge = age;

  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderStories();
}

renderStories();
