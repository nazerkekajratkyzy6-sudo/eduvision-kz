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
      ? `<img src="${item.src}" alt="${getCategoryLabel(item.category)}" onclick="openModal('${item.src}', 'image')">`
      : `<video controls preload="metadata">
           <source src="${item.src}" type="video/mp4">
         </video>`;

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

function openModal(src, type) {
  const modal = document.getElementById("modal");

  modal.innerHTML = type === "image"
    ? `<img src="${src}" alt="Фото">`
    : `<video src="${src}" controls autoplay></video>`;

  modal.classList.add("active");
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
  modal.innerHTML = "";
}

renderMedia();
