window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 500);
});

/**
 * Used for Unlocking Photos section
 */
function unlock() {
  const value = document.getElementById("passwordInput").value.toLowerCase();

  if (value === "bub" || value === "boo" || value === "bujji") {
    sessionStorage.setItem("unlocked", "true");
    window.location.href = "./pages/photos.html";
  } else {
    document.getElementById("error").classList.remove("hidden");
  }
}
