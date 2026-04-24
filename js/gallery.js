const gallery = document.getElementById("gallery");
let current = "all";

function getCategoryLabel(category) {
  const labels = {
    reading: "Оқу",
    creative: "Шығармашылық",
    technology: "Технология",
    results: "Нәтиже"
  };
  return labels[category] || category;
}

function renderMedia() {
  gallery.innerHTML = "";

  MEDIA.forEach(item => {
    if (current !== "all" && item.category !== current) return;

    const card = document.createElement("div");
    card.className = "media-card";

    const media = item.type === "image"
      ? `<img src="${item.src}" alt="${getCategoryLabel(item.category)}">`
      : `<video src="${item.src}" controls preload="metadata"></video>`;

    card.innerHTML = `
      ${media}
      <div class="media-info">
        <span>${getCategoryLabel(item.category)}</span>
      </div>
    `;

    gallery.appendChild(card);
  });
}

function filterMedia(category, btn) {
  current = category;

  document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  renderMedia();
}

renderMedia();