const images = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let current = 0;

function showLightbox(index) {
  current = index;
  lightboxImg.src = images[current].src;
  lightbox.style.display = "flex";
}

function closeLightbox() {
  lightbox.style.display = "none";
}

function nextImage() {
  current = (current + 1) % images.length;
  lightboxImg.src = images[current].src;
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  lightboxImg.src = images[current].src;
}

images.forEach((img, i) => {
  img.addEventListener("click", () => showLightbox(i));
});

document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }
});
