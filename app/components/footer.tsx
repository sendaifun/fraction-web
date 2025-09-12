"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer 
      className="mt-32 relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className=" max-w-7xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <p className="text-white/50 text-sm leading-relaxed text-left">
          SendAI Fraction is just a visual interface on Fraction with all
          non-custodial, transfer, and trading services powered by third party
          services like Jupiter, Birdeye, Privy, and more.
        </p>
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 pb-16 pt-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex flex-col border-t border-white/10 pt-12">
          {/* Social Icons */}
          <motion.div 
            className="flex gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20px" }}
          >
            <motion.a
              href="https://x.com/sendaifun"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <Image
                src="/assets/icons/x.svg"
                alt="X (Twitter)"
                width={24}
                height={24}
              />
            </motion.a>
            <motion.a
              href="https://github.com/sendaifun/fraction"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-50 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
            >
              <Image
                src="/assets/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </motion.a>
          </motion.div>

          {/* Text content in single line */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center text-sm text-white/50 gap-4 md:gap-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20px" }}
          >
            <p className="text-center md:text-left">
              Twenty&apos;25 SendAI © All Rights Reserved
            </p>
            <div className="flex items-center">
              <a href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </a>
              <span className="mx-2">|</span>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Abstract background */}
      <motion.div 
        className=" max-w-7xl mx-auto bottom-0 left-0 right-0 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <Image
          src="/assets/bgs/footerabs.svg"
          alt=""
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </motion.div>
    </motion.footer>
  );
}
