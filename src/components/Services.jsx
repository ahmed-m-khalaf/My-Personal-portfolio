import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaBolt, FaSearch, FaMagic, FaServer, FaLayerGroup } from 'react-icons/fa';
import { SectionHeader } from './SectionWrapper';
import { services } from '../data/services';
import { getT } from '../data/translations';
import { useTiltEffect } from '../hooks/useTiltEffect';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    FaCode: FaCode,
    FaMagic: FaMagic,
    FaBolt: FaBolt,
    FaSearch: FaSearch,
    FaServer: FaServer,
    FaLayerGroup: FaLayerGroup
};

const Services = ({ lang = 'en' }) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const t = getT(lang);

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

    // Get translated services content
    const translatedServices = t('content.services') || [];

    return (
        <section
            ref={sectionRef}
            id="services"
            className="py-20 md:py-28 px-4 relative"
        >
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-purple/30 rounded-full blur-3xl -z-10 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto">
                <SectionHeader title={t('sections.servicesTitle')} subtitle={t('sections.servicesSubtitle')} centered />

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                >
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} translatedServices={translatedServices} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, translatedServices }) => {
    const cardRef = useRef(null);
    useTiltEffect(cardRef, { maxTilt: 4, scale: 1.01 });

    const IconComponent = iconMap[service.icon];
    const translated = Array.isArray(translatedServices)
        ? translatedServices.find(s => s.id === service.id)
        : null;
    const displayTitle = translated?.title || service.title;
    const displayDescription = translated?.description || service.description;

    return (
        <div
            ref={cardRef}
            className="group relative h-full rounded-[2.5rem] bg-card-midnight/20 backdrop-blur-xl border border-black/5 transition-all duration-500 hover:border-[var(--service-color)] hover:shadow-2xl hover:shadow-[var(--service-color)]/10 tilt-card-wrapper overflow-hidden"
            style={{ '--service-color': service.color }}
        >
            <div className="tilt-card-inner p-8 sm:p-10 w-full h-full relative z-10 flex flex-col">
                {/* Minimalist Watermark Number */}
                <div className="absolute top-8 right-8 text-6xl font-black opacity-5 font-display transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 group-hover:text-[var(--service-color)] pointer-events-none">
                    0{service.id}
                </div>

                {/* Animated Background Glow */}
                <div 
                    className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-700 blur-3xl pointer-events-none"
                    style={{ backgroundColor: service.color }}
                />

                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container */}
                    <div
                        className="w-16 h-16 mb-8 flex items-center justify-center rounded-2xl bg-black/5 border border-black/5 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-[var(--service-color)]/20 relative overflow-hidden"
                        style={{ color: service.color }}
                    >
                         <div 
                           className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                           style={{ backgroundColor: service.color }}
                        />
                        {IconComponent && <IconComponent className="text-3xl relative z-10 transition-transform duration-500 group-hover:rotate-6" />}
                    </div>
                    
                    {/* Text content */}
                    <div className="mt-auto">
                        <h3 className="text-2xl font-display font-bold text-text-white mb-4 group-hover:text-[var(--service-color)] transition-colors duration-300 tracking-tight">
                            {displayTitle}
                        </h3>
                        <p className="text-text-slate text-sm sm:text-base leading-relaxed font-medium">
                            {displayDescription}
                        </p>
                    </div>
                </div>

                {/* Animated Bottom Border Reveal */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-[var(--service-color)] group-hover:w-full transition-all duration-500 ease-in-out rounded-t-full shadow-[0_-4px_15px_var(--service-color)] pointer-events-none" />
            </div>
        </div>
    );
};

export default Services;

