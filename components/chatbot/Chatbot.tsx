import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import ViyanaAvatar from '../BeannaAvatar';
import ChatIcon from '../icons/ChatIcon';
import CloseIcon from '../icons/CloseIcon';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <AnimatePresence>
                {isOpen && <ChatWindow onRequestClose={() => setIsOpen(false)} />}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[1001] w-16 h-16 rounded-full bg-gradient-to-br from-indigo-brand to-violet-brand text-white flex items-center justify-center shadow-2xl shadow-violet-brand/40"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
                data-cursor-type="btn"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isOpen ? 'close' : 'chat'}
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isOpen ? <CloseIcon /> : <ChatIcon />}
                    </motion.div>
                </AnimatePresence>
            </motion.button>
        </>
    );
};

export default Chatbot;
