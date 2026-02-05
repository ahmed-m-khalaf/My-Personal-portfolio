import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { Button } from './index';
import { about } from '../data/about';
import { socials } from '../data/socials';
import avatar from '../assets/avatar.jpg';
import { FaEnvelope, FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

// Icon mapping
const iconMap = {
    FaEnvelope: FaEnvelope,
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram
};

// Text Scramble Hook - Performance Optimized
const useTextScramble = (finalText, options = {}) => {
    const {
        duration = 1.5,
        delay = 0.5,
        characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*',
        scrambleSpeed = 30 // ms between scramble updates
    } = options;

    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const frameRef = useRef(null);
    const startTimeRef = useRef(null);

    const scramble = useCallback(() => {
        const totalDuration = duration * 1000;
        const chars = characters.split('');
        let lastUpdate = 0;
        const updateInterval = 50; // Only update every 50ms for smoother animation

        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / totalDuration, 1);

            // Only update at intervals for smoother, slower animation
            if (timestamp - lastUpdate < updateInterval && progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastUpdate = timestamp;

            // Calculate how many characters should be revealed
            const revealedCount = Math.floor(finalText.length * progress);

            let result = '';
            for (let i = 0; i < finalText.length; i++) {
                if (finalText[i] === ' ') {
                    result += ' ';
                } else if (i < revealedCount) {
                    result += finalText[i];
                } else {
                    // Less random changes - only change some letters
                    result += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            setDisplayText(result);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setDisplayText(finalText);
                setIsComplete(true);
            }
        };

        // Start after delay
        const timeoutId = setTimeout(() => {
            frameRef.current = requestAnimationFrame(animate);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [finalText, duration, delay, characters]);

    useEffect(() => {
        const cleanup = scramble();
        return cleanup;
    }, [scramble]);

    return { displayText, isComplete };
};

// Memoized Scramble Letter Component - Fixed spacing
const ScrambleLetter = React.memo(({ char, index }) => (
    <span
        key={index}
        className={`inline-block interactive-letter transition-colors cursor-default ${char === ' ' ? 'w-3' : ''}`}
    >
        {char}
    </span>
));

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const avatarRef = useRef(null);
    const bgBlobsRef = useRef([]);

    // Text Scramble for Name - Slower and simpler
    const { displayText: scrambledName, isComplete: nameComplete } = useTextScramble(about.name, {
        duration: 2.5,  // Slower animation
        delay: 0.5,
        characters: 'AMKHLF'  // Only use letters similar to the name
    });

    // Text Scramble for Title - Slower
    const { displayText: scrambledTitle, isComplete: titleComplete } = useTextScramble(about.title, {
        duration: 1.8,  // Slower
        delay: 1.8,
        characters: 'FrontEndDvlpr-'  // Related to title
    });

    // Memoize scrambled letters to prevent unnecessary re-renders
    const scrambledNameLetters = useMemo(() =>
        scrambledName.split('').map((char, index) => (
            <ScrambleLetter key={index} char={char} index={index} />
        )),
        [scrambledName]
    );

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Animate Avatar
            tl.fromTo(
                avatarRef.current,
                { x: 100, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 1 }
            );

            // Animate Text Content (Staggered) - Skip h1 since it has scramble effect
            const textElements = textRef.current.querySelectorAll('p, div:not(.scramble-container)');
            tl.fromTo(
                textElements,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
                '-=0.4'
            );

            // Background Blob Animation (Floating) - with will-change for GPU
            bgBlobsRef.current.forEach((blob, i) => {
                if (!blob) return;
                gsap.set(blob, { willChange: 'transform' });
                gsap.to(blob, {
                    x: "random(-50, 50)",
                    y: "random(-50, 50)",
                    scale: "random(0.8, 1.2)",
                    duration: "random(10, 20)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 2,
                });
            });

            // Interactive Text (Rubber band effect on hover) - Only after scramble complete
            if (nameComplete) {
                const letters = gsap.utils.toArray('.interactive-letter');
                letters.forEach((letter) => {
                    letter.addEventListener('mouseenter', () => {
                        gsap.to(letter, {
                            scale: 1.3,
                            color: '#D91E2A',
                            duration: 0.3,
                            ease: "back.out(2)",
                            overwrite: true
                        });
                    });

                    letter.addEventListener('mouseleave', () => {
                        gsap.to(letter, {
                            scale: 1,
                            color: 'inherit',
                            duration: 0.3,
                            ease: "power2.out",
                            overwrite: true
                        });
                    });
                });
            }
        }, containerRef);

        // Throttled Parallax Effect
        let lastTime = 0;
        const throttleDelay = 16;

        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime < throttleDelay) return;
            lastTime = now;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            bgBlobsRef.current.forEach((blob, i) => {
                if (!blob) return;
                const speed = (i + 1) * 10;
                gsap.to(blob, {
                    x: xPos * speed,
                    y: yPos * speed,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: 'auto'
                });
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [nameComplete]);

    return (
        <section
            ref={containerRef}
            id="home"
            className="min-h-screen flex items-center px-6 sm:px-8 md:px-12 lg:px-4 pt-24 pb-12 relative overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-abyss via-card-midnight/10 to-bg-abyss" />

            {/* Animated Blobs - GPU accelerated with reduced blur for performance */}
            <div
                ref={el => bgBlobsRef.current[0] = el}
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-crimson/25 rounded-full blur-[60px] mix-blend-screen pointer-events-none transform-gpu"
            />
            <div
                ref={el => bgBlobsRef.current[1] = el}
                className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-sapphire/25 rounded-full blur-[60px] mix-blend-screen pointer-events-none transform-gpu"
            />
            <div
                ref={el => bgBlobsRef.current[2] = el}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-card-midnight/15 rounded-full blur-[70px] pointer-events-none transform-gpu"
            />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div ref={textRef} className="flex-1 text-center lg:text-left px-2 sm:px-0">
                        {/* Name with Text Scramble Effect */}
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight scramble-container">
                            <span className="block text-text-white font-mono">
                                {scrambledNameLetters}
                            </span>
                        </h1>

                        {/* Title with Text Scramble */}
                        <p className="text-xl md:text-2xl text-accent-crimson font-semibold mb-4 font-mono h-8">
                            {scrambledTitle}
                        </p>

                        {/* Tagline */}
                        <p className="text-sm sm:text-base md:text-lg text-text-slate max-w-md sm:max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed px-2 sm:px-0">
                            {about.tagline}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
                            <Button variant="primary" size="lg" href="#projects">
                                View My Work
                            </Button>
                            <Button variant="outline" size="lg" href="#contact">
                                Let's Talk
                            </Button>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 mt-8 justify-center lg:justify-start">
                            {socials.map((social) => {
                                const IconComponent = iconMap[social.icon];
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="group relative p-3 rounded-full border border-white/10 transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-110 transform-gpu"
                                        style={{
                                            backgroundColor: 'rgba(90, 22, 72, 0.3)',
                                            '--social-color': social.color
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = social.color;
                                            e.currentTarget.style.borderColor = social.color;
                                            e.currentTarget.style.boxShadow = `0 10px 40px ${social.color}60`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(90, 22, 72, 0.3)';
                                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <IconComponent
                                            className="w-5 h-5 text-text-slate transition-colors duration-500 ease-out group-hover:text-white"
                                        />
                                        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-3 px-3 py-1.5 bg-bg-abyss/95 border border-white/20 rounded-md text-xs text-text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg">
                                            Follow me on {social.name}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Avatar */}
                    <div
                        ref={avatarRef}
                        className="flex-shrink-0 relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-crimson/40 to-accent-sapphire/40 rounded-full blur-2xl scale-110 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-accent-crimson/50 shadow-2xl shadow-accent-crimson/30 transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src={avatar}
                                alt={about.name}
                                className="w-full h-full object-cover object-top"
                                width="384"
                                height="384"
                                loading="eager"
                                decoding="async"
                                fetchPriority="high"
                            />
                        </div>

                        <div className="absolute inset-0 rounded-full border-2 border-accent-sapphire/30 avatar-ring-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
