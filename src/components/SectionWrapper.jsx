import React from 'react';

const SectionWrapper = ({
    children,
    id,
    className = '',
    title,
    subtitle,
    centered = true,
    ...props
}) => {
    return (
        <section
            id={id}
            className={`py-20 md:py-28 px-4 ${className}`}
            {...props}
        >
            <div className="max-w-7xl mx-auto">
                {title && (
                    <SectionHeader
                        title={title}
                        subtitle={subtitle}
                        centered={centered}
                    />
                )}
                {children}
            </div>
        </section>
    );
};

export const SectionHeader = ({ title, subtitle, centered = true }) => {
    return (
        <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}>
            {/* Title */}
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-white mb-6">
                {title}
            </h2>

            {/* Decorative Line with Dots */}
            <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
                {/* Left Dot */}
                <span className="w-3 h-3 rounded-full bg-accent-crimson" />

                {/* Line */}
                <span className="w-20 md:w-32 h-1 rounded-full bg-gradient-to-r from-accent-crimson to-accent-sapphire" />

                {/* Right Dot */}
                <span className="w-3 h-3 rounded-full bg-accent-sapphire" />
            </div>

            {/* Subtitle (optional) */}
            {subtitle && (
                <p className="mt-4 text-text-slate text-lg">{subtitle}</p>
            )}
        </div>
    );
};

export default SectionWrapper;
