document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader Logic ---
    const preloader = document.getElementById('preloader');
    // Listen for the 'load' event which fires after all assets (images, etc.) are loaded
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.classList.add('preloader-hidden');
        }
    });

    // --- Back to Top Button Logic ---
    const backToTopBtn = document.getElementById("back-to-top");

    const scrollFunction = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            if (backToTopBtn) backToTopBtn.style.display = "block";
        } else {
            if (backToTopBtn) backToTopBtn.style.display = "none";
        }
    };

    window.addEventListener('scroll', scrollFunction);

    // --- Intersection Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
            // To make animation re-trigger every time, uncomment the else block:
            // else {
            //     entry.target.classList.remove('show');
            // }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Mobile Navigation (Hamburger Menu) ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-list li a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            // Toggle the menu's visibility
            navMenu.classList.toggle('nav-active');
            // Toggle the icon between hamburger and close
            const icon = navToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Close menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('nav-active')) {
                navMenu.classList.remove('nav-active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Theme (Dark/Light Mode) Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark' && themeToggleBtn) {
            themeToggleBtn.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.getAttribute('data-theme') === 'dark') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                icon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    }
});