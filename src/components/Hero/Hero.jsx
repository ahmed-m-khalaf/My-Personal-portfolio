import React, { useRef, useEffect } from 'react';
import HeroBackground from './HeroBackground';
import HeroGrid from './HeroGrid';
import HeroContent from './HeroContent';
import HeroAvatar from './HeroAvatar';
import HeroDock from './HeroDock';
import HeroStats from './HeroStats';
import { initHeroAnimations } from './HeroAnimations';
import avatarImg from '../../assets/avatar.jpg';

const Hero = ({ lang = 'en' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Strict separation: All animations logic is injected here
        const cleanup = initHeroAnimations(containerRef);
        return cleanup;
    }, []);

    return (
        <section 
            id="home" 
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-bg-abyss pt-24 pb-12"
            aria-label="Introduction"
        >
            <HeroBackground />
            
            <HeroGrid>
                {/* Main Content & Dock (8 cols desktop) */}
                <div className="lg:col-span-8 flex flex-col justify-center gap-8 order-2 lg:order-1">
                    <div className="glass-card rounded-[2.5rem] p-8 md:p-12 lg:p-16 border-white/10 shadow-2xl">
                        <HeroContent lang={lang} />
                    </div>
                    
                    <div className="flex justify-center lg:justify-start w-full">
                        <HeroDock lang={lang} />
                    </div>
                </div>

                {/* Avatar (4 cols desktop) */}
                <div className="lg:col-span-4 flex justify-center lg:justify-end order-1 lg:order-2">
                    <HeroAvatar lang={lang} avatarSrc={avatarImg} />
                </div>

                {/* Stats row (12 cols desktop) */}
                <div className="lg:col-span-12 mt-4 order-3">
                    <HeroStats lang={lang} />
                </div>
            </HeroGrid>
        </section>
    );
};

export default Hero;
