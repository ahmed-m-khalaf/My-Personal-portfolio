import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from './SectionWrapper';
import { certificates } from '../data/certificates';
import { FaChevronLeft, FaChevronRight, FaAward, FaPause, FaPlay } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isManualPaused, setIsManualPaused] = useState(false);
    const sectionRef = useRef(null);
    const progressRef = useRef(null);
    const contentRef = useRef(null);
    const progressTween = useRef(null);

    // Auto-play logic with GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate content entry (fade and slide up)
            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );

            // Kill previous progress animation
            if (progressTween.current) progressTween.current.kill();

            // Only start auto-play if NOT manually paused
            if (!isManualPaused) {
                // Reset progress bar to 0 before starting
                gsap.set(progressRef.current, {
                    width: '0%',
                    backgroundImage: 'linear-gradient(90deg, #2881aaff 0%, #a81745d9 100%)',
                    boxShadow: '0px 0px 8px rgba(38, 131, 174, 0.4)' // Glow خفيف بالأزرق
                });
                progressTween.current = gsap.to(progressRef.current, {
                    width: '100%',
                    duration: 5,
                    ease: 'linear',
                    onComplete: () => {
                        handleNext();
                    }
                });
            } else {
                // If paused, ensure progress bar indicates paused state (e.g. stops or changes color)
                gsap.to(progressRef.current, { width: '100%', backgroundColor: '#c92a0eff', duration: 0.3 });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [activeIndex, isManualPaused]); // Re-run if index changes OR pause state changes

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % certificates.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
    };

    const handleDotClick = (index) => {
        setActiveIndex(index);
        setIsManualPaused(false); // Resume if user navigates manually? Or keep paused? 
        // User usually expects interaction to show content. Resume seems friendlier.
    };

    // Toggle Manual Pause on Click
    const handleContainerClick = () => {
        setIsManualPaused(!isManualPaused);
    };

    // Hover pauses ONLY if not already manually paused
    const handleMouseEnter = () => {
        if (!isManualPaused && progressTween.current) {
            progressTween.current.pause();
        }
    };

    const handleMouseLeave = () => {
        if (!isManualPaused && progressTween.current) {
            progressTween.current.play();
        }
    };

    // Keyboard navigation for accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only handle keys when focus is on the carousel
            if (!sectionRef.current?.contains(document.activeElement)) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            } else if (e.key === ' ') {
                e.preventDefault();
                handleContainerClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentCert = certificates[activeIndex];

    return (
        <section
            ref={sectionRef}
            id="certificates"
            className="py-20 relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-card-midnight/20 rounded-full blur-3xl -z-10 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4">
                <SectionHeader title="Achievements" subtitle="Certificates" centered />

                <div
                    className="mt-12 max-w-6xl mx-auto relative group cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleContainerClick}
                    role="region"
                    aria-label={`Certificates carousel - ${activeIndex + 1} of ${certificates.length}: ${currentCert.title}`}
                    aria-live="polite"
                    tabIndex="0"
                >
                    {/* Glassmorphism Container */}
                    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border transition-all duration-300 shadow-2xl shadow-black/20 ${isManualPaused ? 'border-accent-crimson/50 ring-1 ring-accent-crimson/30' : 'border-white/10'}`}>

                        <div className="flex flex-col md:flex-row min-h-[500px]">
                            {/* Image Section */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                                <div ref={contentRef} className="relative w-full h-72 md:h-[450px]">
                                    <img
                                        src={currentCert.image}
                                        alt={`${currentCert.title} certificate issued by ${currentCert.issuer}`}
                                        className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </div>

                            {/* Details Section */}
                            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 relative">

                                {/* Status Indicator (Play/Pause Icon in top right) */}
                                <div className="absolute top-6 right-6 text-white/50 transition-colors duration-300">
                                    {isManualPaused ? <FaPause className="text-accent-crimson animate-pulse" /> : <FaPlay className="text-accent-sapphire opacity-0 group-hover:opacity-100" />}
                                </div>

                                <FaAward
                                    className="text-5xl mb-8"
                                    style={{ color: currentCert.color || '#D91E2A' }}
                                />

                                <h3 className="text-3xl font-display font-bold text-text-white mb-3 leading-tight">
                                    {currentCert.title}
                                </h3>

                                <p className="text-xl text-accent-sapphire font-semibold mb-2">
                                    {currentCert.issuer}
                                </p>

                                <p className="text-text-slate text-base">
                                    Issued: {currentCert.date}
                                </p>

                                {/* Controls (Desktop) - Prevent propagation to container click */}
                                <div className="hidden md:flex items-center gap-4 mt-auto pt-8">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95 z-20"
                                        aria-label="Previous certificate"
                                    >
                                        <FaChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95 z-20"
                                        aria-label="Next certificate"
                                    >
                                        <FaChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-white/5">
                            <div
                                ref={progressRef}
                                className="h-full shadow-[0_0_10px_rgba(217,30,42,0.5)]"
                                style={{ width: '0%', backgroundColor: currentCert.color || '#D91E2A' }}
                            />
                        </div>
                    </div>

                    {/* Navigation Dots - Stop propagation */}
                    <div className="flex justify-center gap-3 mt-8" onClick={(e) => e.stopPropagation()}>
                        {certificates.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'w-8'
                                    : 'w-2 bg-text-slate/30 hover:bg-text-slate/50'
                                    }`}
                                style={{ backgroundColor: index === activeIndex ? (currentCert.color || '#D91E2A') : undefined }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Mobile Controls (Overlay) - Stop propagation */}
                    <button
                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        className="md:hidden absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white/80 z-20"
                        aria-label="Previous certificate"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        className="md:hidden absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white/80 z-20"
                        aria-label="Next certificate"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Certificates;
