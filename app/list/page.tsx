"use client";

import { useState } from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Input from "../components/common/Input";
import SectionHeader from "../components/common/SectionHeader";

interface Fraction {
  id: string;
  name: string;
  creator: string;
  recipients: number;
  totalSplit: string;
  status: "Active" | "Paused" | "Completed";
  createdAt: string;
}

const mockFractions: Fraction[] = [
  {
    id: "1",
    name: "Team Revenue Split",
    creator: "5Fh...xY2",
    recipients: 4,
    totalSplit: "12,500 USDC",
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Investment Pool",
    creator: "8Kj...mN9",
    recipients: 6,
    totalSplit: "8,750 USDC",
    status: "Active",
    createdAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Creator Royalties",
    creator: "3Qw...pL4",
    recipients: 3,
    totalSplit: "5,200 USDC",
    status: "Paused",
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    name: "DAO Treasury Split",
    creator: "7Rt...vB8",
    recipients: 8,
    totalSplit: "25,000 USDC",
    status: "Active",
    createdAt: "2024-01-08",
  },
  {
    id: "5",
    name: "Marketing Fund",
    creator: "2Gh...sD6",
    recipients: 2,
    totalSplit: "3,400 USDC",
    status: "Completed",
    createdAt: "2024-01-05",
  },
];

export default function ListPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFractions = mockFractions.filter(
    (fraction) =>
      fraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fraction.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-400 bg-green-400/10";
      case "Paused":
        return "text-yellow-400 bg-yellow-400/10";
      case "Completed":
        return "text-gray-400 bg-gray-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col mx-auto px-6">
        <Navbar />
        <div className="mt-32">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              title="Existing Fraction"
              subtitle="Fraction is a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares."
            />

            <div className="max-w-6xl mx-auto bg-black/10 border border-white/10 rounded-lg p-8 mt-16">
              <div className="max-w-4xl mx-auto mb-8">
                <Input
                  className="w-full"
                  label="Search Fractions"
                  placeholder="Search by name or creator address..."
                  value={searchQuery}
                  onChange={setSearchQuery}
                />
              </div>
              <div className="flex flex-wrap gap-6 justify-center">
                {filteredFractions.map((fraction) => (
                  <div
                    key={fraction.id}
                    className="flex-shrink-0 w-full max-w-sm bg-[#0B78FD1A] border border-white/[0.04] rounded-xl p-6 hover:border-white/[0.08] hover:bg-[#0B78FD25] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                  >
                    {/* Header with name and status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white text-xl font-polysans font-medium mb-2 leading-tight">
                          {fraction.name}
                        </h3>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-polysans ${getStatusColor(
                            fraction.status
                          )}`}
                        >
                          {fraction.status}
                        </span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="space-y-4">
                      <div>
                        <div className="text-gray-400 font-polysans text-sm mb-1">
                          Creator
                        </div>
                        <div className="text-white font-polysans font-mono text-sm bg-black/20 px-3 py-1 rounded border border-white/5">
                          {fraction.creator}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-gray-400 font-polysans text-sm mb-1">
                            Recipients
                          </div>
                          <div className="text-white font-polysans font-medium">
                            {fraction.recipients} addresses
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400 font-polysans text-sm mb-1">
                            Total Split
                          </div>
                          <div className="text-white font-polysans font-medium">
                            {fraction.totalSplit}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-gray-400 font-polysans text-sm">
                            Created: {fraction.createdAt}
                          </div>
                        </div>
                        <button className="w-full px-4 py-2 rounded-lg bg-[#4E88F0] text-white font-polysans font-medium hover:bg-[#4E88F0]/90 transition-all duration-200">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredFractions.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 font-polysans text-lg mb-2">
                      No fractions found
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
