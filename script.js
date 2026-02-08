const canvas = document.getElementById("shirtCanvas");
const ctx = canvas.getContext("2d");

/* =========================
   SAFETY CHECK
========================= */
if (!canvas || !ctx) {
  console.error("Canvas non trovato");
}

/* =========================
   DEVICE DETECTION (ROBUSTA)
========================= */
const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* =========================
   CANVAS SETUP
========================= */
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

/* =========================
   IMMAGINI
========================= */
const shirtSources = [
  "customize/immagini/shirt/tshirt-(2).png",
  "customize/immagini/shirt/tshirt-(3).png",
  "customize/immagini/shirt/tshirt-(4).png",
  "customize/immagini/shirt/tshirt-(5).png",
  "customize/immagini/shirt/tshirt-(6).png",
  "customize/immagini/shirt/tshirt-(7).png",
];

const shirtImages = shirtSources.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

/* =========================
   OGGETTI ANIMATI
========================= */
const shirts = [];
let SHIRT_COUNT = isMobile ? 5 : 12;

function createShirts() {
  shirts.length = 0;
  SHIRT_COUNT = window.matchMedia("(max-width: 768px)").matches ? 5 : 12;

  for (let i = 0; i < SHIRT_COUNT; i++) {
    const img = shirtImages[Math.floor(Math.random() * shirtImages.length)];

    shirts.push({
      img,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: SHIRT_COUNT === 5 ? 55 : 80,
      speed: SHIRT_COUNT === 5
        ? 0.35 + Math.random() * 0.4
        : 0.7 + Math.random()
    });
  }
}

/* =========================
   LOOP ANIMAZIONE (DELTA TIME)
========================= */
let animationId = null;
let lastTime = null;

function animate(time) {
  if (!lastTime) lastTime = time;
  const delta = (time - lastTime) / 16.67;
  lastTime = time;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shirts.forEach(s => {
    if (!s.img.complete) return;

    s.y += s.speed * delta;

    if (s.y > canvas.height + 150) {
      s.y = -200;
      s.x = Math.random() * canvas.width;
    }

    ctx.drawImage(
      s.img,
      s.x,
      s.y,
      s.size,
      s.size * 1.25
    );
  });

  animationId = requestAnimationFrame(animate);
}

/* =========================
   START SICURO
========================= */
Promise.all(
  shirtImages.map(
    img =>
      new Promise(resolve => {
        img.onload = resolve;
      })
  )
).then(() => {
  createShirts();
  animationId = requestAnimationFrame(animate);
});

/* =========================
   VISIBILITY FIX
========================= */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
    animationId = null;
    lastTime = null;
  } else if (!animationId) {
    animationId = requestAnimationFrame(animate);
  }
});

/* =========================
   RESIZE / BREAKPOINT CHANGE
========================= */
window.addEventListener("resize", () => {
  resizeCanvas();
  createShirts();
  lastTime = null;
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");

  if (!hamburger || !nav) {
    console.error("Hamburger o nav non trovati");
    return;
  }

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  /* chiude il menu cliccando un link */
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
    });
  });
});
