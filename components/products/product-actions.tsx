'use client';

import { useState } from 'react';
import { ArrowRight, Share2 } from 'lucide-react';
import { EnquireModal } from '@/components/products/enquire-modal'; // Updated import path

export function ProductActions({ productName }: { productName: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-5 bg-black text-white font-bold uppercase tracking-widest hover:bg-[#FF4400] transition-colors flex justify-between items-center px-8"
            >
                Request Quote <ArrowRight />
            </button>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => {
                        const message = `Hi, I am interested in ${productName}. Please share more details.`;
                        const url = `https://wa.me/919391079492?text=${encodeURIComponent(message)}`;
                        window.open(url, '_blank');
                    }}
                    className="py-4 border border-[#E5E5E5] text-gray-600 font-bold uppercase tracking-widest hover:border-[#25D366] hover:text-[#25D366] transition-colors text-xs"
                >
                    WhatsApp
                </button>
                <button className="py-4 border border-[#E5E5E5] text-gray-600 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors text-xs flex justify-center items-center gap-2">
                    <Share2 size={14} /> Share
                </button>
            </div>

            <EnquireModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productName={productName}
            />
        </div>
    );
}
