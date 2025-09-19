document.addEventListener('DOMContentLoaded', () => {
    // Welcome message
    setTimeout(() => {
        alert('Welcome to my portfolio!');
    }, 1000);

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        hamburger.classList.toggle('is-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
            hamburger.classList.remove('is-active');
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            hamburger.classList.remove('is-active');
        });
    });
});