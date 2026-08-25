import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pool — Gift or sell unused AI credits",
  description: "Track AI usage, gift spare credits, or list eligible surplus in a discounted marketplace.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Pool — Gift or sell unused AI credits",
    description: "Track usage. Gift the spare. Sell eligible surplus for less.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Pool — Share access. Keep creating." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pool — Gift or sell unused AI credits",
    description: "Track usage. Gift the spare. Sell eligible surplus for less.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
