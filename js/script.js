
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
