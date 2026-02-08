const canvas = document.getElementById("shirtCanvas");
const ctx = canvas.getContext("2d");

/* =========================
   MOBILE DETECTION
========================= */
const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

/* =========================
   CANVAS SETUP (SAFE)
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
const SHIRT_COUNT = isMobile ? 5 : 12;

function createShirts() {
  shirts.length = 0;

  for (let i = 0; i < SHIRT_COUNT; i++) {
    const img =
      shirtImages[Math.floor(Math.random() * shirtImages.length)];

    shirts.push({
      img,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: isMobile ? 55 : 80,
      speed: isMobile ? 0.25 + Math.random() * 0.4 : 0.5 + Math.random()
    });
  }
}

/* =========================
   LOOP ANIMAZIONE (SAFE)
========================= */
let animationId = null;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shirts.forEach(s => {
    if (!s.img.complete) return;

    ctx.drawImage(
      s.img,
      s.x,
      s.y,
      s.size,
      s.size * 1.25
    );

    s.y += s.speed;

    if (s.y > canvas.height + 100) {
      s.y = -150;
      s.x = Math.random() * canvas.width;
    }
  });

  animationId = requestAnimationFrame(animate);
}

/* =========================
   START DOPO LOAD
========================= */
Promise.all(
  shirtImages.map(img => new Promise(resolve => {
    img.onload = resolve;
  }))
).then(() => {
  createShirts();
  animate();
});

/* =========================
   VISIBILITY FIX (MOBILE)
========================= */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    cancelAnimationFrame(animationId);
  } else {
    animate();
  }
});

/* =========================
   RESIZE / ORIENTATION
========================= */
window.addEventListener("resize", () => {
  resizeCanvas();
  createShirts();
});
