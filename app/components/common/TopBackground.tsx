"use client";

import { usePathname } from "next/navigation";
import AnimatedBackground from "./AnimatedBackground";

export default function TopBackground() {
  const pathname = usePathname();

  // exclude the routes which are NOT using BOTH the radial gradient or animated background
  if (pathname === "/") {
    return null;
  }

  // the routes which use only the radial gradient
  const useRadialGradient = pathname === "/create" || pathname === "/list";

  if (useRadialGradient) {
    return (
      <div className="fixed -top-72 left-0 w-full h-screen pointer-events-none z-0">
        <div 
          className="absolute top-0 left-0 w-full h-full blur-3xl"
          style={{
            background: "radial-gradient(circle at 50% 20%, rgba(19, 85, 166, 0.3) 0%, transparent 60%)"
          }}
        />
      </div>
    );
  }

  return <AnimatedBackground />;
}
