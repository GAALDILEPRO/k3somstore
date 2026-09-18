'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Phone,
  Banknote,
  Smartphone,
  CreditCard,
  MessageCircle,
  ShieldAlert,
  LogOut,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../lib/utils';
import { SOMALI_CITIES } from '../../data/somaliRegions';
import { PaymentMethod, Order } from '../../lib/types';
import { StoreService } from '../../lib/services/storeService';
import { getAllPaymentProviders } from '../../lib/payments/registry';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    subtotal,
    deliveryFee,
    discountAmount,
    coupon,
    total,
    deliveryCity,
    setDeliveryCity,
    clearCart,
  } = useCart();
  const { isAdmin, logout } = useAuth();
  const { showToast } = useToast();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+252 61 ');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('EVC_PLUS');
  const [paymentReference, setPaymentReference] = useState('');

  // Processing & Confirmation Modal State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const selectedCityObj =
    SOMALI_CITIES.find((c) => c.name.toLowerCase() === deliveryCity.toLowerCase()) ||
    SOMALI_CITIES[0];

  const paymentProvidersList = getAllPaymentProviders();

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdmin) {
      showToast('Ogeysiis: Maamuluhu ma samayn karo wax iibsi. Kaliya macaamiisha ayaa wax dalban kara.', 'error');
      return;
    }
    if (!fullName || !phone || !streetAddress) return;

    setIsSubmitting(true);

    // Simulate clean order dispatch
    setTimeout(() => {
      const order = StoreService.createOrder({
        customerName: fullName.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        city: deliveryCity,
        district: district || selectedCityObj.districts[0],
        streetAddress: streetAddress.trim(),
        deliveryNotes: deliveryNotes.trim() || undefined,
        items: cartItems.map((item) => ({
          id: `item-${Date.now()}-${item.id}`,
          productId: item.productId,
          productName: item.product.name,
          productImage: item.product.images[0]?.url,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity,
          selectedColor: item.selectedColor,
        })),
        subtotal,
        deliveryFee,
        discountAmount,
        totalAmount: total,
        couponCode: coupon?.code,
        paymentMethod,
        paymentReference: paymentReference.trim() || undefined,
      });

      clearCart();
      setIsSubmitting(false);
      setConfirmedOrder(order);
    }, 800);
  };

  if (cartItems.length === 0 && !confirmedOrder) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center space-y-4">
          <h1 className="text-xl font-bold text-slate-900">Your Cart is Empty</h1>
          <p className="text-xs text-slate-500">
            Please add products to your cart before proceeding to checkout.
          </p>
          <Link
            href="/shop"
            className="block py-3 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Go to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950">
            Secure Checkout
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete your order with verified Somali delivery and mobile money payment.
          </p>
        </div>

        {/* Admin Account Restriction Banner */}
        {isAdmin && (
          <div className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-2 border-amber-400 text-slate-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
                  <span>Ogeysiis: Waxaad ku jirtaa Akoonka Maamulka (Admin Account)</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">
                    View Only
                  </span>
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Maamuluhu wax iibsi ma samayn karo sida macaamiisha caadiga ah. Awooddaadu waxay ku kooban tahay maamulka dukaanka, alaabta, iyo aragtida dalabaadka macaamiisha.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
              <Link
                href="/admin"
                className="flex-1 md:flex-initial px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors"
              >
                Gudub Admin Panel
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="px-3.5 py-2.5 bg-white border border-amber-300 hover:bg-amber-50 text-amber-950 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Ka bax</span>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Customer & Delivery Info (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Customer Contact */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>1. Customer &amp; Contact Details</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Mahad Hassan Nur"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Somali Phone Number (+252) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+252 61 5XX XXXX"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For order receipts (e.g. mahad@gmail.com)"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>2. Delivery Location in Somalia</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">City</label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => {
                        setDeliveryCity(e.target.value);
                        setDistrict('');
                      }}
                      className="w-full bg-slate-50 text-xs font-bold text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                    >
                      {SOMALI_CITIES.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name} ({city.nameSo})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      District / Neighborhood
                    </label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full bg-slate-50 text-xs font-medium text-slate-900 rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500 cursor-pointer"
                    >
                      {selectedCityObj.districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Street Address &amp; Landmarks *
                    </label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. Taleex Street, near Masjidka, House #14"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="e.g. Please call before arriving or leave with front security"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-5">
                <h2 className="text-base font-bold text-slate-950 flex items-center gap-2 pb-3 border-b border-slate-100">
                  <Banknote className="w-4 h-4 text-amber-500" />
                  <span>3. Somali Mobile Money &amp; Payment Options</span>
                </h2>

                <div className="space-y-3">
                  {paymentProvidersList.map((provider) => (
                    <label
                      key={provider.id}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                        paymentMethod === provider.id
                          ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={provider.id}
                        checked={paymentMethod === provider.id}
                        onChange={() => setPaymentMethod(provider.id)}
                        className="mt-1 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-950">
                            {provider.name}
                          </span>
                          {provider.id === 'EVC_PLUS' && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {provider.description.en}
                        </p>
                        <p className="text-[10px] text-slate-400 italic">
                          {provider.description.so}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Instant USSD Payment Box for Hormuud EVC Plus */}
                {paymentMethod === 'EVC_PLUS' && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 border-2 border-emerald-500/60 shadow-xl space-y-3.5 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                          Hormuud EVC Plus Instant Dial
                        </span>
                      </div>
                      <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/40">
                        Account: 611609365
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">
                      Telefoonkaaga gacanta toos uga bixi adigoo garaacaya koodhka hoose ama si toos ah u riixaya badhanka <strong>iibso</strong>:
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      <a
                        href={`tel:*712*611609365*${Math.max(1, Math.round(total))}%23%23`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl text-base font-black text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg shadow-emerald-500/40 transition-all transform hover:scale-[1.03] active:scale-95 border border-white/30 cursor-pointer uppercase tracking-wider"
                      >
                        <Phone className="w-5 h-5 animate-pulse" />
                        <span>iibso (${Math.max(1, Math.round(total))})</span>
                      </a>
                      <div className="text-xs font-mono bg-slate-900/90 text-emerald-300 px-3.5 py-2.5 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                        <span>USSD:</span>
                        <strong className="text-white text-sm">*712*611609365*{Math.max(1, Math.round(total))}##</strong>
                      </div>
                    </div>
                  </div>
                )}

                {/* Instant USSD Box for Zaad */}
                {paymentMethod === 'ZAAD' && (
                  <div className="p-4 rounded-2xl bg-amber-950/70 border border-amber-500/50 shadow-md space-y-3 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-amber-400">
                        Telesom Zaad Direct Dial
                      </span>
                      <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                        Account: 634000000
                      </span>
                    </div>
                    <p className="text-xs text-slate-200">
                      Toos uga bixi Zaad adigoo wacaya ama riixaya:
                    </p>
                    <a
                      href={`tel:*220*634000000*${Math.max(1, Math.round(total))}%23%23`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 cursor-pointer uppercase"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Ku Bixi Zaad (${Math.max(1, Math.round(total))})</span>
                    </a>
                  </div>
                )}

                {/* Verification Guidance Notice */}
                {paymentMethod !== 'CASH_ON_DELIVERY' && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs text-amber-900">
                    <p className="font-bold flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-amber-600" />
                      <span>Merchant Payment Reference / Nambarka Xawaaladda</span>
                    </p>
                    <p className="text-[11px] text-amber-800">
                      Markaad lacagta bixiso, halkan ku qor lambarka xawaaladda (Transaction ID) ama taleefonkaaga si degdeg loogu xaqiijiyo.
                    </p>
                    <input
                      type="text"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      placeholder="e.g. Transaction ID: 94821045 ama Lambarkaaga"
                      className="w-full bg-white text-xs rounded-xl p-2.5 border border-amber-300 focus:outline-hidden font-mono text-slate-900"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Review & Submit (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6 sticky top-28">
                <h2 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-100">
                  Order Summary ({cartItems.length} items)
                </h2>

                {/* Items preview list */}
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto pr-1 space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="pt-2 flex items-center gap-3">
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Discount ({coupon.code})</span>
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
                    <span>Total Amount</span>
                    <span className="text-blue-600 text-2xl font-black">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isAdmin}
                  className={`w-full py-4 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg transition-all ${
                    isAdmin
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300 shadow-none'
                      : 'bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300 text-white shadow-blue-500/25 hover:scale-[1.01] cursor-pointer'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isAdmin
                      ? 'Maamuluhu wax ma iibsan karo (Admin Cannot Order)'
                      : isSubmitting
                      ? 'Placing Order...'
                      : 'Place Order Now'}
                  </span>
                </button>

                <p className="text-[10px] text-center text-slate-400 leading-relaxed">
                  By placing your order, you agree to K3SOMSTORE&apos;s Terms of Service and 7-day product guarantee.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Order Confirmed Receipt Modal */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Order Received Successfully
              </span>
              <h3 className="text-2xl font-black text-slate-950 mt-1">
                Thank You, {confirmedOrder.customerName}!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your order has been recorded and scheduled for preparation at our Mogadishu hub.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-slate-500">Order Number:</span>
                <span className="text-blue-600 font-mono text-sm">
                  {confirmedOrder.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-semibold text-slate-900">
                  {confirmedOrder.district}, {confirmedOrder.city}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-semibold text-slate-900">
                  {confirmedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-sm">
                <span>Total Amount:</span>
                <span className="text-slate-950">{formatPrice(confirmedOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Direct EVC Plus Action in Receipt */}
            {confirmedOrder.paymentMethod === 'EVC_PLUS' && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-950 border border-emerald-500/50 text-white text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-emerald-400">
                    Ku Bixi Hormuud EVC Plus
                  </span>
                  <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                    611609365
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Riix badhanka hoose si uu telefoonkaagu toos ugu waco koodhka lacag-bixinta ee <strong>*712*611609365*{Math.max(1, Math.round(confirmedOrder.totalAmount))}##</strong>:
                </p>
                <a
                  href={`tel:*712*611609365*${Math.max(1, Math.round(confirmedOrder.totalAmount))}%23%23`}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-[1.02] active:scale-95 border border-white/20 uppercase tracking-wider cursor-pointer"
                >
                  <Phone className="w-5 h-5 animate-bounce" />
                  <span>iibso (${Math.max(1, Math.round(confirmedOrder.totalAmount))})</span>
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/track-order?orderId=${confirmedOrder.orderNumber}`}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Track Live Order Status</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/252614000000?text=${encodeURIComponent(
                  `Assalamu Alaykum K3SOMSTORE, waxaan dhiibtay dalabka #${confirmedOrder.orderNumber}, magacaygu waa ${confirmedOrder.customerName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm via WhatsApp Support</span>
              </a>

              <Link
                href="/"
                className="block text-xs font-bold text-slate-500 hover:text-slate-900 pt-1"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
