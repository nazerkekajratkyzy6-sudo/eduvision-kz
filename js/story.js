const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const story = STORIES.find(s => s.id === id);

document.getElementById("title").innerText = story.title;
document.getElementById("meta").innerText =
  `${story.grade} сынып • ${story.type} • ${story.theme}`;

// перенос строк сақтаймыз
document.getElementById("text").innerHTML =
  story.text.replace(/\n/g, "<br><br>");
