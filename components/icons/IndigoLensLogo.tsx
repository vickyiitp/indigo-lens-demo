import React from 'react';
import { motion } from 'framer-motion';

const IndigoLensLogo: React.FC = () => {
    return (
        <svg width="240" height="60" viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGradient" x1="0" y1="30" x2="240" y2="30" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00F5FF"/>
                    <stop offset="1" stopColor="#B5179E"/>
                </linearGradient>
            </defs>
            <motion.path
                d="M10 50 L10 10 L20 10 L20 50 Z M30 50 L30 10 L40 10 M50 10 L50 50 L60 50 L60 10 M70 30 A15 15 0 1 1 70 30.01 M90 50 L90 10 L110 30 L90 50 Z"
                stroke="url(#logoGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
            />
            <text x="125" y="40" fontFamily="Sora, sans-serif" fontSize="30" fontWeight="bold" fill="url(#logoGradient)">
                <motion.tspan
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
                >
                    Lens
                </motion.tspan>
            </text>
        </svg>
    );
};

export default IndigoLensLogo;
