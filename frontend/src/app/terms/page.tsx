import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Terms and Conditions</h1>
        <p className="text-xs text-slate-400">Last updated: September 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and shopping with K3SOMSTORE (&quot;the Store&quot;), you agree to comply with and be bound by these Terms and Conditions. These terms govern all purchases made through our website and delivery services within the Federal Republic of Somalia.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Pricing and Payments</h2>
          <p>
            All prices are quoted and billed in United States Dollars (USD), which is the standard commercial transaction currency in Somalia. Accepted payment methods include EVC Plus (Hormuud), Zaad Service (Telesom), Sahal (Golis), eDahab (Somtel), and Cash on Delivery in supported metropolitan districts of Mogadishu.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Delivery and Fulfilment</h2>
          <p>
            We strive to complete local Mogadishu deliveries on the same business day for orders placed before 2:00 PM. Regional shipments to Hargeisa, Garowe, Bosaso, Kismayo, and Baidoa are coordinated via verified regional air transport and typically take 1 to 2 business days.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Warranty and Returns</h2>
          <p>
            All electronic items carry a 7-day functional replacement warranty. If an item arrives damaged or defective, the customer must notify customer support via WhatsApp or email within 7 days of receipt to qualify for a free exchange or refund.
          </p>
        </section>
      </div>
    </div>
  );
}
