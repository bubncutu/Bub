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
