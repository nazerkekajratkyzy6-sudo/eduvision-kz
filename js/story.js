const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const story = STORIES.find(s => s.id === id);

document.getElementById("title").innerText = story.title;
document.getElementById("text").innerText = story.text;
