'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalCount,
    coupon,
    discountAmount,
    total,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Shopping Cart ({totalCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Explore our collection of smart watches, AirPods, and tech accessories to get started.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 relative group"
                >
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.selectedColor && (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Color: <span className="font-medium text-slate-700">{item.selectedColor}</span>
                        </p>
                      )}
                      <p className="text-xs font-extrabold text-blue-600 mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Coupon ({coupon.code})
                    </span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Delivery (Mogadishu &amp; Somalia)</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Estimated Total</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold text-center block transition-colors"
                >
                  View Full Cart Page
                </Link>
              </div>

              <p className="text-[10px] text-center text-slate-400">
                🔒 Safe Somali checkout. EVC Plus, Zaad &amp; Cash on Delivery accepted.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
