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


/* =========================================================
   DATA-DRIVEN GALLERY
   To add a memory: drop the file in /assets and add ONE line
   below. Order here = order on the page.
   - src:     file name inside /assets (image or video)
   - type:    "image" or "video"
   - caption: the little text under the picture
   - poster:  (video only) the thumbnail image shown before play
   ========================================================= */
const MEMORIES = [
  { src: "booboos-view.jpg",           type: "image", caption: "No color, just bubu ˚❀" },
  { src: "bubs-with-pout.jpg",         type: "image", caption: "Booboo's favourite day 🥰️" },
  { src: "gym-bag.jpg",                type: "image", caption: "Motivated by bub" },
  { src: "my-pretty-princess.jpg",     type: "image", caption: "Just had to be clicked" },
  { src: "bubs-holding-hands.jpg",     type: "image", caption: "Candlelight Concert 🎵" },
  { src: "bubu-playing.jpg",           type: "image", caption: "Locked in 🎯" },
  { src: "bubs-together.jpg",          type: "image", caption: "In black" },
  { src: "artist-who-got-judged.mp4",  type: "video", caption: "Artist who got j̶u̶d̶g̶e̶d̶ observed", poster: "artist-who-got-judged.jpg" },
  { src: "bubs-in-lonavala.jpg",       type: "image", caption: "Our first trip 🚗🍓️" },
  { src: "boo-sunflower.jpg",          type: "image", caption: "Sunflower for boo 🌻️" },
  { src: "specially-clicked.jpg",      type: "image", caption: "Specially Clicked ⌞ ◡̈ ⌝" },
  { src: "bubs-portrait.jpg",          type: "image", caption: "Bubs 🫧" },
  { src: "investments.jpg",            type: "image", caption: "Investments 💷️" },
  { src: "goadu-shaved.jpg",           type: "image", caption: "Goadu Shaved 👼️" },
  { src: "sobermati-mornings.jpg",     type: "image", caption: "Sobermati Mornings 🌞️" },
  { src: "arai.jpg",                   type: "image", caption: "Arai₊⊹" },
  { src: "invested-look.jpg",          type: "image", caption: "Invested ₊⊹" },
];

// escape captions so quotes/symbols never break the markup
function escAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderGallery(list, mountId, assetPrefix) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  const prefix = assetPrefix || "../assets/";
  mount.innerHTML = list.map((m) => {
    const cap = escAttr(m.caption || "");
    if (m.type === "video") {
      const poster = m.poster ? prefix + m.poster : "";
      return `
        <div class="gallery-item cursor-pointer relative"
             onclick="openLightbox('${prefix}${m.src}', 'video')">
          <img src="${poster}" alt="${cap}" class="rounded-lg" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="bg-black/50 rounded-full p-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            </div>
          </div>
          <p class="text-sm text-neutral-400 mt-2">${cap}</p>
        </div>`;
    }
    return `
      <div class="gallery-item cursor-pointer"
           onclick="openLightbox('${prefix}${m.src}', 'image')">
        <img src="${prefix}${m.src}" alt="${cap}"
             class="rounded-lg hover:scale-105 transition-transform duration-300" />
        <p class="text-sm text-neutral-400 mt-2">${cap}</p>
      </div>`;
  }).join("");
}

// render once the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  renderGallery(MEMORIES, "gallery-mount");
});