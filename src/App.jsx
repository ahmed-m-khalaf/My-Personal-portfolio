import React, { useEffect, useState, lazy, Suspense } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Navbar, Footer, Hero } from './components';
import Noise from './components/Noise';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

// Lazy load below-the-fold components for better initial load performance
const About = lazy(() => import('./components/About'));
const Stats = lazy(() => import('./components/Stats'));
const Skills = lazy(() => import('./components/Skills'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));

// Loading spinner component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-accent-crimson border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Section divider — subtle gradient fade between sections
const SectionDivider = () => (
  <div className="relative h-px max-w-4xl mx-auto" aria-hidden="true">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

function App() {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    return saved === 'ar' ? 'ar' : 'en';
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Persist language choice
  useEffect(() => {
    window.localStorage.setItem('lang', lang);
    // Update <html> lang and dir attributes for accessibility and CSS
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // GSAP Context
    const ctx = gsap.context(() => {
      // Global animations if any
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      <div dir={dir} lang={lang} className="min-h-screen bg-bg-abyss text-text-gray relative overflow-x-hidden">

      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent-crimson focus:text-white focus:rounded-lg focus:outline-none"
      >
        {lang === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
      </a>

      <Noise />
      <Navbar lang={lang} setLang={setLang} />


      <main id="main-content">
        <Hero lang={lang} />

        {/* Lazy loaded sections with Suspense */}
        <Suspense fallback={<SectionLoader />}>
          <About lang={lang} />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Stats lang={lang} />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Skills lang={lang} />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Services lang={lang} />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Projects lang={lang} />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Certificates lang={lang} />
        </Suspense>

        <SectionDivider />

        <Suspense fallback={<SectionLoader />}>
          <Contact lang={lang} />
        </Suspense>
      </main>

      <Footer lang={lang} />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
    </>
  );
}

export default App;
