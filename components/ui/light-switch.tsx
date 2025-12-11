'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';

export function LightSwitch() {
    const { theme, setTheme } = useTheme();
    // const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Forced Light Mode - Component remains as visual indicator or can be removed if desired.
    // For now, keeping it as a static 'Light Mode' indicator to match "move to light themes" request explicitly.
    return (
        <div
            className="relative inline-flex items-center justify-center p-2 rounded-full bg-gray-100 text-[#FF6600]"
            aria-label="Light Mode Active"
        >
            <Sun size={20} className="fill-current" />
        </div>
    );
}
