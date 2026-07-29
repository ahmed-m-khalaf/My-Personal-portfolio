import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Lenis from 'lenis';
import { Navbar, Footer } from './components';
import Noise from './components/Noise';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

import HomePage from './pages/HomePage';
// Will implement these in Sprint 2
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));

// Loading spinner for lazy routes
const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ width: '3rem', height: '3rem', border: '3px solid #D91E2A', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin"></div>
  </div>
);

function App() {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('lang') : null;
    return saved === 'ar' ? 'ar' : 'en';
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  // Handle scroll to top on route change (except hash links within the same page)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Persist language choice and handle view transitions
  useEffect(() => {
    const updateLang = () => {
      window.localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    };

    if (document.startViewTransition && document.documentElement.lang !== lang && document.documentElement.lang !== '') {
      document.startViewTransition(() => {
        updateLang();
      });
    } else {
      updateLang();
    }
  }, [lang]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling globally
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

    const ctx = gsap.context(() => {});

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

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-accent-crimson focus:text-white focus:rounded-lg focus:outline-none"
        >
          {lang === 'ar' ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>

        <Noise />
        <Navbar lang={lang} setLang={setLang} />

        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage lang={lang} />} />
              <Route path="/blog" element={<BlogPage lang={lang} />} />
              <Route path="/blog/:slug" element={<ArticlePage lang={lang} />} />
            </Routes>
          </Suspense>
        </main>

        <Footer lang={lang} />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
