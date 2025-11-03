import React from 'react';
import { motion } from 'framer-motion';
import NeonButton from '../NeonButton';
import CheckmarkIcon from '../icons/CheckmarkIcon';

interface ServiceSelectionCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    features: string[];
    price: string;
    onSelect: () => void;
    isSelected: boolean;
}

const ServiceSelectionCard: React.FC<ServiceSelectionCardProps> = ({
    icon,
    title,
    subtitle,
    features,
    price,
    onSelect,
    isSelected,
}) => {
    return (
        <div 
            className={`relative p-1 rounded-2xl h-full transition-all duration-300 ${isSelected ? 'bg-gradient-to-br from-neon-blue to-violet-brand' : 'bg-indigo-brand/20'}`}
        >
            <div className="relative p-8 rounded-[14px] bg-charcoal/95 backdrop-blur-lg text-center h-full flex flex-col">
                <div className="mb-6 text-neon-blue flex justify-center">{icon}</div>
                <h3 className="font-sora text-2xl font-bold text-soft-white mb-2">{title}</h3>
                <p className="text-soft-white/70 mb-6 flex-grow">{subtitle}</p>
                <ul className="text-left space-y-2 text-soft-white/80 mb-8">
                    {features.map(feature => (
                        <li key={feature} className="flex items-center gap-2">
                           <span className="text-neon-blue"><CheckmarkIcon /></span> {feature}
                        </li>
                    ))}
                </ul>
                <p className="font-sora text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-soft-white mb-6 mt-auto">
                    {price}
                </p>
                <NeonButton onClick={onSelect} variant={isSelected ? 'primary' : 'secondary'} className="w-full">
                    {isSelected ? 'Selected' : 'Select Plan'}
                </NeonButton>
            </div>
        </div>
    );
};

export default ServiceSelectionCard;