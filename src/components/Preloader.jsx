import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const lineRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Slide preloader up
                    gsap.to(preloaderRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: 'power4.inOut',
                        onComplete: () => {
                            setIsVisible(false);
                            onComplete?.();
                        }
                    });
                }
            });

            // Logo appears with scale + blur
            tl.fromTo(
                logoRef.current,
                { scale: 0.5, opacity: 0, filter: 'blur(10px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power3.out' }
            );

            // Loading line fills
            tl.fromTo(
                lineRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
                '-=0.2'
            );

            // Logo pulses once
            tl.to(logoRef.current, {
                scale: 1.1,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });

        return () => ctx.revert();
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-abyss"
            aria-label="Loading"
        >
            {/* Logo */}
            <div ref={logoRef} className="opacity-0">
                <span className="font-display text-5xl md:text-6xl font-bold text-text-white select-none">
                    AMK<span className="text-accent-crimson">.</span>
                </span>
            </div>

            {/* Loading line */}
            <div className="mt-6 w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    ref={lineRef}
                    className="h-full bg-gradient-to-r from-accent-crimson to-accent-sapphire rounded-full origin-left"
                    style={{ transform: 'scaleX(0)' }}
                />
            </div>
        </div>
    );
};

export default Preloader;
