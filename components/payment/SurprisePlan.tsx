import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NeonButton from '../NeonButton';
import { ServicePlan } from '../PaymentPage';

interface SurprisePlanProps {
    plan: ServicePlan;
    onSelect: () => void;
    isSelected: boolean;
}

const SurprisePlan: React.FC<SurprisePlanProps> = ({ plan, onSelect, isSelected }) => {
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = () => {
        if (isGenerating) return;
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            onSelect();
        }, 2500); // Simulate generation
    };

    return (
        <div className={`relative p-1 rounded-2xl bg-gradient-to-br from-neon-blue/50 to-violet-brand/50 group transition-all duration-500 hover:bg-400% hover:animate-aurora`}>
            <div className="relative p-8 rounded-[14px] bg-charcoal/90 backdrop-blur-sm text-center md:flex md:items-center md:justify-between md:text-left">
                <div className="md:w-2/3">
                    <h3 className="font-sora text-3xl font-bold text-soft-white mb-2">{plan.title}</h3>
                    <p className="text-soft-white/80 mb-4 md:mb-0">
                        Can’t decide? Let our AI craft a creative surprise pack for you. You’ll get an AI-edited video, a cinematic poster, and an exclusive Indigo color effect preset.
                    </p>
                </div>
                <div className="md:w-1/3 md:text-right mt-6 md:mt-0">
                     <p className="font-sora text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-soft-white mb-4">
                        {plan.priceDisplay}
                    </p>
                    <NeonButton 
                        onClick={handleGenerate} 
                        isLoading={isGenerating}
                        loadingText="Viyana is crafting..."
                        className="w-full md:w-auto"
                    >
                        {isSelected ? 'Selected!' : 'Generate My Surprise'}
                    </NeonButton>
                </div>
            </div>
        </div>
    );
};

export default SurprisePlan;