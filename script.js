// Load navigation
async function loadNav(isHome = true) {
  try {
    const response = isHome
      ? await fetch("./components/navigation.html")
      : await fetch("../components/navigation.html");
    if (response.ok) {
      const html = await response.text();
      document.getElementById("nav-container").innerHTML = html;
    }
  } catch (error) {
    console.error("Error loading navigation:", error);
  }
}

// Load nav when page loads based on location
if (window.location.href.includes("pages")) {
  document.addEventListener("DOMContentLoaded", loadNav(false));
} else {
  document.addEventListener("DOMContentLoaded", loadNav);
}

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 0);
});

/**
 * Used for Unlocking Photos section
 */
function unlock() {
  const value = document.getElementById("passwordInput").value.toLowerCase();

  if (value === "bub" || value === "boo" || value === "bujji") {
    sessionStorage.setItem("unlocked", "true");
    window.location.href = "./pages/memories.html";
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
}

// Counter animation on scroll
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for scroll detection
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".counter");
      counters.forEach((counter) => {
        if (!counter.classList.contains("animated")) {
          counter.classList.add("animated");
          animateCounter(counter);
        }
      });
      // Optional: Stop observing after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe the stats section
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(
    ".grid.grid-cols-2.md\\:grid-cols-4",
  );
  if (statsSection) {
    observer.observe(statsSection);
  }
});

// Animation JS

// Fade in sections on scroll
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  },
);

// Observe all fade-in sections
document.addEventListener("DOMContentLoaded", () => {
  const fadeInSections = document.querySelectorAll(".fade-in-section");
  fadeInSections.forEach((section) => {
    fadeInObserver.observe(section);
  });
});








// --- Dreamy Star Canvas Animation ---
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("star-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let width, height;
    let stars = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    }

    function initStars() {
        stars = [];
        const numStars = Math.floor((width * height) / 3000); // Responsive star count
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                speedY: Math.random() * 0.3 + 0.1,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                twinkleDir: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);
        
        stars.forEach(star => {
            // Twinkle logic
            star.opacity += star.twinkleSpeed * star.twinkleDir;
            if (star.opacity >= 1) star.twinkleDir = -1;
            else if (star.opacity <= 0.2) star.twinkleDir = 1;

            // Move upward logic
            star.y -= star.speedY;
            if (star.y < 0) {
                star.y = height;
                star.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(drawStars);
    }

    window.addEventListener("resize", resize);
    resize();
    drawStars();
});