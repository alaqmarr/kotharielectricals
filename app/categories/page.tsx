import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/db';
import { TechnicalCard } from '@/components/ui/technical-card';
import { SearchBar } from '@/components/products/filter-sidebar';

// Static Image Mapping
const categoryImages: Record<string, string> = {
    'cat_wires_cables': 'https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?q=80&w=400',
    'cat_switches': 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=400',
    'cat_led_lights': 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400',
    'cat_switch_gear': 'https://images.unsplash.com/photo-1621905251189-fc01530c6c03?q=80&w=400',
    'cat_lugs_glands': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400',
    'cat_conduits': 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=400',
    'cat_termination': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=400',
    'cat_cable_ties': 'https://images.unsplash.com/photo-1591267990427-013d7a493f3b?q=80&w=400',
    'cat_panel_accessories': 'https://images.unsplash.com/photo-1580828343077-51c96a32dc28?q=80&w=400',
    'cat_other_accessories': 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=400',
};

export const dynamic = 'force-dynamic';

export default async function CategoriesPage({ searchParams }: { searchParams: { q?: string } }) {
    // Determine query
    const query = searchParams?.q;

    // Filter Logic
    const whereClause: any = {};
    if (query) {
        whereClause.name = { contains: query, mode: 'insensitive' };
    }

    const categories = await prisma.category.findMany({
        where: whereClause,
        orderBy: { name: 'asc' },
    });

    return (
        <div className="min-h-screen bg-white pb-24 pt-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="border-b border-[#E5E5E5] pb-6 mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-glow-orange">Category Index</h1>
                        <span className="font-mono text-[#FF4400] font-bold text-xs">AVG. SHIP TIME: 24H</span>
                    </div>
                    <div className="w-full md:w-80">
                        <SearchBar placeholder="SEARCH CATEGORIES..." />
                    </div>
                </div>

                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, i) => (
                            <Link key={category.id} href={`/categories/${category.id}`} className="block">
                                <TechnicalCard
                                    hoverEffect
                                    className="h-full group"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="p-6">
                                            <h2 className="text-2xl font-black uppercase text-[#111] mb-2">{category.name}</h2>
                                            <span className="text-xs font-bold uppercase tracking-widest text-[#FF4400] border-b border-[#FF4400] pb-0.5">Explore Section</span>
                                        </div>
                                    </div>
                                </TechnicalCard>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 border border-dashed border-gray-300 text-center">
                        <p className="text-gray-500 font-mono">NO CATEGORIES FOUND MATCHING QUERY.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
