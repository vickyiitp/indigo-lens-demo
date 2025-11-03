import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProceduralAvatar from './ProceduralAvatar';

export type Mood = 'idle' | 'confirm' | 'listening';

interface ViyanaAvatarProps {
    mood?: Mood;
    size?: number;
}

const moodColors: Record<Mood, { primary: string; secondary: string }> = {
    idle: { primary: '#3A0CA3', secondary: '#B5179E' },
    confirm: { primary: '#00F5FF', secondary: '#F6F8FA' },
    listening: { primary: '#B5179E', secondary: '#00F5FF' },
};

const ViyanaAvatar: React.FC<ViyanaAvatarProps> = ({ mood = 'idle', size = 200 }) => {
    const colors = moodColors[mood];

    return (
        <motion.div
            className="relative"
            style={{ width: size, height: size }}
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -8, 0] }}
            transition={{
                default: { type: 'spring', stiffness: 300, damping: 20 },
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
            aria-label="Viyana Solara AI Avatar"
            role="img"
        >
            {/* Pulsing Glow */}
            <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                    boxShadow: [
                        '0 0 20px rgba(0, 245, 255, 0.2), 0 0 30px rgba(58, 12, 163, 0.2)',
                        '0 0 30px rgba(0, 245, 255, 0.4), 0 0 45px rgba(58, 12, 163, 0.4)',
                        '0 0 20px rgba(0, 245, 255, 0.2), 0 0 30px rgba(58, 12, 163, 0.2)',
                    ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <div
                className="relative rounded-full overflow-hidden w-full h-full"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-brand/30 to-violet-brand/30 z-20 mix-blend-overlay"></div>
                
                <AnimatePresence mode="wait">
                    <motion.div
                        key={mood}
                        className="w-full h-full relative z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5, ease: 'circOut' }}
                    >
                        <ProceduralAvatar 
                            primaryColor={colors.primary}
                            secondaryColor={colors.secondary}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Animated holographic scanline effect */}
                <motion.div 
                    className="absolute top-0 left-0 right-0 h-full bg-repeat-y z-20" 
                    style={{ 
                        backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.1) 2px, transparent 2px)', 
                        backgroundSize: '100% 6px' 
                    }}
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
            </div>
        </motion.div>
    );
};

export default ViyanaAvatar;