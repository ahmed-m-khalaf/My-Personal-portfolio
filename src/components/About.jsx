import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { SectionHeader } from './SectionWrapper';
import Button from './Button';
import { about } from '../data/about';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image animation (Entrance + Subtle Float)
            gsap.fromTo(
                imageRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    onComplete: () => {
                        // Subtle floating animation after entrance
                        gsap.to(imageRef.current, {
                            y: -15,
                            duration: 3,
                            ease: 'power1.inOut',
                            yoyo: true,
                            repeat: -1
                        });
                    }
                }
            );

            // Content animation
            gsap.fromTo(
                contentRef.current.children,
                { x: 50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const contactInfo = [
        { icon: FaEnvelope, label: 'Email', value: about.email },
        { icon: FaPhone, label: 'Phone', value: about.phone },
        { icon: FaMapMarkerAlt, label: 'Location', value: about.location },
    ];

    return (
        <section
            ref={sectionRef}
            id="about"
            className="py-20 md:py-28 px-4"
        >
            <div className="max-w-7xl mx-auto">
                <SectionHeader title="About Me" centered />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12">
                    {/* Image Side */}
                    <div ref={imageRef} className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-crimson/30 to-accent-sapphire/30 rounded-2xl blur-2xl scale-105" />

                        {/* Image Container */}
                        <div className="relative rounded-2xl overflow-hidden border-2 border-white/10">
                            <img
                                src="/images/Screenshot 2026-01-27 012041.png"
                                alt={about.name}
                                className="w-full aspect-[4/5] object-cover object-top"
                                loading="lazy"
                                decoding="async"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-bg-abyss/60 via-transparent to-transparent" />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-accent-crimson/50 rounded-2xl" />
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-accent-sapphire/50 rounded-2xl" />
                    </div>

                    {/* Content Side */}
                    <div ref={contentRef}>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-text-white mb-4">
                            {about.title}
                        </h3>

                        <p className="text-text-gray text-lg leading-relaxed mb-6">
                            {about.bio}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-4 mb-8">
                            {contactInfo.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-crimson/20 text-accent-crimson">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-text-slate text-sm">{item.label}</span>
                                        <p className="text-text-white font-medium">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <Button variant="primary" href="#contact">
                                Hire Me
                            </Button>
                            <Button variant="outline" href={about.resume} icon={FaDownload}>
                                Download CV
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
