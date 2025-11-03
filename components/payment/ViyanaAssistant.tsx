import React from 'react';
// FIX: Import `Variants` to correctly type the animation variants.
import { motion, Variants } from 'framer-motion';
import ViyanaAvatar from '../BeannaAvatar';

const ViyanaAssistant: React.FC = () => {
    // FIX: Explicitly type with `Variants` to resolve type compatibility issues with framer-motion's expected types, especially for properties like `ease`.
    const containerVariants: Variants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                delay: 1,
                ease: [0.16, 1, 0.3, 1],
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    // FIX: Explicitly type with `Variants` to ensure type compatibility, especially for properties like `transition.type`.
    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 300, damping: 20 },
        },
    };

    return (
        <motion.div
            className="fixed bottom-6 right-6 z-50 hidden lg:flex items-end gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <motion.div
                variants={itemVariants}
                className="relative bg-charcoal/80 backdrop-blur-md p-4 rounded-lg rounded-br-none border border-indigo-brand/30 shadow-lg text-soft-white max-w-xs"
            >
                <p className="font-bold text-neon-blue">Viyana is here!</p>
                <p className="text-sm text-soft-white/80">Hi, I’m Viyana — I’ll guide you through your purchase.</p>
                <div className="absolute right-0 -bottom-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[10px] border-t-indigo-brand/30"></div>
            </motion.div>
            <motion.div variants={itemVariants}>
                <ViyanaAvatar mood="idle" size={80} />
            </motion.div>
        </motion.div>
    );
};

export default ViyanaAssistant;
