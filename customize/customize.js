const logo = document.getElementById("logo");
const text = document.getElementById("text");
const tshirt = document.getElementById("tshirt");

/* COLORE MAGLIETTA */
document.getElementById("shirtColor").addEventListener("input", e => {
  tshirt.style.backgroundColor = e.target.value;
});

/* UPLOAD LOGO */
document.getElementById("upload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  logo.src = URL.createObjectURL(file);
  logo.classList.remove("hidden");
});

/* TESTO */
document.getElementById("textInput").addEventListener("input", e => {
  text.textContent = e.target.value;
  text.classList.remove("hidden");
});

document.getElementById("textColor").addEventListener("input", e => {
  text.style.color = e.target.value;
});

/* CENTRA */
document.getElementById("center").addEventListener("click", () => {
  [logo, text].forEach(el => {
    el.style.top = "45%";
    el.style.left = "50%";
  });
});

/* DRAG & DROP */
function makeDraggable(el) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  const startDrag = (x, y) => {
    const rect = el.getBoundingClientRect();
    offsetX = x - rect.left;
    offsetY = y - rect.top;
    isDragging = true;
  };

  const drag = (x, y) => {
    if (!isDragging) return;

    const parentRect = tshirt.getBoundingClientRect();
    el.style.left = x - parentRect.left - offsetX + "px";
    el.style.top = y - parentRect.top - offsetY + "px";
  };

  const stopDrag = () => {
    isDragging = false;
  };

  /* MOUSE */
  el.addEventListener("mousedown", e => {
    startDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mousemove", e => {
    drag(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", stopDrag);

  /* TOUCH */
  el.addEventListener("touchstart", e => {
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY);
  }, { passive: true });

  document.addEventListener("touchmove", e => {
    const t = e.touches[0];
    drag(t.clientX, t.clientY);
  }, { passive: true });

  document.addEventListener("touchend", stopDrag);
}
