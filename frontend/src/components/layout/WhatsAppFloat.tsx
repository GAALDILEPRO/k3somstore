'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '252614000000';
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
    'Assalamu Alaykum K3SOMSTORE, waxaan rabaa inaan wax ka weydiiyo alaabtiina / dalabkayga.'
  )}`;

  return (
    <aside
      aria-label="Direct Customer Support"
      className="fixed bottom-18 md:bottom-8 right-5 z-40 group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold hidden sm:inline">WhatsApp Support</span>
      </a>
    </aside>
  );
}
