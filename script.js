/* ╔══════════════════════════════════════════════════════════╗
   ║  Aryan Rane — Portfolio Scripts                          ║
   ║  Calm editorial — only what's necessary                  ║
   ╚══════════════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Mumbai time in nav ───
    const timeEl = document.getElementById('nav-time');
    const updateTime = () => {
        if (!timeEl) return;
        const t = new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Kolkata'
        });
        timeEl.textContent = `Mumbai · ${t}`;
    };
    updateTime();
    setInterval(updateTime, 30000);

    // ─── Footer year ───
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ─── Reveal-on-scroll for sections ───
    const revealEls = document.querySelectorAll(
        '.about-body p, .skill-card, .work-list li, .stat, .contact-link'
    );
    revealEls.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        el.style.transition =
            'opacity 0.8s cubic-bezier(0.2, 0.7, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1)';
    });

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, i * 60);
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    // ─── Header shadow on scroll ───
    const header = document.getElementById('main-header');
    const onScroll = () => {
        if (!header) return;
        if (window.scrollY > 8) {
            header.style.boxShadow = '0 1px 0 rgba(0,0,0,0.04)';
        } else {
            header.style.boxShadow = 'none';
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ─── Circular Text ───
    const circularEl = document.getElementById('circularText');
    if (circularEl) {
        const text = 'Get in touch · Available for work · ';
        const letters = Array.from(text);
        const radius = 58; // px — distance of letters from centre
        const cx = 70;     // half of wrapper width (140px)
        const cy = 70;     // half of wrapper height

        letters.forEach((letter, i) => {
            const angle = (360 / letters.length) * i - 90; // start from top
            const rad = (angle * Math.PI) / 180;
            const x = cx + radius * Math.cos(rad);
            const y = cy + radius * Math.sin(rad);

            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter;
            // Position: translate to (x, y) then rotate the letter to face outward
            span.style.transform =
                `translate(${x}px, ${y}px) rotate(${angle + 90}deg)`;
            span.style.marginLeft = '-0.3em'; // tighten spacing
            circularEl.appendChild(span);
        });

        // Speed up on hover, back to normal on leave
        circularEl.addEventListener('mouseenter', () => {
            circularEl.style.animationDuration = '4s';
        });
        circularEl.addEventListener('mouseleave', () => {
            circularEl.style.animationDuration = '18s';
        });
    }

});
