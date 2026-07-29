import { useEffect } from 'react';

export const useTiltEffect = (ref, options = {}) => {
    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Disable on touch devices for better mobile experience
        if (window.matchMedia('(hover: none)').matches) {
            return;
        }

        const {
            maxTilt = 5,
            perspective = 1000,
            scale = 1.01,
            speed = 600,
            glare = true
        } = options;

        let boundingRect = element.getBoundingClientRect();
        let requestAnimationFrameId;

        const updateTilt = (e) => {
            if (!boundingRect) return;

            const x = e.clientX - boundingRect.left;
            const y = e.clientY - boundingRect.top;
            
            const centerX = boundingRect.width / 2;
            const centerY = boundingRect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
            
            if (glare) {
                // We'll manage glare purely via box-shadow or an overlay if needed, 
                // but a simpler approach is just handling the transform.
                // For a more advanced glare, you'd need an internal absolute div.
            }
        };

        const handleMouseMove = (e) => {
            if (!requestAnimationFrameId) {
                requestAnimationFrameId = requestAnimationFrame(() => {
                    updateTilt(e);
                    requestAnimationFrameId = null;
                });
            }
        };

        const handleMouseEnter = () => {
            boundingRect = element.getBoundingClientRect();
            element.style.transition = `transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)`;
            element.style.willChange = 'transform';
        };

        const handleMouseLeave = () => {
            if (requestAnimationFrameId) {
                cancelAnimationFrame(requestAnimationFrameId);
                requestAnimationFrameId = null;
            }
            element.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;
            element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            
            // Remove will-change after transition completes to free up GPU memory
            setTimeout(() => {
                element.style.willChange = 'auto';
            }, speed);
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
            if (requestAnimationFrameId) {
                cancelAnimationFrame(requestAnimationFrameId);
            }
        };
    }, [ref, options]);
};
