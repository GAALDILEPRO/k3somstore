'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';

export function Footer() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      showToast('Thank you for subscribing to K3SOMSTORE updates!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-20 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                <span>K3</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                K3SOM<span className="text-blue-500">STORE</span>
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Somalia&apos;s premier modern e-commerce destination for consumer electronics, smart watches, premium audio, phone &amp; laptop accessories, and lifestyle essentials. Built for speed, trust, and convenience.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>KM4 / Taleex, Hodan District, Mogadishu, Somalia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +252 61 400 0000 / +252 61 500 0000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@k3somstore.so</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-blue-400 transition-colors">
                  {t('nav_shop')}
                </Link>
              </li>
              <li>
                <Link href="/shop?category=watches" className="hover:text-blue-400 transition-colors">
                  Smart Watches
                </Link>
              </li>
              <li>
                <Link href="/shop?category=audio" className="hover:text-blue-400 transition-colors">
                  Audio &amp; AirPods
                </Link>
              </li>
              <li>
                <Link href="/shop?category=power-charging" className="hover:text-blue-400 transition-colors">
                  Power Banks &amp; Chargers
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-emerald-400 transition-colors font-medium">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About K3SOMSTORE
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Get notified about new gadget arrivals, special flash sales, and exclusive discounts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-slate-900 text-xs text-white rounded-xl px-3 py-2.5 border border-slate-800 focus:border-blue-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {isSubscribed && (
                <span className="text-[11px] text-emerald-400 block">
                  ✓ Subscribed successfully!
                </span>
              )}
            </form>

            <div className="pt-4">
              <span className="text-xs text-slate-400 block mb-2 font-medium">
                Follow Us Online:
              </span>
              <div className="flex gap-2">
                {['TikTok', 'Instagram', 'Facebook', 'WhatsApp'].map((platform) => (
                  <span
                    key={platform}
                    className="text-[11px] px-2 py-1 bg-slate-900 rounded-md text-slate-300 font-medium hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Logistics Badges & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap">
            <p>© 2026 K3SOMSTORE. All rights reserved. Registered Somali Business.</p>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <Link href="/admin" className="text-slate-500 hover:text-slate-300 text-[11px] underline">
              Staff Portal
            </Link>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <span className="text-[11px] text-slate-400 mr-1">Accepted Payments:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-mono text-[10px] font-bold border border-slate-800">
              EVC PLUS
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-mono text-[10px] font-bold border border-slate-800">
              ZAAD
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-mono text-[10px] font-bold border border-slate-800">
              SAHAL
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 font-mono text-[10px] font-bold border border-slate-800">
              eDAHAB
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-900 text-blue-400 font-mono text-[10px] font-bold border border-slate-800">
              CASH ON DELIVERY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
