import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import TopBackground from "./components/common/TopBackground";
import "./globals.css";
import { Providers } from "./providers/walletproviders";
import { Analytics } from "@vercel/analytics/next"

const polySans = localFont({
  src: "../public/fonts/PolySansTrial-Median.otf",
  variable: "--font-polysans",
  display: "swap",
});

const description =
  "Fraction by SendAI, a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares.";
const appUrl = "https://fraction.sendai.fun";
const appName = "Fraction";

export const metadata: Metadata = {
  title: appName,
  authors: [{ name: appName, url: appUrl }],
  description: description,
  icons: {
    icon: "/assets/logos/fraction.svg",
    shortcut: "/assets/logos/fraction.svg",
    apple: "/assets/logos/fraction.svg",
  },
  openGraph: {
    title: appName,
    description: description,
    siteName: appName,
    images: [
      {
        url: `${appUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: appName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: description,
    images: [`${appUrl}/og.png`],
  },
  metadataBase: new URL(appUrl || ""),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${polySans.variable} antialiased bg-black relative`}>
        {/* Conditional Animated Background - Hidden on /create and /list routes */}
        <TopBackground />

        {/* Content Wrapper */}
        <div className="relative z-10">
          <Providers>{children}</Providers>
        </div>

        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: "#000",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
