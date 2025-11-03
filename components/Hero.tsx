import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import ViyanaAvatar, { Mood } from './BeannaAvatar';
import NeonButton from './NeonButton';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Dynamically import the 3D canvas to allow for SSR/bundler optimization
const HeroSplineCanvas = React.lazy(() => import('../three/HeroSplineCanvas'));

const Hero: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <section className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Suspense fallback={<div className="w-full h-full bg-charcoal" />}>
                    <HeroSplineCanvas reducedMotion={prefersReducedMotion} />
                </Suspense>
            </div>
            
            <motion.div 
                className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
                <div className="lg:w-1/2 lg:text-left">
                    <h1 className="font-sora text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">Where AI Crafts</span>
                        <br />
                        <span className="text-soft-white">Cinematic Stories.</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-soft-white/80 max-w-xl mx-auto lg:mx-0">
                        I’m Viyana Solara. Hand me your footage — I’ll return cinematic narratives. Indigo Lens transforms ordinary footage into breathtaking visual stories.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <NeonButton>Get Free Sample</NeonButton>
                        <NeonButton as="a" href="#services" variant="secondary">Watch Demo</NeonButton>
                    </div>
                </div>

                <div className="lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
                    <div 
                        className="relative"
                        data-cursor-type="card"
                        title="Chat with Viyana using the icon in the corner!"
                        aria-label="Viyana Solara, AI Assistant"
                    >
                        <ViyanaAvatar mood={'idle'} size={280} />
                         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 px-3 py-1.5 bg-charcoal/80 border border-indigo-brand/50 rounded-lg text-center text-xs text-soft-white/80 backdrop-blur-sm">
                            Chat with me!
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-indigo-brand/50"></div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll down indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <a href="#services" aria-label="Scroll to services" data-cursor-type="link">
                    <div className="w-6 h-10 border-2 border-soft-white/50 rounded-full flex justify-center items-start p-1">
                        <motion.div
                            className="w-1 h-2 bg-soft-white rounded-full"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        ></motion.div>
                    </div>
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;