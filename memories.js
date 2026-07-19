let currentMedia = [];
let currentIndex = 0;

// Build the ordered media list from MEMORIES (set after MEMORIES is defined below).
// openLightbox is called with a src+type from the gallery; we look up its index
// so the arrows can page through everything.
function lightboxRender() {
  const content = document.getElementById("lightbox-content");
  const item = currentMedia[currentIndex];
  if (!item) return;
  const prefix = "../assets/";
  if (item.type === "image") {
    content.innerHTML = `<img src="${prefix}${item.src}" class="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg mx-auto" alt="Memory">`;
  } else {
    content.innerHTML = `<video src="${prefix}${item.src}" controls autoplay class="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg mx-auto"></video>`;
  }
}

function openLightbox(src, type) {
  const lightbox = document.getElementById("lightbox");
  // resolve which memory was clicked (match by filename)
  const fname = src.split("/").pop();
  currentMedia = (typeof MEMORIES !== "undefined") ? MEMORIES : [{ src: fname, type }];
  const idx = currentMedia.findIndex((m) => m.src === fname);
  currentIndex = idx >= 0 ? idx : 0;

  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  lightboxRender();
}

function navigateLightbox(dir) {
  if (!currentMedia.length) return;
  currentIndex = (currentIndex + dir + currentMedia.length) % currentMedia.length;
  lightboxRender();
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
  document.body.style.overflow = ""; // Restore scrolling
  document.getElementById("lightbox-content").innerHTML = ""; // stop any playing video
}

// Arrow key navigation
document.addEventListener("keydown", (e) => {
  const lb = document.getElementById("lightbox");
  if (!lb || lb.classList.contains("hidden")) return;
  if (e.key === "ArrowLeft") navigateLightbox(-1);
  if (e.key === "ArrowRight") navigateLightbox(1);
});

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
  { src: "aesthetic-aesthetic.jpg",         type: "image", caption: "❀˚Aesthetic Aesthetic ˚❀" },
  { src: "my-angel.jpg",                    type: "image", caption: "My Angel ִֶָ🪽་༘" },
  { src: "gym-bubs.jpg",                    type: "image", caption: "Gym bubs! ⚡︎⚡︎" },
  { src: "bubu-getting-the-liscence.mp4",   type: "video", caption: "Getting that liscence ˚❀" , poster:"bubu-driving.png" },
  { src: "booboos-view.jpg",                type: "image", caption: "No color, just my princess ❀" },
  { src: "my-pretty-princess.jpg",          type: "image", caption: "Just had to be clicked" },
  { src: "bubu-playing.jpg",                type: "image", caption: "Locked in 🎯" },
  { src: "my-cosmopolitan.jpg",             type: "image", caption: "My cosmopolitan...🍸" },
  { src: "valentine-sunflower.jpg",         type: "image", caption: "Sunflower with sunflower 🌻" },
  { src: "bubs-holding-hands.jpg",          type: "image", caption: "Candlelight Concert 🎵" },
  { src: "bubs-together.jpg",               type: "image", caption: "In black" },
  { src: "gym-bag.jpg",                     type: "image", caption: "Motivated by bub" },
  { src: "cherie.jpg",                      type: "image", caption: "B'day at Cherie 🥰️♡⟡" },
  { src: "artist-who-got-judged.mp4",       type: "video", caption: "Artist who got j̶u̶d̶g̶e̶d̶ observed", poster: "artist-who-got-judged.jpg" },
  { src: "bubs-in-lonavala.jpg",            type: "image", caption: "Our first trip 🚗🍓️" },
  { src: "boo-sunflower.jpg",               type: "image", caption: "Sunflower for boo 🌻️" },
  { src: "specially-clicked.jpg",           type: "image", caption: "Specially Clicked ⌞ ◡̈ ⌝" },
  { src: "bubs-portrait.jpg",               type: "image", caption: "Bubs 🫧" },
  { src: "investments.jpg",                 type: "image", caption: "Investments 💷️" },
  { src: "goadu-shaved.jpg",                type: "image", caption: "Goadu Shaved 👼️" },
  { src: "sobermati-mornings.jpg",          type: "image", caption: "Sobermati Mornings 🌞️" },
  { src: "arai.jpg",                        type: "image", caption: "Arai₊⊹" },
  { src: "invested-look.jpg",               type: "image", caption: "Invested ₊⊹" },
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
          <img src="${poster}" alt="${cap}" class="rounded-lg hover:scale-105 transition-transform duration-300" />
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