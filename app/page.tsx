import { TechCarousel } from '@/components/home/tech-carousel';
import { TechnicalCard } from '@/components/ui/technical-card';
import { ProductCardActions } from '@/components/products/product-card-actions';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/db';
import { ArrowRight, Star } from 'lucide-react';

export const dynamic = 'force-dynamic';


export default async function Home() {
  // Fetch featured products
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    where: { status: { in: ['PUBLISHED', 'DRAFT'] } },
    include: { brand: true, category: true, images: true },
    orderBy: { priority: 'desc' }
  });

  const featuredBrands = await prisma.brand.findMany({
    take: 8,
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' }
  });

  const marqueeBrands = await prisma.brand.findMany({
    orderBy: { name: 'asc' },
    select: { name: true }
  });

  // Fetch categories from database (no caching)
  const categories = await prisma.category.findMany({
    take: 8,
    orderBy: { name: 'asc' },
    select: { id: true, name: true }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Carousel */}
      <TechCarousel />

      {/* 2. Brand Marquee - Technical Style */}
      <div className="border-b border-[#E5E5E5] bg-gray-50 py-4 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...Array(8)].map((_, setIndex) => (
            <div key={setIndex} className="flex items-center gap-8 md:gap-16 pr-8 md:pr-16">
              {(marqueeBrands.length > 0 ? marqueeBrands : [{ name: 'Polycab' }, { name: 'Finolex' }, { name: 'Schneider' }, { name: 'Legrand' }]).map((brand, i) => (
                <span key={`${setIndex}-${i}`} className="text-lg md:text-xl font-bold font-mono text-gray-400 uppercase tracking-widest hover:text-[#FF4400] transition-colors cursor-default whitespace-nowrap">
                  {brand.name}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Categories - Grid (from Database) */}
      <section className="py-20 border-b border-[#E5E5E5] bg-frosted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#FF4400] uppercase tracking-widest block mb-2">/// INDEX_01</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-glow-orange">Category<br />Index</h2>
            </div>
            <Link href="/categories" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
              View Full Index <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <TechnicalCard key={cat.id} className="group cursor-pointer" hoverEffect>
                <Link href={`/categories/${cat.id}`} className="block relative">
                  <div className="p-6">
                    <h3 className="text-xl font-bold uppercase mb-1">{cat.name}</h3>
                    <div className="h-1 w-full bg-gray-100 mt-4 overflow-hidden">
                      <div className="h-full bg-[#FF4400] w-0 group-hover:w-full transition-all duration-500 ease-out" />
                    </div>
                  </div>
                </Link>
              </TechnicalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Products - Sync with Products Page */}
      <section className="py-20 border-b border-[#E5E5E5] bg-frosted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#FF4400] uppercase tracking-widest block mb-2">/// INV_02</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-glow-orange">Featured<br />Inventory</h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
              Full Catalog <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((p, i) => (
              <TechnicalCard key={p.id} className="bg-white" hoverEffect>
                <Link href={`/products/${p.id}`} className="block group">
                  <div className="h-48 relative flex items-center justify-center bg-white border-b border-[#E5E5E5] overflow-hidden p-6 group-hover:bg-gray-50 transition-colors">
                    {p.images?.[0]?.url ? (
                      <Image src={p.images[0].url} alt={p.name} fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="text-gray-200 font-black text-6xl opacity-20 rotate-45 select-none">IMG</div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight block mb-1">{p.category?.name}</span>
                    <h3 className="text-sm font-bold text-black uppercase leading-tight line-clamp-2 h-10 mb-4 group-hover:text-[#FF4400] transition-colors">{p.name}</h3>
                  </div>
                </Link>
                <ProductCardActions productName={p.name} />
              </TechnicalCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Brands */}
      <section className="py-20 border-b border-[#E5E5E5] bg-frosted">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-xs font-bold text-[#FF4400] uppercase tracking-widest block mb-2">/// PARTNERS_03</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-glow-orange">Featured<br />Brands</h2>
            </div>
            <Link href="/brands" className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors">
              All Partners <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredBrands.map((brand, i) => (
              <Link key={brand.id} href={`/brands/${brand.id}`} className="block group">
                <TechnicalCard
                  hoverEffect
                  className="h-40 flex flex-col items-center justify-center text-center p-6 border-[#E5E5E5] group-hover:bg-white"
                >
                  <h2 className="text-xl font-black text-[#111] uppercase tracking-tight group-hover:text-[#FF4400] transition-colors">{brand.name}</h2>
                  <span className="mt-2 px-2 py-1 bg-gray-100 text-xs font-mono font-bold text-gray-500 rounded-sm">
                    {brand._count.products} ITEMS
                  </span>
                </TechnicalCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About / CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block border border-black bg-white px-4 py-1 mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.2em]">System Status: Operational</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            Engineering<br />
            <span className="text-glow-orange">Excellence</span><br />
            Since 1989
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            We don't just supply hardware; we provide the backbone for industrial infrastructure.
            Genuine parts, technical expertise, and zero-compromise reliability.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/contact" className="px-10 py-5 bg-[#FF4400] text-white font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-orange-500/20">
              Initiate Project
            </Link>
            <Link href="/about" className="px-10 py-5 bg-white text-black border border-[#E5E5E5] font-bold uppercase tracking-widest hover:border-black transition-colors">
              Company Dossier
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
