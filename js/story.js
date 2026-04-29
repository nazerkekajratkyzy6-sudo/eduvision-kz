let currentLang = localStorage.getItem("lang") || "kz";

const params = new URLSearchParams(window.location.search);
const storyId = params.get("id");

const titleEl = document.getElementById("storyTitle");
const metaEl = document.getElementById("storyMeta");
const textEl = document.getElementById("storyText");
const tasksTitleEl = document.getElementById("tasksTitle");
const tasksEl = document.getElementById("storyTasks");

const labels = {
  kz: {
    author: "Автор",
    grade: "Сынып",
    type: "Түрі",
    tasks: "Тапсырмалар",
    notFound: "Мәтін табылмады."
  },
  ru: {
    author: "Автор",
    grade: "Класс",
    type: "Тип",
    tasks: "Задания",
    notFound: "Текст не найден."
  }
};

function uniqueStories(items) {
  const map = new Map();
  items.forEach(item => {
    if (!map.has(item.id)) map.set(item.id, item);
  });
  return Array.from(map.values());
}

function setActiveLang() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function renderStory() {
  const data = uniqueStories(window.STORIES || []);
  const story = data.find(item => item.id === storyId);

  if (!story) {
    titleEl.textContent = labels[currentLang].notFound;
    textEl.innerHTML = "";
    tasksEl.innerHTML = "";
    return;
  }

  const title = story.title?.[currentLang] || story.title?.ru || "";
  const type = story.type?.[currentLang] || story.type?.ru || "";
  const text = story.text?.[currentLang] || story.text?.ru || "";
  const tasks = story.tasks?.[currentLang] || [];

  titleEl.textContent = title;

  metaEl.textContent =
    `${labels[currentLang].type}: ${type} | ${labels[currentLang].author}: ${story.author || ""} | ${labels[currentLang].grade}: ${story.grade || ""}`;

  textEl.innerHTML = text
    .trim()
    .split(/\n+/)
    .map(paragraph => `<p>${paragraph.trim()}</p>`)
    .join("");

  tasksTitleEl.textContent = labels[currentLang].tasks;
  tasksEl.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task;
    tasksEl.appendChild(li);
  });

  setActiveLang();
}

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("lang", currentLang);
    renderStory();
  });
});

renderStory();
