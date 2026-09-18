'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Heart, ShoppingBag, PackageCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export function MobileBottomBar() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  // Hide bottom bar on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 p-1 text-[11px] font-medium transition-colors ${
            pathname === '/' ? 'text-blue-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center gap-0.5 p-1 text-[11px] font-medium transition-colors ${
            pathname?.startsWith('/shop') ? 'text-blue-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Shop</span>
        </Link>

        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center gap-0.5 p-1 text-[11px] font-medium transition-colors ${
            pathname === '/wishlist' ? 'text-blue-600 font-bold' : 'text-slate-600'
          }`}
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span>Saved</span>
        </Link>

        <Link
          href="/track-order"
          className={`flex flex-col items-center gap-0.5 p-1 text-[11px] font-medium transition-colors ${
            pathname === '/track-order' ? 'text-blue-600 font-bold' : 'text-slate-600'
          }`}
        >
          <PackageCheck className="w-5 h-5 text-emerald-600" />
          <span>Track</span>
        </Link>

        <button
          onClick={openCart}
          className="relative flex flex-col items-center gap-0.5 p-1 text-[11px] font-medium text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5 text-slate-900" />
          {totalCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
              {totalCount}
            </span>
          )}
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
}
