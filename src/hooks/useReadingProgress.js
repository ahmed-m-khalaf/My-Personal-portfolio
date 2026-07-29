import { useState, useEffect } from 'react';

export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    function updateScrollCompletion() {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', updateScrollCompletion, { passive: true });
    
    // Initial call
    updateScrollCompletion();
    
    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
    }
  }, []);

  return completion;
}
