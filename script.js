// Interaction Observer for Scroll Anims
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Initialize Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('section, .bento-item, .project-card');
    reveals.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out)';
        revealObserver.observe(el);
    });

    // Add visible class style
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Simulation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'THINKING...';
        
        setTimeout(() => {
            submitBtn.textContent = 'MESSAGE SENT';
            submitBtn.style.background = '#00ff88';
            submitBtn.style.color = '#000';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// Mouse Follower Effect (Subtle)
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    const heroVisual = document.querySelector('.hero-visual img');
    if (heroVisual) {
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    }
});

// Image Upload Preview Logic
const setupImagePreview = (inputId, displayId) => {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);
    
    if (input && display) {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    display.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }
};

// Initialize Previews
setupImagePreview('profile-upload', 'profile-display');
setupImagePreview('c-upload', 'c-display');
setupImagePreview('python-upload', 'python-display');
