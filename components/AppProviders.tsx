'use client';

import { CartProvider } from './CartContext';
import { Toaster } from './ui/toaster';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster />
    </CartProvider>
  );
}
