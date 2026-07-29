import React from 'react';
import { FaTwitter, FaLinkedinIn, FaLink } from 'react-icons/fa';

const ShareButtons = ({ url, title, lang }) => {
  const isAr = lang === 'ar';
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    // Future enhancement: show toast notification
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      color: 'hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 hover:border-[#1DA1F2]/50'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
      color: 'hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/50'
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10 mt-12 border-t border-white/10">
      <h3 className="text-sm font-semibold text-text-slate mb-6 uppercase tracking-wider">
        {isAr ? 'شارك المقال' : 'Share this article'}
      </h3>
      <div className="flex items-center gap-4">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 flex items-center justify-center rounded-full glass text-text-gray border-white/10 transition-all duration-300 ${link.color}`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopyLink}
          className="w-12 h-12 flex items-center justify-center rounded-full glass text-text-gray border-white/10 transition-all duration-300 hover:text-accent-crimson hover:bg-accent-crimson/10 hover:border-accent-crimson/50"
          aria-label="Copy link"
        >
          <FaLink />
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
