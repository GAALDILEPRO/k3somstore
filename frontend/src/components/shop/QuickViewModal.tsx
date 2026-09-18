'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Star, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/utils';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image */}
          <div className="bg-slate-100 aspect-square md:aspect-auto h-full flex items-center justify-center p-6 relative">
            <img
              src={product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          {/* Right: Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div>
              {/* Rating & Stock */}
              <div className="flex items-center gap-2 text-xs mb-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-slate-900 ml-1">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviewCount} reviews)</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-semibold">In Stock ({product.stock})</span>
              </div>

              <h2 className="text-xl font-bold text-slate-950 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">SKU: {product.sku}</p>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 my-3">
                <span className="text-2xl font-black text-slate-950">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Color Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs font-bold text-slate-800 block mb-1.5">
                    Select Color: <span className="font-normal text-slate-600">{selectedColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedColor);
                    onClose();
                  }}
                  className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <Link
                href={`/product/${product.id}`}
                onClick={onClose}
                className="w-full py-2.5 text-center text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Specifications &amp; Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
