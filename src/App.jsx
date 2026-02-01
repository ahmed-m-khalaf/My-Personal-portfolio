import React, { useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Navbar, Footer, Hero } from './components';
import Noise from './components/Noise';
import ScrollToTop from './components/ScrollToTop';

// Lazy load below-the-fold components for better initial load performance
const About = lazy(() => import('./components/About'));
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

function App() {
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

  return (
    <div className="min-h-screen bg-bg-abyss text-text-gray relative overflow-x-hidden">
      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent-crimson focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Noise />
      <Navbar />

      <main id="main-content">
        <Hero />

        {/* Lazy loaded sections with Suspense */}
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Services />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certificates />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}

export default App;
