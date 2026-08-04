/**
 * useMagneticEffect
 * ─────────────────
 * Makes an element subtly follow the cursor when hovered.
 * GPU-only (transform), auto-cleans up listeners.
 * Disabled on mobile and when prefers-reduced-motion is set.
 */
import { useEffect } from 'react';
import gsap from 'gsap';

const useMagneticEffect = (ref, { strength = 0.3, ease = 'power3.out', duration = 0.4 } = {}) => {
    useEffect(() => {
        const el = ref?.current;
        if (!el) return;

        // Skip on mobile or reduced motion
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isMobile || reducedMotion) return;

        const xTo = gsap.quickTo(el, 'x', { duration, ease });
        const yTo = gsap.quickTo(el, 'y', { duration, ease });

        const handleMove = (e) => {
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;
            xTo(deltaX);
            yTo(deltaY);
        };

        const handleLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener('mousemove', handleMove);
        el.addEventListener('mouseleave', handleLeave);

        return () => {
            el.removeEventListener('mousemove', handleMove);
            el.removeEventListener('mouseleave', handleLeave);
            gsap.set(el, { x: 0, y: 0 });
        };
    }, [ref, strength, ease, duration]);
};

export default useMagneticEffect;
