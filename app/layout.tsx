import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartProvider from "./context/CartContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ModernShop - Premium Fashion & Lifestyle",
  description: "Discover curated collections of premium fashion, accessories, and lifestyle products. Free shipping on orders over $100.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
