'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Zap,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Check,
  MessageSquare,
  Share2,
} from 'lucide-react';
import { StoreService } from '../../../lib/services/storeService';
import { formatPrice } from '../../../lib/utils';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useToast } from '../../../context/ToastContext';
import { ProductCard } from '../../../components/shop/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = StoreService.getProductById(resolvedParams.id);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');

  // Review submission state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">
          The product you are looking for might have been moved or is currently unavailable.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const category = StoreService.getCategories().find((c) => c.id === product.categoryId);
  const relatedProducts = StoreService.getRelatedProducts(product.categoryId, product.id);
  const reviews = StoreService.getProductReviews(product.id);
  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!product || isCheckingOut) return;

    setIsCheckingOut(true);
    addToCart(product, quantity, selectedColor);

    // Immediate mobile navigation
    try {
      router.push('/checkout');
    } catch {
      window.location.href = '/checkout';
    }

    // Ultra-reliable fallback for mobile browsers & local IP network transitions
    setTimeout(() => {
      window.location.href = '/checkout';
    }, 150);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewerName.trim() && reviewerComment.trim()) {
      StoreService.addReview({
        productId: product.id,
        customerName: reviewerName.trim(),
        rating: reviewerRating,
        comment: reviewerComment.trim(),
      });
      setIsReviewSubmitted(true);
      showToast('Thank you! Your review has been published.', 'success');
      setReviewerName('');
      setReviewerComment('');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on K3SOMSTORE Somalia!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-blue-600 transition-colors">
            Shop
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link
                href={`/shop?category=${category.slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-slate-900 font-semibold line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Showcase Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Gallery (5 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={product.images[selectedImageIndex]?.url || product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {product.discountPercent && (
                  <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-black px-2.5 py-1 rounded-lg tracking-wider">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-blue-600 ring-2 ring-blue-100'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.alt || product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Purchase Actions (7 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Meta & Ratings */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-extrabold text-slate-900 ml-1 text-sm">
                        {product.rating}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      ({product.reviewCount} customer reviews)
                    </span>
                  </div>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors p-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>

                <h1 className="text-xl sm:text-3xl font-black text-slate-950 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2 font-mono">
                  <span>SKU: {product.sku}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-bold">
                    In Stock ({product.stock} units available)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 my-5 pb-5 border-b border-slate-100">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                      Save {formatPrice(product.oldPrice - product.price)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <label className="text-xs font-bold text-slate-800 block">
                      Color Variant:{' '}
                      <span className="text-blue-600 font-semibold">{selectedColor}</span>
                    </label>
                    <div className="flex flex-wrap gap-2.5">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                            selectedColor === color
                              ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Actions */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 text-slate-600 hover:text-slate-950 font-bold transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-xs font-extrabold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product, quantity, selectedColor)}
                    className="flex-1 py-3.5 px-6 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isFavorited
                        ? 'border-rose-200 bg-rose-50 text-rose-600'
                        : 'border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-slate-50'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  onTouchEnd={handleBuyNow}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 active:scale-95 disabled:bg-blue-400 text-white rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] cursor-pointer touch-manipulation select-none"
                >
                  {isCheckingOut ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Fadlan sug... (U gudbaya Checkout)</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-current text-amber-300" />
                      <span>Buy Now (Instant Checkout)</span>
                    </>
                  )}
                </button>

                {/* Somali Delivery Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Same-Day Mogadishu delivery ($2 / Free over $50)</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>100% Genuine product functional guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs (Description, Specs, Shipping, Reviews) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden mb-16">
          {/* Tab Headers */}
          <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50/70">
            {[
              { id: 'desc', label: 'Full Description' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'shipping', label: 'Somali Shipping & Returns' },
              { id: 'reviews', label: `Customer Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-4 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-10">
            {activeTab === 'desc' && (
              <div className="space-y-4 text-sm text-slate-700 leading-relaxed max-w-3xl">
                <h3 className="text-base font-bold text-slate-900">About {product.name}</h3>
                <p>{product.description}</p>
                {product.descriptionSo && (
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-900">
                    <strong className="block mb-1 font-bold">Faahfaahinta Af-Soomaaliga:</strong>
                    <p>{product.descriptionSo}</p>
                  </div>
                )}
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 pt-2">
                  <li>Original authentic unit backed by K3SOMSTORE verified quality test.</li>
                  <li>Shipped with complete retail packaging and cables.</li>
                  <li>Ready to use immediately upon receipt.</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <h3 className="text-base font-bold text-slate-900 mb-4">Technical Details</h3>
                <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 p-3.5 text-xs">
                      <span className="font-bold text-slate-600">{key}</span>
                      <span className="text-slate-900 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-6 max-w-3xl text-xs text-slate-600 leading-relaxed">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    Delivery Across Somalia
                  </h4>
                  <p>
                    Orders placed before 2:00 PM are delivered same-day in Mogadishu districts (Hodan, Waberi, Kaaraan, Daynile, etc.). Deliveries to Hargeisa, Garowe, Bosaso, Kismayo, and Baidoa arrive within 1 to 2 business days via regional air courier.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    7-Day Inspection Guarantee
                  </h4>
                  <p>
                    Inspect your product upon delivery. If any manufacturing defect is discovered within 7 days, K3SOMSTORE provides an immediate replacement or full refund.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">Payment Verification</h4>
                  <p>
                    Pay securely using EVC Plus (Hormuud), Zaad (Telesom), Sahal (Golis), eDahab (Somtel), or Cash on Delivery in Mogadishu.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-3xl">
                {/* Existing Reviews */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Customer Feedback ({reviews.length})
                  </h3>

                  {reviews.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No reviews yet. Be the first to share your experience with this product!
                    </p>
                  ) : (
                    reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">
                            {rev.customerName}
                          </span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Write Review Form */}
                <div className="pt-6 border-t border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 mb-3">Leave a Review</h4>

                  {isReviewSubmitted ? (
                    <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Thank you! Your feedback has been posted successfully.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Rating
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewerRating(star)}
                              className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  reviewerRating >= star ? 'fill-current' : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-800 block mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            required
                            placeholder="e.g. Abdirahman (Mogadishu)"
                            className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-800 block mb-1">
                          Review Comment
                        </label>
                        <textarea
                          value={reviewerComment}
                          onChange={(e) => setReviewerComment(e.target.value)}
                          required
                          rows={3}
                          placeholder="What did you like about this product?"
                          className="w-full bg-slate-50 text-xs rounded-xl p-3 border border-slate-200 focus:outline-hidden focus:border-blue-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                Related Products
              </h2>
              <Link
                href={`/shop?category=${category?.slug || 'all'}`}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
