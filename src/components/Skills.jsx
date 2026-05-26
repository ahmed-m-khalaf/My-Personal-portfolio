import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaReact,
    FaGithub,
    FaMobileAlt,
    FaBolt,
    FaHtml5,
    FaCss3Alt,
    FaMagic,
    FaPlay
} from 'react-icons/fa';
import {
    SiJavascript,
    SiTailwindcss,
    SiRedux,
    SiVite,
    SiFirebase
} from 'react-icons/si';
import { SectionHeader } from './SectionWrapper';
import { skills } from '../data/skills';
import { getT } from '../data/translations';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping
const iconMap = {
    FaReact: FaReact,
    FaGithub: FaGithub,
    FaMobileAlt: FaMobileAlt,
    FaBolt: FaBolt,
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,
    FaMagic: FaMagic,
    FaPlay: FaPlay,
    SiJavascript: SiJavascript,
    SiTailwindcss: SiTailwindcss,
    SiRedux: SiRedux,
    SiVite: SiVite,
    SiFirebase: SiFirebase,
};

const Skills = ({ lang = 'en' }) => {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const t = getT(lang);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                cardsRef.current.children,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    onComplete: () => {
                        // Animate progress bars after cards reveal
                        const progressBars = cardsRef.current.querySelectorAll('.mt-6 > div');
                        gsap.fromTo(
                            progressBars,
                            { scaleX: 0 },
                            {
                                scaleX: 1,
                                duration: 1,
                                ease: 'power2.out',
                                stagger: 0.05
                            }
                        );
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Get translated skills content
    const translatedSkills = t('content.skills') || [];

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="py-20 md:py-28 px-4"
        >
            <div className="max-w-7xl mx-auto">
                <SectionHeader title={t('sections.skills')} centered />

                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                >
                    {skills.map((skill) => {
                        const IconComponent = iconMap[skill.icon];
                        // Find translated content for this skill
                        const translated = Array.isArray(translatedSkills)
                            ? translatedSkills.find(s => s.id === skill.id)
                            : null;
                        const displayName = translated?.name || skill.name;
                        const displayCategory = translated?.category || skill.category;

                        return (
                            <div
                                key={skill.id}
                                className="group relative p-8 rounded-3xl bg-card-midnight/20 backdrop-blur-xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20"
                                style={{ '--skill-color': skill.color }}
                            >
                                {/* Dynamic Background Glow */}
                                <div
                                    className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
                                    style={{ backgroundColor: skill.color }}
                                />

                                <div className="relative z-10 flex items-center gap-6">
                                    {/* Icon Container */}
                                    <div
                                        className="w-20 h-20 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 shadow-xl"
                                        style={{ color: skill.color }}
                                    >
                                        {IconComponent && <IconComponent className="w-10 h-10 transition-transform duration-500 group-hover:rotate-12" />}
                                    </div>

                                    {/* Text Content */}
                                    <div>
                                        <h4 className="font-display text-2xl font-bold text-text-white mb-1 group-hover:text-white transition-colors">
                                            {displayName}
                                        </h4>
                                        <p className="text-text-slate text-sm font-medium uppercase tracking-wider">
                                            {displayCategory}
                                        </p>
                                    </div>
                                </div>

                                {/* Progress Bar Track */}
                                <div className="mt-6 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full w-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            backgroundColor: skill.color,
                                            transformOrigin: lang === 'ar' ? 'right' : 'left',
                                            // GSAP will animate this from scaleX(0) to scaleX(1)
                                        }}
                                    />
                                </div>

                                {/* Glass Layer Hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
