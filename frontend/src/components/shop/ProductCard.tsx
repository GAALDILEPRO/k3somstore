'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorited = isInWishlist(product.id);

  const primaryImage = product.images[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600';
  const secondaryImage = product.images[1]?.url || primaryImage;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100 hover:border-slate-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isNew && (
            <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md tracking-wider uppercase shadow-xs">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-200 shadow-sm cursor-pointer ${
            isFavorited
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-600' : ''}`} />
        </button>

        {/* Image with hover transition */}
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Quick View Button overlay (Desktop) */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-xs hover:bg-white text-slate-800 rounded-full text-xs font-semibold shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-bold text-slate-800 text-[11px]">{product.rating}</span>
            <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            <span className="text-slate-300">•</span>
            <span className="text-[10px] text-emerald-600 font-semibold">In Stock</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-blue-600 transition-colors">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-extrabold text-slate-950">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-mono">SKU: {product.sku}</span>
          </div>

          <button
            onClick={() => addToCart(product, 1, product.colors?.[0])}
            className="p-2 sm:px-3 sm:py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm shrink-0 cursor-pointer"
            aria-label={`Add ${product.name} to Cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
