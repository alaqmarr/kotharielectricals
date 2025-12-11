import { IndustrialFan } from '@/components/ui/industrial-fan';
import { TechnicalCard } from '@/components/ui/technical-card';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white py-12 px-4 selection:bg-[#FF4400] selection:text-white">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-12 border-b border-[#E5E5E5] pb-6 flex justify-between items-end">
                <h1 className="text-6xl font-black text-[#111] uppercase tracking-tighter leading-none">
                    About<br />The Firm
                </h1>
                <span className="text-[#FF4400] font-mono font-bold">EST. 1989</span>
            </div>

            <div className="max-w-4xl mx-auto space-y-12">

                {/* Intro Section */}
                <div className="grid md:grid-cols-12 gap-12">
                    <div className="col-span-12 md:col-span-8">
                        <p className="text-2xl text-gray-800 font-medium leading-relaxed">
                            Established in <span className="bg-[#FF4400] text-white px-1">1989</span>, Kothari Electricals & Hardware has evolved into the region's most robust industrial supply chain partner. We don't just supply; we engineer solutions.
                        </p>
                    </div>
                </div>

                {/* Legacy Card */}
                <TechnicalCard className="p-8 md:p-12" title="LEGACY_MODULE" sideLabel="SECUNDERABAD">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-xl font-bold uppercase mb-4 text-[#003366]">Our Core Mission</h2>
                            <p className="text-gray-500 text-sm leading-7 font-mono mb-6">
                                To strive vigorously to delight our customers by providing HIGH QUALITY and COST EFFECTIVE products with speed and reliability.
                                <br /><br />
                                We operate on a zero-compromise policy regarding genuine parts and technical integrity.
                            </p>
                            <div className="flex gap-4">
                                <div className="border border-black px-4 py-2 text-xs font-bold uppercase">35+ Years</div>
                                <div className="border border-black px-4 py-2 text-xs font-bold uppercase">500+ Clients</div>
                            </div>
                        </div>
                        <div className="relative h-64 bg-[#F8F9FA] border border-[#E5E5E5] flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <IndustrialFan className="w-full h-full text-black" />
                            </div>
                            <span className="text-xl font-black uppercase text-gray-300 transform -rotate-12">Warehouse Ops</span>
                        </div>
                    </div>
                </TechnicalCard>


                {/* Features Grid */}
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-2 h-2 bg-[#FF4400]"></span>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">Why We Are Preferred</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'Vast Experience', desc: 'Over 30 years serving high-demand industry sectors.' },
                            { title: 'Technical Expertise', desc: 'In-house engineering guidance on complex specifications.' },
                            { title: 'Authorized Dealers', desc: 'Direct channel partners for Polycab, L&T, and more.' }
                        ].map((feature, i) => (
                            <TechnicalCard key={i} className="p-6 hover:bg-[#F8F9FA] transition-colors" title={`FEAT-0${i + 1}`}>
                                <h3 className="font-bold text-lg uppercase mb-2">{feature.title}</h3>
                                <p className="text-xs text-gray-500 font-mono leading-relaxed">{feature.desc}</p>
                            </TechnicalCard>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
