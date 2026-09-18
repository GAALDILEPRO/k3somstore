'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item.product, 1);
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950">Your Wishlist is Empty</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Save your favorite smart watches, audio gear, and gadgets to view them anytime.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
              My Saved Wishlist ({wishlistItems.length})
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Your saved tech products and gadgets ready for fast ordering.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 hover:text-rose-600 rounded-xl text-xs font-bold transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleAddAllToCart}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add All to Cart</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.product.id)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 hover:bg-white text-rose-600 shadow-sm"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="text-xs sm:text-sm font-bold text-slate-950 hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-sm font-extrabold text-blue-600 mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(item.product, 1)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
