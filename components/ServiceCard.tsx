import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useHover3D } from '../hooks/useHover3D';
import NeonButton from './NeonButton';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay: number;
}

const cardVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
};

const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.15, rotate: -15 },
};


const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay }) => {
    const { ref, style } = useHover3D<HTMLDivElement>({ x: 8, y: 8, z: 8 });
    const [isLaunching, setIsLaunching] = useState(false);

    const handleLaunch = () => {
        if (isLaunching) return;
        setIsLaunching(true);
        setTimeout(() => {
            setIsLaunching(false);
        }, 3000); // Simulate a 3-second launch process
    };

    return (
        <motion.div
            ref={ref}
            style={style}
            className="relative p-1 rounded-2xl bg-charcoal group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: delay, ease: 'easeOut' }}
            variants={cardVariants}
            // FIX: Removed duplicate `initial` prop. The `animate` prop serves as the resting state for `whileHover`.
            whileHover="hover"
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-brand/80 to-violet-brand/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-aurora bg-400%"></div>
            
            <div className="relative p-8 rounded-[14px] bg-charcoal/95 backdrop-blur-lg text-center h-full">
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div 
                            className="mb-6 text-neon-blue"
                            variants={iconVariants}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                            {icon}
                        </motion.div>
                        <h3 className="font-sora text-2xl font-bold text-soft-white mb-3">{title}</h3>
                        <p className="text-soft-white/70 mb-6 min-h-[70px]">{description}</p>
                        <NeonButton 
                            size="small" 
                            variant="primary"
                            onClick={handleLaunch}
                            isLoading={isLaunching}
                            loadingText="Launching..."
                        >
                            Learn More
                        </NeonButton>
                    </div>
                </motion.div>
            </div>
            
            {/* Glow effect */}
            <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(500px at var(--x) var(--y), rgba(58, 12, 163, 0.25), transparent 80%)',
                }}
            />
        </motion.div>
    );
};

export default ServiceCard;
