'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TechnicalCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    sideLabel?: string;
    hoverEffect?: boolean;
}

export function TechnicalCard({
    children,
    className,
    title,
    subtitle,
    sideLabel,
    hoverEffect = true
}: TechnicalCardProps) {
    return (
        <div className={cn(
            "group relative bg-white border border-[#E5E5E5] transition-all duration-200 overflow-hidden",
            hoverEffect && "hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
            className
        )}>
            {/* Header Bar */}
            {(title || sideLabel) && (
                <div className="flex justify-between items-center border-b border-[#E5E5E5] px-4 py-2 bg-gray-50/50">
                    <div className="flex flex-col">
                        {title && <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 font-mono">{title}</span>}
                        {subtitle && <span className="text-xs font-bold text-black uppercase tracking-tight">{subtitle}</span>}
                    </div>
                    {sideLabel && <span className="text-[10px] font-mono text-[#FF4400]">{sideLabel}</span>}
                </div>
            )}

            {/* Crosshair Markers */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
