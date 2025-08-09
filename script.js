// Mobile menu toggle
const navLinks = document.querySelector(".nav-links");
const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// Contact form submission (demo only)
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thanks for your message! I’ll get back to you soon.");
});

// Scroll reveal animations (repeat every time)
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active"); // Show animation
        } else {
            entry.target.classList.remove("active"); // Reset when out of view
        }
    });
}, { threshold: 0.2 }); // Trigger when 20% of element is visible

reveals.forEach(el => revealOnScroll.observe(el));
