import prisma from '@/lib/db';
import { TechnicalCard } from '@/components/ui/technical-card';
import { ArrowLeft, ArrowRight, Share2, Printer } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EnquireModal } from '@/components/products/enquire-modal'; // We will need client wrapper for interactivity
import { ProductActions } from '@/components/products/product-actions'; // New Client Component

export const revalidate = 60;
export const dynamicParams = true; // Allow on-demand generation of new pages

export async function generateStaticParams() {
    const products = await prisma.product.findMany({
        where: { status: { in: ['PUBLISHED', 'DRAFT'] } },
        select: { id: true },
    });
    return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    // Await params if required by Next.js 15+, but standard 14 approach is direct. Use `await` just in case.
    const { id } = await params;

    // Find Product
    // First try by ID
    let product = await prisma.product.findUnique({
        where: { id },
        include: { brand: true, category: true, images: true }
    });

    // If no product found by ID, maybe it's a slug, try to find by name? (Not implemented, strict ID for now)
    if (!product) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 selection:bg-[#FF4400] selection:text-white">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb / Back */}
                <div className="mb-8 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Link href="/products" className="hover:text-black flex items-center gap-1 transition-colors"><ArrowLeft size={14} /> Catalog</Link>
                    <span>/</span>
                    <Link href={`/categories/${product.categoryId}`} className="hover:text-black transition-colors">{product.category?.name || 'Category'}</Link>
                    <span>/</span>
                    <span className="text-[#FF4400]">Current Item</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left: Image (Col 7) */}
                    <div className="lg:col-span-7">
                        <TechnicalCard className="h-[500px] md:h-[600px] bg-white flex items-center justify-center relative overflow-hidden group">
                            {product.images?.[0]?.url ? (
                                <Image src={product.images[0].url} alt={product.name} fill className="object-contain p-12 group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="text-gray-100 font-black text-9xl -rotate-45 select-none">NO IMG</div>
                            )}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                        </TechnicalCard>
                    </div>

                    {/* Right: Specs (Col 5) */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.9] mb-4 text-glow-orange">{product.name}</h1>
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 bg-[#FF4400] text-white text-xs font-bold uppercase tracking-widest">{product.brand?.name || 'GENERIC'}</span>
                                <span className="px-3 py-1 border border-black text-black text-xs font-bold uppercase tracking-widest">In Stock</span>
                            </div>
                        </div>

                        <div className="border-t border-b border-[#E5E5E5] py-8 space-y-4">
                            <p className="text-gray-600 font-mono text-sm leading-relaxed">
                                {product.description || "No technical description available for this unit. Please contact engineering support for datasheet."}
                            </p>
                        </div>

                        {/* Specs Table */}
                        <TechnicalCard hoverEffect={false}>
                            <div className="divide-y divide-[#E5E5E5]">
                                <div className="flex justify-between p-4 bg-gray-50">
                                    <span className="text-xs font-bold uppercase text-gray-400">Model ID</span>
                                    <span className="text-xs font-mono font-bold">{product.id.substring(0, 8).toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between p-4">
                                    <span className="text-xs font-bold uppercase text-gray-400">Category</span>
                                    <span className="text-xs font-mono font-bold uppercase">{product.category?.name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between p-4 bg-gray-50">
                                    <span className="text-xs font-bold uppercase text-gray-400">Last Update</span>
                                    <span className="text-xs font-mono font-bold">{new Date(product.updatedAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </TechnicalCard>

                        {/* Actions */}
                        <ProductActions productName={product.name} />
                    </div>
                </div>
            </div>
        </div>
    );
}
