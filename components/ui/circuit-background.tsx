'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CircuitBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Define some random paths simulating a PCB or wiring diagram
    // These are relative coordinates (0-100) to be responsive
    const paths = [
        "M0,20 L10,20 L10,50 L30,50 L30,80 L100,80", // Path 1
        "M100,30 L80,30 L80,10 L40,10 L40,40 L0,40", // Path 2
        "M50,0 L50,20 L70,20 L70,60 L90,60 L90,100", // Path 3 (Vertical flow)
        "M20,100 L20,70 L50,70 L50,90", // Path 4
    ];

    const colors = ["#FF6600", "#003366", "#FF9933", "#0055AA"]; // Brand colors

    return (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-10 overflow-hidden bg-white">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {paths.map((path, i) => (
                    <g key={i}>
                        {/* Base Wire - Subtle Gray */}
                        <path
                            d={path}
                            fill="none"
                            stroke="#e2e8f0"
                            strokeWidth="0.5"
                        />

                        {/* Glowing Current Pulse */}
                        <motion.path
                            d={path}
                            fill="none"
                            stroke={colors[i % colors.length]}
                            strokeWidth="0.8"
                            strokeDasharray="0 1"
                            initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 0.4, 0],
                                pathOffset: [0, 1, 1],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 2
                            }}
                        />
                        {/* Spark particle at the head (optional, kept simple for now) */}
                    </g>
                ))}
            </svg>
        </div>
    );
}
