import React from 'react';
import ServiceCard from './ServiceCard';
import PageBackground from './PageBackground';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import VideoEditIcon from './icons/VideoEditIcon';
import ImageCreationIcon from './icons/ImageCreationIcon';
import AIVideoIcon from './icons/AIVideoIcon';

const Services: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const servicesData = [
        {
            icon: <VideoEditIcon />,
            title: 'AI Video Editing',
            description: 'Auto-cut, captions, cinematic grade, ready-for-social.',
        },
        {
            icon: <ImageCreationIcon />,
            title: 'AI Images',
            description: 'Posters, thumbnails, and ad visuals — prompt-based.',
        },
        {
            icon: <AIVideoIcon />,
            title: 'AI Animations',
            description: 'Short anime beats, pilot scenes with studio-grade polish.',
        },
    ];

    return (
        <section id="services" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal z-10 overflow-hidden">
            <PageBackground scene="particles" active={true} reducedMotion={prefersReducedMotion} />
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="font-sora text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">
                    Our Visionary Tools
                </h2>
                <p className="max-w-3xl mx-auto text-lg text-soft-white/80 mb-16">
                    Harness the power of generative AI with our suite of creative tools. Designed for artists, filmmakers, and creators of all kinds.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {servicesData.map((service, index) => (
                        <ServiceCard 
                            key={service.title}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            delay={index * 0.2}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;