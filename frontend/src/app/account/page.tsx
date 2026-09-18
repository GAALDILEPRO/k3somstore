'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Package, MapPin, Phone, Mail, Shield, ArrowRight } from 'lucide-react';
import { StoreService } from '../../lib/services/storeService';
import { formatPrice, formatDate } from '../../lib/utils';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const orders = StoreService.getOrders();

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-bold text-xl shadow-md">
              GA
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                Guled Abdi Ali
              </h1>
              <p className="text-xs text-slate-500 font-mono">+252 61 4139014 • Mogadishu</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/track-order"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Track Active Order
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 mb-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'addresses'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Personal Profile</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Order ID
                    </span>
                    <h3 className="text-base font-black text-slate-950 font-mono">
                      #{order.orderNumber}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'OUT_FOR_DELIVERY'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {order.status.replace(/_/g, ' ')}
                    </span>
                    <Link
                      href={`/track-order?orderId=${order.orderNumber}`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Track</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 text-xs">
                      {item.productImage && (
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.productName}</p>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} • {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">
                    Placed on {formatDate(order.createdAt)} • Via {order.paymentMethod}
                  </span>
                  <span className="text-sm font-extrabold text-slate-950">
                    Total: {formatPrice(order.totalAmount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-blue-600/30 p-6 space-y-3 relative shadow-xs">
              <span className="absolute top-4 right-4 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Default Address
              </span>
              <h3 className="text-sm font-bold text-slate-900">Mogadishu Home</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Taleex Street, Near KM4 Roundabout, House #14<br />
                Hodan District, Mogadishu, Somalia
              </p>
              <p className="text-xs font-mono text-slate-500">+252 61 543 2198</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900">Office Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wadajir Commercial Center, 2nd Floor<br />
                Medina / Wadajir, Mogadishu, Somalia
              </p>
              <p className="text-xs font-mono text-slate-500">+252 61 4139014</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs max-w-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              Account Information
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Full Name</label>
                <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900">
                  Guled Abdi Ali
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Phone Number (Somalia)</label>
                <div className="p-3 bg-slate-50 rounded-xl font-bold font-mono text-slate-900">
                  +252 61 4139014
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Email Address</label>
                <div className="p-3 bg-slate-50 rounded-xl font-bold text-slate-900">
                  guled@example.so
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
