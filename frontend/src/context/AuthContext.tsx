'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role } from '../lib/types';
import { useToast } from './ToastContext';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (emailOrPhone: string, pass: string) => boolean;
  loginAsAdmin: (pass: string) => boolean;
  register: (name: string, phone: string, email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('k3som_auth_user');
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading auth user from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem('k3som_auth_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('k3som_auth_user');
      }
    }
  }, [user, isLoaded]);

  // Customer Login
  const login = (emailOrPhone: string, pass: string): boolean => {
    const clean = emailOrPhone.trim().toLowerCase();

    // Check if logging in with Admin credentials
    if (clean === 'admin@k3somstore.so' && pass === 'k3som2026') {
      const adminUser: AuthUser = {
        id: 'usr-admin-01',
        name: 'K3SOM Store Administrator',
        email: 'admin@k3somstore.so',
        phone: '+252 61 500 0000',
        role: 'ADMIN',
      };
      setUser(adminUser);
      showToast('Welcome back, Store Administrator!', 'success');
      return true;
    }

    // Regular Customer Login (accepts any registered customer or valid test user)
    if (pass && pass.length >= 4) {
      const customerUser: AuthUser = {
        id: `usr-${Date.now()}`,
        name: clean.includes('@') ? clean.split('@')[0] : 'Somali Shopper',
        email: clean.includes('@') ? clean : `${clean}@customer.so`,
        phone: clean.startsWith('+252') ? clean : '+252 61 543 2198',
        role: 'CUSTOMER', // STRICTLY CUSTOMER
      };
      setUser(customerUser);
      showToast(`Welcome, ${customerUser.name}!`, 'success');
      return true;
    }

    showToast('Invalid credentials. Password must be at least 4 characters.', 'error');
    return false;
  };

  // Dedicated Admin Login Gate
  const loginAsAdmin = (pass: string): boolean => {
    if (pass === 'k3som2026') {
      const adminUser: AuthUser = {
        id: 'usr-admin-01',
        name: 'K3SOM Store Administrator',
        email: 'admin@k3somstore.so',
        phone: '+252 61 500 0000',
        role: 'ADMIN',
      };
      setUser(adminUser);
      showToast('Admin authorization verified!', 'success');
      return true;
    }

    showToast('Unauthorized. Incorrect admin security key.', 'error');
    return false;
  };

  // Customer Registration (Strictly creates role CUSTOMER)
  const register = (name: string, phone: string, email: string, pass: string): boolean => {
    if (!name || !phone || !pass) {
      showToast('Please fill all required registration fields', 'error');
      return false;
    }

    const newCustomer: AuthUser = {
      id: `cust-${Date.now()}`,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || `${phone.replace(/[^0-9]/g, '')}@k3somstore.so`,
      role: 'CUSTOMER', // GUARANTEED CUSTOMER ONLY
    };

    setUser(newCustomer);
    showToast(`Account created successfully! Welcome, ${newCustomer.name}`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const isAuthenticated = Boolean(user);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        loginAsAdmin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
