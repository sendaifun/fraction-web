"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import { motion } from "motion/react";
import heroAnimation from "../../public/animations/hero2.json";

const Hero = () => {
  return (
    <>
      {/* Text part */}
      <motion.div
        className="flex flex-col items-center gap-2 justify-center max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="hidden sm:block"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-white text-5xl md:text-6xl font-polysans text-nowrap">
            Split any transaction into
          </div>
        </motion.div>

        <motion.div
          className="items-center gap-2 hidden sm:flex"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-white text-5xl md:text-6xl font-polysans text-nowrap">
            Fractions on{" "}
          </div>
          <Image
            src="/assets/logos/solana.svg"
            alt="SendAI"
            width={100}
            height={100}
            className="w-fit h-8 md:h-12"
          />
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <div className="text-white text-4xl sm:hidden font-polysans text-nowrap">
            {" "}
            Split any transaction{" "}
          </div>
          <div className="text-white text-4xl sm:hidden font-polysans text-nowrap">
            {" "}
            into Fractions on{" "}
          </div>

          <Image
            src="/assets/logos/solana.svg"
            alt="SendAI"
            width={100}
            height={100}
            className="w-fit h-6 md:h-12 sm:hidden"
          />
        </div>
      </motion.div>

      {/* Animation part */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <Lottie
          animationData={heroAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-auto md:mx-16"
        />
      </motion.div>
    </>
  );
};

export default Hero;
