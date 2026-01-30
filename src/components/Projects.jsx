import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from './SectionWrapper';
import { projects } from '../data/projects';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isManualPaused, setIsManualPaused] = useState(false);
    const sectionRef = useRef(null);
    const progressRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);
    const progressTween = useRef(null);

    const currentProject = projects[activeIndex];

    // Auto-play logic with GSAP
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate content entry
            gsap.fromTo(contentRef.current,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
            );

            // Animate image entry
            gsap.fromTo(imageRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
            );

            // Kill previous progress animation
            if (progressTween.current) progressTween.current.kill();

            // Only start auto-play if NOT manually paused
            if (!isManualPaused) {
                gsap.set(progressRef.current, {
                    width: '0%',
                    background: `linear-gradient(90deg, ${currentProject.accentColor} 0%, ${currentProject.accentColor}80 100%)`,
                    boxShadow: `0px 0px 12px ${currentProject.accentColor}60`
                });

                progressTween.current = gsap.to(progressRef.current, {
                    width: '100%',
                    duration: 6,
                    ease: 'linear',
                    onComplete: handleNext
                });
            } else {
                gsap.to(progressRef.current, {
                    width: '100%',
                    backgroundColor: '#c92a0e',
                    duration: 0.3
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [activeIndex, isManualPaused]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const handleDotClick = (index) => {
        setActiveIndex(index);
        setIsManualPaused(false);
    };

    const handleThumbnailClick = (index) => {
        setActiveIndex(index);
        setIsManualPaused(false);
    };

    const handleContainerClick = (e) => {
        // Don't toggle if clicking on buttons or links
        if (e.target.closest('a') || e.target.closest('button')) return;
        setIsManualPaused(!isManualPaused);
    };

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

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!sectionRef.current?.contains(document.activeElement)) return;

            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handlePrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleNext();
            } else if (e.key === ' ') {
                e.preventDefault();
                setIsManualPaused(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="py-20 relative overflow-hidden"
        >
            {/* Background Decorations */}
            <div
                className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 opacity-20"
                style={{ background: currentProject.accentColor }}
            />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-card-midnight/30 rounded-full blur-3xl -z-10 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4">
                <SectionHeader title="My Projects" subtitle="Featured Work" centered />

                <div
                    className="mt-12 max-w-6xl mx-auto relative group cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleContainerClick}
                    role="region"
                    aria-label={`Projects carousel - ${activeIndex + 1} of ${projects.length}: ${currentProject.title}`}
                    aria-live="polite"
                    tabIndex="0"
                >
                    {/* Main Glassmorphism Container */}
                    <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md border transition-all duration-300 shadow-2xl shadow-black/30 ${isManualPaused ? 'border-accent-crimson/50 ring-1 ring-accent-crimson/30' : 'border-white/10'}`}>

                        <div className="flex flex-col lg:flex-row min-h-[520px]">
                            {/* Image Section - Larger */}
                            <div className="w-full lg:w-[60%] p-6 md:p-10 flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent relative">
                                <div ref={imageRef} className="relative w-full h-64 md:h-[400px] lg:h-[420px]">
                                    <img
                                        src={currentProject.image}
                                        alt={`${currentProject.title} project screenshot`}
                                        className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-[1.02] rounded-lg"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                {/* Mobile Controls */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                    className="lg:hidden absolute top-1/2 left-2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white/90 z-20 hover:bg-black/60 transition-all"
                                    aria-label="Previous project"
                                >
                                    <FaChevronLeft size={18} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                    className="lg:hidden absolute top-1/2 right-2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white/90 z-20 hover:bg-black/60 transition-all"
                                    aria-label="Next project"
                                >
                                    <FaChevronRight size={18} />
                                </button>
                            </div>

                            {/* Details Section */}
                            <div ref={contentRef} className="w-full lg:w-[40%] p-6 md:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5 relative">

                                {/* Pause/Play Indicator */}
                                <div className="absolute top-5 right-5 text-white/50 transition-colors duration-300">
                                    {isManualPaused
                                        ? <FaPause className="text-accent-crimson animate-pulse" size={14} />
                                        : <FaPlay className="text-accent-sapphire opacity-0 group-hover:opacity-100 transition-opacity" size={14} />
                                    }
                                </div>

                                {/* Featured Badge */}
                                {currentProject.featured && (
                                    <span
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4"
                                        style={{
                                            backgroundColor: `${currentProject.accentColor}20`,
                                            color: currentProject.accentColor
                                        }}
                                    >
                                        ⭐ Featured
                                    </span>
                                )}

                                {/* Title */}
                                <h3 className="text-2xl md:text-3xl font-display font-bold text-text-white mb-3 leading-tight">
                                    {currentProject.title}
                                </h3>

                                {/* Description */}
                                <p className="text-text-gray text-sm md:text-base mb-5 leading-relaxed line-clamp-3">
                                    {currentProject.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {currentProject.tags.slice(0, 5).map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2.5 py-1 text-xs rounded-md transition-all duration-300 hover:scale-105"
                                            style={{
                                                backgroundColor: `${currentProject.accentColor}15`,
                                                color: currentProject.accentColor,
                                                border: `1px solid ${currentProject.accentColor}40`,
                                                boxShadow: `0 0 8px ${currentProject.accentColor}20`
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                    {currentProject.tags.length > 5 && (
                                        <span
                                            className="px-2.5 py-1 text-xs rounded-md"
                                            style={{
                                                backgroundColor: `${currentProject.accentColor}10`,
                                                color: `${currentProject.accentColor}cc`
                                            }}
                                        >
                                            +{currentProject.tags.length - 5}
                                        </span>
                                    )}
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex items-center gap-3 mb-6">
                                    <a
                                        href={currentProject.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        style={{
                                            background: `linear-gradient(135deg, ${currentProject.accentColor} 0%, ${currentProject.accentColor}cc 100%)`,
                                            boxShadow: `0 4px 20px ${currentProject.accentColor}40`
                                        }}
                                    >
                                        <FaExternalLinkAlt size={12} />
                                        Live Demo
                                    </a>
                                    <a
                                        href={currentProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 text-text-white border border-white/10 transition-all duration-300 hover:bg-white/10 hover:scale-105"
                                    >
                                        <FaGithub size={14} />
                                        GitHub
                                    </a>
                                </div>

                                {/* Desktop Navigation */}
                                <div className="hidden lg:flex items-center gap-3 mt-auto pt-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                        className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
                                        aria-label="Previous project"
                                    >
                                        <FaChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                        className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
                                        aria-label="Next project"
                                    >
                                        <FaChevronRight size={16} />
                                    </button>
                                    <span className="ml-3 text-text-slate text-sm">
                                        {activeIndex + 1} / {projects.length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                            <div
                                ref={progressRef}
                                className="h-full rounded-full"
                                style={{ width: '0%' }}
                            />
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="flex justify-center gap-2.5 mt-6" onClick={(e) => e.stopPropagation()}>
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex
                                    ? 'w-8'
                                    : 'w-2 bg-text-slate/30 hover:bg-text-slate/50'
                                    }`}
                                style={{ backgroundColor: index === activeIndex ? currentProject.accentColor : undefined }}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Thumbnails Row */}
                    <div className="flex justify-center gap-3 mt-6 px-4 overflow-x-auto pb-2" onClick={(e) => e.stopPropagation()}>
                        {projects.map((project, index) => (
                            <button
                                key={project.id}
                                onClick={() => handleThumbnailClick(index)}
                                className={`flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${index === activeIndex
                                    ? 'ring-2 ring-offset-2 ring-offset-bg-abyss'
                                    : 'border-white/10 opacity-50 hover:opacity-80'
                                    }`}
                                style={{
                                    borderColor: index === activeIndex ? project.accentColor : undefined,
                                    ringColor: index === activeIndex ? project.accentColor : undefined
                                }}
                                aria-label={`View ${project.title}`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
