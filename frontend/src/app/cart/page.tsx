'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../lib/utils';
import { SOMALI_CITIES } from '../../data/somaliRegions';

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryCity,
    setDeliveryCity,
    deliveryFee,
    coupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    total,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs text-center space-y-5">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950">Your Cart is Empty</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Looks like you haven&apos;t added any items to your shopping cart yet.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
          >
            <span>Start Shopping Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
              Shopping Cart
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review your items and proceed to secure Somali checkout.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Items Table (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Image & Title */}
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-2xl object-cover bg-slate-100 shrink-0 border border-slate-100"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/product/${item.product.id}`}
                          className="text-sm font-bold text-slate-950 hover:text-blue-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                          SKU: {item.product.sku}
                        </p>
                        {item.selectedColor && (
                          <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        <div className="text-xs font-bold text-blue-600 sm:hidden mt-1">
                          {formatPrice(item.product.price)}
                        </div>
                      </div>
                    </div>

                    {/* Price, Quantity, Subtotal, Delete */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                      <div className="hidden sm:block text-right">
                        <div className="text-xs text-slate-400">Unit Price</div>
                        <div className="text-xs font-bold text-slate-900">
                          {formatPrice(item.product.price)}
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-950 font-bold"
                          aria-label="Reduce quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-16">
                        <div className="text-xs text-slate-400 sm:hidden">Total</div>
                        <div className="text-sm font-extrabold text-slate-950">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        aria-label="Remove product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
              <Link href="/shop" className="hover:text-blue-600 font-bold flex items-center gap-1">
                ← Continue Shopping
              </Link>
              <span>🔒 EVC Plus &amp; Zaad ready</span>
            </div>
          </div>

          {/* Order Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
              <h2 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Delivery Destination Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                  <span>Delivery Destination</span>
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                </label>
                <select
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full bg-slate-50 text-xs font-bold text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                >
                  {SOMALI_CITIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.nameSo}) — {c.deliveryFee === 0 ? 'Free' : `$${c.deliveryFee.toFixed(2)}`}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400">
                  {deliveryCity === 'Mogadishu'
                    ? '⚡ Free delivery in Mogadishu for orders over $50'
                    : '📦 Express regional courier delivery'}
                </p>
              </div>

              {/* Coupon Code Box */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Promo Code</span>
                </label>

                {coupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <div>
                      <span className="font-bold">{coupon.code}</span>
                      <span className="text-[11px] block text-emerald-700">
                        {coupon.discountType === 'PERCENTAGE'
                          ? `${coupon.discountValue}% discount applied`
                          : `$${coupon.discountValue} off applied`}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-emerald-800 hover:text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value);
                        setCouponError('');
                      }}
                      placeholder="Try code: K3SOM10"
                      className="flex-1 bg-slate-50 text-xs rounded-xl px-3 py-2 border border-slate-200 focus:outline-hidden focus:border-blue-500 uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-xs pt-3 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({deliveryCity})</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                <div className="flex justify-between items-baseline text-base font-black text-slate-950 pt-3 border-t border-slate-200">
                  <span>Total Due</span>
                  <span className="text-blue-600 text-xl font-black">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust Assurance Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Buyer Protection Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pay with confidence using verified Somali mobile money or Cash on Delivery. All packages are inspected prior to dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
