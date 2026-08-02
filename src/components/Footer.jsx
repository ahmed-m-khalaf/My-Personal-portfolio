import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { socials } from '../data/socials';
import { about } from '../data/about';
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
        { name: t('nav.skills'), href: '#skills' },
        { name: t('nav.projects'), href: '#projects' },
        { name: t('nav.contact'), href: '#contact' },
    ];

    const contactInfo = [
        {
            icon: FaEnvelope,
            value: about.email,
            href: `mailto:${about.email}`,
        },
        {
            icon: FaPhone,
            value: about.phone,
            href: `tel:${about.phone.replace(/\s/g, '')}`,
        },
        {
            icon: FaMapMarkerAlt,
            value: t('content.about.location', about.location),
            href: null,
        },
    ];

    return (
        <footer className="bg-bg-abyss border-t border-black/10 relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/4 w-96 h-48 bg-accent-crimson/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-accent-sapphire/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 py-16 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <a
                            href="#home"
                            className="inline-block font-display text-2xl font-bold text-text-white transition-all duration-300 hover:scale-105"
                        >
                            AMK<span className="text-accent-crimson">.</span>
                        </a>
                        <p className="mt-4 text-text-slate text-sm leading-relaxed max-w-xs">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-semibold text-text-white mb-5 text-sm uppercase tracking-wider">
                            {t('sections.footerQuickLinks')}
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-text-slate hover:text-accent-crimson transition-all duration-300 text-sm hover:translate-x-1 inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-display font-semibold text-text-white mb-5 text-sm uppercase tracking-wider">
                            {t('sections.footerContact', 'Contact')}
                        </h4>
                        <ul className="space-y-3">
                            {contactInfo.map((info, index) => {
                                const content = (
                                    <span className="flex items-center gap-3 text-text-slate text-sm group-hover:text-text-white transition-colors duration-300">
                                        <info.icon className="w-4 h-4 text-accent-crimson flex-shrink-0" />
                                        <span className="break-all">{info.value}</span>
                                    </span>
                                );

                                return (
                                    <li key={index} className="group">
                                        {info.href ? (
                                            <a href={info.href} className="block">
                                                {content}
                                            </a>
                                        ) : (
                                            <div>{content}</div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="font-display font-semibold text-text-white mb-5 text-sm uppercase tracking-wider">
                            {t('sections.footerConnect')}
                        </h4>
                        <div className="flex gap-3 flex-wrap">
                            {socials.filter(s => s.icon !== 'FaEnvelope').map((social) => {
                                const IconComponent = iconMap[social.icon];
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 text-text-gray border border-black/5 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-lg hover:border-black/10"
                                        style={{
                                            '--hover-color': social.color
                                        }}
                                        aria-label={social.name}
                                    >
                                        {IconComponent && (
                                            <IconComponent
                                                className="w-4 h-4 transition-all duration-500 ease-out group-hover:text-[var(--hover-color)] group-hover:scale-110"
                                            />
                                        )}
                                        {/* Glow on hover */}
                                        <div
                                            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-all duration-500 ease-out"
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
                <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-text-slate text-sm">
                        © {currentYear} Ahmed M Khalaf. {t('footer.copyright')}
                    </p>
                    <p className="text-text-slate text-sm flex items-center gap-1.5">
                        {t('footer.madeBy')} <FaHeart className="text-accent-crimson w-3.5 h-3.5 animate-pulse" /> {t('footer.madeBySuffix')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

