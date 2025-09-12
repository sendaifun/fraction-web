import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers/walletproviders";
import AnimatedBackground from "./components/common/AnimatedBackground";

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
        className={`${geistSans.variable} ${geistMono.variable} ${polySans.variable} antialiased bg-black relative`}
      >
        {/* Animated Background - Global for all routes */}
        <AnimatedBackground />

        {/* Content Wrapper */}
        <div className="relative z-10">
          <Providers>
            {children}
          </Providers>
        </div>
        
        <Toaster 
          theme="dark" 
          position="top-center"
          toastOptions={{
            style: {
              background: '#000',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  );
}
