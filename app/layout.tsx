import type { Metadata } from 'next';
import { Inter, Rajdhani } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FloatingSupport } from '@/components/ui/floating-support';
import { ThemeProvider } from '@/components/theme-provider';
import { PulseGridBackground } from '@/components/ui/pulse-grid-background';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kotharielectricals.com'), // Production URL
  title: {
    default: 'Kothari Electricals | Premier Electrical & Hardware Wholesaler',
    template: '%s | Kothari Electricals'
  },
  description: 'Authorized dealer for Polycab, Finolex, Schneider, Legrand & more. Your one-stop destination for industrial electricals and hardware in Secunderabad.',
  keywords: ['Electricals', 'Hardware', 'Secunderabad', 'Wholesaler', 'Polycab', 'Finolex', 'Schneider', 'Cables', 'Wires', 'Switchgear'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kotharielectricals.com',
    title: 'Kothari Electricals | Industrial Supply Partner',
    description: 'Premier electrical and hardware wholesaler in Secunderabad. Best prices on top brands.',
    siteName: 'Kothari Electricals',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kothari Electricals',
    description: 'Premier electrical and hardware wholesaler in Secunderabad.',
  },
  icons: {
    icon: '/icon.png', // Next.js auto-generated
    apple: '/icon.png', // Next.js auto-generated
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${rajdhani.variable} font-sans min-h-screen flex flex-col antialiased bg-white text-gray-900 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow pt-[72px] relative">
            <PulseGridBackground />
            {/* pt-[72px] to account for new fixed header height */}
            <div className="relative z-10">
              {children}
            </div>
          </main>
          <FloatingSupport />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
