import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa';
import { socials } from '../data/socials';
import { getT } from '../data/translations';

const iconMap = {
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaFacebook: FaFacebook,
    FaInstagram: FaInstagram,
};

const Footer = ({ lang = 'en' }) => {
    const currentYear = new Date().getFullYear();
    const t = getT(lang);

    const quickLinks = [
        { name: t('nav.home'), href: '#home' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    return (
        <footer className="bg-bg-abyss border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                    {/* Logo & Description */}
                    <div>
                        <a
                            href="#home"
                            className="font-display text-2xl font-bold text-text-white"
                        >
                            7AMAMA🤍<span className="text-accent-crimson">.</span>
                        </a>
                        <p className="mt-4 text-text-slate text-sm max-w-xs">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold text-text-white mb-4">
                            {t('sections.footerQuickLinks')}
                        </h4>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-text-slate hover:text-accent-crimson transition-colors text-sm"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="font-display font-semibold text-text-white mb-4">
                            {t('sections.footerConnect')}
                        </h4>
                        <div className="flex gap-4">
                            {socials.map((social) => {
                                const IconComponent = iconMap[social.icon];
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 text-text-gray transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-lg"
                                        style={{
                                            '--hover-color': social.color
                                        }}
                                        aria-label={social.name}
                                    >
                                        {IconComponent && (
                                            <IconComponent
                                                className="w-5 h-5 transition-all duration-500 ease-out group-hover:text-[var(--hover-color)] group-hover:scale-110"
                                            />
                                        )}
                                        {/* Subtle glow on hover */}
                                        <div
                                            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-25 transition-all duration-500 ease-out"
                                            style={{
                                                backgroundColor: social.color,
                                                boxShadow: `0 6px 20px ${social.color}40`
                                            }}
                                        />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-slate text-sm">
                        © {currentYear} Ahmed M Khalaf. {t('footer.copyright')}
                    </p>
                    <p className="text-text-slate text-sm flex items-center gap-1">
                        {t('footer.madeBy')} <FaHeart className="text-accent-crimson w-4 h-4" /> {t('footer.madeBySuffix')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
