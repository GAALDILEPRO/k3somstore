'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  AlertTriangle,
  Tag,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Search,
  Lock,
  LogOut,
  X,
  ShieldAlert,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { StoreService } from '../../lib/services/storeService';
import { Product, Order, OrderStatus } from '../../lib/types';
import { formatPrice, formatDateTime } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function AdminPage() {
  const { showToast } = useToast();
  const { user, isAdmin, loginAsAdmin, login, logout } = useAuth();

  // Admin security login gate inputs
  const [adminKey, setAdminKey] = useState('');
  const [showAdminKey, setShowAdminKey] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@k3somstore.so');
  const [adminPassword, setAdminPassword] = useState('k3som2026');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'password' | 'key'>('key');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'orders' | 'inventory' | 'coupons' | 'settings'
  >('overview');

  // Data states
  const [products, setProducts] = useState<Product[]>(() => StoreService.getProducts());
  const [orders, setOrders] = useState<Order[]>(() => StoreService.getOrders());
  const categories = StoreService.getCategories();

  // Search & filter states
  const [productSearch, setProductSearch] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');

  // Modal states
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for New/Edit Product
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formOldPrice, setFormOldPrice] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formCategory, setFormCategory] = useState(categories[0]?.id || '');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const lowStockProducts = products.filter((p) => p.stock <= p.lowStockAlert);

  const handleAdminKeyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin(adminKey);
  };

  const handleAdminCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(adminEmail, adminPassword);
  };

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice('');
    setFormOldPrice('');
    setFormSku(`K3S-${Math.floor(100 + Math.random() * 900)}`);
    setFormStock('20');
    setFormCategory(categories[0]?.id || '');
    setFormImageUrl('https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800');
    setFormDescription('');
    setIsAddProductModalOpen(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormPrice(String(p.price));
    setFormOldPrice(p.oldPrice ? String(p.oldPrice) : '');
    setFormSku(p.sku);
    setFormStock(String(p.stock));
    setFormCategory(p.categoryId);
    setFormImageUrl(p.images[0]?.url || '');
    setFormDescription(p.description);
    setIsAddProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseFloat(formPrice);
    const stockNum = parseInt(formStock, 10);

    if (isNaN(priceNum) || isNaN(stockNum)) {
      showToast('Please enter valid numeric values for price and stock', 'error');
      return;
    }

    if (editingProduct) {
      StoreService.updateProduct(editingProduct.id, {
        name: formName,
        price: priceNum,
        oldPrice: formOldPrice ? parseFloat(formOldPrice) : undefined,
        sku: formSku,
        stock: stockNum,
        categoryId: formCategory,
        description: formDescription,
        images: [{ id: 'img-1', url: formImageUrl, alt: formName }],
      });
      showToast('Product updated successfully in store catalog!', 'success');
    } else {
      StoreService.addProduct({
        name: formName,
        slug: formName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        price: priceNum,
        oldPrice: formOldPrice ? parseFloat(formOldPrice) : undefined,
        sku: formSku,
        stock: stockNum,
        lowStockAlert: 5,
        isFeatured: true,
        isNew: true,
        isBestSeller: false,
        rating: 5.0,
        reviewCount: 1,
        categoryId: formCategory,
        description: formDescription,
        images: [{ id: 'img-1', url: formImageUrl, alt: formName }],
        specs: { Standard: 'Official Retail Packaging' },
      });
      showToast('New product added to store catalog!', 'success');
    }

    setProducts([...StoreService.getProducts()]);
    setIsAddProductModalOpen(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to permanently delete this product from K3SOMSTORE?')) {
      StoreService.deleteProduct(id);
      setProducts([...StoreService.getProducts()]);
      showToast('Product permanently deleted', 'info');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    StoreService.updateOrderStatus(orderId, newStatus, `Administrator changed status to ${newStatus}`);
    setOrders([...StoreService.getOrders()]);
    showToast(`Order #${orderId} status set to ${newStatus}`, 'success');
  };

  const handleQuickStockChange = (id: string, delta: number) => {
    const prod = products.find((p) => p.id === id);
    if (prod) {
      const newStock = Math.max(0, prod.stock + delta);
      StoreService.updateProduct(id, { stock: newStock });
      setProducts([...StoreService.getProducts()]);
    }
  };

  // =========================================================================
  // STRICT SECURITY GATE: BLOCK ALL NON-ADMIN USERS AND GUESTS
  // =========================================================================
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl animate-in zoom-in-95">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                Restricted Administration Area
              </span>
              <h1 className="text-2xl font-black text-white mt-1">
                K3SOMSTORE Admin Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Access is strictly restricted to store administrators and authorized management personnel.
              </p>
            </div>
          </div>

          {/* If user is logged in as a normal customer */}
          {user && user.role !== 'ADMIN' && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-xs text-rose-200">
              <p className="font-bold">Access Denied (Customer Role)</p>
              <p className="text-[11px] mt-0.5">
                You are currently logged in as a customer (<strong>{user.name}</strong>). Regular users cannot manage products, orders, or store settings.
              </p>
              <button
                onClick={logout}
                className="mt-2 text-xs font-bold text-rose-300 underline hover:text-white"
              >
                Log Out to Switch Account
              </button>
            </div>
          )}

          {/* Login Mode Toggle */}
          <div className="flex border border-slate-800 rounded-xl p-1 bg-slate-950 text-xs">
            <button
              onClick={() => setLoginMethod('key')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                loginMethod === 'key' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Security Key
            </button>
            <button
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                loginMethod === 'password'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Email &amp; Password
            </button>
          </div>

          {loginMethod === 'key' ? (
            <form onSubmit={handleAdminKeyLogin} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1.5">
                  Enter Master Admin Security Key
                </label>
                <div className="relative">
                  <input
                    type={showAdminKey ? 'text' : 'password'}
                    required
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Enter security key..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 pr-10 text-white focus:outline-hidden focus:border-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminKey(!showAdminKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
                    aria-label={showAdminKey ? 'Hide security key' : 'Show security key'}
                  >
                    {showAdminKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Unlock Full Admin Control</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setAdminKey('k3som2026')}
                className="w-full text-center text-[11px] text-blue-400 hover:underline cursor-pointer"
              >
                Auto-fill Default Key (k3som2026)
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminCredentialsLogin} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Admin Password</label>
                <div className="relative">
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 pr-10 text-white focus:border-blue-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
                    aria-label={showAdminPassword ? 'Hide admin password' : 'Show admin password'}
                  >
                    {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Sign In as Administrator
              </button>
            </form>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // FULL AUTHORIZED ADMIN CONTROL PANEL
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-900">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 text-slate-300 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                K3
              </div>
              <span className="font-extrabold text-white text-base">K3SOM STORE</span>
            </Link>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
            <p className="text-slate-400 font-medium">Logged in as:</p>
            <p className="font-bold text-white truncate">{user?.name}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 font-extrabold text-[10px] border border-amber-500/30">
              FULL ADMIN ACCESS
            </span>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'products', label: `Products (${products.length})`, icon: Package },
              { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
              { id: 'inventory', label: `Inventory & Stock`, icon: AlertTriangle },
              { id: 'coupons', label: 'Coupons & Discounts', icon: Tag },
              { id: 'settings', label: 'Store Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Live Store ↗</span>
          </Link>
          <button
            onClick={logout}
            className="text-rose-400 hover:text-rose-300 font-bold flex items-center gap-1 cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 capitalize">
              {activeTab === 'overview' ? 'Operational Dashboard' : activeTab}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Full administrative system management for K3SOMSTORE Somalia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            )}

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Open Customer Store ↗
            </Link>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Sales Revenue
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  {formatPrice(totalRevenue)}
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold">USD Commercial Account</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Customer Orders
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  {orders.length}
                </div>
                <p className="text-[11px] text-blue-600 font-semibold">
                  {orders.filter((o) => o.status === 'OUT_FOR_DELIVERY').length} Out for Delivery
                </p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Catalog Items
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  {products.length}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">8 Collections</p>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Low-Stock Inventory
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-600">
                  {lowStockProducts.length}
                </div>
                <p className="text-[11px] text-amber-700 font-semibold">Need Restocking</p>
              </div>
            </div>

            {/* Orders summary */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-950">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  Manage All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="py-3">Order #</th>
                      <th className="py-3">Customer</th>
                      <th className="py-3">Destination</th>
                      <th className="py-3">Payment</th>
                      <th className="py-3">Total</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50">
                        <td className="py-3 font-mono font-bold text-blue-600">
                          #{ord.orderNumber}
                        </td>
                        <td className="py-3">
                          <div className="font-bold text-slate-900">{ord.customerName}</div>
                          <div className="text-slate-400 text-[10px]">{ord.customerPhone}</div>
                        </td>
                        <td className="py-3 font-medium text-slate-700">
                          {ord.district}, {ord.city}
                        </td>
                        <td className="py-3 font-mono font-semibold text-slate-800">
                          {ord.paymentMethod}
                        </td>
                        <td className="py-3 font-extrabold text-slate-950">
                          {formatPrice(ord.totalAmount)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              ord.status === 'DELIVERED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'OUT_FOR_DELIVERY'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search catalog by name or SKU..."
                className="w-full text-xs bg-transparent border-none outline-hidden text-slate-900"
              />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3">SKU</th>
                    <th className="py-3">Price</th>
                    <th className="py-3">Stock</th>
                    <th className="py-3">Category</th>
                    <th className="py-3 text-right px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                        p.sku.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.images[0]?.url}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <span className="font-bold text-slate-900 line-clamp-1">{p.name}</span>
                        </td>
                        <td className="py-3 font-mono text-slate-500">{p.sku}</td>
                        <td className="py-3 font-black text-slate-950">{formatPrice(p.price)}</td>
                        <td className="py-3">
                          <span
                            className={`font-bold ${
                              p.stock <= 5 ? 'text-rose-600' : 'text-slate-800'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3 text-slate-600 font-medium">
                          {categories.find((c) => c.id === p.categoryId)?.name}
                        </td>
                        <td className="py-3 text-right px-4 space-x-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <span>Filter Status:</span>
                <select
                  value={orderFilterStatus}
                  onChange={(e) => setOrderFilterStatus(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>

              <span className="text-xs text-slate-400 font-bold">
                Total Orders: {orders.length}
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden divide-y divide-slate-100">
              {orders
                .filter((o) => orderFilterStatus === 'all' || o.status === orderFilterStatus)
                .map((ord) => (
                  <div key={ord.id} className="p-6 space-y-4 hover:bg-slate-50/50">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-blue-600 font-mono font-black text-sm">
                          #{ord.orderNumber}
                        </span>
                        <span className="text-xs text-slate-400 ml-3">
                          {formatDateTime(ord.createdAt)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Change Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                          }
                          className="bg-slate-100 text-xs font-bold rounded-xl p-2 border border-slate-200 text-slate-900 cursor-pointer"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRMED">CONFIRMED</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                          <option value="DELIVERED">DELIVERED</option>
                          <option value="CANCELLED">CANCELLED</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl">
                      <div>
                        <strong className="block text-slate-900 mb-0.5">Customer:</strong>
                        <p>{ord.customerName}</p>
                        <p className="font-mono">{ord.customerPhone}</p>
                      </div>

                      <div>
                        <strong className="block text-slate-900 mb-0.5">Shipping Destination:</strong>
                        <p>{ord.streetAddress}</p>
                        <p>{ord.district}, {ord.city}</p>
                      </div>

                      <div>
                        <strong className="block text-slate-900 mb-0.5">Payment Details:</strong>
                        <p className="font-bold text-slate-900">{ord.paymentMethod}</p>
                        {ord.paymentReference && (
                          <p className="font-mono text-emerald-700 text-[11px]">
                            Ref: {ord.paymentReference}
                          </p>
                        )}
                        <p className="text-sm font-black text-blue-600 mt-1">
                          {formatPrice(ord.totalAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Items Breakdown (What the customer bought) */}
                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                        Alaabta uu Macmiilku Dalbaday ({ord.items?.length || 0} items):
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {ord.items?.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2.5 rounded-2xl bg-white border border-slate-200 shadow-2xs"
                          >
                            {item.productImage && (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-11 h-11 rounded-xl object-cover bg-slate-100 shrink-0"
                              />
                            )}
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {item.productName}
                              </p>
                              <p className="text-[11px] text-slate-500">
                                Qty: <strong>{item.quantity}x</strong> • {formatPrice(item.price)}
                                {item.selectedColor ? ` • ${item.selectedColor}` : ''}
                              </p>
                            </div>
                            <span className="text-xs font-black text-slate-950 font-mono shrink-0">
                              {formatPrice(item.total || item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-950">
                Warehouse Inventory Counts
              </h3>
              <p className="text-xs text-slate-500">
                Click (+) or (-) to instantly modify warehouse stock units.
              </p>

              <div className="divide-y divide-slate-100">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="py-3 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.images[0]?.url}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-slate-900 block truncate">{p.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">SKU: {p.sku}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleQuickStockChange(p.id, -1)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold"
                      >
                        -
                      </button>
                      <span
                        className={`w-14 text-center font-black ${
                          p.stock <= 5 ? 'text-rose-600' : 'text-slate-900'
                        }`}
                      >
                        {p.stock}
                      </span>
                      <button
                        onClick={() => handleQuickStockChange(p.id, +1)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* COUPONS TAB */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 max-w-2xl">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-950">Promotional Discounts</h3>
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black font-mono text-sm text-blue-600">K3SOM10</span>
                    <p className="text-slate-500">10% discount on customer orders over $20</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                    ACTIVE
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-black font-mono text-sm text-blue-600">SOMALIA5</span>
                    <p className="text-slate-500">$5.00 fixed discount on customer orders over $30</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-xl">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4 text-xs">
              <h3 className="text-base font-bold text-slate-950 pb-3 border-b border-slate-100">
                Core Store Configurations
              </h3>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Brand Name</label>
                <input
                  type="text"
                  readOnly
                  value="K3SOMSTORE"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  Customer WhatsApp Helpline
                </label>
                <input
                  type="text"
                  readOnly
                  value="+252 61 400 0000"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  Mogadishu Delivery Flat Rate
                </label>
                <input
                  type="text"
                  readOnly
                  value="$2.00 (Free for orders over $50)"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  Database &amp; Schema Provider
                </label>
                <input
                  type="text"
                  readOnly
                  value="PostgreSQL + Prisma ORM"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-emerald-600"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="font-bold text-slate-800 block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Ultra 2 Smart Watch Titanium"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Price (USD) *</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="38.00"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Old Price (USD)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formOldPrice}
                    onChange={(e) => setFormOldPrice(e.target.value)}
                    placeholder="48.00"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Category *</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-800 block mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Product features and specifications..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="flex-1 py-3 border border-slate-200 rounded-xl font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-md"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
