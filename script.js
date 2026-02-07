const canvas = document.getElementById("shirtCanvas");
const ctx = canvas.getContext("2d");

/* =========================
   DEVICE & CANVAS SETUP
========================= */

const isMobile = window.innerWidth < 768;
const SHIRT_COUNT = isMobile ? 8 : 15;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

/* =========================
   IMMAGINI MAGLIETTE
========================= */

const shirtSources = [
  "customize/immagini/shirt/tshirt-(2).png",
  "customize/immagini/shirt/tshirt-(3).png",
  "customize/immagini/shirt/tshirt-(4).png",
  "customize/immagini/shirt/tshirt-(5).png",
  "customize/immagini/shirt/tshirt-(6).png",
  "customize/immagini/shirt/tshirt-(7).png"
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

function createShirts() {
  shirts.length = 0;

  const baseSize = isMobile ? 55 : 80;

  for (let i = 0; i < SHIRT_COUNT; i++) {
    const img =
      shirtImages[Math.floor(Math.random() * shirtImages.length)];

    shirts.push({
      img,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: baseSize + Math.random() * 30,
      speed: isMobile
        ? 0.3 + Math.random() * 0.5
        : 0.4 + Math.random() * 0.8
    });
  }
}

/* =========================
   LOOP ANIMAZIONE
========================= */

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shirts.forEach(s => {
    if (!s.img.complete) return;

    ctx.drawImage(
      s.img,
      s.x,
      s.y,
      s.width,
      s.width * 1.25
    );

    s.y += s.speed;

    if (s.y > window.innerHeight + 150) {
      s.y = -200;
      s.x = Math.random() * window.innerWidth;
    }
  });

  requestAnimationFrame(draw);
}

/* =========================
   START DOPO LOAD IMMAGINI
========================= */

Promise.all(
  shirtImages.map(img => new Promise(resolve => {
    img.onload = resolve;
  }))
).then(() => {
  createShirts();
  draw();
});

/* =========================
   RESIZE & ORIENTATION
========================= */

window.addEventListener("resize", () => {
  resizeCanvas();
  createShirts();
});

const hamburger = document.getElementById("hamburger");
const nav = document.querySelector(".navbar nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("open");
});
