let currentMedia = [];
let currentIndex = 0;

function openLightbox(src, type) {
  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightbox-content");

  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent scrolling

  if (type === "image") {
    content.innerHTML = `<img src="${src}" class="max-w-full max-h-full rounded-lg" alt="Memory">`;
  } else if (type === "video") {
    content.innerHTML = `<video src="${src}" controls class="max-w-full max-h-full rounded-lg" controls autoplay></video>`;
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
}

// Close on background click
document.getElementById("lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "lightbox") {
    closeLightbox();
  }
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/**
 * Password protection for memories page
 */
function unlockMemories() {
  const value = document.getElementById("memoryPassword").value.toLowerCase();

  if (value === "bub" || value === "boo" || value === "bujji") {
    // Hide modal
    document.getElementById("password-modal").classList.add("hidden");

    // Remove blur from content
    document.getElementById("app").classList.remove("blur-lg");

    // Save unlock state
    sessionStorage.setItem("memoriesUnlocked", "true");
  } else {
    // Show error
    document.getElementById("password-error").classList.remove("hidden");

    // Shake animation for wrong password
    const modal = document.querySelector("#password-modal > div");
    modal.classList.add("animate-shake");
    setTimeout(() => modal.classList.remove("animate-shake"), 500);
  }
}

// Allow Enter key to submit password
document.getElementById("memoryPassword")?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    unlockMemories();
  }
});

// Check if already unlocked in this session
window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("memoriesUnlocked") === "true") {
    document.getElementById("password-modal").classList.add("hidden");
    document.getElementById("app").classList.remove("blur-lg");
  } else {
    const modalDialog = document.querySelector(".modal-dialog");
    modalDialog.classList.remove("hidden");
  }
});
