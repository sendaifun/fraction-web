"use client";

import { useWallet } from "@jup-ag/wallet-adapter";
import { FractionConfig } from "@sendaifun/fraction";
import Image from "next/image";
import { useEffect, useState } from "react";
import FractionList from "../components/fraction/FractionList";
import SectionHeader from "../components/common/SectionHeader";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { fraction } from "../lib/fractionsdk";

export default function ListPage() {
  const { publicKey, connected } = useWallet();
  const [fractions, setFractions] = useState<FractionConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFractions = async () => {
      setIsLoading(true);
      const fractions = await fraction.getFractionsByAuthority(publicKey!);
      setFractions(fractions);
      setIsLoading(false);
    };
    if (connected) {
      fetchFractions();
    }
  }, [connected]);

  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-6">
        <Navbar />
        <div className="mt-32">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              title="Existing Fraction"
              subtitle="Fraction is a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares."
            />

            {/* Halo gradient overlay */}
            <div className="absolute inset-0 -left-120 overflow-hidden pointer-events-none z-10 flex items-center justify-center">
              <Image
                width={2034}
                height={1341}
                src="/assets/bgs/halograd.svg"
                alt=""
                className="w-full h-auto opacity-60"
              />
            </div>

            <FractionList fractions={fractions} isLoading={isLoading} />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
