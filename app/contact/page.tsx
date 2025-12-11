'use client';

import { Mail, MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { TechnicalCard } from '@/components/ui/technical-card';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-white py-12 px-4 selection:bg-[#FF4400] selection:text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="border-b border-[#E5E5E5] pb-6 mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-[#FF4400] font-mono text-xs uppercase font-bold tracking-widest block mb-2">/// COMMS_LINK</span>
                        <h1 className="text-5xl font-black text-[#111] uppercase tracking-tighter leading-none">
                            Contact Interface
                        </h1>
                    </div>
                    <div className="hidden md:block">
                        <span className="font-mono text-gray-400 text-xs">SECUNDERABAD_HQ_V1.0</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                    {/* Contact Information (Col 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        <TechnicalCard className="p-6" title="NEXUS" sideLabel="LOC">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="p-2 bg-black text-white"><MapPin size={20} /></div>
                                <div>
                                    <h3 className="font-bold text-black uppercase text-sm mb-1">Physical Location</h3>
                                    <p className="text-gray-500 text-sm font-mono">
                                        5-2-192/1, Distilary Road,<br />
                                        Ranigunj, Secunderabad,<br />
                                        Telangana 500003
                                    </p>
                                </div>
                            </div>
                            <div className="h-48 bg-gray-100 border border-[#E5E5E5] relative grayscale hover:grayscale-0 transition-all">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.273646734796!2d78.48496831487747!3d17.446625988043685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a066917637b%3A0x6649833cb941378!2sKothari%20Electricals%20And%20Hardwares!5e0!3m2!1sen!2sin!4v1677834567890!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </TechnicalCard>

                        <TechnicalCard className="p-6" title="DIRECT_LINE" sideLabel="24/7">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-black text-white"><Phone size={20} /></div>
                                    <div>
                                        <h3 className="font-bold text-black uppercase text-sm mb-1">Voice Links</h3>
                                        <p className="text-gray-500 text-sm font-mono hover:text-[#FF4400] cursor-pointer">+91 93910 79492</p>
                                        <p className="text-gray-500 text-sm font-mono">+91 40-6648 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-black text-white"><Mail size={20} /></div>
                                    <div>
                                        <h3 className="font-bold text-black uppercase text-sm mb-1">Digital Mail</h3>
                                        <p className="text-gray-500 text-sm font-mono break-all">kotharielectricals@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </TechnicalCard>

                        <TechnicalCard className="p-6 bg-[#F8F9FA]" title="OPS_HOURS">
                            <div className="flex items-center gap-4">
                                <Clock size={20} className="text-[#FF4400]" />
                                <div>
                                    <p className="text-sm font-bold uppercase">Mon - Sat</p>
                                    <p className="text-xs font-mono text-gray-500">10:00 - 20:30</p>
                                </div>
                            </div>
                        </TechnicalCard>
                    </div>

                    {/* Contact Form (Col 8) */}
                    <div className="lg:col-span-8">
                        <TechnicalCard className="h-full p-8 md:p-12" title="TRANSMISSION_FORM" sideLabel="SECURE">
                            <h2 className="text-3xl font-black text-black uppercase mb-2">Initiate Request</h2>
                            <p className="text-gray-500 mb-10 max-w-lg">Using this secure channel for bulk quote requests, technical specification inquiries, or partnership proposals.</p>

                            <form action="/api/contact" method="POST" className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="group">
                                        <label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-focus-within:text-[#FF4400]">/ Identity</label>
                                        <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-gray-300 py-2 font-mono text-lg focus:outline-none focus:border-[#FF4400] transition-colors rounded-none placeholder-gray-200" placeholder="ENTER NAME" />
                                    </div>
                                    <div className="group">
                                        <label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-focus-within:text-[#FF4400]">/ Comms</label>
                                        <input type="tel" id="phone" name="phone" required className="w-full bg-transparent border-b border-gray-300 py-2 font-mono text-lg focus:outline-none focus:border-[#FF4400] transition-colors rounded-none placeholder-gray-200" placeholder="ENTER PHONE" />
                                    </div>
                                </div>

                                <div className="group">
                                    <label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-focus-within:text-[#FF4400]">/ Digital Address</label>
                                    <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-gray-300 py-2 font-mono text-lg focus:outline-none focus:border-[#FF4400] transition-colors rounded-none placeholder-gray-200" placeholder="ENTER EMAIL" />
                                </div>

                                <div className="group">
                                    <label htmlFor="message" className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-focus-within:text-[#FF4400]">/ Payload</label>
                                    <textarea id="message" name="message" rows={4} required className="w-full bg-[#F8F9FA] border border-gray-200 p-4 font-mono text-sm focus:outline-none focus:border-[#FF4400] transition-colors rounded-none" placeholder="ENTER MESSAGE DETAILS..."></textarea>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="px-10 py-4 bg-[#FF4400] text-white font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2 group">
                                        Transmit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </TechnicalCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
