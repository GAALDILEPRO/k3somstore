'use client';

import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/initialData';

export function Testimonials() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-1">
            Loved by Customers Across Somalia
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            See feedback from shoppers in Mogadishu, Hargeisa, Garowe, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative space-y-4"
            >
              <Quote className="w-8 h-8 text-blue-100 absolute top-4 right-4 pointer-events-none" />

              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{review.customerName}</h4>
                  <span className="text-[10px] text-slate-400">{review.date}</span>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <CheckCircle className="w-3 h-3" />
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
