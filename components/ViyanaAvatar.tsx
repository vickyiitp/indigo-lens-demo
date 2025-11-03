import React from 'react';
import { motion } from 'framer-motion';
import ProceduralAvatar from './ProceduralAvatar';

const ViyanaAvatar: React.FC = () => {
    return (
        <motion.div
            className="relative inline-block"
            aria-label="Viyana Solara, AI Host of Indigo Lens"
            role="img"
        >
            {/* Outer Glow */}
            <motion.div
                className="absolute -inset-4 rounded-full"
                animate={{
                    boxShadow: [
                        '0 0 40px rgba(0, 245, 255, 0.3), 0 0 60px rgba(58, 12, 163, 0.3)',
                        '0 0 60px rgba(0, 245, 255, 0.5), 0 0 80px rgba(58, 12, 163, 0.5)',
                        '0 0 40px rgba(0, 245, 255, 0.3), 0 0 60px rgba(58, 12, 163, 0.3)',
                    ],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            
            <motion.div
                className="relative rounded-full overflow-hidden w-48 h-48 md:w-64 md:h-64 border-2 border-neon-blue/20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <ProceduralAvatar 
                    primaryColor="#B5179E"
                    secondaryColor="#00F5FF"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-brand/20 to-violet-brand/20 mix-blend-hard-light"></div>
            </motion.div>
        </motion.div>
    );
};

export default ViyanaAvatar;