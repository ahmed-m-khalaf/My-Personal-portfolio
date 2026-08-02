import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { getT } from '../../data/translations';

const BlogHero = ({ lang }) => {
  const t = getT(lang);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-content > *',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-40 pb-20 px-4 overflow-hidden">
      {/* Background Blobs for blog hero specific feel */}
      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-sapphire/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-crimson/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10 hero-content">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-sm font-medium text-accent-crimson">
          <span className="w-2 h-2 rounded-full bg-accent-crimson animate-pulse" />
          {lang === 'ar' ? 'منصة المحتوى' : 'Content Platform'}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-display font-bold text-text-white mb-6 leading-tight">
          {lang === 'ar' ? 'أفكار، تجارب، و' : 'Insights, Ideas, & '}
          <br className="hidden md:block" />
          <span className="animated-gradient-text">{lang === 'ar' ? 'كود نقي' : 'Clean Code'}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-slate max-w-2xl mx-auto leading-relaxed">
          {lang === 'ar' 
            ? 'مقالات متعمقة في تطوير الويب الحديث، تقنيات React المتقدمة، وهندسة واجهات المستخدم.'
            : 'Deep dives into modern web development, advanced React techniques, and frontend architecture.'}
        </p>
      </div>
    </section>
  );
};

export default BlogHero;

