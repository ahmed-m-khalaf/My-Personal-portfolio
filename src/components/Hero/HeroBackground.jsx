import React, { memo } from 'react';
import Noise from '../Noise'; // If exists, otherwise we'll fall back gracefully

// Isolated Layers for easy toggling
const AuroraLayer = memo(() => (
    <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-crimson/30 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-sapphire/30 blur-[120px]" />
    </div>
));
AuroraLayer.displayName = 'AuroraLayer';

const GridLayer = memo(() => (
    <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
        }}
    />
));
GridLayer.displayName = 'GridLayer';

const NoiseLayer = memo(() => (
    <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
        {Noise ? <Noise /> : null}
    </div>
));
NoiseLayer.displayName = 'NoiseLayer';

const SpotlightLayer = memo(() => (
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
));
SpotlightLayer.displayName = 'SpotlightLayer';

const HeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden z-0 bg-bg-abyss">
            <AuroraLayer />
            <GridLayer />
            <NoiseLayer />
            <SpotlightLayer />
        </div>
    );
};

export default memo(HeroBackground);
