import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionWrapper = ({
    children,
    id,
    className = '',
    title,
    subtitle,
    centered = true,
    ...props
}) => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const content = contentRef.current;

        if (!section || !content) return;

        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set(content.children, {
                opacity: 0,
                y: 60,
                willChange: 'transform, opacity'
            });

            // Scroll-driven staggered reveal
            gsap.to(content.children, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                    fastScrollEnd: true,
                    preventOverlaps: true
                },
                onComplete: () => {
                    gsap.set(content.children, { willChange: 'auto' });
                }
            });
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id={id}
            className={`py-20 md:py-28 px-4 ${className}`}
            {...props}
        >
            <div ref={contentRef} className="max-w-7xl mx-auto">
                {title && (
                    <SectionHeader
                        title={title}
                        subtitle={subtitle}
                        centered={centered}
                    />
                )}
                {children}
            </div>
        </section>
    );
};

// ─── Enhanced Section Header with Word Reveal ───
export const SectionHeader = ({ title, subtitle, centered = true }) => {
    const headerRef = useRef(null);
    const titleRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title: word-by-word reveal with clip-path
            const words = titleRef.current?.querySelectorAll('.section-title-word');
            if (words && words.length > 0) {
                gsap.fromTo(
                    words,
                    {
                        opacity: 0,
                        y: 40,
                        rotateX: 45,
                        transformOrigin: 'bottom center',
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Decorative line: scale from center
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, headerRef);

        return () => ctx.revert();
    }, [title]);

    // Split title into words for animation
    const titleWords = typeof title === 'string' ? title.split(' ') : [title];

    return (
        <div ref={headerRef} className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {/* Title with word-by-word reveal */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-white mb-6" style={{ perspective: '600px' }}>
                <span ref={titleRef} className="inline-flex flex-wrap justify-center gap-x-3">
                    {titleWords.map((word, i) => (
                        <span
                            key={i}
                            className="section-title-word inline-block"
                            style={{ willChange: 'transform, opacity' }}
                        >
                            {word}
                        </span>
                    ))}
                </span>
            </h2>

            {/* Decorative Line with Dots */}
            <div
                ref={lineRef}
                className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
                style={{ transformOrigin: 'center' }}
            >
                {/* Left Dot */}
                <span className="w-3 h-3 rounded-full bg-accent-crimson" />

                {/* Line */}
                <span className="w-20 md:w-32 h-1 rounded-full bg-gradient-to-r from-accent-crimson to-accent-sapphire" />

                {/* Right Dot */}
                <span className="w-3 h-3 rounded-full bg-accent-sapphire" />
            </div>

            {/* Subtitle (optional) */}
            {subtitle && (
                <p className="mt-4 text-text-slate text-lg">{subtitle}</p>
            )}
        </div>
    );
};

export default SectionWrapper;
