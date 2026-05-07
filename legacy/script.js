const canvas = document.querySelector("#starfield");
const ctx = canvas.getContext("2d");
const cursor = document.querySelector(".cursor");
const scrollMeter = document.querySelector(".scroll-meter");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let width = 0;
let height = 0;
let particles = [];
let pointer = { x: -9999, y: -9999 };

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(130, Math.floor((width * height) / 12000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.32,
    vy: (Math.random() - 0.5) * 0.32,
    r: Math.random() * 1.5 + 0.4,
  }));
}

function drawStarfield() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(245, 241, 232, 0.72)";

  for (const particle of particles) {
    if (!prefersReducedMotion) {
      particle.x += particle.vx;
      particle.y += particle.vy;
    }

    if (particle.x < 0 || particle.x > width) particle.vx *= -1;
    if (particle.y < 0 || particle.y > height) particle.vy *= -1;

    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < particles.length; i += 1) {
    for (let j = i + 1; j < particles.length; j += 1) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 118) {
        ctx.strokeStyle = `rgba(66, 245, 215, ${0.12 * (1 - distance / 118)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    const particle = particles[i];
    const pdx = particle.x - pointer.x;
    const pdy = particle.y - pointer.y;
    const pointerDistance = Math.hypot(pdx, pdy);
    if (pointerDistance < 190) {
      ctx.strokeStyle = `rgba(201, 255, 53, ${0.28 * (1 - pointerDistance / 190)})`;
      ctx.beginPath();
      ctx.moveTo(particle.x, particle.y);
      ctx.lineTo(pointer.x, pointer.y);
      ctx.stroke();
    }
  }

  requestAnimationFrame(drawStarfield);
}

function updateScrollMeter() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollMeter.style.width = `${progress * 100}%`;
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 5, 4) * 70}ms`;
    observer.observe(element);
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter");
  const articles = document.querySelectorAll(".article-card, a.article-card");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      articles.forEach((article) => {
        const shouldShow = filter === "all" || article.dataset.category === filter;
        article.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

function setupTerminalTyping() {
  const terminal = document.querySelector(".terminal-body");
  if (!terminal) return;

  const lines = terminal.querySelectorAll("p");
  lines.forEach((line) => { line.style.opacity = "0"; line.style.transform = "translateY(6px)"; });

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        lines.forEach((line, i) => {
          setTimeout(() => {
            line.style.transition = "opacity 400ms ease, transform 400ms ease";
            line.style.opacity = "1";
            line.style.transform = "translateY(0)";
          }, i * 80);
        });
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.2 });

  observer.observe(terminal);
}

function setupPointerEffects() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!canHover) return;

  document.body.classList.add("no-cursor");

  window.addEventListener("pointermove", (event) => {
    pointer = { x: event.clientX, y: event.clientY };
    cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("pointerenter", () => cursor.classList.add("is-active"));
    element.addEventListener("pointerleave", () => cursor.classList.remove("is-active"));
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

function setupTilt() {
  document.querySelectorAll(".tilt").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", updateScrollMeter, { passive: true });

resizeCanvas();
drawStarfield();
updateScrollMeter();
setupReveal();
setupFilters();
setupTerminalTyping();
setupPointerEffects();
setupTilt();
