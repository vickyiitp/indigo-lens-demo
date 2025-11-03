import React from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import HoverCard from './HoverCard';
import PageBackground from './PageBackground';

const Creations: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    return (
        <section id="creations" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal z-10">
            <PageBackground scene="particles" active={true} reducedMotion={prefersReducedMotion} />
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="font-sora text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">
                    AI Creations
                </h2>
                <p className="max-w-3xl mx-auto text-lg text-soft-white/80 mb-16">
                    All AI Creations are generated, curated, and polished by Indigo Lens and presented by Viyana Solara. Each asset includes the prompt used.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <HoverCard
                        title="Project Nebula"
                        description="A swirling vortex of color, generated from stellar data."
                        imageUrl="https://picsum.photos/seed/nebula/600/400"
                    />
                    <HoverCard
                        title="Cybernetic Dreams"
                        description="Visions of a futuristic city, rendered in chrome and neon."
                        imageUrl="https://picsum.photos/seed/cyber/600/400"
                    />
                    <HoverCard
                        title="Organic Algorithms"
                        description="Intricate patterns that mimic nature's own designs."
                        imageUrl="https://picsum.photos/seed/organic/600/400"
                    />
                </div>
            </div>
        </section>
    );
};

export default Creations;
