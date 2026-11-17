
/* =========================================
   MORROW & MUG
   JavaScript Functionality
========================================= */

// 1. DARK / LIGHT MODE

const themeToggle = document.getElementById("theme-toggle");


// Check previously saved theme
const savedTheme = localStorage.getItem("cafe-theme");


// Apply saved theme when page loads
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}


// Update toggle button icon
function updateThemeIcon() {

    if (document.body.classList.contains("dark-mode")) {
        themeToggle.textContent = "☀";
        themeToggle.setAttribute("aria-pressed", "true");
    } else {
        themeToggle.textContent = "☾";
        themeToggle.setAttribute("aria-pressed", "false");
    }

}


// Set correct icon initially
if (themeToggle) {
    updateThemeIcon();
}


// Toggle theme when button is clicked
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        // Check current theme
        const currentTheme =
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light";

        // Save preference
        localStorage.setItem("cafe-theme", currentTheme);

        // Update icon
        updateThemeIcon();

    });

}

/* =========================================
   IMAGE GALLERY LIGHTBOX
========================================= */

const galleryImages = document.querySelectorAll("[data-lightbox]");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-image");

const closeButton = document.getElementById("lightbox-close");

const prevButton = document.getElementById("lightbox-prev");

const nextButton = document.getElementById("lightbox-next");

let currentImageIndex = 0;


// Open lightbox
function openLightbox(index) {

    currentImageIndex = index;

    lightboxImage.src = galleryImages[index].src;

    lightboxImage.alt = galleryImages[index].alt;

    lightbox.classList.add("active");

    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

}


// Close lightbox
function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// Show next image
function showNextImage() {

    currentImageIndex =
        (currentImageIndex + 1) % galleryImages.length;

    openLightbox(currentImageIndex);

}


// Show previous image
function showPreviousImage() {

    currentImageIndex =
        (currentImageIndex - 1 + galleryImages.length)
        % galleryImages.length;

    openLightbox(currentImageIndex);

}


// Attach click events to images
galleryImages.forEach((image, index) => {

    image.addEventListener("click", function () {

        openLightbox(index);

    });

});


// Button events
if (closeButton) {
    closeButton.addEventListener("click", closeLightbox);
}

if (nextButton) {
    nextButton.addEventListener("click", showNextImage);
}

if (prevButton) {
    prevButton.addEventListener("click", showPreviousImage);
}


// Close when clicking outside the image
if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


// Keyboard controls
document.addEventListener("keydown", function (event) {

    if (!lightbox || !lightbox.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

});
