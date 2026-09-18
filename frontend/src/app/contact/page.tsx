'use client';

import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && message) {
      setIsSubmitted(true);
      showToast('Your message has been sent to K3SOMSTORE customer support!', 'success');
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">
            We Are Here to Help
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 mt-1">
            Contact K3SOMSTORE
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Have questions about an item, delivery status, or wholesale inquiries? Reach out to our Somali support team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
              <h2 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-100">
                Direct Contact Channels
              </h2>

              <div className="space-y-4 text-xs">
                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">WhatsApp Direct Helpline</strong>
                    <a
                      href="https://wa.me/252614139014"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 font-semibold hover:underline"
                    >
                      +252 61 413 9014
                    </a>
                    <p className="text-[11px] text-slate-400 mt-0.5">Instant response in Somali &amp; English</p>
                  </div>
                </div>

                {/* Phone Call */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Customer Phone Line</strong>
                    <span className="font-mono text-slate-700 font-bold">+252 61 4139014</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Sat - Thu: 8:00 AM - 10:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Official Email Support</strong>
                    <span className="text-slate-700 font-medium">k3somstore@gmail.com</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">For corporate orders &amp; inquiries</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold">Mogadishu Distribution Hub</strong>
                    <p className="text-slate-700">
                      KM4 / Taleex Street, Hodan District<br />
                      Mogadishu, Somalia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
              <h2 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-100">
                Send Us a Direct Message
              </h2>

              {isSubmitted ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Mahadsanid! Our team has received your message and will respond via phone/WhatsApp within a few hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Maryan Omar"
                        className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-800 block mb-1">
                        Phone Number (+252) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+252 61 XXX XXXX"
                        className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="maryan@example.so"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Your Message or Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we assist you with our products or delivery?"
                      className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
