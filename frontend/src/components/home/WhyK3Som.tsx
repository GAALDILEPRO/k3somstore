'use client';

import React from 'react';
import { ShieldCheck, Truck, Banknote, Headphones } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function WhyK3Som() {
  const { t } = useLanguage();

  const trustCards = [
    {
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50',
      title: t('trust_quality_title'),
      description: t('trust_quality_desc'),
      subtext: 'Every gadget is functionally inspected before dispatch.',
    },
    {
      icon: Truck,
      color: 'text-emerald-600 bg-emerald-50',
      title: t('trust_delivery_title'),
      description: t('trust_delivery_desc'),
      subtext: 'Mogadishu: Same-day. Regional hubs: 1-2 days.',
    },
    {
      icon: Banknote,
      color: 'text-amber-600 bg-amber-50',
      title: t('trust_payment_title'),
      description: t('trust_payment_desc'),
      subtext: 'Pay with EVC Plus, Zaad, Sahal, or Cash on Delivery.',
    },
    {
      icon: Headphones,
      color: 'text-purple-600 bg-purple-50',
      title: t('trust_support_title'),
      description: t('trust_support_desc'),
      subtext: 'Live WhatsApp support 7 days a week.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Customer Promise
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Why Shop with K3SOMSTORE?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            We are building Somalia&apos;s most reliable online retail experience with genuine products and dedicated local logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all duration-200 space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs font-semibold text-slate-700">{card.description}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">{card.subtext}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
