// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link is clicked
navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll Function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.room-card, .amenity-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    observer.observe(element);
});

// Add CSS animation classes
const style = document.createElement('style');
style.textContent = `
    .room-card.animate-in,
    .amenity-card.animate-in,
    .gallery-item.animate-in {
        animation: slideInUp 0.8s ease forwards;
    }

    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('.form-input');
        const name = inputs[0].value;
        const email = inputs[1].value;

        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'var(--accent-gold)';

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
}

// Enhanced Book Button Handlers
const bookButtons = document.querySelectorAll('.book-btn, .view-btn');
bookButtons.forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        if (this.classList.contains('view-btn')) {
            e.preventDefault();
        }
        const card = this.closest('.room-card');
        const roomName = card?.querySelector('h3')?.textContent || 'our room';

        // Create booking modal effect
        showBookingNotification(roomName);
    });
});

function showBookingNotification(roomName) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 2000;
        text-align: center;
        min-width: 300px;
        animation: popIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    // Create title
    const title = document.createElement('h3');
    title.textContent = 'Perfect Choice!';
    title.style.cssText = 'color: #0a0e27; margin-bottom: 1rem;';

    // Create message
    const message = document.createElement('p');
    message.style.cssText = 'color: #666; margin-bottom: 1.5rem;';
    message.textContent = `You selected the ${roomName}`;

    // Create subtext
    const subtext = document.createElement('p');
    subtext.style.cssText = 'color: #999; font-size: 0.9rem; margin-bottom: 2rem;';
    subtext.textContent = 'Our team will contact you shortly to confirm your reservation.';

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        background: #d4af37;
        color: #0a0e27;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 30px;
        cursor: pointer;
        font-weight: 600;
    `;
    closeBtn.onclick = () => {
        overlay.remove();
        notification.remove();
    };

    notification.appendChild(title);
    notification.appendChild(message);
    notification.appendChild(subtext);
    notification.appendChild(closeBtn);

    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1999;
        animation: fadeIn 0.3s ease;
    `;
    overlay.onclick = () => {
        overlay.remove();
        notification.remove();
    };

    document.body.appendChild(overlay);
    document.body.appendChild(notification);
}

// Add animation keyframes
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(animationStyle);

// Parallax scroll effect for hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrollY = window.scrollY;
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar?.style.boxShadow = 'none';
    }
});

// Counter animation for intro features
function animateCounters() {
    const counters = document.querySelectorAll('.feature-number');

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const finalValue = text.replace(/[^0-9]/g, '');

                if (finalValue) {
                    let current = 0;
                    const increment = Math.ceil(finalValue / 50);
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= finalValue) {
                            element.textContent = text;
                            clearInterval(interval);
                        } else {
                            const prefix = text.match(/[^0-9]/);
                            element.textContent = (prefix ? prefix[0] : '') + current;
                        }
                    }, 30);
                }
                counterObserver.unobserve(element);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));
}

animateCounters();

// Smooth animations on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const h3 = this.querySelector('h3');
        showGalleryModal(img.src, h3?.textContent);
    });
});

function showGalleryModal(imgSrc, title) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;

    // Create container for image and button
    const container = document.createElement('div');
    container.style.cssText = 'position: relative; max-width: 90vw; max-height: 90vh;';

    // Create image
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = title || 'Gallery image';
    img.style.cssText = 'width: 100%; height: auto; border-radius: 8px; max-height: 90vh; object-fit: contain;';

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    closeBtn.onclick = () => {
        modal.remove();
    };

    // Create title
    const titleEl = document.createElement('p');
    titleEl.textContent = title || '';
    titleEl.style.cssText = 'color: white; text-align: center; margin-top: 1rem; font-size: 1.2rem;';

    container.appendChild(img);
    container.appendChild(closeBtn);
    container.appendChild(titleEl);
    modal.appendChild(container);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
}
