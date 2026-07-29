import React, { memo } from 'react';

const AuroraBackground = memo(() => {
    return (
        <div className="aurora-bg-container" aria-hidden="true">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-bg-abyss via-card-midnight/5 to-bg-abyss" />

            {/* Aurora moving blobs */}
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />

            {/* Subtle mesh overlay for texture */}
            <div className="aurora-mesh" />
        </div>
    );
});

AuroraBackground.displayName = 'AuroraBackground';

export default AuroraBackground;
