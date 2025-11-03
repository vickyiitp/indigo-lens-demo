import React from 'react';
import { motion } from 'framer-motion';
import TwitterIcon from './icons/TwitterIcon';
import InstagramIcon from './icons/InstagramIcon';
import LinkedInIcon from './icons/LinkedInIcon';

const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <motion.a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        data-cursor-type="link"
        className="text-soft-white/80 hover:text-neon-blue transition-colors duration-300"
        whileHover={{ scale: 1.15, y: -3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
    >
        {children}
    </motion.a>
);

const PolicyLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
     <motion.a
        href={href}
        data-cursor-type="link"
        className="relative text-soft-white/60 hover:text-soft-white transition-colors duration-300 group"
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 300 }}
    >
        <span className="group-hover:text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand group-hover:drop-shadow-[0_0_4px_rgba(0,245,255,0.6)]">
            {children}
        </span>
    </motion.a>
);


const Footer: React.FC = () => {
    return (
        <footer className="relative bg-charcoal/80 backdrop-blur-sm border-t border-indigo-brand/20 py-12 px-4 sm:px-6 lg:px-8 z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-y-10 md:gap-8">
                <div className="text-center md:text-left">
                    <a href="#" data-cursor-type="link" className="font-sora text-2xl font-bold inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">Indigo Lens</span>
                    </a>
                    <p className="text-sm text-soft-white/60 mt-2">
                        &copy; {new Date().getFullYear()} Indigo Lens. All rights reserved.
                    </p>
                </div>

                <div className="text-center md:text-left text-sm text-soft-white/60">
                    <p>Viyana Solara — AI persona representing Indigo Lens; generated assets; transparency note.</p>
                    <div className="mt-3 flex justify-center md:justify-start gap-4">
                        <PolicyLink href="#">Terms of Service</PolicyLink>
                        <span>|</span>
                        <PolicyLink href="#">Privacy Policy</PolicyLink>
                    </div>
                </div>

                <div className="flex items-center justify-center md:justify-end gap-6">
                    <SocialLink href="#">
                        <TwitterIcon />
                    </SocialLink>
                    <SocialLink href="#">
                        <InstagramIcon />
                    </SocialLink>
                    <SocialLink href="#">
                        <LinkedInIcon />
                    </SocialLink>
                </div>
            </div>
        </footer>
    );
};

export default Footer;