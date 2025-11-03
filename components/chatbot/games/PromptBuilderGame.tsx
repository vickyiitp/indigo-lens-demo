import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeonButton from '../../NeonButton';

interface PromptBuilderGameProps {
    onGameEnd: () => void;
}

const briefs = [
    {
        title: "Founder's Focus",
        description: "Late-night founder footage — cinematic, indigo haze, dramatic music.",
        keywords: {
            subject: ['founder', 'CEO', 'person', 'entrepreneur'],
            mood: ['cinematic', 'dramatic', 'intense', 'focused'],
            visuals: ['indigo', 'haze', 'dark', 'neon', 'low-key'],
            format: ['reel', '9:16', 'vertical', 'short video']
        },
        example: "```POV: founder working late in a minimalist office, illuminated only by a screen's glow, deep indigo haze, cinematic grade with dramatic synth bass — 9:16 reel.```"
    },
    {
        title: "Sunrise Hope",
        description: "A character watching a sunrise — hopeful, cinematic, slow zoom.",
        keywords: {
            subject: ['character', 'person', 'figure', 'silhouette'],
            mood: ['hopeful', 'optimistic', 'serene', 'calm'],
            visuals: ['sunrise', 'golden hour', 'lens flare', 'slow zoom'],
            format: ['16:9', 'widescreen', 'cinematic shot']
        },
        example: "```Cinematic wide shot, a lone figure on a hill watching the sunrise, warm golden light with lens flare, slow zoom in on their face showing a hopeful expression — 16:9 aspect ratio.```"
    },
];

const PromptBuilderGame: React.FC<PromptBuilderGameProps> = ({ onGameEnd }) => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<{ score: number; feedback: string[] } | null>(null);
    const brief = useMemo(() => briefs[Math.floor(Math.random() * briefs.length)], []);

    const scorePrompt = () => {
        const lowerCasePrompt = prompt.toLowerCase();
        let score = 0;
        const feedback: string[] = [];

        if (brief.keywords.subject.some(k => lowerCasePrompt.includes(k))) score += 25;
        else feedback.push("Hint: Mention the subject (e.g., 'founder').");

        if (brief.keywords.mood.some(k => lowerCasePrompt.includes(k))) score += 25;
        else feedback.push("Hint: Describe the mood (e.g., 'cinematic').");
        
        if (brief.keywords.visuals.some(k => lowerCasePrompt.includes(k))) score += 25;
        else feedback.push("Hint: Add visual details (e.g., 'indigo haze').");

        if (brief.keywords.format.some(k => lowerCasePrompt.includes(k))) score += 25;
        else feedback.push("Hint: Specify the output format (e.g., '9:16 reel').");

        setResult({ score, feedback });
    };
    
    const handleReset = () => {
        setPrompt('');
        setResult(null);
    }

    return (
        <motion.div
            className="text-left p-2 h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <h4 className="font-sora font-bold text-soft-white">Prompt-Builder Challenge</h4>
            <div className="my-2 p-3 bg-indigo-brand/20 rounded-md">
                <p className="font-bold text-sm text-neon-blue">{brief.title}</p>
                <p className="text-xs text-soft-white/80">{brief.description}</p>
            </div>

            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Write your 1-line prompt here..."
                className="w-full flex-grow bg-indigo-brand/10 border-2 border-indigo-brand/30 rounded-lg p-2 text-soft-white placeholder:text-soft-white/50 focus:outline-none focus:border-neon-blue transition-colors duration-300 text-sm resize-none"
                rows={4}
                disabled={!!result}
            />

            <AnimatePresence>
                {result && (
                    <motion.div 
                        className="mt-2 text-sm"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                    >
                        <p className="font-bold">Score: <span className="text-neon-blue">{result.score}/100</span></p>
                        {result.feedback.length > 0 ? (
                            <ul className="list-disc list-inside text-amber-400/90 text-xs">
                                {result.feedback.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        ) : (
                             <p className="text-green-400 text-xs font-bold">Perfect prompt!</p>
                        )}
                         <p className="text-xs text-soft-white/70 mt-2">Viyana's refinement:</p>
                         <pre className="bg-charcoal/50 p-2 rounded-md my-1 text-xs font-mono whitespace-pre-wrap"><code>{brief.example.replace(/```/g, '')}</code></pre>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-auto pt-2 flex gap-2">
                {result ? (
                    <NeonButton onClick={handleReset} className="w-full" size="small">Play Again</NeonButton>
                ) : (
                    <NeonButton onClick={scorePrompt} disabled={!prompt.trim()} className="w-full" size="small">Submit Prompt</NeonButton>
                )}
                <NeonButton onClick={onGameEnd} variant="secondary" size="small">Back</NeonButton>
            </div>
        </motion.div>
    );
};

export default PromptBuilderGame;
