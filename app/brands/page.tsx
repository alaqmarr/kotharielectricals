import prisma from '@/lib/db';
import Link from 'next/link';
import { TechnicalCard } from '@/components/ui/technical-card';
import { SearchBar } from '@/components/products/filter-sidebar';

export const dynamic = 'force-dynamic';

export default async function BrandsPage({ searchParams }: { searchParams: { q?: string } }) {
    // Determine query
    const query = searchParams?.q;

    // Filter Logic
    const whereClause: any = {};
    if (query) {
        whereClause.name = { contains: query, mode: 'insensitive' };
    }

    const brands = await prisma.brand.findMany({
        where: whereClause,
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { products: true }
            }
        }
    });

    return (
        <div className="min-h-screen bg-white pb-24 pt-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="border-b border-[#E5E5E5] pb-6 mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
                    <h1 className="text-4xl font-black uppercase tracking-tighter text-glow-orange">Authorized Partners</h1>
                    <div className="w-full md:w-80">
                        <SearchBar placeholder="SEARCH BRANDS..." />
                    </div>
                </div>

                {brands.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {brands.map((brand, i) => (
                            <Link key={brand.id} href={`/brands/${brand.id}`} className="block">
                                <TechnicalCard
                                    hoverEffect
                                    className="h-40 flex flex-col items-center justify-center text-center p-6 border-[#E5E5E5]"
                                >
                                    <h2 className="text-xl font-black text-[#111] uppercase tracking-tight group-hover:text-[#FF4400] transition-colors">{brand.name}</h2>
                                    <span className="mt-2 px-2 py-1 bg-gray-100 text-xs font-mono font-bold text-gray-500 rounded-sm">
                                        {brand._count.products} ITEMS
                                    </span>
                                </TechnicalCard>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 border border-dashed border-gray-300 text-center">
                        <p className="text-gray-500 font-mono">NO BRANDS FOUND MATCHING QUERY.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
