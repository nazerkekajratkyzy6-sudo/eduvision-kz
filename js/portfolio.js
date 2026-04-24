const container = document.getElementById("portfolio");

let works = JSON.parse(localStorage.getItem("works")) || [];

function render() {
  container.innerHTML = "";

  works.forEach(item => {
    const card = document.createElement("div");
    card.className = "media-card";

    if (item.type === "image") {
      card.innerHTML = `<img src="${item.src}">`;
    } else {
      card.innerHTML = `<video src="${item.src}" controls></video>`;
    }

    container.appendChild(card);
  });
}

render();