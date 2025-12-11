'use client';

import { ProductCardActions } from '@/components/products/product-card-actions';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    brandName: string;
    categoryName: string;
    image: string | null;
}

interface ProductsListProps {
    initialProducts: Product[];
}

export function ProductsList({ initialProducts }: ProductsListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {initialProducts.map((p, i) => (
                <div key={p.id} className="relative group">
                    {/* Technical Card Container */}
                    <div className="bg-white border border-[#E5E5E5] hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        {/* Link Wrapper */}
                        <Link href={`/products/${p.id}`} className="block">
                            {/* Image Area */}
                            <div className="h-40 relative flex items-center justify-center bg-white border-b border-[#E5E5E5] overflow-hidden group-hover:bg-gray-50 transition-colors">
                                {p.image ? (
                                    <img src={p.image} alt={p.name} className="h-24 w-auto object-contain" />
                                ) : (
                                    <span className="text-gray-200 font-black text-6xl opacity-20 rotate-45">IMG</span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight block mb-1">{p.categoryName}</span>
                                <h3 className="text-sm font-bold text-black uppercase leading-tight line-clamp-2 h-10 mb-4 group-hover:text-[#FF4400] transition-colors">{p.name}</h3>
                            </div>
                        </Link>

                        <ProductCardActions productName={p.name} />
                    </div>
                </div>
            ))}
        </div>
    );
}
