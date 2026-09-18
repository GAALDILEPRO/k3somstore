'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Truck, Star } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { StoreService } from '../../lib/services/storeService';
import { formatPrice } from '../../lib/utils';

export function Hero() {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  // Highlight flagship hero product
  const heroProduct = StoreService.getProductById('k3s-prod-1');

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 lg:py-24 border-b border-slate-800">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/70 text-xs font-semibold text-blue-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Somalia&apos;s Trusted Tech &amp; Accessories Store</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
              Shop Smart. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Shop K3SOM.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t('hero_subtext')}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
              >
                <span>{t('hero_btn_shop')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#categories"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center border border-slate-700 transition-all hover:text-white"
              >
                {t('hero_btn_categories')}
              </a>
            </div>

            {/* Somali Market Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/80 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">5,000+</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Happy Somali Buyers</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">Same-Day</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Mogadishu Delivery</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
                <div className="text-[11px] sm:text-xs text-slate-400">Tested Quality</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Product Visual Showcase */}
          {heroProduct && (
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xl">
                {/* Floating Top Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60 text-xs">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    Featured Flagship Product
                  </span>
                  <span className="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-bold text-[10px] border border-rose-500/30">
                    21% OFF
                  </span>
                </div>

                {/* Big Product Image */}
                <div className="relative aspect-square my-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={heroProduct.images[0]?.url}
                    alt={heroProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 border border-white/10">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>In Stock — Mogadishu Hub</span>
                  </div>
                </div>

                {/* Product Title & Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {heroProduct.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {heroProduct.description}
                    </p>
                  </div>

                  {/* Price & Instant Buy */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-2xl font-black text-white">
                        {formatPrice(heroProduct.price)}
                      </div>
                      <div className="text-xs text-slate-400 line-through">
                        {formatPrice(heroProduct.oldPrice)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/product/${heroProduct.id}`}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => addToCart(heroProduct, 1, heroProduct.colors?.[0])}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
