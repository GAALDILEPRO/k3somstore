'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  User,
  PackageCheck,
  ChevronDown,
  LogOut,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { StoreService } from '../../lib/services/storeService';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/utils';

export function Header() {
  const router = useRouter();
  const { totalCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const categories = StoreService.getCategories();

  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const results = StoreService.getProducts({ search: searchQuery }).slice(0, 5);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(false);
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-black text-xl shadow-md border border-slate-800 group-hover:scale-105 transition-transform">
              <span className="text-blue-500">K3</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center font-extrabold text-xl sm:text-2xl tracking-tight text-slate-950">
                <span>K3SOM</span>
                <span className="text-blue-600">STORE</span>
              </div>
              <span className="text-[10px] tracking-widest text-slate-400 font-semibold uppercase -mt-1 hidden sm:block">
                Somali Online Retail
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {t('nav_home')}
            </Link>
            <Link href="/shop" className="hover:text-blue-600 transition-colors">
              {t('nav_shop')}
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
              onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
            >
              <button
                onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors py-2 cursor-pointer"
              >
                <span>{t('nav_categories')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isCategoriesDropdownOpen && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 animate-in fade-in slide-in-from-top-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      className="flex items-center justify-between px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                      onClick={() => setIsCategoriesDropdownOpen(false)}
                    >
                      <span>{cat.name}</span>
                      <span className="text-slate-400 text-[10px]">{cat.productCount}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/track-order" className="hover:text-blue-600 transition-colors flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-emerald-600" />
              <span>{t('nav_track_order')}</span>
            </Link>

            <Link href="/about" className="hover:text-blue-600 transition-colors">
              {t('nav_about')}
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">
              {t('nav_contact')}
            </Link>
          </nav>

          {/* Search Bar (Desktop & Tablet) */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('header_search_placeholder')}
                  className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-slate-900 text-xs sm:text-sm rounded-full pl-10 pr-4 py-2.5 border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-hidden transition-all placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </form>

            {/* Instant Search Results Dropdown */}
            {isSearching && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3">
                  Products Found ({searchResults.length})
                </div>
                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setIsSearching(false)}
                      className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors"
                    >
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          SKU: {product.sku}
                        </p>
                      </div>
                      <div className="text-xs font-bold text-blue-600 shrink-0">
                        {formatPrice(product.price)}
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={handleSearchSubmit}
                  className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-center text-xs font-semibold text-blue-600 transition-colors border-t border-slate-100 cursor-pointer"
                >
                  View All Search Results →
                </button>
              </div>
            )}
          </div>

          {/* Right Action Icons: Customer Account, Wishlist, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Customer Account Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`p-2.5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isAuthenticated
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
                {isAuthenticated && (
                  <span className="text-xs font-bold hidden xl:inline max-w-24 truncate">
                    {user?.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 text-xs">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-900 truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono truncate">{user?.phone}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-slate-100 text-slate-700">
                          {user?.role}
                        </span>
                      </div>

                      {isAdmin ? (
                        <Link
                          href="/admin"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-amber-700 hover:bg-amber-50 font-bold"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Admin Control Panel</span>
                        </Link>
                      ) : (
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                        >
                          <User className="w-4 h-4" />
                          <span>My Customer Orders</span>
                        </Link>
                      )}

                      <Link
                        href="/track-order"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                      >
                        <PackageCheck className="w-4 h-4 text-emerald-600" />
                        <span>Track My Order</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-rose-600 hover:bg-rose-50 font-bold border-t border-slate-100 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="p-3 text-center border-b border-slate-100">
                        <p className="font-bold text-slate-900 mb-2">Customer Account</p>
                        <Link
                          href="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-center shadow-xs"
                        >
                          Sign In
                        </Link>
                      </div>
                      <Link
                        href="/register"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="block px-4 py-2 text-slate-700 hover:bg-slate-50 font-medium text-center"
                      >
                        Create New Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2.5 text-slate-700 hover:text-rose-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-scale">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 bg-slate-950 text-white rounded-full hover:bg-blue-600 transition-all shadow-sm group cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                {totalCount}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('header_search_placeholder')}
                className="w-full bg-slate-100 text-slate-900 text-xs rounded-full pl-9 pr-4 py-2 border border-slate-200 focus:outline-hidden focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center text-white font-black text-sm">
                  <span className="text-blue-500">K3</span>
                </div>
                <span className="font-extrabold text-lg text-slate-950">K3SOMSTORE</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 py-6 text-sm font-semibold text-slate-700">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                {t('nav_home')}
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                {t('nav_shop')}
              </Link>

              <div className="px-3 pt-2 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Categories
              </div>
              <div className="pl-3 flex flex-col gap-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs text-slate-600 hover:text-blue-600 py-1.5"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <div className="px-3 pt-4 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                Account &amp; Orders
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-blue-600 font-bold"
                  >
                    <User className="w-4 h-4" />
                    <span>My Customer Account</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-bold cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="flex gap-2 px-3 pt-1">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2 bg-slate-100 text-slate-800 font-bold rounded-xl text-xs text-center"
                  >
                    Register
                  </Link>
                </div>
              )}

              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2 text-emerald-600"
              >
                <PackageCheck className="w-4 h-4" />
                {t('nav_track_order')}
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                {t('nav_about')}
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-100"
              >
                {t('nav_contact')}
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-800 mb-1">Direct Somali Helpline</p>
              <p>WhatsApp: +252 61 400 0000</p>
              <p>Mogadishu, Somalia</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
