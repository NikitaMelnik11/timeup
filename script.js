document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        burger.classList.toggle('toggle');
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Car Slider
    const slides = document.querySelectorAll('.car-slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;

    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

    // Initialize first slide
    showSlide(0);

    // Auto-advance slides
    setInterval(() => showSlide(currentSlide + 1), 5000);

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.experience-item').forEach(item => {
        gsap.from(item, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Animate form inputs on focus
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(form);
        console.log('Form submitted with data:', Object.fromEntries(formData));
        
        // Show a luxurious thank you message
        const thankYouMessage = document.createElement('div');
        thankYouMessage.innerHTML = `
            <div class="thank-you-message">
                <h3>Thank You for Your Interest</h3>
                <p>Our exclusive client relations team will be in touch with you shortly.</p>
            </div>
        `;
        thankYouMessage.style.position = 'fixed';
        thankYouMessage.style.top = '50%';
        thankYouMessage.style.left = '50%';
        thankYouMessage.style.transform = 'translate(-50%, -50%)';
        thankYouMessage.style.background = 'rgba(10, 10, 10, 0.9)';
        thankYouMessage.style.color = '#f8f8f8';
        thankYouMessage.style.padding = '2rem';
        thankYouMessage.style.borderRadius = '10px';
        thankYouMessage.style.textAlign = 'center';
        thankYouMessage.style.zIndex = '1000';

        document.body.appendChild(thankYouMessage);

        gsap.from(thankYouMessage, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: "power2.out"
        });

        setTimeout(() => {
            gsap.to(thankYouMessage, {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    thankYouMessage.remove();
                    form.reset();
                }
            });
        }, 3000);
    });

    // Cursor effect
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.classList.add('expand'));
    document.addEventListener('mouseup', () => cursor.classList.remove('expand'));
});

// Add this to your CSS
const style = document.createElement('style');
style.textContent = `
    .cursor {
        width: 20px;
        height: 20px;
        border: 2px solid var(--accent-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        transition: all 0.3s ease;
        transition-property: background, transform;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
    .cursor.expand {
        transform: translate(-50%, -50%) scale(2);
        background: var(--accent-color);
    }
`;
document.head.appendChild(style);