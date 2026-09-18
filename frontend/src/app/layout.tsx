import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import { ToastProvider } from '../context/ToastContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { AdminStatusBar } from '../components/layout/AdminStatusBar';
import { AnnouncementBar } from '../components/layout/AnnouncementBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { MobileBottomBar } from '../components/layout/MobileBottomBar';
import { CartDrawer } from '../components/cart/CartDrawer';
import { WhatsAppFloat } from '../components/layout/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'K3SOMSTORE — Modern Somali E-Commerce | Smart Watches, Audio & Electronics',
  description:
    'Somalia\'s trusted online retail store for smart watches, AirPods, phone and laptop accessories, fast chargers, and lifestyle gadgets. Same-day Mogadishu delivery, EVC Plus and Zaad payment support.',
  keywords: [
    'K3SOMSTORE',
    'Somalia online store',
    'Somali e-commerce',
    'Smart watches Mogadishu',
    'AirPods Somalia',
    'EVC Plus online shopping',
    'Zaad payment store',
  ],
  openGraph: {
    title: 'K3SOMSTORE — Shop Smart. Shop K3SOM.',
    description: 'Quality consumer electronics and smart accessories delivered with confidence across Somalia.',
    url: 'https://k3somstore.so',
    siteName: 'K3SOMSTORE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased font-sans selection:bg-blue-600 selection:text-white">
        <ToastProvider>
          <AuthProvider>
            <LanguageProvider>
              <CartProvider>
                <WishlistProvider>
                  <AdminStatusBar />
                  <AnnouncementBar />
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <CartDrawer />
                  <WhatsAppFloat />
                  <MobileBottomBar />
                </WishlistProvider>
              </CartProvider>
            </LanguageProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
