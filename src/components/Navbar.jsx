import React, { useState, useEffect, useCallback } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sectionProgress, setSectionProgress] = useState({});
    const [activeSection, setActiveSection] = useState('home');

    const calculateProgress = useCallback(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const progress = {};
        let currentActive = 'home';

        navLinks.forEach((link, index) => {
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
                        const sectionId = link.href.replace('#', '');
                        const progress = sectionProgress[sectionId] || 0;
                        const isActive = activeSection === sectionId;

                        return (
                            <li key={link.name} className="relative">
                                <a
                                    href={link.href}
                                    className={`text-sm transition-colors duration-200 relative block pb-1 ${isActive
                                        ? 'text-text-white'
                                        : 'text-text-gray hover:text-text-white'
                                        }`}
                                >
                                    {link.name}
                                </a>
                                {/* Progress Bar */}
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-accent-crimson to-accent-sapphire rounded-full transition-all duration-150 ease-out"
                                        style={{
                                            width: `${progress}%`,
                                            boxShadow: progress > 0 ? '0 0 8px rgba(217, 30, 42, 0.5)' : 'none'
                                        }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>

                {/* CTA Button - Desktop */}
                <a
                    href="#contact"
                    className="hidden md:inline-flex items-center px-5 py-2.5 rounded-lg bg-accent-crimson text-white font-semibold text-sm hover:bg-accent-crimson/90 hover:shadow-lg hover:shadow-accent-crimson/25 transition-all duration-300"
                >
                    Let's Talk
                </a>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="md:hidden p-2 text-text-white hover:text-accent-crimson transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <FaTimes className="w-6 h-6" />
                    ) : (
                        <FaBars className="w-6 h-6" />
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

                        return (
                            <li key={link.name} className="relative">
                                <a
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-6 py-3 transition-colors ${isActive
                                        ? 'text-text-white bg-white/5'
                                        : 'text-text-gray hover:text-text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{link.name}</span>
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
                    <li className="px-4 pt-4">
                        <a
                            href="#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block text-center px-5 py-3 rounded-lg bg-accent-crimson text-white font-semibold hover:bg-accent-crimson/90 transition-all"
                        >
                            Let's Talk
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
