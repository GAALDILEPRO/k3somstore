'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw } from 'lucide-react';
import { ProductCard } from '../../components/shop/ProductCard';
import { QuickViewModal } from '../../components/shop/QuickViewModal';
import { StoreService } from '../../lib/services/storeService';
import { Product } from '../../lib/types';
import { formatPrice } from '../../lib/utils';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = StoreService.getCategories();

  const filteredProducts = useMemo(() => {
    return StoreService.getProducts({
      categorySlug: selectedCategory,
      search: searchQuery,
      maxPrice: maxPrice,
      inStockOnly: inStockOnly,
      sortBy: sortBy,
    });
  }, [selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(100);
    setInStockOnly(false);
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Product Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Browse tested consumer electronics, smart accessories, and daily essentials.
            </p>
          </div>

          {/* Mobile Filter Toggle & Sort Dropdown */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 shadow-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent border-none outline-hidden font-bold text-slate-900 cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar & Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs h-fit sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>Filter Catalog</span>
              </div>
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Search Products</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Keywords or SKU..."
                  className="w-full bg-slate-50 text-xs rounded-xl pl-8 pr-3 py-2 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Categories</label>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-70">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">Max Price (USD)</label>
                <span className="font-black text-blue-600">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$5</span>
                <span>$50</span>
                <span>$100+</span>
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-3 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
                <span className="text-xs font-medium text-slate-700">In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Active Filters & Counter */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> products
              </span>
              {(selectedCategory !== 'all' || searchQuery || inStockOnly) && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-slate-400">Active:</span>
                  {selectedCategory !== 'all' && (
                    <span className="bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      {selectedCategory}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSelectedCategory('all')}
                      />
                    </span>
                  )}
                  {searchQuery && (
                    <span className="bg-blue-50 text-blue-700 font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      &quot;{searchQuery}&quot;
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => setSearchQuery('')}
                      />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Products Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any products matching your current filters. Try changing your search query or adjusting the price range.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Filter Products</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800">Categories</label>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setIsMobileFilterOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-70">{cat.productCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-800">Max Price</label>
                <span className="font-black text-blue-600">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading K3SOMSTORE Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
