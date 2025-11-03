import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate, useAnimation } from 'framer-motion';
import NeonButton from '../NeonButton';
import { ServicePlan } from '../PaymentPage';

interface CheckoutSummaryProps {
    selectedPlan: ServicePlan;
}

const addons = [
    { id: 'rush', name: 'Rush Delivery', price: 499 },
    { id: 'revisions', name: 'Extra Revisions', price: 299 },
];

const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
    const count = useMotionValue(0);
    const rounded = useSpring(count, { stiffness: 200, damping: 30 });

    useEffect(() => {
        const controls = animate(count, value, { duration: 0.8 });
        return controls.stop;
    }, [value, count]);

    useEffect(() => {
        const unsubscribe = rounded.on("change", (latest) => {
            // No need to do anything here, just to trigger re-render
        });
        return () => unsubscribe();
    }, [rounded]);

    return <motion.span>{rounded.get().toFixed(0)}</motion.span>;
};


const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({ selectedPlan }) => {
    const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());
    const animationControls = useAnimation();
    
    const handleAddonToggle = (addonId: string) => {
        setSelectedAddons(prev => {
            const newSet = new Set(prev);
            if (newSet.has(addonId)) {
                newSet.delete(addonId);
            } else {
                newSet.add(addonId);
            }
            return newSet;
        });
    };

    const addonTotal = addons.reduce((total, addon) => {
        return selectedAddons.has(addon.id) ? total + addon.price : total;
    }, 0);

    const totalPrice = selectedPlan.price + addonTotal;

    useEffect(() => {
        // Trigger the animation whenever the total price changes.
        animationControls.start({
            scale: [1, 1.2, 1],
            textShadow: [
                "none",
                "0 0 12px rgba(0, 245, 255, 0.7)",
                "none",
            ],
            transition: { duration: 0.6, ease: "easeOut" },
        });
    }, [totalPrice, animationControls]);

    return (
        <div className="max-w-4xl mx-auto bg-charcoal/80 backdrop-blur-lg border-2 border-indigo-brand/30 rounded-2xl p-8 text-left">
            <h3 className="font-sora text-3xl font-bold text-soft-white mb-6">Checkout Summary</h3>
            <div className="border-b border-indigo-brand/20 pb-4 mb-4">
                <div className="flex justify-between items-center">
                    <p className="text-lg text-soft-white">{selectedPlan.title}</p>
                    <p className="text-lg text-soft-white/80">₹{selectedPlan.price}</p>
                </div>
            </div>
            
            <div className="mb-6">
                <p className="font-bold text-soft-white/90 mb-3">Add-ons:</p>
                <div className="space-y-3">
                    {addons.map(addon => (
                        <label key={addon.id} className="flex items-center justify-between p-3 bg-indigo-brand/10 rounded-lg cursor-pointer hover:bg-indigo-brand/20 transition-colors" data-cursor-type="link">
                            <div>
                                <span className="text-soft-white">{addon.name}</span>
                                <span className="text-soft-white/60 ml-2">(+₹{addon.price})</span>
                            </div>
                            <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 bg-charcoal border-neon-blue/50 rounded text-neon-blue focus:ring-neon-blue"
                                checked={selectedAddons.has(addon.id)}
                                onChange={() => handleAddonToggle(addon.id)}
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center border-t-2 border-indigo-brand/20 pt-6">
                <p className="font-sora text-2xl font-bold text-soft-white">Total Price:</p>
                <motion.p 
                    className="font-sora text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand"
                    animate={animationControls}
                >
                    ₹<AnimatedCounter value={totalPrice} />
                </motion.p>
            </div>
            
            <div className="mt-8 text-center">
                 <NeonButton as="a" href={selectedPlan.gumroadLink} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                    Pay Now
                </NeonButton>
            </div>
        </div>
    );
};

export default CheckoutSummary;