import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Motion from "@/components/kit/Motion";
import Dock from "@/components/Dock";
import StackFooter from "@/components/StackFooter";
import { CartProvider } from "@/lib/commerce/cart";

const display = localFont({ src: "../public/fonts/bricolage-grotesque-latin-opsz-normal.woff2", variable: "--f-display", weight: "100 900", display: "swap" });
const sans = localFont({ src: "../public/fonts/dm-sans-latin-wght-normal.woff2", variable: "--f-sans", weight: "100 900", display: "swap" });

export const metadata: Metadata = { title: "Kova — Money, minus the borders", description: "Kova is a multi-currency wallet and card for people who live in more than one currency. A concept by Anorix.", openGraph: { title: "Kova — Money, minus the borders", description: "Kova is a multi-currency wallet and card for people who live in more than one currency. A concept by Anorix.", type: "website" } };
export const viewport: Viewport = { themeColor: "#f1ece4", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} /></head>
      <body><CartProvider storeKey="kova-bag"><Motion /><Dock />{children}<StackFooter /></CartProvider></body>
    </html>
  );
}
