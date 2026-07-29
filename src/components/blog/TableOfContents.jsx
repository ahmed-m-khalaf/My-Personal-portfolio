import React from 'react';
import { useActiveHeading } from '../../hooks/useActiveHeading';

// Dummy headings for Sprint 2 (Static UI phase)
// In Sprint 3, this will be dynamically generated from MDX
const dummyHeadings = [
  { id: 'introduction', title: 'Introduction', titleAr: 'مقدمة', level: 2 },
  { id: 'why-performance-matters', title: 'Why Performance Matters', titleAr: 'لماذا الأداء مهم؟', level: 2 },
  { id: 'tip-1-usememo', title: 'Tip 1: useMemo', titleAr: 'نصيحة 1: useMemo', level: 3 },
  { id: 'tip-2-usecallback', title: 'Tip 2: useCallback', titleAr: 'نصيحة 2: useCallback', level: 3 },
  { id: 'conclusion', title: 'Conclusion', titleAr: 'الخاتمة', level: 2 },
];

const TableOfContents = ({ lang }) => {
  const isAr = lang === 'ar';
  const headingIds = dummyHeadings.map(h => h.id);
  const activeId = useActiveHeading(headingIds);

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed navbar + breathing room
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto hidden lg:block">
      <h4 className="text-sm font-semibold text-text-white mb-4 uppercase tracking-wider">
        {isAr ? 'محتويات المقال' : 'On this page'}
      </h4>
      <ul className="space-y-3 border-l-2 border-white/5 pl-4 rtl:pl-0 rtl:border-l-0 rtl:border-r-2 rtl:pr-4 transition-colors">
        {dummyHeadings.map((heading) => {
          const isActive = activeId === heading.id;
          const displayTitle = isAr && heading.titleAr ? heading.titleAr : heading.title;
          
          return (
            <li 
              key={heading.id} 
              className={`${heading.level === 3 ? 'ml-4 rtl:ml-0 rtl:mr-4' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`text-sm transition-all duration-300 block relative ${
                  isActive 
                    ? 'text-accent-crimson font-medium translate-x-1 rtl:-translate-x-1' 
                    : 'text-text-slate hover:text-text-gray'
                }`}
              >
                {isActive && (
                  <span className="absolute -left-[21px] rtl:-left-auto rtl:-right-[21px] top-1/2 -translate-y-1/2 w-[3px] h-4 bg-accent-crimson rounded-full" />
                )}
                {displayTitle}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TableOfContents;
