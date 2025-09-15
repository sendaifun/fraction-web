"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function AnimatedBackground({ isSticky }: { isSticky: boolean }) {
  return (
    <div className={`${isSticky ? "fixed" : "absolute"} -top-72 left-0 w-full h-screen pointer-events-none z-0`}>
      {/* Stars Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-60"
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.1,
        }}
      >
        <Image
          src="/assets/bgs/stars.svg"
          alt=""
          width={1259}
          height={812}
          className="w-full h-full object-cover object-top"
          priority
        />
      </motion.div>

      {/* Top Glare Overlay */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full opacity-80"
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.1,
        }}
      >
        <Image
          src="/assets/bgs/topglare.svg"
          alt=""
          width={2034}
          height={1341}
          className="w-full h-full object-cover object-top z-10"
          priority
        />
      </motion.div>
    </div>
  );
}
