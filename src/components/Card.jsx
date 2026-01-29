import React from 'react';

const Card = ({
    children,
    variant = 'default',
    className = '',
    hover = true,
    ...props
}) => {
    const baseStyles = `
    rounded-2xl p-6
    transition-all duration-300 ease-out
  `;

    const variants = {
        default: `
      bg-card-midnight/30 
      backdrop-blur-md 
      border border-white/10
    `,
        glass: `
      bg-white/5 
      backdrop-blur-xl 
      border border-white/10
    `,
        solid: `
      bg-card-midnight 
      border border-white/5
    `
    };

    const hoverEffect = hover
        ? 'hover:border-accent-crimson/50 hover:shadow-lg hover:shadow-accent-crimson/10 hover:-translate-y-1'
        : '';

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${hoverEffect} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
};

// Project Card Component
export const ProjectCard = ({ project }) => {
    return (
        <Card className="overflow-hidden group h-full bg-gradient-to-br from-[#0A1628] via-[#0A1628]/95 to-[#1A0B2E]/80 border-[#1E5F7E]/20 hover:border-accent-crimson/40">
            {/* Image Container with Popup Links - Larger aspect ratio */}
            <div className="relative aspect-[16/10] mb-5 rounded-xl overflow-hidden bg-gradient-to-br from-[#0A1628] to-[#1A0B2E]">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                />

                {/* Gradient Overlay - Using site palette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Popup Links Container */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <div className="flex items-center justify-center gap-4">
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent-crimson text-white font-medium text-sm hover:bg-[#D91E2A] transition-all duration-200 hover:scale-105 shadow-lg shadow-accent-crimson/30"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E5F7E]/40 backdrop-blur-sm text-white font-medium text-sm hover:bg-[#1E5F7E]/60 transition-all duration-200 hover:scale-105 border border-[#1E5F7E]/50"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Title - Larger */}
            <h3 className="font-display text-2xl font-bold text-text-white mb-3">
                {project.title}
            </h3>

            {/* Description - More spacing */}
            <p className="text-text-slate text-sm leading-relaxed mb-5 line-clamp-3">
                {project.description}
            </p>

            {/* Tags - Using site palette with improved styling */}
            <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map((tag, index) => (
                    <span
                        key={index}
                        className="px-3 py-1.5 text-xs rounded-full font-medium bg-gradient-to-r from-accent-crimson/20 to-[#5A1648]/20 text-[#D91E2A] border border-accent-crimson/20"
                    >
                        {tag}
                    </span>
                ))}
                {project.tags.length > 5 && (
                    <span className="px-3 py-1.5 text-xs rounded-full font-medium bg-[#1E5F7E]/20 text-[#1E5F7E] border border-[#1E5F7E]/30">
                        +{project.tags.length - 5} more
                    </span>
                )}
            </div>
        </Card>
    );
};

// Skill Card Component
export const SkillCard = ({ skill, IconComponent }) => {
    return (
        <Card className="text-center p-4">
            <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-lg bg-accent-crimson/20 text-accent-crimson">
                {IconComponent && <IconComponent className="w-6 h-6" />}
            </div>
            <h4 className="font-display text-sm font-semibold text-text-white">
                {skill.name}
            </h4>
            <span className="text-xs text-text-slate">{skill.category}</span>
        </Card>
    );
};

// Service Card Component
export const ServiceCard = ({ service, IconComponent }) => {
    return (
        <Card className="h-full">
            <div className="w-14 h-14 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-accent-crimson to-accent-sapphire text-white">
                {IconComponent && <IconComponent className="w-7 h-7" />}
            </div>
            <h3 className="font-display text-xl font-bold text-text-white mb-3">
                {service.title}
            </h3>
            <p className="text-text-slate text-sm mb-4">
                {service.description}
            </p>
            <ul className="space-y-2">
                {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-text-gray">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-crimson" />
                        {feature}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default Card;
