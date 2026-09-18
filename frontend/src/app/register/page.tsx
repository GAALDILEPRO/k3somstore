'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+252 61 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = register(name, phone, email, password);
    setIsSubmitting(false);

    if (success) {
      router.push('/account');
    }
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-950">Create Customer Account</h1>
          <p className="text-xs text-slate-500">
            Sign up to save delivery addresses, view order updates, and receive exclusive offers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-800 font-bold block mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sharmarke Ali"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:border-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="text-slate-800 font-bold block mb-1">
              Somali Phone Number (+252) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+252 61 XXX XXXX"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:border-blue-500 font-mono text-slate-900"
            />
          </div>

          <div>
            <label className="text-slate-800 font-bold block mb-1">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sharmarke@example.so"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:border-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="text-slate-800 font-bold block mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 pr-10 focus:outline-hidden focus:border-blue-500 text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
          >
            <span>{isSubmitting ? 'Creating Account...' : 'Register as Customer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 pt-3 border-t border-slate-100">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}
