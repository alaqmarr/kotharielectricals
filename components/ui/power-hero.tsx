'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export function PowerHero() {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        // Auto-trigger the power on sequence
        const timer = setTimeout(() => {
            setIsOn(true);
        }, 1000); // 1-second delay for suspense
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-[90vh] w-full bg-gray-50 overflow-hidden flex flex-col items-center justify-center border-b border-gray-200">

            {/* Background Ambience (Off vs On) */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100"
                animate={{ opacity: isOn ? 0 : 1 }}
                transition={{ duration: 1.5 }}
            />

            {/* Main "Power On" Flash - White Light */}
            <motion.div
                className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOn ? 1 : 0 }}
                transition={{ duration: 2 }}
            />

            {/* Hero Content (Revealed on Power On) */}
            <div className="relative z-20 flex flex-col items-center gap-8 px-4">
                <AnimatePresence>
                    {!isOn && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
                            transition={{ duration: 0.5 }}
                            className="text-gray-500 font-mono text-xs md:text-sm tracking-[0.5em] uppercase"
                        >
                            INITIALIZING SYSTEMS...
                        </motion.div>
                    )}

                    {isOn && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
                            className="text-center"
                        >
                            {/* Animated Title */}
                            <h1 className="text-6xl md:text-8xl font-black text-slate-800 mb-2 tracking-tighter mix-blend-multiply relative">
                                <motion.span
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="inline-block text-[#003366]"
                                >
                                    KOTHARI
                                </motion.span>
                                <br className="md:hidden" />
                                <motion.span
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, duration: 0.8 }}
                                    className="inline-block text-[#FF6600]"
                                >
                                    ELECTRICALS
                                </motion.span>
                            </h1>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="h-1 w-24 bg-[#FF6600] mx-auto rounded-full mb-8"
                            />

                            <p className="text-slate-600 text-lg md:text-2xl font-medium tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
                                Powering The Future Since 1989.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link href="/products" className="group relative px-8 py-4 bg-[#FF6600] text-white font-bold uppercase tracking-wider overflow-hidden hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300">
                                    <span className="relative z-10">Explore Catalog</span>
                                </Link>
                                <Link href="/contact" className="group relative px-8 py-4 bg-white border-2 border-[#003366] text-[#003366] font-bold uppercase tracking-wider overflow-hidden hover:bg-[#003366] hover:text-white transition-colors duration-300">
                                    <span className="relative z-10">Contact Us</span>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Screen glint / Light sweep effect */}
            <AnimatePresence>
                {isOn && (
                    <motion.div
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: '100%', opacity: 0.3 }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.1 }}
                        className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
