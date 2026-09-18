'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'so';

interface Translations {
  [key: string]: {
    en: string;
    so: string;
  };
}

const DICTIONARY: Translations = {
  // Navigation
  nav_home: { en: 'Home', so: 'Bogga Hore' },
  nav_shop: { en: 'Shop', so: 'Dukaanka' },
  nav_categories: { en: 'Categories', so: 'Qaybaha' },
  nav_about: { en: 'About Us', so: 'Nagu Saabsan' },
  nav_contact: { en: 'Contact', so: 'Xiriir' },
  nav_track_order: { en: 'Track Order', so: 'Raad-raac Dalabka' },
  nav_admin: { en: 'Admin Panel', so: 'Qaybta Maamulka' },
  
  // Header
  header_search_placeholder: {
    en: 'Search smart watches, AirPods, accessories...',
    so: 'Raadi saacado, dhagaha, accessories...',
  },
  header_announcement: {
    en: '⚡ Free delivery in Mogadishu on orders over $50 | 24/7 WhatsApp Support',
    so: '⚡ Gaarsiin bilaash ah Muqdisho wixii ka badan $50 | Taageero WhatsApp 24/7',
  },
  
  // Hero
  hero_headline: { en: 'Shop Smart. Shop K3SOM.', so: 'Iibso Si Caqli Leh. Iibso K3SOM.' },
  hero_subtext: {
    en: 'Discover quality consumer electronics, smart accessories, and everyday tech essentials delivered with confidence across Somalia.',
    so: 'Ka hel qalabka elektaroonigga ah ee casriga ah, accessories-ka tayada leh iyo qalabka nolosha oo si sugan laguu gaarsiinayo dhammaan Soomaaliya.',
  },
  hero_btn_shop: { en: 'Shop All Products', so: 'Dukaamayso Hadda' },
  hero_btn_categories: { en: 'Explore Categories', so: 'Baar Qaybaha' },

  // Trust Badges
  trust_quality_title: { en: 'Guaranteed Quality', so: 'Tayo La Hubiyay' },
  trust_quality_desc: { en: '100% genuine and tested products', so: 'Alaab dhab ah oo la tijaabiyay' },
  trust_delivery_title: { en: 'Fast Somali Delivery', so: 'Gaarsiin Degdeg Ah' },
  trust_delivery_desc: { en: 'Same-day in Mogadishu, 1-2 days regionally', so: 'Maalintaas Muqdisho, 1-2 maalmood gobollada' },
  trust_payment_title: { en: 'Mobile Money Support', so: 'Lacag-bixinta Mobilka' },
  trust_payment_desc: { en: 'EVC Plus, Zaad, Sahal & eDahab ready', so: 'EVC Plus, Zaad, Sahal iyo eDahab' },
  trust_support_title: { en: 'Dedicated Support', so: 'Adeeg Hufan' },
  trust_support_desc: { en: 'Direct WhatsApp and phone assistance', so: 'Wadahadal toos ah oo WhatsApp & Taleefan' },

  // Cart & Checkout
  cart_title: { en: 'Your Shopping Cart', so: 'Gaarigaaga Dukaanka' },
  cart_empty: { en: 'Your cart is currently empty.', so: 'Gaarigaagu hadda wuu maran yahay.' },
  cart_subtotal: { en: 'Subtotal', so: 'Wadarta Alaabta' },
  cart_delivery: { en: 'Delivery Fee', so: 'Kharashka Gaarsiinta' },
  cart_discount: { en: 'Discount', so: 'Qiimo-dhimis' },
  cart_total: { en: 'Total Amount', so: 'Wadarta Guud' },
  cart_checkout_btn: { en: 'Proceed to Checkout', so: 'U Gudub Lacag-bixinta' },
  cart_continue_btn: { en: 'Continue Shopping', so: 'Sii wad Dukaamaysiga' },
  add_to_cart: { en: 'Add to Cart', so: 'Ku dar Gaariga' },
  buy_now: { en: 'Buy Now', so: 'Iibso Hadda' },
  in_stock: { en: 'In Stock - Ready to Ship', so: 'Waa Diyaar - Diyaar u ah Gaarsiinta' },
  out_of_stock: { en: 'Out of Stock', so: 'Waa Dhammaatay' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('k3som_lang') as Language;
    if (saved === 'en' || saved === 'so') {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('k3som_lang', lang);
  };

  const t = (key: string): string => {
    if (DICTIONARY[key]) {
      return DICTIONARY[key][language] || DICTIONARY[key]['en'];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
