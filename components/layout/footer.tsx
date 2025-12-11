import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-[#E5E5E5] text-black relative z-10">
            {/* Top Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E5E5] border-b border-[#E5E5E5]">

                {/* Col 1: Brand */}
                <div className="p-8 md:p-12">
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Kothari<br />Electricals</h2>
                    <p className="text-sm text-gray-500 max-w-xs mb-6 font-medium">
                        Serving the industrial sector since 1989. <br />
                        Authorized dealers for high-performance electrical components.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="p-2 border border-black hover:bg-black hover:text-white transition-colors">
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Col 2: Navigation */}
                <div className="p-8 md:p-12">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">/ Navigation</h3>
                    <nav className="flex flex-col gap-3">
                        {['Products', 'Categories', 'Brands', 'About Us', 'Contact'].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase().replace(' ', '')}`} className="font-bold uppercase text-sm hover:text-[#FF4400] transition-colors w-fit">
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Col 3: Contact */}
                <div className="p-8 md:p-12">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">/ Communication</h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <MapPin size={16} className="mt-1 text-[#FF4400]" />
                            <p className="text-sm font-medium">
                                5-2-192/1, Distilary Road,<br />
                                Ranigunj, Secunderabad
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone size={16} className="text-[#FF4400]" />
                            <p className="text-sm font-bold font-mono">+91 93910 79492</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={16} className="text-[#FF4400]" />
                            <p className="text-sm font-bold font-mono">kotharielectricals@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Col 4: Legal / Hours */}
                <div className="p-8 md:p-12 bg-[#F8F9FA]">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">/ Status</h3>
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-bold uppercase">Store Open</span>
                        </div>
                        <p className="text-xs font-mono text-gray-500">Mon-Sat: 10:00 - 20:30</p>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                        <p className="text-[10px] text-gray-400 uppercase">
                            © 2024 Kothari Electricals.<br />
                            All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
