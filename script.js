document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const projects = document.querySelectorAll('.project');
    let currentProjectIndex = 0;

    // Function to highlight active section in navigation
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Function to show the project at the given index and hide others
    function showProject(index) {
        projects.forEach((project, idx) => {
            if (idx === index) {
                project.classList.add('active');
            } else {
                project.classList.remove('active');
            }
        });
    }

    // Show the first project initially
    showProject(currentProjectIndex);

    // Function to show the next project
    document.getElementById('nextProject').addEventListener('click', function () {
        projects[currentProjectIndex].classList.remove('active');
        currentProjectIndex = (currentProjectIndex + 1) % projects.length;
        projects[currentProjectIndex].classList.add('active');
    });

    // Function to show the previous project
    document.getElementById('prevProject').addEventListener('click', function () {
        projects[currentProjectIndex].classList.remove('active');
        currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
        projects[currentProjectIndex].classList.add('active');
    });
});
