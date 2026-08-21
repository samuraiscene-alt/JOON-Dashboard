document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.dataset.name;

      if (name) {
        console.log(`${name} 열기`);
      }
    });
  });
});
