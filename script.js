/* ╔══════════════════════════════════════════════════════════╗
   ║  Aryan Rane — Portfolio Scripts                         ║
   ╚══════════════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Ambient Particles & Petals ───
    const createAmbient = () => {
        const petalsContainer = document.getElementById('petals-container');
        const lightContainer = document.getElementById('light-particles');

        // Create Petals
        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.style.left = (Math.random() * 120 - 10) + '%';
            petal.style.top = (Math.random() * 20 - 10) + '%';
            petal.style.width = (8 + Math.random() * 8) + 'px';
            petal.style.height = petal.style.width;
            petal.style.animationDuration = (10 + Math.random() * 15) + 's';
            petal.style.animationDelay = (Math.random() * 20) + 's';
            petalsContainer.appendChild(petal);
        }

        // Create Light Particles
        for (let i = 0; i < 25; i++) {
            const pt = document.createElement('div');
            pt.classList.add('light-pt');
            pt.style.left = Math.random() * 100 + '%';
            pt.style.top = Math.random() * 100 + '%';
            const size = (2 + Math.random() * 4) + 'px';
            pt.style.width = size;
            pt.style.height = size;
            pt.style.animationDuration = (5 + Math.random() * 10) + 's';
            pt.style.animationDelay = (Math.random() * 5) + 's';
            lightContainer.appendChild(pt);
        }
    };
    createAmbient();

    // ─── Typing Effect ───
    const typingElement = document.getElementById('typing-text');
    const textToType = "I build calm experiences with code.";
    let charIndex = 0;

    const type = () => {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 60 + Math.random() * 40);
        }
    };
    setTimeout(type, 1000); // Start after card entrance

    // ─── Mouse Move Tilt (Subtle depth shift) ───
    const hero = document.getElementById('hero');
    const heroBg = document.querySelector('.hero-bg img');
    
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20; // max 10px shift
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        heroBg.style.transform = `scale(1.05) translate(${xPos}px, ${yPos}px)`;
    });

    // ─── Navbar scroll effect ───
    const header = document.getElementById('main-header');
    const onScroll = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ─── Intersection Observer for fade-up & skill bars ───
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };

    // Fade-up animations
    const fadeTargets = document.querySelectorAll(
        '.about-card, .skill-card, .project-card, .stat-item, .about-text h2, .about-text p, .section-label, .section-title, .contact-title, .contact-subtitle'
    );

    fadeTargets.forEach(el => el.classList.add('fade-up'));

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger delay based on sibling position
                const siblings = entry.target.parentElement.children;
                let idx = Array.from(siblings).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeTargets.forEach(el => fadeObserver.observe(el));

    // Skill bar fill animation
    const skillCards = document.querySelectorAll('.skill-card');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => skillObserver.observe(card));

    // ─── Smooth scroll for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });



});
