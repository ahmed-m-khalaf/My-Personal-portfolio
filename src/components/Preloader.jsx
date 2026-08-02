import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);
    const logoRef = useRef(null);
    const lineRef = useRef(null);
    const progressTextRef = useRef(null);
    const onCompleteRef = useRef(onComplete);

    // Keep onComplete ref current without triggering re-effects
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let isDone = false;

        const finishPreloader = () => {
            if (isDone) return;
            isDone = true;

            if (preloaderRef.current) {
                gsap.to(preloaderRef.current, {
                    yPercent: -100,
                    duration: 0.7,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        onCompleteRef.current?.();
                    }
                });
            } else {
                onCompleteRef.current?.();
            }
        };

        // Fallback timer to ensure the site NEVER gets stuck loading
        const fallbackTimer = setTimeout(() => {
            finishPreloader();
        }, 2500);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    clearTimeout(fallbackTimer);
                    finishPreloader();
                }
            });

            // Logo entrance
            tl.fromTo(
                logoRef.current,
                { scale: 0.6, opacity: 0, filter: 'blur(8px)' },
                { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' }
            );

            // Progress counter + Line fill (direct DOM manipulation for maximum performance)
            const counterObj = { val: 0 };
            tl.to(counterObj, {
                val: 100,
                duration: 1.0,
                ease: 'power2.inOut',
                onUpdate: () => {
                    const currentVal = Math.round(counterObj.val);
                    if (progressTextRef.current) {
                        progressTextRef.current.textContent = `${currentVal}%`;
                    }
                    if (lineRef.current) {
                        lineRef.current.style.transform = `scaleX(${currentVal / 100})`;
                    }
                }
            }, '-=0.2');

            // Subtle logo pulse
            tl.to(logoRef.current, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        });

        return () => {
            clearTimeout(fallbackTimer);
            ctx.revert();
        };
    }, []); // Only run once on mount

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

            {/* Loading line & Percentage */}
            <div className="mt-6 flex flex-col items-center gap-2">
                <div className="w-36 h-1 bg-black/10 rounded-full overflow-hidden">
                    <div
                        ref={lineRef}
                        className="h-full bg-gradient-to-r from-accent-crimson to-accent-sapphire rounded-full origin-left"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </div>
                <span ref={progressTextRef} className="font-mono text-xs text-text-slate/80 tracking-widest">
                    0%
                </span>
            </div>
        </div>
    );
};

export default Preloader;

