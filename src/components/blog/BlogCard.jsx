import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegClock, FaCalendarAlt } from 'react-icons/fa';

const BlogCard = ({ post, lang }) => {
  const isAr = lang === 'ar';
  
  return (
    <Link to={`/blog/${post.slug}`} className="block group h-full">
      <div className="glass rounded-2xl overflow-hidden hover-lift h-full flex flex-col border border-black/5 relative bg-bg-abyss/40 transition-all duration-500 hover:border-accent-crimson/30">
        
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-accent-crimson/0 via-transparent to-accent-sapphire/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
        
        {/* Image / Banner */}
        <div className="w-full h-52 bg-card-midnight relative overflow-hidden">
           {post.cover ? (
             <img 
               src={post.cover} 
               alt={isAr && post.titleAr ? post.titleAr : post.title} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
               loading="lazy"
             />
           ) : (
             <>
               {/* Fallback premium abstract background pattern */}
               <div className="absolute inset-0 mix-blend-overlay opacity-60 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-crimson via-bg-abyss to-accent-sapphire group-hover:scale-110 transition-transform duration-700 ease-out" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
             </>
           )}
           
           {/* Badges */}
           <div className="absolute top-4 left-4 flex gap-2">
             <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-bg-abyss/80 backdrop-blur-md text-white border border-black/10 shadow-lg capitalize">
                {post.category}
             </span>
             {post.featured && (
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-accent-crimson/90 backdrop-blur-md text-white shadow-lg shadow-accent-crimson/20">
                  {isAr ? 'مميز' : 'Featured'}
                </span>
             )}
           </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow relative z-10">
          <div className="flex items-center gap-5 text-xs text-text-slate mb-4 font-medium tracking-wide">
             <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-accent-crimson/70 text-sm" />
                <span>{post.date}</span>
             </div>
             <div className="flex items-center gap-2">
                <FaRegClock className="text-accent-sapphire/70 text-sm" />
                <span>{post.readingTime} {isAr ? 'د' : 'min'}</span>
             </div>
          </div>
          
          <h3 className="text-2xl font-display font-bold text-text-white mb-3 group-hover:text-accent-crimson transition-colors duration-300 line-clamp-2 leading-snug">
            {isAr && post.titleAr ? post.titleAr : post.title}
          </h3>
          
          <p className="text-text-gray/70 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
             {isAr && post.excerptAr ? post.excerptAr : post.excerpt}
          </p>
          
          {/* Tags Footer */}
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-black/5">
             {post.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-black/5 text-text-slate group-hover:bg-black/10 transition-colors border border-black/5">
                  #{tag}
                </span>
             ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

