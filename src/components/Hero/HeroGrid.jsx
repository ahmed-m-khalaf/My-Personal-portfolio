import React from 'react';

const HeroGrid = ({ children }) => {
    return (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {children}
        </div>
    );
};

export default HeroGrid;
