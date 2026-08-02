import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCode, FaPalette, FaBolt, FaSearch, FaMobileAlt, FaGlobe } from 'react-icons/fa';
import { SectionHeader } from './SectionWrapper';
import { services } from '../data/services';
import { getT } from '../data/translations';
import { useTiltEffect } from '../hooks/useTiltEffect';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
    FaCode: FaCode,
    FaPalette: FaPalette,
    FaBolt: FaBolt,
    FaSearch: FaSearch,
    FaMobileAlt: FaMobileAlt,
    FaGlobe: FaGlobe
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
            className="group relative h-full rounded-3xl bg-card-midnight/30 backdrop-blur-md border border-black/5 transition-colors duration-300 hover:border-[var(--service-color)] tilt-card-wrapper overflow-hidden"
            style={{ '--service-color': service.color, boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)' }}
        >
            <div className="tilt-card-inner p-10 flex flex-col justify-between w-full h-full relative z-10">
                <div className="relative z-10 flex-grow">
                    <div
                        className="w-14 h-14 flex items-center justify-center rounded-xl bg-black/5 text-2xl mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-[var(--service-color)]/20"
                        style={{ color: service.color }}
                    >
                        {IconComponent && <IconComponent />}
                    </div>
                    <h3 className="text-xl font-display font-bold text-text-white mb-3 group-hover:text-[var(--service-color)] transition-colors">
                        {displayTitle}
                    </h3>
                    <p className="text-text-slate text-sm leading-relaxed group-hover:text-text-gray transition-colors">
                        {displayDescription}
                    </p>
                </div>

                {/* Bottom Border Reveal */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[var(--service-color)] group-hover:w-full transition-all duration-500 ease-in-out" />
            </div>
        </div>
    );
};

export default Services;

