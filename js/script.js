
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

/* =========================================
   BOOKING FORM VALIDATION
========================================= */

const bookingForm = document.getElementById("booking-form");

if (bookingForm) {

    const successMessage = document.getElementById("form-success");

    const dateInput = document.getElementById("date");

    // Prevent selecting past dates
    const today = new Date();

    const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    dateInput.min = localToday;


    // Display error message
    function showError(inputId, message) {

        const input = document.getElementById(inputId);

        const error = document.getElementById(inputId + "-error");

        if (input) {
            input.classList.add("input-error");
            input.setAttribute("aria-invalid", "true");
        }

        if (error) {
            error.textContent = message;
        }

    }


    // Clear error message
    function clearError(inputId) {

        const input = document.getElementById(inputId);

        const error = document.getElementById(inputId + "-error");

        if (input) {
            input.classList.remove("input-error");
            input.setAttribute("aria-invalid", "false");
        }

        if (error) {
            error.textContent = "";
        }

    }


    // Remove errors while typing
    ["name", "email", "phone", "date", "time", "guests", "seating"]
        .forEach(id => {

            const input = document.getElementById(id);

            input.addEventListener("input", () => clearError(id));

            input.addEventListener("change", () => clearError(id));

        });


    // Form submission
    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        // Clear previous errors
        ["name", "email", "phone", "date", "time", "guests", "seating"]
            .forEach(clearError);

        successMessage.hidden = true;

        let isValid = true;


        // NAME VALIDATION
        const name = document.getElementById("name").value.trim();

        if (name.length < 2 || !/^[a-zA-Z\s'-]+$/.test(name)) {

            showError("name", "Please enter a valid name.");

            isValid = false;

        }


        // EMAIL VALIDATION
        const email = document.getElementById("email").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showError("email", "Please enter a valid email address.");

            isValid = false;

        }


        // PHONE VALIDATION
        const phone = document.getElementById("phone").value.trim();

        if (!/^[0-9]{10}$/.test(phone)) {

            showError("phone", "Enter a valid 10-digit mobile number.");

            isValid = false;

        }


        // DATE VALIDATION
        const date = dateInput.value;

        if (!date || date < localToday) {

            showError("date", "Please select today or a future date.");

            isValid = false;

        }


        // TIME VALIDATION
        const time = document.getElementById("time").value;

        if (!time || time < "08:00" || time > "23:00") {

            showError("time", "Choose a time between 8 AM and 11 PM.");

            isValid = false;

        }


        // GUEST VALIDATION
        const guests = Number(document.getElementById("guests").value);

        if (!Number.isInteger(guests) || guests < 1 || guests > 10) {

            showError("guests", "Choose between 1 and 10 guests.");

            isValid = false;

        }


        // SEATING VALIDATION
        const seating = document.getElementById("seating").value;

        if (!seating) {

            showError("seating", "Please select a seating preference.");

            isValid = false;

        }


        // STOP IF INVALID
        if (!isValid) {

            const firstError = bookingForm.querySelector(".input-error");

            if (firstError) {
                firstError.focus();
            }

            return;

        }


        // SUCCESS MESSAGE
        successMessage.hidden = false;

        successMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        // Reset form
        bookingForm.reset();

        // Restore minimum booking date
        dateInput.min = localToday;

    });

}
