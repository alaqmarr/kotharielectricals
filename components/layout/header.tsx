'use client';

import Link from 'next/link';
import Image from 'next/image'; // Assuming we will simple text if no logo asset
import { Menu, Search, ShoppingBag, X, Phone, User } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E5E5E5]">
            {/* Top Bar - Technical Data */}
            <div className="hidden md:flex justify-between items-center px-6 py-1 bg-[#111] text-white text-[10px] font-mono tracking-widest uppercase">
                <span>Sys.Status: Online</span>
                <span>Helpdesk: +91 93910 79492</span>
            </div>

            <div className="max-w-[1920px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Placeholder for Logo - Using Text for now but styled technically */}
                    <div className="flex flex-col">
                        <span className="text-2xl font-black uppercase tracking-tighter leading-none text-black group-hover:text-[#FF4400] transition-colors">
                            Kothari
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-[#003366] uppercase">
                            Electricals & Hardware
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation - Swiss Style */}
                <nav className="hidden md:flex items-center gap-8">
                    {['Products', 'Categories', 'Brands', 'About', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-black hover:underline decoration-[#FF4400] underline-offset-4 transition-all"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#E5E5E5] hover:bg-black hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group">
                        <Phone size={14} className="group-hover:text-[#FF4400] transition-colors" />
                        <span>Request Quote</span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-[#E5E5E5] p-6 md:hidden shadow-xl"
                    >
                        <nav className="flex flex-col gap-6">
                            {['Products', 'Categories', 'Brands', 'About', 'Contact'].map((item) => (
                                <Link
                                    key={item}
                                    href={`/${item.toLowerCase()}`}
                                    className="text-xl font-bold uppercase tracking-tight text-black border-b border-gray-100 pb-2 flex justify-between items-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item}
                                    <span className="text-xs text-[#FF4400] font-mono">0{item.length}</span>
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className="w-full py-4 bg-[#FF4400] text-white font-bold uppercase tracking-widest text-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Request Quote
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
