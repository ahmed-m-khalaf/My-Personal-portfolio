/**
 * GSAP Shared Utilities
 * ─────────────────────
 * Centralized animation helpers with:
 * - Reduced motion detection
 * - Mobile-aware ScrollTrigger.matchMedia
 * - GPU-only property enforcement
 * - Proper cleanup patterns
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───
export const BREAKPOINTS = {
    mobile: '(max-width: 767px)',
    desktop: '(min-width: 768px)',
};

export const EASE = {
    apple: 'cubic-bezier(.22,.61,.36,1)',
    smooth: 'power3.out',
    elastic: 'back.out(1.7)',
    snappy: 'power4.out',
};

// ─── Reduced Motion Check ───
export const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Parallax Helper ───
export const createParallax = (element, { yMobile = 0, yDesktop = -30, trigger, scrub = 1 } = {}) => {
    if (prefersReducedMotion() || !element) return;

    ScrollTrigger.matchMedia({
        [BREAKPOINTS.mobile]: () => {
            if (yMobile !== 0) {
                gsap.to(element, {
                    y: yMobile,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: trigger || element,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub,
                    },
                });
            }
        },
        [BREAKPOINTS.desktop]: () => {
            gsap.to(element, {
                y: yDesktop,
                ease: 'none',
                scrollTrigger: {
                    trigger: trigger || element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub,
                },
            });
        },
    });
};

// ─── Staggered Reveal (clipPath or y+opacity based on device) ───
export const createStaggerReveal = (elements, { trigger, startY = 40, duration = 0.7, stagger = 0.1 } = {}) => {
    if (prefersReducedMotion() || !elements) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
    }

    ScrollTrigger.matchMedia({
        [BREAKPOINTS.desktop]: () => {
            gsap.fromTo(elements,
                { 
                    opacity: 0, 
                    y: startY, 
                    scale: 0.97,
                    willChange: 'transform, opacity' 
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration,
                    stagger,
                    ease: EASE.smooth,
                    scrollTrigger: {
                        trigger,
                        start: 'top 82%',
                        toggleActions: 'play none none reverse',
                    },
                    onComplete: () => gsap.set(elements, { willChange: 'auto' }),
                }
            );
        },
        [BREAKPOINTS.mobile]: () => {
            // Simpler animation on mobile for performance
            gsap.fromTo(elements,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: stagger * 0.6,
                    ease: EASE.smooth,
                    scrollTrigger: {
                        trigger,
                        start: 'top 90%',
                    },
                }
            );
        },
    });
};
