'use client';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroCarousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

    const slides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop', // Electrical industrial
            title: 'Powering Your World',
            subtitle: 'Premium Industrial Electrical & Hardware Solutions',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1621905251189-fc01530c6c03?q=80&w=2070&auto=format&fit=crop', // Wires
            title: 'Authorized Distributors',
            subtitle: 'Polycab, Finolex, KEI, Schneider & More',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?q=80&w=2070&auto=format&fit=crop', // Lights
            title: 'Lighting The Future',
            subtitle: 'Wide Range of Industrial & Commercial LED Solutions',
        },
    ];

    return (
        <div className="relative h-[600px] w-full overflow-hidden bg-black text-white">
            <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}

            <div className="embla h-full" ref={emblaRef}>
                <div className="embla__container h-full">
                    {slides.map((slide) => (
                        <div className="embla__slide relative w-full h-full flex-[0_0_100%]" key={slide.id}>
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg"
                                >
                                    {slide.title}
                                </motion.h1>
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl drop-shadow-md"
                                >
                                    {slide.subtitle}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                >
                                    <Link
                                        href="/products"
                                        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-[#FF6600] text-white font-semibold rounded overflow-hidden transition-all hover:bg-[#e65c00]"
                                    >
                                        Explore Products
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        {/* Light Sweep Effect */}
                                        <div className="absolute inset-0 -translate-x-[100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000" />
                                    </Link>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
