import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PromptBuilderGame from './games/PromptBuilderGame';
import NeonButton from '../NeonButton';
import GameIcon from '../icons/GameIcon';
import MailIcon from '../icons/MailIcon';

const CreativeGameHub: React.FC = () => {
    const [activeGame, setActiveGame] = useState<string | null>(null);

    if (activeGame === 'prompt-builder') {
        return <PromptBuilderGame onGameEnd={() => setActiveGame(null)} />;
    }

    return (
        <motion.div 
            className="text-center p-4 h-full flex flex-col justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-4">
                <h4 className="font-sora font-bold text-amber-400">Assistant Temporarily Unavailable</h4>
                <p className="text-sm text-soft-white/80 mt-1">Viyana’s live assistant has reached the API quota. While we restore the service, why not try a short creativity game?</p>
            </div>

            <div className="space-y-3 mt-6">
                 <NeonButton onClick={() => setActiveGame('prompt-builder')} className="w-full">
                    <GameIcon /> Prompt-Builder Challenge
                </NeonButton>
                <NeonButton variant="secondary" className="w-full opacity-50 cursor-not-allowed">
                    Caption Hook Sprint (soon)
                </NeonButton>
                 <NeonButton variant="secondary" className="w-full opacity-50 cursor-not-allowed">
                    Build-A-Scene (soon)
                </NeonButton>
            </div>

            <div className="mt-auto pt-4 text-center">
                <a href="mailto:team.indigolens@gmail.com" className="text-sm text-neon-blue/80 hover:text-neon-blue hover:underline inline-flex items-center gap-2" data-cursor-type="link">
                    <MailIcon /> Email me when available
                </a>
            </div>
        </motion.div>
    );
};

export default CreativeGameHub;
