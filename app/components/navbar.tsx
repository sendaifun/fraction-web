"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionTracking } from "../hooks/useMotionTracking";
import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

const Navbar = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useMotionTracking(buttonRef);
  useMotionTracking(containerRef);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="glass rounded-full px-4 md:px-8 py-3.5 flex items-center justify-between relative"
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/">
              <Image
                src="/assets/logos/fraction.svg"
                alt="Fraction Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/create"
              className={`text-sm font-polysans font-medium transition-colors duration-200 ${
                pathname === "/create"
                  ? "text-[#4E88F0]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Create Fractions
            </Link>
            <Link
              href="/list"
              className={`text-sm font-polysans font-medium transition-colors duration-200 ${
                pathname === "/list"
                  ? "text-[#4E88F0]"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Existing Fractions
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Connect Button */}
            {/* <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button flex items-center gap-2 px-4 py-2 rounded-full"
            >
              <Image
                src="/assets/icons/wallet.svg"
                alt="Wallet Logo"
                width={24}
                height={24}
                className="h-5 w-5"
              />
              <span className="text-white font-medium text-sm">
                Connect Wallet
              </span>
            </a> */}

            <UnifiedWalletButton />
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-2 mx-auto max-w-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="glass rounded-xl p-2 flex flex-col gap-2">
                <Link
                  href="/create"
                  className={`glass-button flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
                    pathname === "/create" ? "bg-[#4E88F0]/20" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className={`font-medium text-sm ${
                      pathname === "/create" ? "text-[#4E88F0]" : "text-white"
                    }`}
                  >
                    Create Fractions
                  </span>
                </Link>
                <Link
                  href="/list"
                  className={`glass-button flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
                    pathname === "/list" ? "bg-[#4E88F0]/20" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span
                    className={`font-medium text-sm ${
                      pathname === "/list" ? "text-[#4E88F0]" : "text-white"
                    }`}
                  >
                    Existing Fractions
                  </span>
                </Link>
                {/* <a
                      href=""
                      className="glass-button flex items-center justify-center gap-2 px-4 py-2 rounded-full"
                    >
                      <Image
                        src="/assets/icons/wallet.svg"
                        alt="wallet icon"
                        width={24}
                        height={24}
                        className="h-5 w-5"
                      />
                      <span className="text-white font-medium text-sm">
                        Connect Wallet
                      </span>
                    </a> */}

                <UnifiedWalletButton  buttonClassName="!glass-button !flex !items-center !justify-center !gap-2 !px-4 !py-2 !rounded-full" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
