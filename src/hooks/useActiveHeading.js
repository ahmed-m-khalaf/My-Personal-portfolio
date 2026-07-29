import { useState, useEffect } from 'react';

export function useActiveHeading(headingIds) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { 
        // Trigger slightly before the heading hits the top of the screen (adjusting for navbar)
        rootMargin: '-100px 0px -80% 0px' 
      }
    );

    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headingIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headingIds]);

  return activeId;
}
