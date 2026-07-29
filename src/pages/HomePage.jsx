import React, { lazy, Suspense } from 'react';
import { Hero } from '../components';

// Lazy load below-the-fold components for better initial load performance
const About = lazy(() => import('../components/About'));
const Stats = lazy(() => import('../components/Stats'));
const Skills = lazy(() => import('../components/Skills'));
const Services = lazy(() => import('../components/Services'));
const Projects = lazy(() => import('../components/Projects'));
const Certificates = lazy(() => import('../components/Certificates'));
const Contact = lazy(() => import('../components/Contact'));

// Loading spinner component
const SectionLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 0' }}>
    <div style={{ width: '2rem', height: '2rem', border: '2px solid #D91E2A', borderTopColor: 'transparent', borderRadius: '50%' }} className="animate-spin"></div>
  </div>
);

// Section divider — subtle gradient fade between sections
const SectionDivider = () => (
  <div className="relative h-px max-w-4xl mx-auto" aria-hidden="true">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
  </div>
);

const HomePage = ({ lang }) => {
  return (
    <>
      <Hero lang={lang} />

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
    </>
  );
};

export default HomePage;
