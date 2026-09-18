'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { ProductCard } from '../shop/ProductCard';
import { QuickViewModal } from '../shop/QuickViewModal';
import { StoreService } from '../../lib/services/storeService';
import { Product } from '../../lib/types';

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const featuredProducts = StoreService.getFeaturedProducts();

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-amber-600 uppercase">
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
              <span>Trending in Somalia</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Our top-selling smart gadgets, AirPods, and essentials tested for everyday reliability.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span>See All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
