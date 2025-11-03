import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import Preloader from './components/Preloader';

// Lazy load components
const Header = lazy(() => import('./components/Header'));
const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Creations = lazy(() => import('./components/Creations'));
const Products = lazy(() => import('./components/Products'));
const PaymentPage = lazy(() => import('./components/PaymentPage'));
const Footer = lazy(() => import('./components/Footer'));
const Chatbot = lazy(() => import('./components/chatbot/Chatbot'));
const CustomCursor = lazy(() => import('./components/CustomCursor'));

const App: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Reduced preloader time

        return () => clearTimeout(timer);
    }, []);

    // Add/remove class to body to hide default cursor
    useEffect(() => {
        const canHover = window.matchMedia('(hover: hover)').matches;
        if (canHover && !prefersReducedMotion && !isLoading) {
            document.body.classList.add('hide-cursor');
        } else {
            document.body.classList.remove('hide-cursor');
        }
        return () => document.body.classList.remove('hide-cursor');
    }, [prefersReducedMotion, isLoading]);
    
    const canHover = isMounted && window.matchMedia('(hover: hover)').matches;

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-charcoal">
            <AnimatePresence>
                {isLoading && <Preloader />}
            </AnimatePresence>
            
            <Suspense fallback={<div />}>
                {canHover && !prefersReducedMotion && <CustomCursor />}
                {!isLoading && (
                    <>
                        <Header />
                        <main>
                            <Hero />
                            <Services />
                            <Creations />
                            <Products />
                            <PaymentPage />
                        </main>
                        <Footer />
                        <Chatbot />
                    </>
                )}
            </Suspense>
        </div>
    );
};

export default App;