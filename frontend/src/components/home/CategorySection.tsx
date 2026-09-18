'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StoreService } from '../../lib/services/storeService';
import { useLanguage } from '../../context/LanguageContext';

export function CategorySection() {
  const { language } = useLanguage();
  const categories = StoreService.getCategories();

  return (
    <section id="categories" className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
              Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select a category to browse our tested tech essentials and lifestyle accessories.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Area */}
              <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-sm sm:text-base font-bold drop-shadow-xs">
                    {language === 'so' && category.nameSo ? category.nameSo : category.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 font-medium line-clamp-1 mt-0.5">
                    {category.productCount} Products Available
                  </p>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-3 bg-white flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                <span className="text-[11px] text-slate-500">Explore items</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
