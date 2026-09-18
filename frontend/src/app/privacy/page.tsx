import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: September 18, 2026</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
          <p>
            K3SOMSTORE collects essential customer information required to process and dispatch orders within Somalia, including: Full Name, Somali telephone number (+252), physical delivery street address and district, and optional email address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. How We Use Your Data</h2>
          <p>
            Your information is exclusively utilized for: processing your order, coordinating courier delivery to your address, sending WhatsApp order receipts and dispatch alerts, and providing customer support.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Data Security &amp; Confidentiality</h2>
          <p>
            We implement strict data protection standards and will never sell, rent, or lease customer contact lists or purchase history to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Contacting Our Data Officer</h2>
          <p>
            If you have questions regarding your personal details or wish to update your saved records, please email support@k3somstore.so or message our WhatsApp helpline.
          </p>
        </section>
      </div>
    </div>
  );
}
