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
            entry.target.classList.add("active");
        } else {
            entry.target.classList.remove("active");
        }
    });
}, { threshold: 0.2 });

reveals.forEach(el => revealOnScroll.observe(el));
