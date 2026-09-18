import React from 'react';
import { ShieldCheck, Truck, Target, Award, Users, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Our Story &amp; Vision
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950">
            About K3SOMSTORE
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Somalia&apos;s modern online retail brand bringing authentic consumer electronics, smart accessories, and daily lifestyle essentials right to your doorstep.
          </p>
        </div>

        {/* Brand Banner */}
        <div className="rounded-3xl overflow-hidden bg-slate-950 text-white p-8 sm:p-12 relative shadow-xl">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Who We Are
            </span>
            <h2 className="text-2xl sm:text-3xl font-black leading-snug">
              Built for Somali Customers, Powered by Trust &amp; Speed
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Founded with a clear mission: to eliminate the hassle and uncertainty of shopping online in Somalia. K3SOMSTORE combines guaranteed product quality, transparent USD pricing, convenient mobile money payments (EVC Plus, Zaad, Sahal, eDahab), and rapid local delivery.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-950">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To empower Somali consumers and businesses with instant access to the latest certified tech gadgets, laptops &amp; phone accessories at competitive market prices.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-950">Tested Quality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every single product in our catalog goes through physical inspection and functionality checks at our Mogadishu hub before being dispatched to our customers.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-950">Local Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We operate dedicated couriers in Mogadishu offering same-day 2-5 hour delivery, alongside reliable regional transport to Hargeisa, Garowe, Bosaso, and Kismayo.
            </p>
          </div>
        </div>

        {/* Somali Headquarters */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-slate-950">
              Visit or Contact Our Mogadishu Hub
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Located at KM4 / Taleex Street, Hodan District, Mogadishu, Somalia.
            </p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
