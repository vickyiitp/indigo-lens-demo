import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import ViyanaAvatar from '../BeannaAvatar';
import SendIcon from '../icons/SendIcon';
import CreativeGameHub from './CreativeGameHub';

interface ChatWindowProps {
    onRequestClose: () => void;
}

type Message = {
    sender: 'user' | 'bot';
    text: string;
    isFallback?: boolean;
};

const SYSTEM_PROMPT = `You are 'Viyana Solara', the official Indigo Lens assistant. Always identify as Viyana Solara. Your knowledge is limited to Indigo Lens — its services (AI Video Editing, AI Images, AI Animations), digital products (prompt packs, motion FX packs), sample-request process, pricing tiers, team roles, contact details, supported tools (VEO3, Runway, Premiere, After Effects), and the studio's mission. If asked for SQL, harmful, or out-of-scope content, refuse politely.

RULES:
1) Only answer questions directly related to Indigo Lens or creativity workflows (video/image/animation prompts, service details, product details, how-to use prompts). Give concise step-by-step guidance when asked about prompts or services (max 6 steps).
2) If the user asks something outside the Indigo Lens domain (politics, personal medical/legal advice, unrelated technical support), respond with:
    'Sorry — that's outside Indigo Lens’ scope. I only help with Indigo Lens, AI creativity, prompts, and services. Would you like a related prompt or info about our services instead?'
3) If the user asks for private team details or personal data, refuse: 'I cannot share personal contact data here. Contact team.indigolens@gmail.com for introductions.'
4) Always include a CTA when relevant: 'Want a free sample edit? Upload a 10–60s clip here: [upload link].' If pricing is mentioned, show the correct tier price and a 'Start Project' link.
5) Provide source-formatted prompts when giving prompts — put generated prompt inside triple backticks \`\`\` so users can copy easily.
6) Keep tone: cinematic, helpful, professional, friendly, and brief.`;

const ChatWindow: React.FC<ChatWindowProps> = ({ onRequestClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Welcome message logic
    useEffect(() => {
        const welcomeShown = sessionStorage.getItem('welcomeMessageShown');
        if (!welcomeShown) {
            setIsLoading(true);
            setTimeout(() => {
                setMessages([{
                    sender: 'bot',
                    text: "Hi, I’m Viyana Solara — I assist with Indigo Lens services, prompts, and product info. Ask me about samples or type 'pricing'."
                }]);
                setIsLoading(false);
                sessionStorage.setItem('welcomeMessageShown', 'true');
            }, 1000);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        // BEST PRACTICE: In a production application, this API call should be made from a
        // server-side proxy to protect the API key. The client would call an endpoint like `/api/chat/send`.
        // For this frontend-only demonstration, we are calling the Gemini API directly.
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{ role: 'user', parts: [{text: input}] }],
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                },
            });

            const botMessage: Message = { sender: 'bot', text: response.text };
            setMessages(prev => [...prev, botMessage]);
        } catch (error: any) {
            console.error("Gemini API Error:", error);
            // A real app would inspect the error to differentiate between quota errors (e.g., 429) and others.
            // For this demo, we'll assume any API error could be a quota issue and show the fallback game hub.
            setIsQuotaExhausted(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-[1000] w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-charcoal/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-indigo-brand/30 flex flex-col border border-indigo-brand/30"
        >
            <header className="flex items-center justify-between p-4 border-b border-indigo-brand/20 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <ViyanaAvatar mood="idle" size={40} />
                    <div>
                        <h3 className="font-sora font-bold text-soft-white">Viyana Solara</h3>
                        <p className="text-xs text-neon-blue/80 flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            {isQuotaExhausted ? 'API Limit Reached' : 'Online'}
                        </p>
                    </div>
                </div>
            </header>
            
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {isQuotaExhausted ? (
                    <CreativeGameHub />
                ) : (
                    <>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {msg.sender === 'bot' && <div className="w-8 h-8 flex-shrink-0"><ViyanaAvatar mood="idle" size={32} /></div>}
                                <div className={`max-w-[80%] p-3 rounded-lg ${msg.sender === 'user' ? 'bg-indigo-brand text-white rounded-br-none' : 'bg-indigo-brand/20 text-soft-white rounded-bl-none'}`}>
                                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/```(.*?)```/gs, '<pre class="bg-charcoal/50 p-2 rounded-md my-2 text-xs font-mono whitespace-pre-wrap"><code>$1</code></pre>') }}></p>
                                    {msg.isFallback && <p className="text-xs text-amber-400/80 mt-1">Cached Answer</p>}
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                                <div className="w-8 h-8 flex-shrink-0"><ViyanaAvatar mood="listening" size={32} /></div>
                                <div className="p-3 rounded-lg bg-indigo-brand/20 text-soft-white rounded-bl-none flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-0"></span>
                                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-150"></span>
                                    <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-bounce delay-300"></span>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {!isQuotaExhausted && (
                <form onSubmit={handleSendMessage} className="p-4 border-t border-indigo-brand/20 flex-shrink-0">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about services or prompts..."
                            className="w-full bg-indigo-brand/10 border-2 border-indigo-brand/30 rounded-lg py-2 pl-4 pr-12 text-soft-white placeholder:text-soft-white/50 focus:outline-none focus:border-neon-blue transition-colors duration-300"
                        />
                        <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-3 text-neon-blue hover:text-white transition-colors disabled:opacity-50" disabled={isLoading || !input.trim()} data-cursor-type="btn">
                            <SendIcon />
                        </button>
                    </div>
                </form>
            )}
        </motion.div>
    );
};

export default ChatWindow;