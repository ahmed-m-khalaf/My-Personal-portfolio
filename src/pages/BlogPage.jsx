import React, { useEffect, useRef, useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogHero from '../components/blog/BlogHero';
import BlogCard from '../components/blog/BlogCard';
import { getAllPosts } from '../lib/blog';
import { Helmet } from 'react-helmet-async';

// Register ScrollTrigger if not already registered globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BlogPage = ({ lang }) => {
  const posts = getAllPosts(lang);
  const gridRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [posts]);

  // Setup Fuse.js
  const fuse = useMemo(() => new Fuse(posts, {
    keys: ['title', 'titleAr', 'excerpt', 'excerptAr', 'tags', 'category', 'keywords'],
    threshold: 0.3,
  }), [posts]);

  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    let result = posts;
    if (searchQuery.trim() !== '') {
      result = fuse.search(searchQuery).map(res => res.item);
    }
    if (selectedTag) {
      result = result.filter(post => post.tags?.includes(selectedTag));
    }
    return result;
  }, [posts, searchQuery, selectedTag, fuse]);

  useEffect(() => {
    // Scroll reveal animation for the cards
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          '.blog-card-item',
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [filteredPosts]); // Re-run animation when filtered posts change

  return (
    <>
      <Helmet>
        <title>{lang === 'ar' ? 'المدونة | أحمد م. خلف' : 'Blog | Ahmed M. Khalaf'}</title>
        <meta name="description" content={lang === 'ar' ? 'أفكار ومقالات حول تطوير واجهات المستخدم وتكنولوجيا الويب.' : 'Insights and articles on frontend development and web technology.'} />
      </Helmet>

      <div className="min-h-screen w-full relative">
        <BlogHero lang={lang} />
        
        <section className="py-20 px-4 relative z-10">
          <div className="max-w-7xl mx-auto" ref={gridRef}>
             
             {/* Section Header */}
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
               <h2 className="text-3xl font-display font-bold text-text-white flex items-center gap-4">
                 <span className="w-10 h-1.5 bg-gradient-to-r from-accent-crimson to-accent-sapphire rounded-full shadow-[0_0_15px_rgba(217,30,42,0.5)]"></span>
                 {lang === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
               </h2>
               
               {/* Search Box */}
               <div className="relative">
                  <div className={`absolute inset-y-0 ${lang === 'ar' ? 'right-0 pr-3' : 'left-0 pl-3'} flex items-center pointer-events-none`}>
                    <svg className="w-4 h-4 text-text-slate" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === 'ar' ? 'ابحث عن مقال...' : 'Search articles...'}
                    className={`w-full md:w-72 ${lang === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-text-white placeholder-text-slate focus:outline-none focus:border-accent-crimson/50 focus:ring-1 focus:ring-accent-crimson/50 transition-all`}
                  />
               </div>
             </div>

             {/* Tags Filter Row */}
             {allTags.length > 0 && (
               <div className="flex flex-wrap gap-2 mb-10">
                 <button
                   onClick={() => setSelectedTag(null)}
                   className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${!selectedTag ? 'bg-accent-crimson text-white shadow-lg shadow-accent-crimson/20' : 'bg-white/5 text-text-slate hover:bg-white/10 border border-white/5'}`}
                 >
                   {lang === 'ar' ? 'الكل' : 'All'}
                 </button>
                 {allTags.map(tag => (
                   <button
                     key={tag}
                     onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                     className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${selectedTag === tag ? 'bg-accent-sapphire text-white shadow-lg shadow-accent-sapphire/20' : 'bg-white/5 text-text-slate hover:bg-white/10 border border-white/5'}`}
                   >
                     {tag}
                   </button>
                 ))}
               </div>
             )}

             {/* Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {filteredPosts.map(post => (
                 <div key={post.slug} className="blog-card-item opacity-0">
                   <BlogCard post={post} lang={lang} />
                 </div>
               ))}
             </div>
             
             {filteredPosts.length === 0 && (
               <div className="text-center py-32 glass rounded-2xl border-white/5 mt-8">
                 <p className="text-text-slate text-xl font-medium">
                   {lang === 'ar' ? 'لم يتم العثور على مقالات تطابق بحثك.' : 'No articles found matching your criteria.'}
                 </p>
                 <button 
                   onClick={() => { setSearchQuery(''); setSelectedTag(null); }}
                   className="mt-4 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-colors border border-white/10"
                 >
                   {lang === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}
                 </button>
               </div>
             )}

          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPage;
