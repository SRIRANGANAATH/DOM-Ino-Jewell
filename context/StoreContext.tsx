"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type StoreContextType = {
  wishlist: string[];
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  compareList: string[];
  toggleCompare: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('domino_wishlist');
      const savedCompare = localStorage.getItem('domino_compare');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
      if (savedCompare) setCompareList(JSON.parse(savedCompare));
    } catch (e) {
      console.error(e);
    }
    setMounted(true);
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('domino_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('domino_compare', JSON.stringify(compareList));
    }
  }, [compareList, mounted]);

  const addToWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item !== id));
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        // Limit to comparing 3 items maximum
        if (prev.length >= 3) {
          alert("You can only compare up to 3 items at once.");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  return (
    <StoreContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, compareList, toggleCompare }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
