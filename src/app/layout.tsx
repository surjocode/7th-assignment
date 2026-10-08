import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Marquee from "@/components/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <Marquee />

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}