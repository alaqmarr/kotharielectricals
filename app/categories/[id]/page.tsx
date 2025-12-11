import prisma from '@/lib/db';
import { ProductsList } from '@/components/products/products-list';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function CategoryDetailPage(props: Props) {
    const params = await props.params;
    const category = await prisma.category.findUnique({
        where: { id: params.id },
    });

    if (!category) return notFound();

    const products = await prisma.product.findMany({
        where: {
            categoryId: params.id,
            status: 'PUBLISHED',
        },
        include: {
            brand: true,
            category: true,
        },
    });

    const formattedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        brandName: p.brand?.name || 'Unknown Brand',
        categoryName: p.category?.name || 'Uncategorized',
        image: null,
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8 border-b pb-4">
                <span className="text-sm text-gray-400 uppercase tracking-widest font-bold">Category</span>
                <h1 className="text-4xl font-bold text-[#003366] mt-2">{category.name}</h1>
            </div>

            {products.length > 0 ? (
                <ProductsList initialProducts={formattedProducts} />
            ) : (
                <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-lg">
                    <p className="text-xl">No products found in this category yet.</p>
                </div>
            )}
        </div>
    );
}
