import gsap from 'gsap';

export const initHeroAnimations = (containerRef) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initial states to prevent layout shifts/flashes
    // Use opacity 0 directly in Tailwind classes to prevent FOUC, GSAP just handles the transition.
    
    if (prefersReducedMotion) {
        gsap.set('[data-animate]', { opacity: 1, y: 0 });
        return () => {}; // empty cleanup
    }

    let cleanupHandlers = [];

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({ 
            defaults: { 
                ease: "cubic-bezier(.22,.61,.36,1)", // Apple-like easing
                duration: 0.6
            } 
        });

        // Strict Budget: Max 3 simultaneous animations, max 700ms duration.
        tl.to(
            '[data-animate="content"]',
            { y: 0, opacity: 1, duration: 0.7 }
        )
        .to(
            '[data-animate="avatar"]',
            { y: 0, opacity: 1, duration: 0.7 },
            "-=0.5"
        )
        .to(
            '[data-animate="stats"]',
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
            "-=0.5"
        )
        .to(
            '[data-animate="dock"]',
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.4"
        );

        // --- Interactive Name Hover ---
        const letters = gsap.utils.toArray('.interactive-letter');
        letters.forEach((letter) => {
            const enter = () => {
                gsap.to(letter, {
                    scale: 1.3,
                    color: '#D91E2A',
                    duration: 0.3,
                    ease: "back.out(2)",
                    overwrite: true
                });
            };
            const leave = () => {
                gsap.to(letter, {
                    scale: 1,
                    color: 'inherit',
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: true
                });
            };
            
            letter.addEventListener('mouseenter', enter);
            letter.addEventListener('mouseleave', leave);
            
            cleanupHandlers.push(() => {
                letter.removeEventListener('mouseenter', enter);
                letter.removeEventListener('mouseleave', leave);
            });
        });

    }, containerRef);

    return () => {
        cleanupHandlers.forEach(cleanup => cleanup());
        ctx.revert();
    };
};
