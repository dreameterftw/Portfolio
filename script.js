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
});
