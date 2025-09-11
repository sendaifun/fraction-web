import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const polySans = localFont({
  src: "../public/fonts/PolySansTrial-Median.otf",
  variable: "--font-polysans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fraction",
  description: "Fraction by SendAI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${polySans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
