import React from 'react';
import { motion } from 'framer-motion';
import { useHover3D } from '../hooks/useHover3D';
import NeonButton from './NeonButton';
import BadgeIcon from './icons/BadgeIcon';

interface ProductCardProps {
    title: string;
    description: string;
    price: string;
    gumroadLink: string;
    thumbnailUrl: string;
    isBestseller?: boolean;
    isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    description,
    price,
    gumroadLink,
    thumbnailUrl,
    isBestseller,
    isNew
}) => {
    const { ref, style } = useHover3D<HTMLDivElement>({ x: 8, y: 8, z: 5 });

    const badge = isBestseller ? { text: 'Best Seller', color: 'from-amber-400 to-yellow-500' } :
                  isNew ? { text: 'New Launch', color: 'from-cyan-400 to-blue-500' } : null;

    return (
        <motion.div
            ref={ref}
            style={style}
            className="relative w-full h-full p-1 rounded-2xl bg-gradient-to-br from-indigo-brand/30 to-violet-brand/30 group transition-all duration-300"
            data-cursor-type="card"
        >
            <div className="relative w-full h-full p-6 rounded-[14px] bg-charcoal/80 backdrop-blur-lg text-left border-2 border-indigo-brand/20 group-hover:border-neon-blue/50 transition-colors duration-300 flex flex-col">
                {badge && (
                    <div className={`absolute top-0 right-0 -mt-3 -mr-3 z-20 flex items-center gap-1 text-xs font-bold text-white px-3 py-1 rounded-full bg-gradient-to-r ${badge.color} shadow-lg`}>
                        <BadgeIcon />
                        {badge.text}
                    </div>
                )}

                <div className="relative z-10 flex-grow">
                    <div className="w-full h-48 rounded-lg overflow-hidden mb-4 shadow-lg shadow-indigo-brand/20">
                        <img 
                            src={thumbnailUrl} 
                            alt={title} 
                            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110" 
                        />
                    </div>
                    <h3 className="font-sora text-2xl font-bold text-soft-white">{title}</h3>
                    <p className="mt-2 text-soft-white/70 text-sm flex-grow">{description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-indigo-brand/20">
                    <div className="flex justify-between items-center mb-4">
                         <p className="font-sora text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-soft-white">{price}</p>
                         <div className="relative group/tooltip">
                            <NeonButton size="small" variant="secondary">Preview</NeonButton>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-charcoal border border-indigo-brand/50 rounded-lg text-center text-xs text-soft-white/80 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                                Click to view a preview
                                <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-indigo-brand/50"></div>
                            </div>
                        </div>
                    </div>

                    <div className="relative group/tooltip">
                         <NeonButton
                            as="a"
                            href={gumroadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            Buy on Gumroad
                        </NeonButton>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-charcoal border border-indigo-brand/50 rounded-lg text-center text-xs text-soft-white/80 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                            Redirecting to Gumroad for secure checkout.
                             <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-indigo-brand/50"></div>
                        </div>
                    </div>
                   
                    <p className="text-center text-xs text-soft-white/50 mt-3">
                        ⚠️ You’ll be redirected to our secure Gumroad page for payment & download.
                    </p>
                </div>

                {/* Glow effect */}
                <div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: 'radial-gradient(400px at var(--x) var(--y), rgba(0, 245, 255, 0.1), transparent 80%)',
                    }}
                />
            </div>
        </motion.div>
    );
};

export default ProductCard;