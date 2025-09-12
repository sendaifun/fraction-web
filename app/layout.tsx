import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import Image from "next/image";
import "./globals.css";
import { Providers } from "./providers/walletproviders";

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
        {/* Background Images - Global for all routes */}
        <div className="fixed -top-72 left-0 w-full h-screen pointer-events-none z-0">
          {/* Stars Background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-60">
            <Image
              src="/assets/bgs/stars.svg"
              alt=""
              width={1259}
              height={812}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          
          {/* Top Glare Overlay */}
          <div className="absolute top-0 left-0 w-full h-full opacity-80">
            <Image
              src="/assets/bgs/topglare.svg"
              alt=""
              width={2034}
              height={1341}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
        </div>

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
