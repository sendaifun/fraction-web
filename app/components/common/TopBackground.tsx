"use client";

import { usePathname } from "next/navigation";
import AnimatedBackground from "./AnimatedBackground";

export default function TopBackground() {
  const pathname = usePathname();

  // Use radial gradient background on /create and /list routes
  const useRadialGradient = pathname === "/create" || pathname === "/list";

  if (useRadialGradient) {
    return (
      <div className="fixed -top-72 left-0 w-full h-screen pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 w-full h-full blur-3xl"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(19, 85, 166, 0.3) 0%, rgba(7, 54, 98, 0.1) 50%, transparent 70%)"
          }}
        />
      </div>
    );
  }

  return <AnimatedBackground />;
}
