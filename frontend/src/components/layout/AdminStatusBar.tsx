'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminStatusBar() {
  const { user, isAdmin, logout } = useAuth();

  if (!isAdmin || !user) return null;

  return (
    <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between border-b border-amber-600 shadow-xs z-50">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-950 shrink-0" />
        <span>
          Administrator Mode Active (Full Store Control) — Logged in as: <strong>{user.email}</strong>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="underline hover:text-slate-800 flex items-center gap-1 font-black"
        >
          <span>Open Admin Dashboard</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-1 text-slate-900 hover:text-slate-950 hover:underline cursor-pointer"
        >
          <LogOut className="w-3 h-3" />
          <span>Exit Admin</span>
        </button>
      </div>
    </div>
  );
}
