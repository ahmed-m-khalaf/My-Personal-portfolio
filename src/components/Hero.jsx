import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Button } from './index'; // Adjust import based on index.js export structure
import { about } from '../data/about';
import avatar from '../assets/avatar.jpg';

const Hero = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const avatarRef = useRef(null);
    const bgBlobsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Initial Entry Animation
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Animate Avatar
            tl.fromTo(
                avatarRef.current,
                { x: 100, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 1 }
            );

            // Animate Text Content (Staggered)
            // Note: We'll animate the children of the text container
            const textElements = textRef.current.children;
            tl.fromTo(
                textElements,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
                '-=0.6'
            );

            // 2. Background Blob Animation (Floating)
            bgBlobsRef.current.forEach((blob, i) => {
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

            // 3. Interactive Text (Rubber band effect on hover)
            // Select all spans with class 'interactive-letter'
            const letters = gsap.utils.toArray('.interactive-letter');

            letters.forEach((letter) => {
                letter.addEventListener('mouseenter', () => {
                    gsap.to(letter, {
                        scale: 1.3,
                        color: '#D91E2A', // Accent Crimson
                        duration: 0.3,
                        ease: "back.out(2)",
                        overwrite: true
                    });
                });

                letter.addEventListener('mouseleave', () => {
                    gsap.to(letter, {
                        scale: 1,
                        color: 'inherit', // Return to original color
                        duration: 0.3,
                        ease: "power2.out",
                        overwrite: true
                    });
                });
            });

        }, containerRef);

        // Throttle function for performance
        let lastTime = 0;
        const throttleDelay = 16; // ~60fps

        // 4. Parallax Effect for Background (Mouse Movement) - Throttled
        const handleMouseMove = (e) => {
            const now = Date.now();
            if (now - lastTime < throttleDelay) return;
            lastTime = now;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate mouse position relative to center (-1 to 1)
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            // Apply parallax to each blob with different speeds (depth layers)
            bgBlobsRef.current.forEach((blob, i) => {
                if (!blob) return;

                // Different speeds for different layers (0 = closest/fastest, 2 = furthest/slowest)
                const speed = (i + 1) * 10; // 10, 20, 30
                const x = xPos * speed;
                const y = yPos * speed;

                gsap.to(blob, {
                    x: x,
                    y: y,
                    duration: 1.5,
                    ease: "power2.out",
                    overwrite: 'auto'
                });
            });
        };

        // Add event listener with passive for better scroll performance
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            ctx.revert();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Helper to split text into interactive spans
    const splitText = (text, className = "") => {
        return text.split("").map((char, index) => (
            <span
                key={index}
                className={`inline-block interactive-letter transition-colors cursor-default ${char === " " ? "mr-2" : ""}`}
            >
                {char}
            </span>
        ));
    };

    return (
        <section
            ref={containerRef}
            id="home"
            className="min-h-screen flex items-center px-4 pt-20 relative overflow-hidden"
        >
            {/* Background Gradient Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-abyss via-card-midnight/10 to-bg-abyss" />

            {/* Animated Blobs */}
            <div
                ref={el => bgBlobsRef.current[0] = el}
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-crimson/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
            />
            <div
                ref={el => bgBlobsRef.current[1] = el}
                className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-sapphire/20 rounded-full blur-[100px] mix-blend-screen pointer-events-none"
            />
            <div
                ref={el => bgBlobsRef.current[2] = el}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-card-midnight/10 rounded-full blur-[120px] pointer-events-none"
            />

            <div className="relative z-10 max-w-7xl mx-auto w-full">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Text Content - Left Side */}
                    <div ref={textRef} className="flex-1 text-center lg:text-left">
                        {/* Name with Animated Gradient & Interactive Letters */}
                        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
                            <span className="block text-text-white">
                                {splitText(about.name)}
                            </span>
                        </h1>

                        {/* Title */}
                        <p className="text-xl md:text-2xl text-accent-crimson font-semibold mb-4">
                            {about.title}
                        </p>

                        {/* Tagline */}
                        <p className="text-base md:text-lg text-text-slate max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                            {about.tagline}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button variant="primary" size="lg" href="#projects">
                                View My Work
                            </Button>
                            <Button variant="outline" size="lg" href="#contact">
                                Let's Talk
                            </Button>
                        </div>
                    </div>

                    {/* Avatar - Right Side */}
                    <div
                        ref={avatarRef}
                        className="flex-shrink-0 relative group"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-crimson/40 to-accent-sapphire/40 rounded-full blur-2xl scale-110 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Image Container */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-accent-crimson/50 shadow-2xl shadow-accent-crimson/30 transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src={avatar}
                                alt={about.name}
                                className="w-full h-full object-cover object-top"
                                width="384"
                                height="384"
                                loading="eager"
                                decoding="async"
                            />
                        </div>

                        {/* Decorative Ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-accent-sapphire/30 scale-125 animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
