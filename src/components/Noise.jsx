import React, { memo } from 'react';

// Memoized to prevent re-renders - this is a static visual element
const Noise = memo(() => {
    return (
        <div
            className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
            style={{
                contain: 'strict',  // CSS containment for performance
                willChange: 'auto'  // Hint browser this doesn't change
            }}
            aria-hidden="true"
        >
            <svg className="w-full h-full" aria-hidden="true">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.6"
                        stitchTiles="stitch"
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
});

Noise.displayName = 'Noise';

export default Noise;

