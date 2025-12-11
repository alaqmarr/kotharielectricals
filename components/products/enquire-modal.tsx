'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TechnicalCard } from '@/components/ui/technical-card';
import { ArrowRight, X } from 'lucide-react';

interface EnquireModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export function EnquireModal({ isOpen, onClose, productName }: EnquireModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 border-none bg-transparent max-w-2xl shadow-none">
                <TechnicalCard className="bg-white" title="ENQUIRY_FORM" sideLabel="SECURE_LINK">
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[#E5E5E5] bg-gray-50">
                        <h2 className="text-xl font-black uppercase text-black">Product Enquiry</h2>
                        <button onClick={onClose} className="hover:bg-black hover:text-white p-2 transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="p-4 md:p-8">
                        <div className="mb-6 p-4 bg-[#F8F9FA] border border-[#E5E5E5] flex gap-4 items-center">
                            <span className="text-[#FF4400] font-bold uppercase text-xs tracking-widest">Ref:</span>
                            <span className="font-mono text-sm font-bold">{productName}</span>
                        </div>

                        <form action="/api/contact" method="POST" className="space-y-6">
                            <input type="hidden" name="subject" value={`Enquiry for: ${productName}`} />

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">/ Name</label>
                                    <input name="name" required className="w-full bg-transparent border-b border-gray-300 py-2 font-mono text-sm focus:outline-none focus:border-[#FF4400] transition-colors rounded-none placeholder-gray-300" placeholder="ENTER FULL NAME" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">/ Phone</label>
                                    <input name="phone" required className="w-full bg-transparent border-b border-gray-300 py-2 font-mono text-sm focus:outline-none focus:border-[#FF4400] transition-colors rounded-none placeholder-gray-300" placeholder="ENTER CONTACT NO" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">/ Email</label>
                                <input name="email" required className="w-full bg-transparent border-b border-gray-300 py-2 font-mono text-sm focus:outline-none focus:border-[#FF4400] transition-colors rounded-none placeholder-gray-300" placeholder="ENTER EMAIL ADDRESS" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">/ Requirements</label>
                                <textarea name="message" rows={3} required className="w-full bg-[#F8F9FA] border border-gray-200 p-3 font-mono text-sm focus:outline-none focus:border-[#FF4400] transition-colors rounded-none" placeholder="SPECIFY QUANTITY OR TECHNICAL DETAILS..."></textarea>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="submit" className="px-8 py-3 bg-[#FF4400] text-white font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2 text-sm">
                                    Submit Request <ArrowRight size={16} />
                                </button>
                            </div>
                        </form>
                    </div>
                </TechnicalCard>
            </DialogContent>
        </Dialog>
    );
}
