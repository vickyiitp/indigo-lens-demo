import React, { useState, useMemo } from 'react';
// FIX: Import `Variants` type from framer-motion to correctly type animation variants.
import { motion, Variants } from 'framer-motion';
import ProductCard from './ProductCard';
import PageBackground from './PageBackground';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import SearchIcon from './icons/SearchIcon';
import ClearIcon from './icons/ClearIcon';

type Product = {
    id: number;
    title: string;
    description: string;
    price: string;
    gumroadLink: string;
    thumbnailUrl: string;
    isBestseller?: boolean;
    isNew?: boolean;
    popularity: number;
    createdAt: string;
    priceValue: number;
};

const productsData: Product[] = [
    {
        id: 1,
        title: "Cinematic Reel Starter Pack",
        description: "25 dynamic transitions, 10 lens flares, 5 motion overlays.",
        price: "₹499 / $6",
        gumroadLink: "https://gumroad.com/indigogems/reelstarter",
        thumbnailUrl: "https://picsum.photos/seed/reelpack/600/400",
        isBestseller: true,
        popularity: 95,
        createdAt: "2023-10-26T10:00:00Z",
        priceValue: 499,
    },
    {
        id: 2,
        title: "Prompt Masterbook Vol. 1",
        description: "100 powerful AI prompts for video editing, storytelling & branding.",
        price: "₹899 / $11",
        gumroadLink: "https://gumroad.com/indigogems/masterbook",
        thumbnailUrl: "https://picsum.photos/seed/masterbook/600/400",
        isNew: true,
        popularity: 88,
        createdAt: "2023-11-05T10:00:00Z",
        priceValue: 899,
    },
    {
        id: 3,
        title: "Animation Kit – Viyana Series",
        description: "15 animated characters & effects inspired by Indigo Lens Universe.",
        price: "₹1199 / $15",
        gumroadLink: "https://gumroad.com/indigogems/viyana-kit",
        thumbnailUrl: "https://picsum.photos/seed/viyanakit/600/400",
        popularity: 70,
        createdAt: "2023-09-15T10:00:00Z",
        priceValue: 1199,
    },
];

// FIX: Explicitly type with `Variants` to resolve type compatibility issues.
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

// FIX: Explicitly type with `Variants` to ensure compatibility with framer-motion's 
// expected types, resolving the `ease` property type error.
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        },
    },
};

const Products: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const [sortKey, setSortKey] = useState<'newest' | 'popular' | 'price'>('popular');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAndSortedProducts = useMemo(() => {
        const filtered = productsData.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const sorted = [...filtered];
        switch (sortKey) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'popular':
                return sorted.sort((a, b) => b.popularity - a.popularity);
            case 'price':
                return sorted.sort((a, b) => a.priceValue - b.priceValue);
            default:
                return sorted;
        }
    }, [sortKey, searchQuery]);

    return (
        <section id="products" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-charcoal z-10 overflow-hidden">
            <PageBackground scene="particles" active={true} reducedMotion={prefersReducedMotion} />
            
            <div className="absolute inset-0 z-0 opacity-10">
                {/* Faint IndigoGems logo watermark can be added here as an SVG */}
            </div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <h2 className="font-sora text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-violet-brand">
                    Digital Creative Assets
                </h2>
                <p className="max-w-3xl mx-auto text-lg text-soft-white/80 mb-12">
                    Explore our collection of AI-powered prompt packs, design templates, and video kits.
                </p>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div className="relative w-full md:w-auto md:flex-grow max-w-md">
                         <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search products by title or description..."
                            className="w-full bg-charcoal/80 border-2 border-indigo-brand/50 rounded-lg py-2 pl-10 pr-10 text-soft-white placeholder-soft-white/50 focus:outline-none focus:border-neon-blue transition-colors duration-300"
                            aria-label="Search products"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-soft-white/70">
                            <SearchIcon />
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-soft-white/70 hover:text-neon-blue"
                                aria-label="Clear search"
                                data-cursor-type="btn"
                            >
                                <ClearIcon />
                            </button>
                        )}
                    </div>

                    <div className="relative">
                         <select
                            onChange={(e) => setSortKey(e.target.value as 'newest' | 'popular' | 'price')}
                            value={sortKey}
                            className="appearance-none bg-charcoal/80 border-2 border-indigo-brand/50 rounded-lg py-2 pl-4 pr-10 text-soft-white focus:outline-none focus:border-neon-blue transition-colors duration-300"
                            aria-label="Sort products"
                        >
                            <option value="popular">Sort By: Popular</option>
                            <option value="newest">Sort By: Newest</option>
                            <option value="price">Sort By: Price</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-soft-white/70">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map((product) => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard {...product} />
                            </motion.div>
                        ))
                    ) : (
                         <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                            <p className="text-xl text-soft-white/70">No products found for "{searchQuery}".</p>
                            <p className="mt-2 text-soft-white/50">Try a different search term or clear the search.</p>
                        </div>
                    )}
                </motion.div>

                <div className="mt-20 text-center text-soft-white/70">
                    <p className="text-lg">💡 All IndigoGems digital products are handcrafted with AI precision and human creativity. Files are securely delivered via Gumroad instantly after purchase.</p>
                    <p className="mt-6 text-base">
                        Looking for custom digital products? Contact <a href="mailto:team.indigogems@gmail.com" className="text-neon-blue hover:underline" data-cursor-type="link">team.indigogems@gmail.com</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Products;