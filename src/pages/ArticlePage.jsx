import React, { useEffect, Suspense, lazy } from 'react';
const modules = import.meta.glob('../content/blog/**/*.mdx');
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaRegClock } from 'react-icons/fa';

import { getPostBySlug } from '../lib/blog';
import ReadingProgress from '../components/blog/ReadingProgress';
import TableOfContents from '../components/blog/TableOfContents';
import ShareButtons from '../components/blog/ShareButtons';

const ArticlePage = ({ lang }) => {
  const { slug } = useParams();
  const post = getPostBySlug(slug, lang);
  const isAr = lang === 'ar';

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const displayTitle = isAr && post.titleAr ? post.titleAr : post.title;
  const displayExcerpt = isAr && post.excerptAr ? post.excerptAr : post.excerpt;

  // Dynamically load the MDX component based on slug and language
  const expectedPath = `../content/blog/${slug}/index.${lang}.mdx`;
  const fallbackPathAr = `../content/blog/${slug}/index.ar.mdx`;
  const fallbackPathEn = `../content/blog/${slug}/index.en.mdx`;
  
  const loadMdx = modules[expectedPath] || modules[fallbackPathAr] || modules[fallbackPathEn];
  const MDXContent = loadMdx ? lazy(loadMdx) : null;

  return (
    <>
      <Helmet>
        <title>{displayTitle} | AMK Blog</title>
        <meta name="description" content={displayExcerpt} />
        {post.seoTitle && <meta name="title" content={post.seoTitle} />}
        {post.keywords && <meta name="keywords" content={post.keywords.join(', ')} />}
        {post.canonical && <link rel="canonical" href={post.canonical} />}
        
        {/* Open Graph (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayExcerpt} />
        {post.cover && <meta property="og:image" content={`https://amk.tech${post.cover}`} />}
        {post.canonical && <meta property="og:url" content={post.canonical} />}
        <meta property="og:site_name" content="AMK Blog" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={post.date} />
        {post.tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={displayExcerpt} />
        {post.cover && <meta name="twitter:image" content={`https://amk.tech${post.cover}`} />}
      </Helmet>

      {/* Thin animated line tracking scroll depth */}
      <ReadingProgress />

      <article className="min-h-screen bg-bg-abyss pt-32 pb-20 px-4 relative">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-accent-sapphire/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 xl:gap-16 relative z-10">
          
          {/* Left Sidebar (Desktop) - Back Button & Author Info */}
          <aside className="hidden lg:block w-48 shrink-0 relative">
            <div className="sticky top-32 flex flex-col gap-10">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-text-slate hover:text-accent-crimson transition-colors duration-300 font-medium group"
              >
                <span className={`transform transition-transform group-hover:${isAr ? 'translate-x-1' : '-translate-x-1'}`}>
                  {isAr ? <FaArrowRight /> : <FaArrowLeft />}
                </span>
                <span>{isAr ? 'العودة للمدونة' : 'Back to Blog'}</span>
              </Link>

              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent-crimson to-accent-sapphire p-[2px] shadow-lg shadow-accent-crimson/20">
                  <div className="w-full h-full rounded-full bg-bg-abyss overflow-hidden">
                    <img src="/assets/avatar.jpg" alt="Ahmed" className="w-full h-full object-cover opacity-90" />
                  </div>
                </div>
                <div>
                  <p className="text-text-white font-semibold text-sm">Ahmed M. Khalaf</p>
                  <p className="text-text-slate text-xs mt-1">Frontend Engineer</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 max-w-3xl w-full mx-auto">
            {/* Mobile Back Button */}
            <Link 
              to="/blog" 
              className="lg:hidden inline-flex items-center gap-2 text-text-slate hover:text-accent-crimson transition-colors duration-300 font-medium mb-8 group"
            >
              <span className={`transform transition-transform group-hover:${isAr ? 'translate-x-1' : '-translate-x-1'}`}>
                {isAr ? <FaArrowRight /> : <FaArrowLeft />}
              </span>
              <span>{isAr ? 'العودة للمدونة' : 'Back to Blog'}</span>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent-crimson/10 text-accent-crimson border border-accent-crimson/20 capitalize">
                  {post.category}
                </span>
                <span className="text-text-slate text-sm flex items-center gap-2">
                  <FaCalendarAlt /> {post.date}
                </span>
                <span className="text-text-slate text-sm flex items-center gap-2">
                  <FaRegClock /> {post.readingTime} {isAr ? 'د' : 'min'}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-white leading-[1.15] mb-8">
                {displayTitle}
              </h1>
              {/* Image Banner */}
              <div className="w-full h-[300px] md:h-[400px] rounded-2xl bg-card-midnight relative overflow-hidden mb-12 border border-white/5 shadow-2xl">
                {post.cover ? (
                  <img src={post.cover} alt={displayTitle} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-sapphire via-bg-abyss to-accent-crimson" />
                    <div className="absolute inset-0 bg-black/10" />
                  </>
                )}
              </div>
            </header>

            {/* Article Prose (Real MDX Content) */}
            <div className="prose">
              <Suspense fallback={
                <div className="animate-pulse flex flex-col gap-4 py-10">
                  <div className="h-4 bg-white/5 rounded w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded w-full"></div>
                  <div className="h-4 bg-white/5 rounded w-5/6"></div>
                  <div className="h-4 bg-white/5 rounded w-2/3 mt-6"></div>
                </div>
              }>
                {MDXContent ? <MDXContent /> : <p className="text-center text-text-slate py-20">Content not found.</p>}
              </Suspense>
            </div>

            {/* Post Metadata & Sharing */}
            <div className="mt-16 flex flex-wrap gap-2">
               {post.tags?.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-md bg-white/5 text-text-slate border border-white/5">
                    #{tag}
                  </span>
               ))}
            </div>
            
            <ShareButtons 
              url={typeof window !== 'undefined' ? window.location.href : ''} 
              title={displayTitle} 
              lang={lang} 
            />
          </main>

          {/* Right Sidebar (Desktop) - Table of Contents */}
          <aside className="hidden xl:block w-64 shrink-0 relative">
            <TableOfContents lang={lang} />
          </aside>

        </div>
      </article>
    </>
  );
};

export default ArticlePage;
