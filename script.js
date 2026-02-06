// ========================
// DOM ELEMENTS
// ========================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const header = document.querySelector('.header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbar = document.querySelector('.navbar');

// ========================
// MOBILE MENU TOGGLE
// ========================
mobileMenuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    
    if (navbar.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navbar.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});

// ========================
// SCROLL DETECTION
// ========================
window.addEventListener('scroll', () => {
    // Header scroll effect
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active section highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
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

// ========================
// SMOOTH SCROLLING
// ========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.skill, .project, .contact-card, .stat, .value-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================
// SKILL BARS ANIMATION
// ========================
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ========================
// TYPING EFFECT FOR HOME
// ========================
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const originalText = typingText.textContent;
    const words = ['Magshimist', 'Developer', 'Programmer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(() => { isDeleting = true; }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(type, typingSpeed);
    }
    
    // Start typing effect after 1 second
    setTimeout(type, 1000);
}

// ========================
// STATS COUNTER ANIMATION
// ========================
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = target.textContent;
            const numValue = parseInt(finalValue.match(/\d+/)[0]);
            const suffix = finalValue.replace(numValue, '');
            
            let current = 0;
            const increment = numValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    target.textContent = numValue + suffix;
                    clearInterval(timer);
                } else {
                    target.textContent = Math.floor(current) + suffix;
                }
            }, 30);
            
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ========================
// CURSOR EFFECT (OPTIONAL)
// ========================
// Uncomment this section if you want a custom cursor effect
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

const links = document.querySelectorAll('a, button, .btn');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});
*/

// ========================
// LOADING ANIMATION
// ========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================
// CONSOLE MESSAGE
// ========================
console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #00abf0;');
console.log('%cWelcome to my portfolio! Feel free to explore the code.', 'font-size: 14px; color: #666;');
console.log('%c- Uri Austin', 'font-size: 14px; font-style: italic; color: #999;');
