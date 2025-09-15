import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      // www.backpack.app
      {
        protocol: "https",
        hostname: "www.backpack.app",
      },
      // solflare.com
      {
        protocol: "https",
        hostname: "solflare.com",
      },
      // phantom.app
      {
        protocol: "https",
        hostname: "phantom.app",
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
