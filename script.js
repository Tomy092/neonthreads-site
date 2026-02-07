const canvas = document.getElementById("shirtCanvas");
const ctx = canvas.getContext("2d");

/* DIMENSIONI CANVAS */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* IMMAGINI MAGLIETTE */
const shirtSources = [
  "customize/immagini/shirt/tshirt-(2).png",
  "customize/immagini/shirt/tshirt-(3).png",
  "customize/immagini/shirt/tshirt-(4).png",
  "customize/immagini/shirt/tshirt-(5).png",
  "customize/immagini/shirt/tshirt-(6).png",
  "customize/immagini/shirt/tshirt-(7).png",
];

const shirtImages = [];

/* PRELOAD IMMAGINI */
shirtSources.forEach(src => {
  const img = new Image();
  img.src = src;
  shirtImages.push(img);
});

/* OGGETTI ANIMATI */
const shirts = [];

for (let i = 0; i < 15; i++) {
  const img =
    shirtImages[Math.floor(Math.random() * shirtImages.length)];

  shirts.push({
    img: img,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 70 + Math.random() * 40,
    speed: 0.4 + Math.random() * 0.8
  });
}

/* LOOP ANIMAZIONE */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  shirts.forEach(s => {
    ctx.drawImage(
      s.img,
      s.x,
      s.y,
      s.width,
      s.width * 1.25
    );

    s.y += s.speed;

    if (s.y > canvas.height + 120) {
      s.y = -150;
      s.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(draw);
}

/* START */
draw();

/* RESIZE RESPONSIVE */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

