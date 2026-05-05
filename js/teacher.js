// teacher.js — просмотр работ учеников
// Читает из Firestore если Firebase подключён, иначе показывает заглушку

const worksContainer = document.getElementById("works");

function renderWorks(works) {
  worksContainer.innerHTML = "";

  if (!works || works.length === 0) {
    worksContainer.innerHTML = `
      <div style="grid-column:1/-1; padding: 40px; text-align:center; color:#64748b;">
        <p style="font-size:18px;">Пока нет сохранённых работ.</p>
        <p style="margin-top:8px; font-size:14px;">Работы появятся здесь после того, как ученики сохранят ответы.</p>
      </div>`;
    return;
  }

  works.forEach(work => {
    const card = document.createElement("div");
    card.className = "media-card";
    card.style.padding = "18px";

    const date = work.date
      ? new Date(work.date.seconds ? work.date.seconds * 1000 : work.date).toLocaleDateString("ru-RU")
      : "—";

    card.innerHTML = `
      <div style="margin-bottom:10px;">
        <strong style="font-size:16px;">${work.name || "Без имени"}</strong>
        <span style="color:#64748b; font-size:13px; margin-left:12px;">${date}</span>
      </div>
      ${work.storyTitle ? `<div style="color:#4f46e5; font-size:13px; margin-bottom:8px;">📖 ${work.storyTitle}</div>` : ""}
      ${work.answer ? `<p style="color:#334155; line-height:1.6; background:#f8fafc; padding:12px; border-radius:12px; border:1px solid #e2e8f0;">${work.answer}</p>` : ""}
      ${work.fileUrl ? `
        <div style="margin-top:12px;">
          ${work.fileUrl.match(/\.(mp4|webm|mov)$/i)
            ? `<video src="${work.fileUrl}" controls style="width:100%; max-height:220px; border-radius:12px; background:#0f172a;"></video>`
            : `<img src="${work.fileUrl}" style="width:100%; max-height:220px; object-fit:cover; border-radius:12px;" alt="Работа ученика">`
          }
        </div>` : ""}
    `;

    worksContainer.appendChild(card);
  });
}

// Попытка загрузить из Firestore
async function loadFromFirestore() {
  if (typeof firebase === "undefined" || !firebase.firestore) {
    renderWorks([]);
    return;
  }

  try {
    const db = firebase.firestore();
    const snapshot = await db.collection("submissions")
      .orderBy("date", "desc")
      .limit(100)
      .get();

    const works = snapshot.docs.map(doc => doc.data());
    renderWorks(works);
  } catch (err) {
    console.error("Firestore error:", err);
    renderWorks([]);
  }
}

loadFromFirestore();
