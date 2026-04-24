function saveWork() {
  const input = document.querySelector('input[type="file"]');
  const files = input.files;

  if (!files.length) {
    alert("Файл таңдаңыз");
    return;
  }

  let works = JSON.parse(localStorage.getItem("works")) || [];

  for (let file of files) {
    const reader = new FileReader();

    reader.onload = function(e) {
      works.push({
        type: file.type.startsWith("image") ? "image" : "video",
        src: e.target.result
      });

      localStorage.setItem("works", JSON.stringify(works));
    };

    reader.readAsDataURL(file);
  }

  alert("Жұмыс портфолиоға сақталды");
}