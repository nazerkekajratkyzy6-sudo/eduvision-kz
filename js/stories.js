let currentLang = localStorage.getItem("lang") || "kz";
let currentCategory = "all";

const grid = document.getElementById("storiesGrid");
const pageTitle = document.getElementById("pageTitle");

const labels = {
  kz: {
    pageTitle: "Мәтіндер жинағы",
    read: "Оқу",
    author: "Автор",
    grade: "Сынып"
  },
  ru: {
    pageTitle: "Сборник текстов",
    read: "Читать",
    author: "Автор",
    grade: "Класс"
  }
};

function uniqueStories(items) {
  const map = new Map();
  items.forEach(item => {
    if (!map.has(item.id)) map.set(item.id, item);
  });
  return Array.from(map.values());
}

function setActiveButtons() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === currentCategory);
  });
}

function renderStories() {
  const data = uniqueStories(window.STORIES || []);

  pageTitle.textContent = labels[currentLang].pageTitle;

  const filtered = currentCategory === "all"
    ? data
    : data.filter(item => item.category === currentCategory);

  grid.innerHTML = "";

  if (!filtered.length) {
    grid.innerHTML = `<p>Мәтін табылмады.</p>`;
    return;
  }

  filtered.forEach(item => {
    const title = item.title?.[currentLang] || item.title?.ru || "";
    const type = item.type?.[currentLang] || item.type?.ru || "";
    const theme = item.theme?.[currentLang] || item.theme?.ru || "";
    const author = item.author || "";
    const grade = item.grade || "";

    const card = document.createElement("article");
    card.className = "story-card";

    card.innerHTML = `
      <div class="story-badge">${type}</div>
      <h3>${title}</h3>
      <p><strong>${labels[currentLang].author}:</strong> ${author}</p>
      <p><strong>${labels[currentLang].grade}:</strong> ${grade}</p>
      <p>${theme}</p>
      <a class="btn" href="story.html?id=${encodeURIComponent(item.id)}">${labels[currentLang].read}</a>
    `;

    grid.appendChild(card);
  });

  setActiveButtons();
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("lang", currentLang);
    renderStories();
  });
});

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    renderStories();
  });
});

renderStories();
