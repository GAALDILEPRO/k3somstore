'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-slate-950 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-10 bottom-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-slate-900 border border-blue-500/30 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Content */}
          <div className="space-y-4 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Time Somali Exclusive</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Upgrade Your Everyday Tech
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enjoy up to 25% off selected fast chargers, premium smartwatches, and 65W power banks. Verified quality and same-day delivery in Mogadishu.
            </p>

            {/* Countdown timer */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mr-2">
                <Clock className="w-4 h-4" />
                <span>Ends In:</span>
              </div>

              {[
                { label: 'Hours', val: timeLeft.hours },
                { label: 'Min', val: timeLeft.minutes },
                { label: 'Sec', val: timeLeft.seconds },
              ].map((time) => (
                <div
                  key={time.label}
                  className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-center min-w-14"
                >
                  <div className="text-base sm:text-lg font-black text-white font-mono">
                    {String(time.val).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] text-slate-400 uppercase font-semibold">
                    {time.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <div className="shrink-0">
            <Link
              href="/shop?category=power-charging"
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-xl hover:scale-105"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
