import React from 'react';
import { motion } from 'framer-motion';

interface ProceduralAvatarProps {
    primaryColor: string;
    secondaryColor: string;
}

const ProceduralAvatar: React.FC<ProceduralAvatarProps> = ({ primaryColor, secondaryColor }) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 200 200" aria-hidden="true">
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g style={{ filter: 'url(#glow)' }}>
                {/* Orbiting Particles */}
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <motion.circle cx="100" cy="100" r="95" fill="none" stroke={secondaryColor} strokeWidth="0.5" strokeOpacity="0.5" pathLength="1" />
                    <motion.circle
                        cx="10" cy="100" r="3" fill={secondaryColor}
                        animate={{ scale: [1, 0.5, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.circle
                         cx="190" cy="100" r="2" fill={primaryColor}
                        animate={{ scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.g>

                <g transform="translate(0, 10)">
                    {/* Hair back */}
                    <motion.path
                        d="M 50 80 C 30 120, 40 160, 60 180"
                        fill="none" stroke={secondaryColor} strokeWidth="8" strokeLinecap="round"
                        animate={{
                            d: [
                                "M 50 80 C 30 120, 40 160, 60 180",
                                "M 50 80 C 35 125, 45 155, 60 180",
                                "M 50 80 C 30 120, 40 160, 60 180",
                            ]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                     <motion.path
                        d="M 150 80 C 170 120, 160 160, 140 180"
                        fill="none" stroke={secondaryColor} strokeWidth="8" strokeLinecap="round"
                         animate={{
                            d: [
                                "M 150 80 C 170 120, 160 160, 140 180",
                                "M 150 80 C 165 125, 155 155, 140 180",
                                "M 150 80 C 170 120, 160 160, 140 180",
                            ]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />

                    {/* Body/Shoulders */}
                    <path d="M 70 190 C 70 160, 130 160, 130 190 Z" fill={primaryColor} />

                    {/* Head */}
                    <circle cx="100" cy="100" r="50" fill={primaryColor} />

                    {/* Hair front */}
                     <motion.path
                        d="M 70 60 C 60 90, 80 120, 85 150"
                        fill="none" stroke={secondaryColor} strokeWidth="12" strokeLinecap="round"
                         animate={{
                             d: [
                                "M 70 60 C 60 90, 80 120, 85 150",
                                "M 70 60 C 65 85, 75 125, 85 150",
                                "M 70 60 C 60 90, 80 120, 85 150",
                             ]
                         }}
                         transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.path
                        d="M 130 60 C 140 90, 120 120, 115 150"
                        fill="none" stroke={secondaryColor} strokeWidth="12" strokeLinecap="round"
                        animate={{
                             d: [
                                "M 130 60 C 140 90, 120 120, 115 150",
                                "M 130 60 C 135 85, 125 125, 115 150",
                                "M 130 60 C 140 90, 120 120, 115 150",
                             ]
                         }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                    />
                </g>
            </g>
        </svg>
    );
};

export default ProceduralAvatar;
