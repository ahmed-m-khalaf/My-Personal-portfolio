import React, { memo } from 'react';
import { getHeroData } from './hero.constants';

const HeroStats = ({ lang = 'en' }) => {
    const data = getHeroData(lang);
    
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {data.stats.map((stat) => (
                <div 
                    key={stat.label}
                    className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center gap-1 border border-white/10 transition-transform duration-300 hover:-translate-y-1"
                    data-animate="stats"
                    style={{ opacity: 0, transform: 'translateY(20px)' }}
                >
                    <span className="text-3xl font-bold text-text-white mb-1">
                        {stat.value}
                    </span>
                    <span className="text-sm font-medium text-text-slate tracking-wider text-center">
                        {stat.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default memo(HeroStats);
