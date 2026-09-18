'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  qSo?: string;
  a: string;
  aSo?: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How do I pay with EVC Plus or Zaad?',
    qSo: 'Sideen lacagta ugu bixin karaa EVC Plus ama Zaad?',
    a: 'At checkout, select EVC Plus or Zaad. Transfer the total USD amount to the displayed K3SOMSTORE merchant number, or provide your transaction ID. Our system verifies the payment and queues your order for immediate dispatch.',
    aSo: 'Marka aad joogto checkout-ka, dooro EVC Plus ama Zaad. Ku wareeji lacagta USD nambarka ganacsiga ee K3SOMSTORE ee lagu siiyo, kadibna ku qor Txn ID-ga. Dalabkaaga markiiba waa la diyaarinayaa.',
  },
  {
    q: 'How fast is delivery in Mogadishu?',
    qSo: 'Intee in le\'eg ayay qaadanaysaa keenista alaabta ee Muqdisho?',
    a: 'Orders placed in Mogadishu before 2:00 PM are delivered the same day within 2 to 5 hours! Delivery to districts like Hodan, Waberi, Kaaraan, and Daynile costs $2.00, or is completely FREE for orders over $50.',
    aSo: 'Dalabyada Muqdisho ee la dhiibo 2:00 PM ka hor waxaa lagu keenaa isla maalintaas 2 ilaa 5 saac gudahood! Kharashku waa $2.00, ama waa bilaash haddii aad iibsato $50 ka badan.',
  },
  {
    q: 'Do you deliver to Hargeisa, Garowe, Bosaso, and Kismayo?',
    qSo: 'Miyaad gaarsiisaan Hargeysa, Garoowe, Boosaaso, iyo Kismaayo?',
    a: 'Yes! We ship daily to all major cities across Somalia using trusted regional air logistics. Regional deliveries typically arrive within 1 to 2 business days.',
    aSo: 'Haa! Waxaan maalin kasta diyaarad ku dirnaa dhammaan gobollada Soomaaliya. Alaabtu waxay ku soo gaaraysaa 1 ilaa 2 maalmood.',
  },
  {
    q: 'Is Cash on Delivery available?',
    qSo: 'Ma bixin karaa lacagta caddaan marka alaabta la ii keeno?',
    a: 'Cash on Delivery (COD) is currently supported throughout all districts of Mogadishu. You can pay our courier in USD or Somali Shillings upon receiving and inspecting your package.',
    aSo: 'Haa, adeegga Cash on Delivery waxaa laga heli karaa dhammaan degmooyinka magaalada Muqdisho.',
  },
  {
    q: 'What is your warranty and replacement policy?',
    qSo: 'Muxuu yahay dammaanadda iyo xeerka soo celinta?',
    a: 'We offer a 7-day inspection and functional guarantee on all consumer electronics. If you discover any manufacturing defect, we will replace the unit or issue a full refund immediately.',
    aSo: 'Waxaan bixinaa 7 maalmood oo tijaabo iyo dammaanad buuxda ah. Haddii aad cillad farsamo ku aragto, waan kuu beddelaynaa ama lacagtaada ayaad dib u helaysaa.',
  },
  {
    q: 'Are the products authentic and original?',
    qSo: 'Alaabtu ma tahay mid dhab ah oo tayo leh?',
    a: 'Yes, 100%. We source directly from certified manufacturers and conduct functional testing before any package is sent to customers.',
    aSo: 'Haa, 100%. Dhammaan alaabtayada waa kuwo la tijaabiyay oo hubsan tayadooda.',
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-slate-950">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Common questions about Somali shipping, EVC Plus payments, and product warranties.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 divide-y divide-slate-100">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5 first:pt-0 last:pb-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in">
                    <p>{faq.a}</p>
                    {faq.aSo && (
                      <p className="text-xs text-blue-800 bg-blue-50/60 p-3 rounded-xl">
                        <strong>Af-Soomaali:</strong> {faq.aSo}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
