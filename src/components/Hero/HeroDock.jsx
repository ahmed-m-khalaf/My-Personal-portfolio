import React, { memo } from 'react';
import { getHeroData } from './hero.constants';
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

const iconMap = {
    github: FaGithub,
    linkedin: FaLinkedin,
    email: FaEnvelope,
    facebook: FaFacebook,
    instagram: FaInstagram
};

const HeroDock = ({ lang = 'en' }) => {
    const data = getHeroData(lang);
    
    return (
        <div 
            className="inline-flex items-center gap-3 p-3 rounded-2xl glass-card border border-white/10 shadow-xl shadow-black/30"
            data-animate="dock"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
            {data.socials.map((social) => {
                const Icon = iconMap[social.icon];
                return (
                    <a
                        key={social.name}
                        href={social.url}
                        target={social.url.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl text-text-slate transition-transform transition-colors duration-300 hover:text-white hover:bg-white/10 hover:scale-105"
                        aria-label={social.name}
                    >
                        <Icon className="w-5 h-5" />
                    </a>
                );
            })}
        </div>
    );
};

export default memo(HeroDock);
