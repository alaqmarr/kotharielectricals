'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = false }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/40 bg-white/70 backdrop-blur-md shadow-sm transition-all duration-300",
                "dark:bg-black/40 dark:border-white/10", // Fallback for dark mode preference if enabled later
                hoverEffect && "hover:border-[#FF6600]/50 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1",
                className
            )}
        >
            {/* Glare Effect */}
            <div className="absolute -top-[100%] -left-[100%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />

            {children}
        </motion.div>
    );
}
