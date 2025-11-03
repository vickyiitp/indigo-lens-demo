import React from 'react';
// Fix: Import Variants type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import ViyanaAvatar from './BeannaAvatar';
import FilmReelIcon from './icons/FilmReelIcon';
import CircuitIcon from './icons/CircuitIcon';
import CameraOrbIcon from './icons/CameraOrbIcon';
import SketchIcon from './icons/SketchIcon';
import IndigoLensLogo from './icons/IndigoLensLogo';

// Fix: Explicitly type with `Variants` to ensure compatibility with framer-motion's expected types, resolving the `ease` property type error.
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 1.2,
            ease: 'easeInOut'
        }
    }
};

// Fix: Explicitly type with `Variants` to ensure compatibility with framer-motion's expected types, resolving the `ease` property type error.
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const CreativeIcon: React.FC<{ children: React.ReactNode, className: string, delay: number }> = ({ children, className, delay }) => (
    <motion.div
        className={`absolute text-indigo-brand/50 ${className}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: 1, y: [0, -20, 0] }}
        transition={{ duration: 10, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
        {children}
    </motion.div>
);

const Preloader: React.FC = () => {
    const welcomeText = "Welcome to Indigo Lens".split(" ");
    const [avatarSize, setAvatarSize] = React.useState(200);

    React.useEffect(() => {
        const handleResize = () => {
            setAvatarSize(window.innerWidth > 768 ? 256 : 192);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {/* Background Creative Icons */}
            <CreativeIcon className="top-[15%] left-[10%]" delay={0}><FilmReelIcon /></CreativeIcon>
            <CreativeIcon className="top-[20%] right-[15%]" delay={1}><CircuitIcon /></CreativeIcon>
            <CreativeIcon className="bottom-[25%] left-[20%]" delay={2}><CameraOrbIcon /></CreativeIcon>
            <CreativeIcon className="bottom-[15%] right-[10%]" delay={3}><SketchIcon /></CreativeIcon>

            <motion.div
                className="text-center"
                variants={containerVariants}
            >
                <motion.h1
                    className="font-sora text-4xl md:text-6xl font-bold text-soft-white mb-8"
                    aria-label="Welcome to Indigo Lens"
                >
                    {welcomeText.map((word, index) => (
                        <motion.span
                            key={index}
                            className="inline-block mr-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 + index * 0.2, ease: 'easeOut' }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 2, ease: 'easeOut' }}
                >
                    <ViyanaAvatar mood="idle" size={avatarSize} />
                </motion.div>

                <motion.p
                    className="mt-8 text-lg md:text-xl text-soft-white/80 max-w-2xl mx-auto italic"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 3 }}
                >
                    “Where imagination meets intelligence. Let your vision become art.”
                </motion.p>
                 <motion.div 
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4, duration: 1.5 }}
                >
                    <IndigoLensLogo />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;