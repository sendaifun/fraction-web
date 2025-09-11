"use client";

import Image from "next/image";
import Lottie from "lottie-react";
import heroAnimation from "../../public/animations/hero.json";

const Hero = () => {
  return (
    <>
      {/* Text part */}
      <div className="flex flex-col items-center gap-2 justify-center max-w-7xl mx-auto">
        <div className="">
          <div className="text-white text-6xl font-polysans">
            Split any transaction into
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-white text-6xl font-polysans">Fractions on </div>
          <Image
            src="/assets/logos/solana.svg"
            alt="SendAI"
            width={100}
            height={100}
            className="w-fit h-12"
          />
        </div>
      </div>

      {/* Animation part */}
      <div className="flex justify-center mt-8">
        <Lottie
          animationData={heroAnimation}
          loop={true}
          autoplay={true}
          className="w-full h-auto mx-16"
        />
      </div>
    </>
  );
};

export default Hero;
