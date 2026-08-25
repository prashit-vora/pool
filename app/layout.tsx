import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pool — Share unused AI credits",
  description: "Track AI usage, see what is safe to share, and give spare credits to someone who needs them.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "Pool — Share unused AI credits",
    description: "Track usage. Set flexible sharing limits. Keep creating.",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Pool — Share access. Keep creating." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pool — Share unused AI credits",
    description: "Track usage. Set flexible sharing limits. Keep creating.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
