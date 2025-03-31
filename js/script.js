// DOM Elements
const header = document.getElementById('header');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('section');
const animatedElements = document.querySelectorAll('.project-card, .expertise-item, .skill-category, .achievement-item');

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    // Add scrolled class to header when scrolled
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Show or hide back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Check for animation when scrolling
    animateOnScroll();

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.8;
    
    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('animate');
        }
    });
}

// Initialize animations on page load
window.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        animateOnScroll();
        updateActiveNavLink();
    }, 100);
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            const formData = new FormData(this);
            
            // Simple form validation
            let isValid = true;
            formData.forEach((value, key) => {
                if (!value) isValid = false;
            });
            
            if (isValid) {
                // Success message - would typically be handled with actual form submission
                const button = this.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.textContent = 'Message Sent!';
                
                // Reset form
                this.reset();
                
                // Reset button text after delay
                setTimeout(() => {
                    button.textContent = originalText;
                }, 3000);
            }
        });
    }
});

// Preload profile image for faster display
function preloadImage(url) {
    const img = new Image();
    img.src = url;
}

// Preload the profile image
preloadImage('images/profile.jpg'); 