import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { getT } from '../data/translations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagneticEffect from '../hooks/useMagneticEffect';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
    { key: 'home', href: '/#home', isHash: true },
    { key: 'about', href: '/#about', isHash: true },
    { key: 'skills', href: '/#skills', isHash: true },
    { key: 'services', href: '/#services', isHash: true },
    { key: 'projects', href: '/#projects', isHash: true },
    { key: 'certificates', href: '/#certificates', isHash: true },
    { key: 'blog', href: '/blog', isHash: false },
    { key: 'contact', href: '/#contact', isHash: true },
];

const Navbar = ({ lang, setLang }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sectionProgress, setSectionProgress] = useState({});
    const [activeSection, setActiveSection] = useState('home');
    const location = useLocation();
    const logoRef = useRef(null);
    const ctaRef = useRef(null);
    
    const isHomePage = location.pathname === '/';
    const t = getT(lang);

    // Magnetic effect on CTA button
    useMagneticEffect(ctaRef, { strength: 0.25 });

    // Logo morph on scroll
    useEffect(() => {
        if (!logoRef.current) return;
        const ctx = gsap.context(() => {
            gsap.to(logoRef.current, {
                scale: 0.9,
                letterSpacing: '0px',
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: '200px top',
                    scrub: 0.5,
                },
            });
        });
        return () => ctx.revert();
    }, []);

    const calculateProgress = useCallback(() => {
        if (!isHomePage) return;

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const progress = {};
        let currentActive = 'home';

        navLinks.forEach((link) => {
            if (!link.isHash) return;
            const sectionId = link.href.replace('/#', '');
            const section = document.getElementById(sectionId);

            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top + scrollY;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;

                const scrollStart = sectionTop - viewportHeight * 0.3; 
                const scrollEnd = sectionBottom - viewportHeight * 0.5;

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
    }, [isHomePage]);

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
        
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
        setSectionProgress(prev => ({ ...prev, _global: scrollProgress }));

        setTimeout(calculateProgress, 100);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [calculateProgress]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleLang = () => {
        setLang(lang === 'ar' ? 'en' : 'ar');
    };

    const getLinkProps = (link) => {
        if (link.isHash && isHomePage) {
            return { as: 'a', href: link.href.replace('/', '') };
        }
        return { as: Link, to: link.href };
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3 bg-bg-abyss/90 backdrop-blur-xl border-b border-black/10 shadow-lg'
                : 'py-5 bg-transparent'
                }`}
        >
            <div className="absolute top-0 left-0 w-full h-[2px] z-50 bg-black/5">
                <div 
                    className="h-full bg-gradient-to-r from-accent-crimson to-accent-sapphire"
                    style={{ width: `${sectionProgress._global || 0}%`, transition: 'width 0.1s' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between mt-1">
                <Link
                    to="/"
                    onClick={() => { if (isHomePage) window.scrollTo(0,0) }}
                    className="flex items-center gap-2 font-display font-bold transition-all duration-300 hover:scale-110"
                >
                    <span
                        ref={logoRef}
                        className="text-3xl bg-gradient-to-r from-accent-crimson via-card-midnight to-accent-sapphire bg-clip-text text-transparent"
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '2px',
                        }}
                    >
                        AMK.
                    </span>
                </Link>

                <ul className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const label = t(`nav.${link.key}`, link.key);
                        const sectionId = link.isHash ? link.href.replace('/#', '') : link.key;
                        
                        let isActive = false;
                        if (link.isHash) {
                            isActive = isHomePage && activeSection === sectionId;
                        } else {
                            isActive = location.pathname.startsWith(link.href);
                        }

                        const { as: Component, ...linkProps } = getLinkProps(link);

                        return (
                            <li key={link.key} className="relative">
                                <Component
                                    {...linkProps}
                                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 relative flex items-center justify-center ${isActive
                                        ? 'text-text-white font-medium bg-black/10 shadow-inner'
                                        : 'text-text-gray hover:text-text-white hover:bg-black/5'
                                        }`}
                                >
                                    {label}
                                </Component>
                                {isActive && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-crimson shadow-[0_0_8px_rgba(217,30,42,0.8)]" />
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className="hidden md:flex items-center gap-3">
                    <button
                        type="button"
                        onClick={toggleLang}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black/5 border border-black/10 text-text-white font-semibold text-sm hover:bg-black/10 transition-all duration-300"
                        aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                    >
                        <FaGlobe className="w-4 h-4 text-accent-crimson" />
                        {t('nav.toggleLang')}
                    </button>

                    {isHomePage ? (
                        <a
                            ref={ctaRef}
                            href="#contact"
                            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent-crimson text-white font-semibold text-sm hover:bg-accent-crimson/90 hover:shadow-lg hover:shadow-accent-crimson/25 transition-all duration-300"
                        >
                            {t('nav.letsTalk')}
                        </a>
                    ) : (
                        <Link
                            ref={ctaRef}
                            to="/#contact"
                            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-accent-crimson text-white font-semibold text-sm hover:bg-accent-crimson/90 hover:shadow-lg hover:shadow-accent-crimson/25 transition-all duration-300"
                        >
                            {t('nav.letsTalk')}
                        </Link>
                    )}
                </div>

                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-3 rounded-lg bg-black/5 border border-black/10 text-text-white hover:text-accent-crimson hover:bg-black/10 transition-all duration-300"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes className="w-7 h-7" />
                    ) : (
                        <FaBars className="w-7 h-7" />
                    )}
                </button>
            </div>

            <div
                className={`md:hidden absolute top-full left-0 right-0 bg-bg-abyss/98 backdrop-blur-2xl border-b border-black/10 transition-all duration-300 ease-out origin-top shadow-2xl h-screen ${isMobileMenuOpen
                    ? 'opacity-100 scale-y-100'
                    : 'opacity-0 scale-y-0 pointer-events-none'
                    }`}
            >
                <ul className="flex flex-col py-6 px-4 gap-2">
                    {navLinks.map((link, index) => {
                        const sectionId = link.isHash ? link.href.replace('/#', '') : link.key;
                        
                        let isActive = false;
                        if (link.isHash) {
                            isActive = isHomePage && activeSection === sectionId;
                        } else {
                            isActive = location.pathname.startsWith(link.href);
                        }

                        const mobileLabel = t(`nav.${link.key}`, link.key);
                        const { as: Component, ...linkProps } = getLinkProps(link);
                        
                        return (
                            <li 
                                key={link.key} 
                                className="relative transition-all duration-300"
                                style={{ 
                                    opacity: isMobileMenuOpen ? 1 : 0, 
                                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                                    transitionDelay: isMobileMenuOpen ? `${index * 0.05}s` : '0s'
                                }}
                            >
                                <Component
                                    {...linkProps}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-6 py-4 rounded-xl transition-all ${isActive
                                        ? 'text-text-white bg-black/10 font-medium'
                                        : 'text-text-gray hover:text-text-white hover:bg-black/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{mobileLabel}</span>
                                        {isActive && (
                                            <div className="w-2 h-2 rounded-full bg-accent-crimson shadow-[0_0_8px_rgba(217,30,42,0.8)]" />
                                        )}
                                    </div>
                                </Component>
                            </li>
                        );
                    })}

                    <li 
                        className="px-2 pt-4 mt-4 border-t border-black/10 transition-all duration-300"
                        style={{ 
                            opacity: isMobileMenuOpen ? 1 : 0, 
                            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                            transitionDelay: isMobileMenuOpen ? `${navLinks.length * 0.05}s` : '0s'
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => { toggleLang(); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-black/5 border border-black/10 text-text-white font-semibold hover:bg-black/10 transition-all"
                        >
                            <FaGlobe className="w-4 h-4 text-accent-crimson" />
                            {t('nav.toggleLang')}
                        </button>
                    </li>

                    <li 
                        className="px-2 pt-3 transition-all duration-300"
                        style={{ 
                            opacity: isMobileMenuOpen ? 1 : 0, 
                            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                            transitionDelay: isMobileMenuOpen ? `${(navLinks.length + 1) * 0.05}s` : '0s'
                        }}
                    >
                        {isHomePage ? (
                            <a
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-center px-5 py-3 rounded-xl bg-accent-crimson text-white font-semibold hover:bg-accent-crimson/90 transition-all shadow-lg shadow-accent-crimson/20"
                            >
                                {t('nav.letsTalk')}
                            </a>
                        ) : (
                            <Link
                                to="/#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-center px-5 py-3 rounded-xl bg-accent-crimson text-white font-semibold hover:bg-accent-crimson/90 transition-all shadow-lg shadow-accent-crimson/20"
                            >
                                {t('nav.letsTalk')}
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
