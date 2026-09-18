'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { WishlistItem, Product } from '../lib/types';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('k3som_wishlist');
      if (saved) {
        setWishlistItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error reading wishlist storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('k3som_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, isLoaded]);

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  const toggleWishlist = (product: Product) => {
    const exists = isInWishlist(product.id);
    if (exists) {
      setWishlistItems((prev) => prev.filter((item) => item.productId !== product.id));
      showToast(`Removed from Wishlist`, 'info');
    } else {
      const newItem: WishlistItem = {
        id: `wish-${product.id}-${Date.now()}`,
        productId: product.id,
        product,
        addedAt: new Date().toISOString(),
      };
      setWishlistItems((prev) => [...prev, newItem]);
      showToast(`Added to Wishlist! ❤️`, 'success');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Removed from Wishlist', 'info');
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
