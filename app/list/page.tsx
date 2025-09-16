"use client";

import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";
import Image from "next/image";
import { fraction } from "../lib/fractionsdk";
import { FractionConfig , programId} from "@sendaifun/fraction";
import { useWallet } from "@jup-ag/wallet-adapter";
import { PublicKey } from "@solana/web3.js";

export default function ListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { publicKey, connected } = useWallet();
  const [fractions, setFractions] = useState<FractionConfig[]>([]);
  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      // Hide the check icon after 2 seconds
      setTimeout(() => {
        setCopiedAddress(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const getFractionConfig = (fraction: FractionConfig) => {
    const [fractionConfigPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("fraction_config"), fraction.authority.toBuffer(), Buffer.from(fraction.name)],
      programId
  );
  return fractionConfigPda.toBase58();
  }

  useEffect(() => {
    const fetchFractions = async () => {
      const fractions = await fraction.getFractionsByAuthority(publicKey!);
      setFractions(fractions);
    };
    if (connected) {
      fetchFractions();
    }
  }, [connected]);

  const filteredFractions = fractions.filter(
    (fraction: FractionConfig) =>
      fraction.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

            <div className="w-full bg-black/10 border border-white/10 rounded-xl p-8 mt-16">
              <div className="w-full mb-8 px-4">
                <Input
                  className="w-full"
                  // label="Search Fraction"
                  placeholder="Search your fraction.."
                  value={searchQuery}
                  onChange={setSearchQuery}
                  icon="/assets/icons/search.svg"
                />
              </div>
              <div className="flex flex-wrap gap-8 justify-center w-full">
                {filteredFractions.map((fraction: FractionConfig) => (
                  <div
                    key={Math.random()}
                    className="flex-shrink-0 w-full max-w-[240px]  bg-[#0B78FD1A] border-t-[1.53px] border-l-[0.38px] border-r-[0.38px] border-b-[0.38px] border-[#0B78FD] rounded-xl p-6 hover:border-[#0B78FD]/[0.4] hover:bg-[#0B78FD25] transition-all duration-300 transform hover:-translate-y-1 "
                  >
                    {/* Header with name and status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-[#0B78FD] text-sm font-polysans font-medium mb-2 leading-tight">
                          {fraction.name}
                        </h3>
                        <h3 className="text-white text-xl font-polysans font-medium mb-2 leading-tight">
                          {fraction.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-gray-400 font-polysans text-xs">
                          Fraction Address
                        </div>
                        <div className="text-white font-polysans font-mono text-sm  px-0 py-1 rounded flex items-center gap-2 justify-between">
                          {getFractionConfig(fraction).slice(0, 4) + "..." + getFractionConfig(fraction).slice(-4)}

                          <button
                            onClick={() => copyToClipboard(getFractionConfig(fraction))}
                            className="hover:opacity-70 transition-opacity duration-200 cursor-pointer"
                          >
                            <Image
                              src={
                                copiedAddress === getFractionConfig(fraction)
                                  ? "/assets/icons/check.svg"
                                  : "/assets/icons/copy.svg"
                              }
                              alt={
                                copiedAddress === getFractionConfig(fraction)
                                  ? "Copied"
                                  : "Copy"
                              }
                              width={16}
                              height={16}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredFractions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 font-polysans text-lg mb-2">
                      No fraction found
                    </div>
                    <div className="text-gray-500 font-polysans">
                      {searchQuery
                        ? "Try adjusting your search query"
                        : "Create your first fraction to get started"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
