import React, { useState, useEffect, memo } from 'react';
import { getHeroData } from './hero.constants';

const HeroContent = ({ lang = 'en' }) => {
    const data = getHeroData(lang);
    const titles = data.roles;
    const [titleIndex, setTitleIndex] = useState(0);
    const isArabic = lang === 'ar';

    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [titles.length]);

    return (
        <div 
            className="flex flex-col items-center lg:items-start text-center lg:text-start w-full"
            data-animate="content"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
            <h1 
                className="text-5xl md:text-7xl font-display font-bold text-text-white mb-4 tracking-tight flex flex-wrap justify-center lg:justify-start"
                dir={isArabic ? "rtl" : "ltr"}
            >
                {isArabic ? (
                    data.name.split(' ').map((word, i) => (
                        <span key={i} className="interactive-letter cursor-default inline-block mx-2">
                            {word}
                        </span>
                    ))
                ) : (
                    data.name.split('').map((char, i) => (
                        <span 
                            key={i} 
                            className={`interactive-letter cursor-default inline-block ${char === ' ' ? 'w-4' : ''}`}
                        >
                            {char}
                        </span>
                    ))
                )}
            </h1>
            
            <div className="h-10 overflow-hidden mb-6">
                <div 
                    className="flex flex-col transition-transform duration-700 ease-[cubic-bezier(.22,.61,.36,1)]"
                    style={{ transform: `translateY(-${titleIndex * 40}px)` }}
                >
                    {titles.map((title, i) => (
                        <h2 key={i} className="text-2xl md:text-3xl font-mono text-accent-crimson h-10 flex items-center justify-center lg:justify-start">
                            {title}
                        </h2>
                    ))}
                </div>
            </div>

            <p className="text-lg text-text-slate max-w-lg mb-10 leading-relaxed">
                {data.tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a 
                    href={data.buttons.primary.href}
                    className="px-8 py-3.5 rounded-xl bg-accent-crimson text-white font-medium shadow-lg hover:-translate-y-[2px] hover:shadow-accent-crimson/30 transition-transform transition-colors duration-300"
                >
                    {data.buttons.primary.label}
                </a>
                <a 
                    href={data.buttons.secondary.href}
                    className="px-8 py-3.5 rounded-xl glass-card text-white font-medium hover:-translate-y-[2px] hover:bg-white/10 transition-transform transition-colors duration-300"
                >
                    {data.buttons.secondary.label}
                </a>
            </div>
        </div>
    );
};

export default memo(HeroContent);
