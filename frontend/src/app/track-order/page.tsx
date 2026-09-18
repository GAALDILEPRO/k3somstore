'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  PackageCheck,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';
import { StoreService } from '../../lib/services/storeService';
import { Order, OrderStatus } from '../../lib/types';
import { formatPrice, formatDateTime } from '../../lib/utils';

const STATUS_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  {
    status: 'PENDING',
    label: 'Order Placed',
    desc: 'Your order was successfully recorded in our system.',
  },
  {
    status: 'CONFIRMED',
    label: 'Order Confirmed',
    desc: 'Merchant confirmed payment details & inventory.',
  },
  {
    status: 'PROCESSING',
    label: 'Processing / Packed',
    desc: 'Item packaged in K3SOM Mogadishu logistics hub.',
  },
  {
    status: 'OUT_FOR_DELIVERY',
    label: 'Out for Delivery',
    desc: 'Courier has your package en route to your address.',
  },
  {
    status: 'DELIVERED',
    label: 'Delivered',
    desc: 'Package delivered safely to customer.',
  },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderQuery, setOrderQuery] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      const found = StoreService.getOrderByIdOrNumber(initialOrderId);
      if (found) {
        setOrder(found);
      }
      setHasSearched(true);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    const found = StoreService.getOrderByIdOrNumber(orderQuery);
    setOrder(found || null);
    setHasSearched(true);
  };

  const getStepIndex = (currentStatus: OrderStatus): number => {
    switch (currentStatus) {
      case 'PENDING':
        return 0;
      case 'CONFIRMED':
        return 1;
      case 'PROCESSING':
        return 2;
      case 'READY_FOR_DELIVERY':
      case 'OUT_FOR_DELIVERY':
        return 3;
      case 'DELIVERED':
        return 4;
      case 'CANCELLED':
        return -1;
      default:
        return 0;
    }
  };

  const currentStep = order ? getStepIndex(order.status) : 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PackageCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            Track Your Somali Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
            Enter your order number (e.g. <strong>K3S-10245</strong>) to view real-time delivery progress.
          </p>
        </div>

        {/* Search Input Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 sm:p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                placeholder="Enter Order Number (e.g. K3S-10245)..."
                required
                className="w-full bg-slate-50 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3.5 border border-slate-200 focus:outline-hidden focus:border-blue-500 font-mono"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <button
              type="submit"
              className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Order Results */}
        {hasSearched && !order && (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Order Not Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              We couldn&apos;t find an active order with the number <strong>&quot;{orderQuery}&quot;</strong>. Please check the spelling or check your confirmation message.
            </p>
          </div>
        )}

        {order && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Status Stepper Card */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Order Status
                  </span>
                  <div className="flex items-center gap-3 mt-1">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-mono">
                      #{order.orderNumber}
                    </h2>
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
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs text-slate-500 space-y-1">
                  <div>Placed on: <strong className="text-slate-800">{formatDateTime(order.createdAt)}</strong></div>
                  <div>Payment: <strong className="text-slate-800">{order.paymentMethod}</strong> ({order.paymentStatus})</div>
                </div>
              </div>

              {/* Visual Progress Stepper */}
              <div className="relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden sm:block absolute top-5 left-8 right-8 h-1 bg-slate-200 -z-0">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${(Math.max(0, currentStep) / (STATUS_STEPS.length - 1)) * 100}%`,
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = idx <= currentStep;
                    const isCurrent = idx === currentStep;

                    return (
                      <div
                        key={step.status}
                        className="flex sm:flex-col items-start sm:items-center text-left sm:text-center gap-3 sm:gap-2"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-xs transition-all ${
                            isCompleted
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                              : 'bg-slate-100 text-slate-400 border border-slate-300'
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                        </div>

                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isCurrent ? 'text-blue-600' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </p>
                          <p className="text-[10px] text-slate-400 leading-tight hidden sm:block mt-1">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Delivery Destination & Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Details */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Delivery Address</span>
                </h3>

                <div className="space-y-2 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-900">Recipient:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong className="text-slate-900">Phone:</strong> {order.customerPhone}
                  </p>
                  <p>
                    <strong className="text-slate-900">Location:</strong> {order.district},{' '}
                    {order.city}, Somalia
                  </p>
                  <p>
                    <strong className="text-slate-900">Address:</strong> {order.streetAddress}
                  </p>
                  {order.deliveryNotes && (
                    <p>
                      <strong className="text-slate-900">Instructions:</strong>{' '}
                      {order.deliveryNotes}
                    </p>
                  )}
                </div>
              </div>

              {/* Items in this order */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Items Ordered ({order.items.length})</span>
                </h3>

                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="pt-2 flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-slate-900 truncate">{item.productName}</p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-extrabold text-slate-900 shrink-0">
                        {formatPrice(item.total)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-baseline text-sm font-black">
                  <span>Total Amount Paid / Due:</span>
                  <span className="text-blue-600">{formatPrice(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Need Help WhatsApp CTA */}
            <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-bold text-emerald-950">
                  Have questions about this delivery?
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Our Mogadishu dispatch team is ready on WhatsApp to assist with live updates.
                </p>
              </div>

              <a
                href={`https://wa.me/252614000000?text=${encodeURIComponent(
                  `Assalamu Alaykum K3SOMSTORE, waxaan rabaa inaan wax ka ogaado dalabkayga #${order.orderNumber}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading Order Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
