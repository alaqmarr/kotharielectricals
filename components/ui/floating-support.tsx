'use client';

import { MessageCircle } from 'lucide-react';

export function FloatingSupport() {
    return (
        <a
            href="https://wa.me/919246564652"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white font-bold uppercase tracking-widest shadow-lg hover:bg-[#128C7E] transition-all hover:-translate-y-1 rounded-full md:rounded-none group"
        >
            <MessageCircle size={24} className="animate-pulse" />
            <span className="hidden md:inline">Live Support</span>
        </a>
    );
}
