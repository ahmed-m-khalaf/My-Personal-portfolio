import React, { useState, useEffect } from 'react';

const ProgressiveImage = ({ src, alt, placeholder = "transparent", className = "", ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(false); // Reset when src changes
        if (!src) return;
        
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setIsLoaded(true);
        };
        img.onerror = () => {
            // Handle error gracefully if needed
            setIsLoaded(true); // Prevent infinite blur if fails
        };
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`} {...props}>
            {/* Low res placeholder or solid color */}
            <div 
                className={`absolute inset-0 bg-black/5 transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-0' : 'opacity-100 backdrop-blur-xl'}`}
                style={{ backgroundColor: placeholder }}
            />
            
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
            />
        </div>
    );
};

export default ProgressiveImage;

