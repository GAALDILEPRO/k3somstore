import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number | string | undefined | null): string {
  const numeric = typeof amount === 'string' ? parseFloat(amount) : Number(amount || 0);
  if (isNaN(numeric)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numeric);
}

export function formatDate(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return String(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatDateTime(dateStr: string | Date | undefined | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return String(dateStr);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function generateOrderNumber(): string {
  const randomDigits = Math.floor(10000 + Math.random() * 90000);
  return `K3S-${randomDigits}`;
}

export function calculateDeliveryFee(city: string, subtotal: number): number {
  if (subtotal >= 50 && city.toLowerCase() === 'mogadishu') {
    return 0; // Free delivery in Mogadishu over $50
  }
  
  switch (city.toLowerCase()) {
    case 'mogadishu':
      return 2.0;
    case 'hargeisa':
    case 'garowe':
    case 'bosaso':
    case 'kismayo':
    case 'baidoa':
      return 5.0;
    default:
      return 6.0;
  }
}
