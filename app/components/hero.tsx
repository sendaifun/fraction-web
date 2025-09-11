"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import heroAnimation from "../../public/animations/hero2.json";

const Hero = () => {
  return (
    <>
      {/* Text part */}
      <div className="flex flex-col items-center gap-2 justify-center max-w-7xl mx-auto">
        <div className="">
          <div className="text-white text-4xl md:text-6xl font-polysans text-nowrap">
            Split any transaction into
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-white text-4xl md:text-6xl font-polysans text-nowrap">Fractions on </div>
          <Image
            src="/assets/logos/solana.svg"
            alt="SendAI"
            width={100}
            height={100}
            className="w-fit h-6 md:h-12"
          />
        </div>
      </div>

      {/* Animation part */}
      <div className="flex justify-center mt-8">
        <Lottie
          animationData={heroAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-auto md:mx-16"
        />
      </div>
    </>
  );
};

export default Hero;
