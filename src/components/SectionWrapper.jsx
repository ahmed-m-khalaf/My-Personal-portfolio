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

        // Create a context for cleanup
        const ctx = gsap.context(() => {
            // Set initial state
            gsap.set(content.children, {
                opacity: 0,
                y: 60,
                willChange: 'transform, opacity'
            });

            // Create scroll-triggered animation
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
                    // Performance: only animate when in viewport
                    fastScrollEnd: true,
                    preventOverlaps: true
                },
                onComplete: () => {
                    // Clean up will-change after animation
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

export const SectionHeader = ({ title, subtitle, centered = true }) => {
    return (
        <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-white mb-6">
                {title}
            </h2>

            {/* Decorative Line with Dots */}
            <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
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

