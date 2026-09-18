'use client';

import React from 'react';
import { Truck, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function AnnouncementBar() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Truck className="w-3.5 h-3.5 text-blue-400 shrink-0 hidden sm:inline" />
          <span>{t('header_announcement')}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '252614000000'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-500" />
            <span className="font-medium">+252 61 400 0000</span>
          </a>

          <div className="h-3 w-px bg-slate-800" />

          {/* Language Switcher */}
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-slate-400" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                language === 'en'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('so')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                language === 'so'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
