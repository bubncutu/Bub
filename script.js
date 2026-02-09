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
