import React from 'react';
import { getHeroData } from './hero.constants';

const AvailabilityBadge = ({ lang }) => {
    const data = getHeroData(lang);
    return (
        <div className="absolute -bottom-4 bg-bg-abyss/80 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-text-white whitespace-nowrap">
                {data.availability}
            </span>
        </div>
    );
};

const HeroAvatar = ({ avatarSrc, lang = 'en' }) => {
    const data = getHeroData(lang);
    return (
        <div 
            className="relative flex flex-col items-center justify-center animate-float mt-0 lg:mt-12"
            data-animate="avatar"
            style={{ opacity: 0, transform: 'translateY(20px)' }} // Initial state for GSAP
        >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl glass-card p-3">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white/5">
                    <img 
                        src={avatarSrc} 
                        alt={data.name} 
                        fetchPriority="high"
                        loading="eager"
                        className="w-full h-full object-cover object-top filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-700"
                    />
                </div>
            </div>
            <AvailabilityBadge lang={lang} />
        </div>
    );
};

export default HeroAvatar;
