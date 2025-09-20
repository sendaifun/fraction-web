"use client";

import { FractionConfig, programId } from "@sendaifun/fraction";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useState } from "react";
import EmptyState from "./EmptyState";
import FractionCard from "./FractionCard";
import SearchBar from "./SearchBar";

interface FractionListProps {
  fractions: FractionConfig[];
  isLoading: boolean;
}

export default function FractionList({ fractions, isLoading }: FractionListProps) {
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredFractions = fractions.filter(
    (fraction: FractionConfig) =>
      fraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getFractionConfig(fraction)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-black/10 border border-white/10 rounded-xl p-8 mt-16">
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="flex flex-wrap gap-8 justify-center w-full min-h-[200px]">
        {filteredFractions.map((fraction: FractionConfig) => (
          <FractionCard key={Math.random()} fraction={fraction} />
        ))}

        {!isLoading && filteredFractions.length === 0 && (
          <EmptyState isLoading={isLoading} hasSearchQuery={!!searchQuery} />
        )}
        
        {isLoading && (
          <EmptyState isLoading={isLoading} hasSearchQuery={!!searchQuery} />
        )}
      </div>
    </div>
  );
}
