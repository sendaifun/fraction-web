"use client";

import { FractionConfig, programId } from "@sendaifun/fraction";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useState } from "react";

interface FractionCardProps {
  fraction: FractionConfig;
}

export default function FractionCard({ fraction }: FractionCardProps) {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const getFractionConfig = (fraction: FractionConfig) => {
    const [fractionConfigPda] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("fraction_config"),
        fraction.authority?.toBuffer(),
        Buffer.from(fraction.name),
      ],
      programId
    );
    return fractionConfigPda.toBase58();
  };

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      // Hide the check icon after 1 second
      setTimeout(() => {
        setCopiedAddress(null);
      }, 800);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="flex-shrink-0 w-full max-w-[240px] bg-[#0B78FD1A] border-t-[1.53px] border-l-[0.38px] border-r-[0.38px] border-b-[0.38px] border-[#0B78FD] rounded-xl p-6 hover:border-[#0B78FD]/[0.4] hover:bg-[#0B78FD25] transition-all duration-300 transform hover:-translate-y-1">
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
          <div className="text-white font-polysans font-mono text-sm px-0 py-1 rounded flex items-center gap-2 justify-between">
            {getFractionConfig(fraction).slice(0, 4) +
              "..." +
              getFractionConfig(fraction).slice(-4)}

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
  );
}
