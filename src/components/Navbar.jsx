import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { getT } from '../data/translations';


const navLinks = [

    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'services', href: '#services' },
    { key: 'projects', href: '#projects' },
    { key: 'certificates', href: '#certificates' },
    { key: 'contact', href: '#contact' },
];

const Navbar = ({ lang, setLang }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sectionProgress, setSectionProgress] = useState({});
    const [activeSection, setActiveSection] = useState('home');

    const t = getT(lang);

    const calculateProgress = useCallback(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const progress = {};
        let currentActive = 'home';

        navLinks.forEach((link) => {
            const sectionId = link.href.replace('#', '');
            const section = document.getElementById(sectionId);

            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                // Calculate how much of this section has been scrolled through
                const scrollStart = sectionTop - viewportHeight * 0.3; // Start when section is 30% into view
                const scrollEnd = sectionBottom - viewportHeight * 0.5; // End when 50% past section top

                if (scrollY >= scrollStart && scrollY <= scrollEnd) {
                    const scrollRange = scrollEnd - scrollStart;
                    const scrolled = scrollY - scrollStart;
                    progress[sectionId] = Math.min(100, Math.max(0, (scrolled / scrollRange) * 100));
                    currentActive = sectionId;
                } else if (scrollY > scrollEnd) {
                    progress[sectionId] = 100;
                } else {
                    progress[sectionId] = 0;
                }
            }
        });

        setSectionProgress(progress);
        setActiveSection(currentActive);
    }, []);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    calculateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial calculation
        setTimeout(calculateProgress, 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [calculateProgress]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleLang = () => {
        setLang(lang === 'ar' ? 'en' : 'ar');
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3 bg-bg-abyss/80 backdrop-blur-xl border-b border-white/10'
                : 'py-5 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <a
                    href="#home"
                    className="flex items-center gap-2 font-display font-bold transition-all duration-300 hover:scale-119"
                >
                    <span
                        className="text-3xl bg-gradient-to-r from-accent-crimson via-card-midnight to-accent-sapphire bg-clip-text text-transparent"
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        AMK.
                    </span>
                </a>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const label = t(`nav.${link.key}`, link.key);
                        const sectionId = link.href.replace('#', '');

                        // note: for active/progress we use sectionId, but label uses translated `name`
                        const progress = sectionProgress[sectionId] || 0;
                        const isActive = activeSection === sectionId;

                        return (
                            <li key={link.key} className="relative">
                                <a
                                    href={link.href}
                                    className={`text-sm transition-all duration-300 relative block pb-2 ${isActive
                                        ? 'text-text-white font-medium'
                                        : 'text-text-gray hover:text-text-white'
                                        }`}
                                >
                                    {label}
                                </a>
                                {/* Enhanced Progress Bar */}
                                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-200 ease-out"
                                        style={{
                                            width: `${progress}%`,
                                            background: progress > 0
                                                ? 'linear-gradient(90deg, #D91E2A, #1E5F7E)'
                                                : 'transparent',
                                            boxShadow: progress > 50
                                                ? '0 0 12px rgba(217, 30, 42, 0.6), 0 0 4px rgba(30, 95, 126, 0.4)'
                                                : progress > 0
                                                    ? '0 0 6px rgba(217, 30, 42, 0.3)'
                                                    : 'none'
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* Desktop Right Buttons */}
                <div className="hidden md:flex items-center gap-3">
                    {/* Language Toggle Button */}
                    <button
                        type="button"
                        onClick={toggleLang}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300"
                        aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                    >
                        <FaGlobe className="w-4 h-4 text-accent-crimson" />
                        {t('nav.toggleLang')}
                    </button>

                    {/* CTA Button */}
                    <a
                        href="#contact"
                        className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent-crimson text-white font-semibold text-sm hover:bg-accent-crimson/90 hover:shadow-lg hover:shadow-accent-crimson/25 transition-all duration-300"
                    >
                        {t('nav.letsTalk')}
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-3 rounded-lg bg-white/5 border border-white/10 text-text-white hover:text-accent-crimson hover:bg-white/10 transition-all duration-300"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes className="w-7 h-7" />
                    ) : (
                        <FaBars className="w-7 h-7" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-bg-abyss/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 ${isMobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
            >
                <ul className="flex flex-col py-4">
                    {navLinks.map((link) => {
                        const sectionId = link.href.replace('#', '');
                        const progress = sectionProgress[sectionId] || 0;
                        const isActive = activeSection === sectionId;

                        const mobileLabel = t(`nav.${link.key}`, link.key);
                        return (
                            <li key={link.key} className="relative">
                                <a
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-6 py-3 transition-colors ${isActive
                                        ? 'text-text-white bg-white/5'
                                        : 'text-text-gray hover:text-text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{mobileLabel}</span>
                                        {/* Mobile Progress Indicator */}
                                        <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-accent-crimson to-accent-sapphire rounded-full"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </a>
                            </li>
                        );
                    })}

                    {/* Mobile Language Toggle */}
                    <li className="px-4 pt-3">
                        <button
                            type="button"
                            onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-text-white font-semibold hover:bg-white/10 transition-all"
                        >
                            <FaGlobe className="w-4 h-4 text-accent-crimson" />
                            {t('nav.toggleLang')}
                        </button>
                    </li>

                    <li className="px-4 pt-3">
                        <a
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-center px-5 py-3 rounded-lg bg-accent-crimson text-white font-semibold hover:bg-accent-crimson/90 transition-all"
                        >
                            {t('nav.letsTalk')}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
