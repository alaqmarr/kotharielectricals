'use client';

import { motion } from 'framer-motion';

export function IndustrialFan({ className = "" }: { className?: string }) {
    return (
        <div className={`relative ${className}`}>
            {/* Cage/Frame */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-800 dark:text-gray-700">
                <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="5" />
                <circle cx="100" cy="100" r="15" fill="currentColor" />
                {/* Spokes */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => (
                    <line key={deg} x1="100" y1="100" x2="100" y2="5" transform={`rotate(${deg} 100 100)`} stroke="currentColor" strokeWidth="2" />
                ))}
            </svg>

            {/* Rotating Blades */}
            <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full text-gray-600 dark:text-gray-500 opacity-80"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <g transform="translate(100, 100)">
                    {[0, 120, 240].map(deg => (
                        <path
                            key={deg}
                            d="M0,0 C20,-40 60,-60 80,-80 C60,-20 30,10 0,0"
                            transform={`rotate(${deg})`}
                            fill="currentColor"
                        />
                    ))}
                </g>
            </motion.svg>
        </div>
    );
}
