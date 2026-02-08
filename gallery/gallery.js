document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".gallery-card");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      /* stato attivo */
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      /* filtra card */
      cards.forEach(card => {
        const category = card.dataset.category;

        if (filter === "all" || category === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
