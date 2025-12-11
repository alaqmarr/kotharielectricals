'use client';

import { GlassCard } from '@/components/ui/glass-card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    brandName: string;
    categoryName: string;
}

interface Props {
    products: Product[];
}

export function ProductShowcase({ products }: Props) {
    return (
        <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black text-[#003366] uppercase tracking-tighter">
                            Featured <span className="text-[#FF6600]">Products</span>
                        </h2>
                        <div className="h-1 w-20 bg-[#FF6600] mt-2" />
                    </div>
                    <Link href="/products" className="group flex items-center gap-2 text-[#003366] font-bold uppercase tracking-widest hover:text-[#FF6600] transition-colors">
                        View All Catalog <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product, i) => (
                        <GlassCard key={product.id} hoverEffect className="p-4">
                            {/* Technical Corners */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF6600] opacity-30" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF6600] opacity-30" />

                            <div className="relative h-48 w-full bg-white/50 mb-4 overflow-hidden rounded-sm border border-gray-100">
                                {/* Placeholder for Product Image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                    <Zap size={32} />
                                </div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-[#003366]/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-4 py-2 border border-white text-white font-bold text-sm tracking-widest uppercase">Inspect</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-mono text-[#FF6600] uppercase tracking-wider">{product.brandName}</p>
                                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 hover:text-[#003366] transition-colors">{product.name}</h3>
                                <p className="text-xs text-gray-500">{product.categoryName}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
