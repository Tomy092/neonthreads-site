/* =========================
   ELEMENTI
========================= */
const logo = document.getElementById("logo");
const text = document.getElementById("text");
const tshirt = document.getElementById("tshirt");
const tshirtImage = document.getElementById("tshirtImage");
const shirtColorInput = document.getElementById("shirtColor");

/* =========================
   SHIRT TYPE (DA URL)
========================= */
const params = new URLSearchParams(window.location.search);
const shirtType = params.get("type") || "white";

/* =========================
   IMPOSTAZIONE MAGLIA
========================= */
let shirtImageSrc = "";

/* logica tipo maglia */
if (shirtType === "color") {
  // maglia colorabile (base bianca)
  shirtImageSrc = "img/tshirt-base.png";

  shirtColorInput.style.display = "block";
  shirtColorInput.disabled = false;

  tshirt.style.backgroundColor = "#ffffff";

} else if (shirtType === "black") {
  // maglia nera
  shirtImageSrc = "img/tshirt-black.png";

  shirtColorInput.style.display = "none";
  shirtColorInput.disabled = true;

  tshirt.style.backgroundColor = "transparent";

} else {
  // maglia bianca
  shirtImageSrc = "immagini/shirts/tshirt-bianca.png";

  shirtColorInput.style.display = "none";
  shirtColorInput.disabled = true;

  tshirt.style.backgroundColor = "transparent";
}

/* carica immagine maglietta */
tshirtImage.src = shirtImageSrc;

/* =========================
   CAMBIO COLORE (SOLO COLOR)
========================= */
shirtColorInput.addEventListener("input", (e) => {
  if (shirtType !== "color") return; // 🔒 BLOCCO HARD
  tshirt.style.backgroundColor = e.target.value;
});

/* =========================
   UPLOAD LOGO
========================= */
document.getElementById("upload").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  logo.src = URL.createObjectURL(file);
  logo.classList.remove("hidden");
});

/* =========================
   TESTO
========================= */
document.getElementById("textInput").addEventListener("input", (e) => {
  text.textContent = e.target.value;
  text.classList.remove("hidden");
});

document.getElementById("textColor").addEventListener("input", (e) => {
  text.style.color = e.target.value;
});

/* =========================
   CENTRA
========================= */
document.getElementById("center").addEventListener("click", () => {
  [logo, text].forEach((el) => {
    el.style.top = "45%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%, -50%)";
  });
});

/* =========================
   DRAG & DROP (MOUSE + TOUCH)
========================= */
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
  el.addEventListener("mousedown", (e) => {
    startDrag(e.clientX, e.clientY);
  });

  document.addEventListener("mousemove", (e) => {
    drag(e.clientX, e.clientY);
  });

  document.addEventListener("mouseup", stopDrag);

  /* TOUCH */
  el.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      startDrag(t.clientX, t.clientY);
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      drag(t.clientX, t.clientY);
    },
    { passive: true }
  );

  document.addEventListener("touchend", stopDrag);
}

/* =========================
   ATTIVA DRAG
========================= */
makeDraggable(logo);
makeDraggable(text);
