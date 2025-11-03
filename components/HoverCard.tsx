import React from 'react';
import { motion } from 'framer-motion';
import { useHover3D } from '../hooks/useHover3D';
import NeonButton from './NeonButton';

interface HoverCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
};

const buttonVariants = {
    initial: { opacity: 0, y: 20 },
    hover: { opacity: 1, y: 0 },
};


const HoverCard: React.FC<HoverCardProps> = ({ title, description, imageUrl }) => {
    const { ref, style } = useHover3D<HTMLDivElement>({ z: 10 });

    const particleStyle = {
        backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(0, 245, 255, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 55% 30%, rgba(181, 23, 158, 0.4) 1px, transparent 1px),
            radial-gradient(circle at 25% 70%, rgba(0, 245, 255, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 80% 90%, rgba(181, 23, 158, 0.5) 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 10%, rgba(0, 245, 255, 0.6) 2px, transparent 2px),
            radial-gradient(circle at 40% 50%, rgba(181, 23, 158, 0.3) 1.5px, transparent 1.5px),
            radial-gradient(circle at 5% 95%, rgba(0, 245, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(181, 23, 158, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: '150px 150px',
    };

    return (
        <motion.div
            ref={ref}
            style={style}
            className="relative p-1 rounded-2xl bg-gradient-to-br from-indigo-brand/50 to-violet-brand/50 group transition-all duration-500 group-hover:bg-400% group-hover:animate-aurora"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            data-cursor-type="card"
        >
            {/* Localized particle effect */}
            <div
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-move-particles"
                style={particleStyle}
            />

            <div className="relative p-6 rounded-[14px] bg-charcoal/90 backdrop-blur-sm text-left h-full border-2 border-transparent group-hover:animate-border-glow transition-colors duration-500">
                <div className="relative z-10">
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
                    </div>
                    <h3 className="font-sora text-2xl font-bold text-soft-white">{title}</h3>
                    <p className="mt-2 text-soft-white/70">{description}</p>
                    <motion.div
                        className="mt-4"
                        variants={buttonVariants}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                       <NeonButton size="small" variant="secondary">View Details</NeonButton>
                    </motion.div>
                </div>
                {/* Glow effect */}
                <div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none group-hover:scale-110"
                    style={{
                        background: 'radial-gradient(400px at var(--x) var(--y), rgba(0, 245, 255, 0.15), transparent 80%)',
                    }}
                />
            </div>
        </motion.div>
    );
};

export default HoverCard;