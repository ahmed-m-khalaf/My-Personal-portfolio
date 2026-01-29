import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    href,
    onClick,
    disabled = false,
    icon: Icon,
    ...props
}) => {
    const baseStyles = `
    inline-flex items-center justify-center gap-2 
    font-display font-semibold 
    rounded-lg 
    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
    transition-all duration-300 ease-out
    transform hover:-translate-y-1 active:translate-y-0
  `;

    const variants = {
        primary: `
      bg-accent-crimson text-white 
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
      hover:shadow-[0_10px_40px_-10px_rgba(217,30,42,0.5)]
      hover:bg-accent-crimson/90
    `,
        secondary: `
      bg-accent-sapphire text-white 
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700
      hover:shadow-[0_10px_40px_-10px_rgba(30,95,126,0.5)]
      hover:bg-accent-sapphire/90
    `,
        outline: `
      border-2 border-accent-crimson text-accent-crimson bg-transparent
      hover:bg-accent-crimson/10 hover:shadow-[0_10px_40px_-10px_rgba(217,30,42,0.3)]
      hover:border-accent-crimson
    `,
        ghost: `
      bg-transparent text-text-gray 
      hover:bg-white/10 hover:text-text-white
    `
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (href) {
        return (
            <a
                href={href}
                className={classes}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {Icon && <Icon className="w-5 h-5" />}
                    {children}
                </span>
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={classes}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">
                {Icon && <Icon className="w-5 h-5" />}
                {children}
            </span>
        </button>
    );
};

export default Button;
