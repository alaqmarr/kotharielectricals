'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
    {
        id: 1,
        title: "Industrial Grade",
        subtitle: "Electrical Solutions",
        description: "Authorized distributors for the nation's top electrical brands. Powering industries since 1989.",
        image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1200", // Switchgear / Industrial
        cta: "Explore Catalog",
        link: "/products"
    },
    {
        id: 2,
        title: "Polycab Wires",
        subtitle: "Authorized Partner",
        description: "Premium quality wiring and cables for heavy-duty applications. Available in bulk stock.",
        image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?q=80&w=1200", // Wires
        cta: "View Collection",
        link: "/brands"
    },
    {
        id: 3,
        title: "LED Lighting",
        subtitle: "Commercial Systems",
        description: "High-efficiency lighting solutions for factories, warehouses, and offices.",
        image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=1200", // Lights
        cta: "Get Quote",
        link: "/contact"
    }
];

export function TechCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCurrentIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="relative border-b border-[#E5E5E5] bg-gray-50 group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {SLIDES.map((slide, index) => (
                        <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-[600px] md:h-[700px] grid md:grid-cols-2">

                            {/* Content Side */}
                            <div className="relative z-10 p-12 md:p-24 flex flex-col justify-center bg-white/95 backdrop-blur-sm border-r border-[#E5E5E5]">
                                {/* Label Removed */}

                                <h2 className="text-6xl md:text-8xl font-black text-black uppercase leading-[0.85] tracking-tighter mb-8">
                                    {slide.title}<br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-800">{slide.subtitle}</span>
                                </h2>

                                <p className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed mb-10">
                                    {slide.description}
                                </p>

                                <Link href={slide.link} className="w-fit px-8 py-4 bg-[#FF4400] text-white font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-4">
                                    {slide.cta} <ArrowRight />
                                </Link>
                            </div>

                            {/* Image Side */}
                            <div className="relative h-full overflow-hidden bg-gray-200">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />

                                {/* Grid Overlay */}
                                {/* Grid Overlay Removed */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 w-full md:w-1/2 border-t border-[#E5E5E5] flex">
                <button onClick={scrollPrev} className="flex-1 py-6 hover:bg-black hover:text-white transition-colors border-r border-[#E5E5E5] flex justify-center items-center">
                    <ArrowLeft />
                </button>
                <div className="flex-1 py-6 flex justify-center items-center font-mono font-bold text-sm bg-gray-50">
                    0{currentIndex + 1} / 0{SLIDES.length}
                </div>
                <button onClick={scrollNext} className="flex-1 py-6 hover:bg-black hover:text-white transition-colors border-l border-[#E5E5E5] flex justify-center items-center">
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
}
