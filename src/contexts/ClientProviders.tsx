"use client";

import { CartProvider } from "./CartContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}