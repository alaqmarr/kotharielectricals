import prisma from '@/lib/db';
import { ProductsList } from '@/components/products/products-list';
import { FilterSidebar, SearchBar } from '@/components/products/filter-sidebar';

export const dynamic = 'force-dynamic';

interface ProductsPageProps {
    searchParams: {
        category?: string;
        brand?: string;
        q?: string;
    };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
    const { category, brand, q } = await searchParams;

    // Filter Logic
    const where: any = {
        status: { in: ['PUBLISHED', 'DRAFT'] },
    };

    if (category) where.categoryId = category;
    if (brand) where.brandId = brand;
    if (q) {
        where.OR = [
            { name: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
        ];
    }

    // Parallel Data Fetching
    const [products, categories, brands] = await Promise.all([
        prisma.product.findMany({
            where,
            include: { brand: true, category: true, images: true },
            orderBy: { name: 'asc' },
        }),
        prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
        prisma.brand.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
    ]);

    const formattedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        brandName: p.brand?.name || 'GENERIC',
        categoryName: p.category?.name || 'PART',
        image: p.images[0]?.url || null,
    }));

    return (
        <div className="min-h-screen pb-24 pt-12 bg-frosted">
            <div className="max-w-[1920px] mx-auto px-4 md:px-6">
                {/* Header */}
                <div className="border-b border-t border-[#E5E5E5] py-12 mb-8 flex flex-col md:flex-row justify-between items-end gap-6 bg-[#F8F9FA] px-6">
                    <div>
                        <span className="text-[#FF4400] font-mono text-xs uppercase font-bold tracking-widest block mb-1">/ CATALOG / MASTER</span>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-glow-orange">
                            Inventory<br />Database
                        </h1>
                    </div>
                    <div className="w-full md:w-96">
                        <SearchBar placeholder="SEARCH PART ID OR NAME..." />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <FilterSidebar categories={categories} brands={brands} />
                    </div>

                    {/* Product Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-4 flex justify-between items-center px-1">
                            <span className="text-xs font-bold uppercase text-gray-400">
                                Showing {products.length} Results
                            </span>
                            {/* Potential Sort Dropdown here later */}
                        </div>

                        {products.length > 0 ? (
                            <ProductsList initialProducts={formattedProducts} />
                        ) : (
                            <div className="py-24 text-center border border-dashed border-gray-300 bg-white">
                                <p className="text-gray-500 font-mono uppercase">No items found matching criteria.</p>
                                {(category || brand || q) && (
                                    <a href="/products" className="inline-block mt-4 text-xs font-bold uppercase text-[#FF4400] hover:underline">
                                        Clear All Filters
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
