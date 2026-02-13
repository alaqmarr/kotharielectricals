import prisma from '@/lib/db';
import { ProductsList } from '@/components/products/products-list';
import { notFound } from 'next/navigation';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
    const brands = await prisma.brand.findMany({ select: { id: true } });
    return brands.map((b) => ({ id: b.id }));
}

interface Props {
    params: Promise<{ id: string }>;
}

export default async function BrandDetailPage(props: Props) {
    const params = await props.params; // Await params directly in Next.js 15/16
    const brand = await prisma.brand.findUnique({
        where: { id: params.id },
    });

    if (!brand) return notFound();

    const products = await prisma.product.findMany({
        where: {
            brandId: params.id,
            status: { in: ['PUBLISHED', 'DRAFT'] },
        },
        include: {
            brand: true,
            category: true,
            images: true,
        },
    });

    const formattedProducts = products.map(p => ({
        id: p.id,
        name: p.name,
        brandName: p.brand?.name || 'Unknown Brand',
        categoryName: p.category?.name || 'Uncategorized',
        image: p.images?.[0]?.url || null,
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8 border-b pb-4">
                <span className="text-sm text-gray-400 uppercase tracking-widest font-bold">Brand</span>
                <h1 className="text-4xl font-bold text-[#003366] mt-2">{brand.name}</h1>
            </div>

            {products.length > 0 ? (
                <ProductsList initialProducts={formattedProducts} />
            ) : (
                <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-lg">
                    <p className="text-xl">No products found for this brand yet.</p>
                </div>
            )}
        </div>
    );
}
