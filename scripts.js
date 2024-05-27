// scripts.js

// Example function to highlight the active navigation link
document.addEventListener('index.html', function() {
    const navbarLinks = document.querySelectorAll('.navbar a');
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
