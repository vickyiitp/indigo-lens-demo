import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import PageBackground from './PageBackground';
import ServiceSelectionCard from './payment/ServiceSelectionCard';
import SurprisePlan from './payment/SurprisePlan';
import CheckoutSummary from './payment/CheckoutSummary';
import FAQAccordion from './payment/FAQAccordion';
import VideoEditIcon from './icons/VideoEditIcon';
import ImageCreationIcon from './icons/ImageCreationIcon';
import AIVideoIcon from './icons/AIVideoIcon';

export type ServicePlan = {
    id: string;
    title: string;
    price: number;
    priceDisplay: string;
    gumroadLink: string;
    features: string[];
};

const servicePlans: ServicePlan[] = [
    { id: 'video', title: 'AI Video Editing', price: 699, priceDisplay: '₹699 / $9', gumroadLink: 'https://gumroad.com/indigolens/purchase', features: ['Auto-cut', 'Captions', 'AI B-roll', 'Human polish'] },
    { id: 'graphics', title: 'AI Graphics', price: 499, priceDisplay: '₹499 / $6', gumroadLink: 'https://gumroad.com/indigolens/purchase', features: ['4K AI Art', 'Custom color mood', 'Brand consistency'] },
    { id: 'animation', title: 'AI Animation', price: 2999, priceDisplay: '₹2,999 / $36', gumroadLink: 'https://gumroad.com/indigolens/purchase', features: ['Character AI', 'Storyboarding', 'Voice sync'] },
];

const surprisePlan: ServicePlan = {
    id: 'surprise', title: '🎁 Surprise Me Plan', price: 1499, priceDisplay: '₹1,499 / $18', gumroadLink: 'https://gumroad.com/indigolens/purchase', features: ['AI-edited video', 'Cinematic poster', 'Indigo color preset']
};


const PaymentPage: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [selectedPlan, setSelectedPlan] = useState<ServicePlan | null>(null);

    const handleSelectPlan = (plan: ServicePlan) => {
        setSelectedPlan(plan);
    };

    const getIconForService = (id: string) => {
        if (id === 'video') return <VideoEditIcon />;
        if (id === 'graphics') return <ImageCreationIcon />;
        if (id === 'animation') return <AIVideoIcon />;
        return null;
    };
    
    const faqItems = [
      { q: "What happens after payment?", a: "You’ll receive an email within 24 hours with upload instructions and next steps." },
      { q: "Is my data safe?", a: "We delete raw media after delivery, and store only service metadata." },
      { q: "Can I get a refund?", a: "Yes, within 24 hours if no file delivery has started." }
    ];

    return (
        <section id="payment" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal z-10 overflow-hidden">
            <PageBackground scene="particles" active={true} reducedMotion={prefersReducedMotion} />
            
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2 className="font-sora text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">
                        Let’s Create Something Extraordinary
                    </h2>
                    <p className="max-w-3xl mx-auto text-lg text-soft-white/80 mb-16">
                        Choose your AI-powered service and start your creative journey now.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {servicePlans.map((plan, index) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                        >
                            <ServiceSelectionCard
                                icon={getIconForService(plan.id)}
                                title={plan.title}
                                subtitle="Turn your raw clips into cinematic reels."
                                features={plan.features}
                                price={plan.priceDisplay}
                                onSelect={() => handleSelectPlan(plan)}
                                isSelected={selectedPlan?.id === plan.id}
                            />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <SurprisePlan
                        plan={surprisePlan}
                        onSelect={() => handleSelectPlan(surprisePlan)}
                        isSelected={selectedPlan?.id === 'surprise'}
                    />
                </motion.div>

                <AnimatePresence>
                    {selectedPlan && (
                        <motion.div
                            className="mt-16"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        >
                           <CheckoutSummary selectedPlan={selectedPlan} />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="max-w-3xl mx-auto mt-20">
                     <h3 className="font-sora text-3xl font-bold text-soft-white mb-8">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <FAQAccordion key={index} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </div>

                 <p className="mt-16 text-center text-soft-white/60">
                    📩 Need help? Contact: <a href="mailto:team.indigolens@gmail.com" className="text-neon-blue hover:underline" data-cursor-type="link">team.indigolens@gmail.com</a>
                </p>

            </div>
        </section>
    );
};

export default PaymentPage;