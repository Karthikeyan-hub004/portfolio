// Theme toggle functionality
const themeSwitch = document.getElementById('checkbox');
const body = document.body;

// Check for saved user preference, if any, on load of the website
const darkMode = localStorage.getItem('darkMode');

// If the user previously enabled dark mode, apply it to the body
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    themeSwitch.checked = true;
}

themeSwitch.addEventListener('change', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', null);
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    }
});