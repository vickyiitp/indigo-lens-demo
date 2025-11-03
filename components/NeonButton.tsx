import React from 'react';
import { motion, MotionProps } from 'framer-motion';

type NeonButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    size?: 'normal' | 'small';
    as?: React.ElementType;
    className?: string;
    isLoading?: boolean;
    loadingText?: string;
} & (React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>);

const NeonButton: React.FC<NeonButtonProps> = ({
    children,
    onClick,
    variant = 'primary',
    size = 'normal',
    as: Component = 'button',
    className = '',
    isLoading = false,
    loadingText = 'Loading...',
    ...props
}) => {
    const primaryClasses = "bg-indigo-brand/80 border-neon-blue text-soft-white";
    const secondaryClasses = "bg-transparent border-indigo-brand text-soft-white/80 hover:text-soft-white";
    const sizeClasses = size === 'normal' ? 'px-8 py-3 text-lg' : 'px-5 py-2 text-base';
    
    // FIX: Safely check for the `disabled` prop, which is only valid on buttons,
    // to prevent a TypeScript error when the component is used as an anchor tag.
    const isDisabled = isLoading || ('disabled' in props && props.disabled);

    const motionProps: MotionProps = {
        whileHover: !isDisabled ? { 
            scale: 1.05,
            y: -3,
            boxShadow: variant === 'primary' 
                ? '0 0 8px rgba(0, 245, 255, 0.6), 0 0 20px rgba(0, 245, 255, 0.4), 0 0 30px rgba(58, 12, 163, 0.5)' 
                : '0 0 8px rgba(58, 12, 163, 0.7), 0 0 20px rgba(58, 12, 163, 0.5)',
            textShadow: '0 0 8px rgba(246, 248, 250, 0.5)',
        } : {},
        whileTap: !isDisabled ? { scale: 0.95 } : {},
        transition: { type: 'spring', stiffness: 400, damping: 17 }
    };
    
    const MotionComponent = motion(Component as React.ElementType);

    const finalProps = { ...props };
    if (Component === 'button') {
        (finalProps as React.ButtonHTMLAttributes<HTMLButtonElement>).disabled = isDisabled;
    } else {
        // remove disabled from anchor props to avoid React warning
        delete (finalProps as any).disabled;
    }

    return (
        <MotionComponent
            onClick={onClick}
            className={`relative inline-block text-center font-sora font-bold rounded-lg transition-all duration-300 border-2 overflow-hidden group ${sizeClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
            data-cursor-type="btn"
            {...motionProps}
            {...finalProps}
        >
            {/* Progress Bar */}
            <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue/40 to-violet-brand/40"
                initial={{ width: '0%' }}
                animate={{ width: isLoading ? '100%' : '0%' }}
                transition={{ duration: isLoading ? 3 : 0.5, ease: isLoading ? 'linear' : 'easeOut' }}
            />

            {/* Solar Water/Aurora Effect */}
            <span className={`absolute inset-0 opacity-0 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-brand/50 via-indigo-brand/50 to-transparent bg-400% animate-aurora ${!isDisabled && 'group-hover:opacity-100'}`}></span>

            {/* Glossy overlay */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-lg"></div>
            <span className="relative z-10">{isLoading ? loadingText : children}</span>
        </MotionComponent>
    );
};

export default NeonButton;
