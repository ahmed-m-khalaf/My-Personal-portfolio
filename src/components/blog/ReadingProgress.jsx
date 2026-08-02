import React from 'react';
import { useReadingProgress } from '../../hooks/useReadingProgress';

const ReadingProgress = () => {
  const completion = useReadingProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-accent-crimson to-accent-sapphire"
        style={{ width: `${completion}%`, transition: 'width 0.1s ease-out' }}
      />
    </div>
  );
};

export default ReadingProgress;

