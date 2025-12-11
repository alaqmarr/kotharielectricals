'use client';

import { Search, Filter, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TechnicalCard } from '@/components/ui/technical-card';
import { useDebounce } from '@/hooks/use-debounce';

// --- Search Bar Component ---
export function SearchBar({ placeholder = "Search Database...", className }: { placeholder?: string, className?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const debouncedQuery = useDebounce(query, 500);

    useEffect(() => {
        const currentQ = searchParams.get('q') || '';
        if (currentQ === debouncedQuery) return;

        const params = new URLSearchParams(searchParams.toString());
        if (debouncedQuery) {
            params.set('q', debouncedQuery);
        } else {
            params.delete('q');
        }
        // Reset page if needed, optional
        params.delete('page');
        router.push(`?${params.toString()}`);
    }, [debouncedQuery, router, searchParams]);

    // Update local state if URL changes externally (e.g. clear filters)
    useEffect(() => {
        if (!searchParams.get('q') && query !== '') {
            setQuery('');
        }
    }, [searchParams]);

    return (
        <div className={cn("relative group w-full", className)}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full h-12 pl-12 pr-4 bg-white border border-[#E5E5E5] font-mono text-sm focus:outline-none focus:border-black focus:ring-0 transition-colors placeholder-gray-400 uppercase"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#FF4400] transition-colors" size={18} />
            <div className="absolute right-0 top-0 h-12 px-4 flex items-center justify-center border-l border-[#E5E5E5] bg-gray-50">
                {query !== debouncedQuery ? (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-black animate-spin" />
                ) : (
                    <ArrowRightIcon />
                )}
            </div>
        </div>
    );
}

function ArrowRightIcon() {
    return <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>;
}


// --- Filter Sidebar Component ---
interface FilterSidebarProps {
    categories: { id: string; name: string }[];
    brands: { id: string; name: string }[];
}

export function FilterSidebar({ categories, brands }: FilterSidebarProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false); // Mobile Drawer State

    // URL Param Helpers
    const currentCat = searchParams.get('category');
    const currentBrand = searchParams.get('brand');

    const updateFilter = (type: 'category' | 'brand', value: string | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(type, value);
        } else {
            params.delete(type);
        }
        // Reset page on filter change
        params.delete('page');
        router.push(`?${params.toString()}`);
        setIsOpen(false);
    };

    const clearFilters = () => {
        router.push('?');
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden w-full flex items-center justify-between px-4 py-3 bg-white border border-[#E5E5E5] font-bold uppercase mb-4"
            >
                <div className="flex items-center gap-2">
                    <Filter size={16} className="text-[#FF4400]" /> Filters
                </div>
                <ChevronRight size={16} />
            </button>

            {/* Sidebar Content (Desktop: Always visible, Mobile: Drawer) */}
            <div className={cn(
                "fixed inset-0 z-50 bg-white transform transition-transform duration-300 md:relative md:transform-none md:translate-x-0 md:bg-transparent md:z-0 md:block p-6 md:p-0 h-full overflow-y-auto md:h-auto md:overflow-visible",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex justify-between items-center md:hidden mb-6 border-b border-[#E5E5E5] pb-4">
                    <h2 className="text-xl font-black uppercase">Filters</h2>
                    <button onClick={() => setIsOpen(false)}><X /></button>
                </div>

                <div className="space-y-8">
                    {/* Filter Group: Categories */}
                    <TechnicalCard title="CATEGORY_FILTER" hoverEffect={false}>
                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                            <div
                                onClick={() => updateFilter('category', null)}
                                className={cn(
                                    "px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-gray-50 flex justify-between group transition-colors",
                                    !currentCat ? "bg-black text-white hover:bg-black" : "text-gray-500"
                                )}
                            >
                                All Categories
                                {!currentCat && <div className="w-1.5 h-1.5 bg-[#FF4400] rounded-full self-center" />}
                            </div>
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    onClick={() => updateFilter('category', cat.id)}
                                    className={cn(
                                        "px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-gray-50 flex justify-between group transition-colors",
                                        currentCat === cat.id ? "bg-black text-white hover:bg-black" : "text-gray-500"
                                    )}
                                >
                                    {cat.name}
                                    {currentCat === cat.id && <div className="w-1.5 h-1.5 bg-[#FF4400] rounded-full self-center" />}
                                </div>
                            ))}
                        </div>
                    </TechnicalCard>

                    {/* Filter Group: Brands */}
                    <TechnicalCard title="BRAND_PARTNER" hoverEffect={false}>
                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                            <div
                                onClick={() => updateFilter('brand', null)}
                                className={cn(
                                    "px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-gray-50 flex justify-between group transition-colors",
                                    !currentBrand ? "bg-black text-white hover:bg-black" : "text-gray-500"
                                )}
                            >
                                All Brands
                                {!currentBrand && <div className="w-1.5 h-1.5 bg-[#FF4400] rounded-full self-center" />}
                            </div>
                            {brands.map(brand => (
                                <div
                                    key={brand.id}
                                    onClick={() => updateFilter('brand', brand.id)}
                                    className={cn(
                                        "px-4 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-gray-50 flex justify-between group transition-colors",
                                        currentBrand === brand.id ? "bg-black text-white hover:bg-black" : "text-gray-500"
                                    )}
                                >
                                    {brand.name}
                                    {currentBrand === brand.id && <div className="w-1.5 h-1.5 bg-[#FF4400] rounded-full self-center" />}
                                </div>
                            ))}
                        </div>
                    </TechnicalCard>

                    {(currentCat || currentBrand) && (
                        <button
                            onClick={clearFilters}
                            className="w-full py-3 border border-red-200 text-red-500 text-xs font-bold uppercase hover:bg-red-50 transition-colors"
                        >
                            Reset System
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
