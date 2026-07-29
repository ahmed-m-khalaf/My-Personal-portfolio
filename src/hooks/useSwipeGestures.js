import { useRef } from 'react';

export const useSwipeGestures = (onSwipeLeft, onSwipeRight, minDistance = 40) => {
    const startX = useRef(null);
    const startY = useRef(null);
    const isDragging = useRef(false);

    const handlePointerDown = (e) => {
        if (e.button !== undefined && e.button !== 0) return; // Only primary clicks
        // Ignore interactive child clicks (links/buttons)
        if (e.target.closest('a') || e.target.closest('button')) return;

        startX.current = e.clientX;
        startY.current = e.clientY;
        isDragging.current = true;
    };

    const handlePointerUp = (e) => {
        if (!isDragging.current || startX.current === null || startY.current === null) return;

        const deltaX = e.clientX - startX.current;
        const deltaY = e.clientY - startY.current;

        // Ensure horizontal swipe is dominant over vertical scrolling
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) >= minDistance) {
            if (deltaX < 0) {
                onSwipeLeft();
            } else {
                onSwipeRight();
            }
        }

        startX.current = null;
        startY.current = null;
        isDragging.current = false;
    };

    const handlePointerCancel = () => {
        startX.current = null;
        startY.current = null;
        isDragging.current = false;
    };

    return {
        onPointerDown: handlePointerDown,
        onPointerUp: handlePointerUp,
        onPointerCancel: handlePointerCancel,
        style: { touchAction: 'pan-y' } // Allows vertical page scrolling while enabling horizontal swipe
    };
};

export default useSwipeGestures;
