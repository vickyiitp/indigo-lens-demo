import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
    return (
        <a href={href} data-cursor-type="link" className="relative text-soft-white/80 hover:text-soft-white transition-colors duration-300 group">
             <motion.span 
                className="inline-block group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-neon-blue to-violet-brand transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,245,255,0.7)]"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {children}
            </motion.span>
            <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-neon-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left group-hover:bg-gradient-to-r from-neon-blue to-violet-brand"></span>
        </a>
    );
};

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        data-cursor-type="link"
        className="text-soft-white/80 hover:text-neon-blue transition-colors duration-300"
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
        {children}
    </motion.a>
);


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-charcoal/80 backdrop-blur-lg border-b border-indigo-brand/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" data-cursor-type="link" className="font-sora text-2xl font-bold">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">Indigo Lens</span>
                        </a>
                    </div>
                    <div className="hidden md:flex items-center">
                        <nav className="flex items-baseline space-x-8">
                            <NavLink href="#">Home</NavLink>
                            <NavLink href="#services">Services</NavLink>
                            <NavLink href="#creations">AI Creations</NavLink>
                            <NavLink href="#products">Products</NavLink>
                            <NavLink href="#payment">Pricing</NavLink>
                        </nav>
                        <div className="flex items-center gap-5 pl-6 ml-6 border-l border-indigo-brand/20">
                           <SocialLink href="#"><TwitterIcon /></SocialLink>
                           <SocialLink href="#"><InstagramIcon /></SocialLink>
                           <SocialLink href="#"><LinkedInIcon /></SocialLink>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} data-cursor-type="btn" className="inline-flex items-center justify-center p-2 rounded-md text-soft-white/80 hover:text-white focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <motion.div 
                    className="md:hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#" data-cursor-type="link" className="block px-3 py-2 rounded-md text-base font-medium text-soft-white/80 hover:text-white hover:bg-indigo-brand/20">Home</a>
                        <a href="#services" data-cursor-type="link" className="block px-3 py-2 rounded-md text-base font-medium text-soft-white/80 hover:text-white hover:bg-indigo-brand/20">Services</a>
                        <a href="#creations" data-cursor-type="link" className="block px-3 py-2 rounded-md text-base font-medium text-soft-white/80 hover:text-white hover:bg-indigo-brand/20">AI Creations</a>
                        <a href="#products" data-cursor-type="link" className="block px-3 py-2 rounded-md text-base font-medium text-soft-white/80 hover:text-white hover:bg-indigo-brand/20">Products</a>
                        <a href="#payment" data-cursor-type="link" className="block px-3 py-2 rounded-md text-base font-medium text-soft-white/80 hover:text-white hover:bg-indigo-brand/20">Pricing</a>
                    </div>
                     <div className="flex justify-center items-center gap-6 pt-4 pb-4 border-t border-indigo-brand/20">
                        <SocialLink href="#"><TwitterIcon /></SocialLink>
                        <SocialLink href="#"><InstagramIcon /></SocialLink>
                        <SocialLink href="#"><LinkedInIcon /></SocialLink>
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;