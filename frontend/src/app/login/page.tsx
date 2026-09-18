'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Phone, ArrowRight, ShieldCheck, UserCheck, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const success = login(identifier, password);
    setIsSubmitting(false);

    if (success) {
      if (identifier.toLowerCase() === 'admin@k3somstore.so') {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-950">Customer Sign In</h1>
          <p className="text-xs text-slate-500">
            Log in to view your order history, delivery addresses, and saved wishlist.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-800 font-bold block mb-1">
              Email or Somali Phone Number (+252) *
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. +252 61 543 2198 or email"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-hidden focus:border-blue-500 text-slate-900"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-slate-800 font-bold">Password *</label>
              <span className="text-[11px] text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            <span>{isSubmitting ? 'Signing In...' : 'Sign In as Customer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center space-y-3 text-xs">
          <p className="text-slate-500">
            Don&apos;t have a K3SOMSTORE account?{' '}
            <Link href="/register" className="text-blue-600 font-bold hover:underline">
              Register Here
            </Link>
          </p>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Store Administrator?
            </span>
            <Link href="/admin" className="font-bold text-slate-900 hover:text-blue-600 underline">
              Admin Login Gate →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
