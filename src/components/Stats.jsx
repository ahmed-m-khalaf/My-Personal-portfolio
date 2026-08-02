import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaProjectDiagram, FaClock, FaCertificate, FaHandshake } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    {
        id: 1,
        icon: FaProjectDiagram,
        value: 12,
        suffix: '+',
        labelEn: 'Projects Delivered',
        labelAr: 'مشروع منجز',
        color: '#D91E2A',
    },
    {
        id: 2,
        icon: FaClock,
        value: 2,
        suffix: '+',
        labelEn: 'Years Experience',
        labelAr: 'سنوات خبرة',
        color: '#1E5F7E',
    },
    {
        id: 3,
        icon: FaCertificate,
        value: 7,
        suffix: '',
        labelEn: 'Certificates',
        labelAr: 'شهادات',
        color: '#88CE02',
    },
    {
        id: 4,
        icon: FaHandshake,
        value: 6,
        suffix: '',
        labelEn: 'Services Offered',
        labelAr: 'خدمات مقدمة',
        color: '#a78bfa',
    },
];

const Stats = ({ lang = 'en' }) => {
    const sectionRef = useRef(null);
    const [counts, setCounts] = useState(stats.map(() => 0));
    const hasAnimated = useRef(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate cards entrance
            gsap.fromTo(
                '.stat-card',
                { y: 60, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        once: true,
                        onEnter: () => {
                            if (hasAnimated.current) return;
                            hasAnimated.current = true;

                            // Animate counters
                            stats.forEach((stat, index) => {
                                const obj = { val: 0 };
                                gsap.to(obj, {
                                    val: stat.value,
                                    duration: 2,
                                    delay: index * 0.15,
                                    ease: 'power2.out',
                                    onUpdate: () => {
                                        setCounts(prev => {
                                            const newCounts = [...prev];
                                            newCounts[index] = Math.round(obj.val);
                                            return newCounts;
                                        });
                                    },
                                });
                            });
                        },
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-16 px-4 relative overflow-hidden"
            aria-label={lang === 'ar' ? 'إحصائيات' : 'Statistics'}
        >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent-crimson/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                        const IconComp = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className="stat-card group relative p-6 md:p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-black/5 text-center transition-all duration-500 hover:border-white/15 hover:bg-white/[0.06] opacity-0"
                            >
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                    style={{ backgroundColor: stat.color }}
                                />

                                {/* Icon */}
                                <div
                                    className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-black/5 transition-all duration-500 group-hover:scale-110 group-hover:bg-black/10"
                                    style={{ color: stat.color }}
                                >
                                    <IconComp className="w-6 h-6" />
                                </div>

                                {/* Counter */}
                                <div
                                    className="font-display text-3xl md:text-4xl font-bold mb-2 transition-colors duration-500"
                                    style={{ color: stat.color }}
                                >
                                    {counts[index]}{stat.suffix}
                                </div>

                                {/* Label */}
                                <p className="text-text-slate text-sm font-medium">
                                    {lang === 'ar' ? stat.labelAr : stat.labelEn}
                                </p>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-3/4 transition-all duration-500 rounded-full"
                                    style={{ backgroundColor: stat.color }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;

