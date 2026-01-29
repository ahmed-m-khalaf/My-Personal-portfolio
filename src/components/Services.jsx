import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaPalette, FaBolt, FaSearch, FaMobileAlt, FaGlobe } from 'react-icons/fa';
import { SectionHeader } from './SectionWrapper';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    FaCode: FaCode,
    FaPalette: FaPalette,
    FaBolt: FaBolt,
    FaSearch: FaSearch,
    FaMobileAlt: FaMobileAlt,
    FaGlobe: FaGlobe
};

const Services = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
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

    return (
        <section
            ref={sectionRef}
            id="services"
            className="py-20 md:py-28 px-4 relative"
        >
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-purple/30 rounded-full blur-3xl -z-10 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto">
                <SectionHeader title="What I Do" subtitle="Services" centered />

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                >
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon];
                        return (
                            <div
                                key={service.id}
                                className="group relative p-10 h-full rounded-3xl bg-card-midnight/30 backdrop-blur-md border border-white/5 transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl hover:shadow-[var(--service-color)]/40 overflow-hidden flex flex-col justify-between"
                                style={{ '--service-color': service.color, willChange: 'transform' }}
                            >
                                {/* Hover Glow Gradient (Stronger) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--service-color)]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                <div className="relative z-10">
                                    <div
                                        className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 text-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[var(--service-color)]/20"
                                        style={{ color: service.color }}
                                    >
                                        {IconComponent && <IconComponent />}
                                    </div>
                                    <h3 className="text-xl font-display font-bold text-text-white mb-3 group-hover:text-[var(--service-color)] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-text-slate text-sm leading-relaxed group-hover:text-text-gray transition-colors">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Bottom Border Reveal */}
                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--service-color)] group-hover:w-full transition-all duration-500 ease-in-out" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
