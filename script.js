document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    navbarToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            smoothScroll(targetSection);
            setActiveLink(this);
        });
    });

    function smoothScroll(target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY + headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    function setActiveLink(selectedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        selectedLink.classList.add('active');
    }
});