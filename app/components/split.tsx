"use client";

import { botWallet, connection } from "@/app/lib/constants";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import {
  PublicKey,
  SystemProgram,
  VersionedTransaction,
} from "@solana/web3.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fraction } from "../lib/fractionsdk";
import Input from "./common/Input";
import SectionHeader from "./common/SectionHeader";

// LocalStorage keys
const STORAGE_KEYS = {
  RECIPIENTS: "fraction-recipients",
  PERCENTAGES: "fraction-percentages",
  FRACTION_NAME: "fraction-name",
};

// Helper functions for localStorage - for storing the form data on refresh
const saveToStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }
};

const loadFromStorage = (key: string, defaultValue: any) => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
      return defaultValue;
    }
  }
  return defaultValue;
};

// Dynamic Connector Component
const DynamicConnector = ({
  recipientCount,
  percentages,
}: {
  recipientCount: number;
  percentages: string[];
}) => {
  // Calculate height and positioning based on number of recipients
  const connectorStartX = 0; // Horizontal start position for the main connector line
  const connectorStartY = 104;
  const startX = 110;
  const startY = 32; // Start position to align with Fractions box (moved up)
  const recipientSpacing = 72; // Space between each recipient input
  const totalHeight = Math.max(
    200,
    startY + (recipientCount - 1) * recipientSpacing + 50
  );

  // Calculate the middle point for the vertical line
  const middleY = startY + ((recipientCount - 1) * recipientSpacing) / 2;

  return (
    <svg
      width="280"
      height={totalHeight}
      viewBox={`0 0 280 ${totalHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ minHeight: "300px" }}
    >
      {/* Main horizontal line from Fractions box to center */}
      <path
        d={`M${connectorStartX} ${connectorStartY}L${startX} ${middleY}`}
        stroke="#0B78FD"
        strokeWidth="1"
      />

      {/* Vertical connector line in the middle */}
      <path
        d={`M${startX} ${startY}V${
          startY + (recipientCount - 1) * recipientSpacing
        }`}
        stroke="#0B78FD"
        strokeWidth="1"
      />

      {/* Generate branches for each recipient */}
      {Array.from({ length: recipientCount }).map((_, index) => {
        const yPosition = startY + index * recipientSpacing;
        const percentage = percentages[index] || "0";
        return (
          <g key={index}>
            {/* Main horizontal branch from center */}
            <path
              d={`M${startX} ${yPosition}H180`}
              stroke="#0B78FD"
              strokeWidth="1"
            />

            {/* Percentage label with background */}
            <rect
              x="185"
              y={yPosition - 8}
              width="40"
              height="16"
              strokeWidth="1"
              rx="4"
            />
            <text
              x="205"
              y={yPosition + 3}
              fill="#0B78FD"
              fontSize="11"
              fontFamily="system-ui, -apple-system, sans-serif"
              textAnchor="middle"
              className="select-none font-medium"
            >
              {percentage ? `${percentage}%` : "0%"}
            </text>

            {/* Small connecting line to input box with gap */}
            <path
              d={`M230 ${yPosition}H280`}
              stroke="#0B78FD"
              strokeWidth="1"
            />

            {/* Connection dot at main path end */}
            <circle cx="180" cy={yPosition} r="3" fill="#0B78FD" />

            {/* Connection dot at connecting line start */}
            <circle cx="230" cy={yPosition} r="2" fill="#0B78FD" />

            {/* Small dot at input box connection */}
            <circle cx="280" cy={yPosition} r="2" fill="#0B78FD" />
          </g>
        );
      })}

      {/* Source connection dot */}
      <circle cx={connectorStartX} cy={connectorStartY} r="3" fill="#0B78FD" />

      {/* Center junction dot */}
      <circle cx={startX} cy={middleY} r="4" fill="#0B78FD" />
    </svg>
  );
};

const Split = () => {
  const { connected, wallet, publicKey } = useWallet();
  const [recipients, setRecipients] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.RECIPIENTS, ["", ""])
  );
  const [percentages, setPercentages] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.PERCENTAGES, ["", ""])
  );
  const [fractionName, setFractionName] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.FRACTION_NAME, "")
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.RECIPIENTS, recipients);
  }, [recipients]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PERCENTAGES, percentages);
  }, [percentages]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.FRACTION_NAME, fractionName);
  }, [fractionName]);

  // Function to clear all stored data
  const clearStoredData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.RECIPIENTS);
      localStorage.removeItem(STORAGE_KEYS.PERCENTAGES);
      localStorage.removeItem(STORAGE_KEYS.FRACTION_NAME);
    }
    setRecipients(["", ""]);
    setPercentages(["", ""]);
    setFractionName("");
  };

  const addRecipient = () => {
    if (recipients.length < 5) {
      const newRecipients = [...recipients, ""];
      const newPercentages = [...percentages, ""];
      setRecipients(newRecipients);
      setPercentages(newPercentages);
      console.log(
        "Added new recipient input. Total recipients:",
        recipients.length + 1
      );
    } else {
      toast.error("Maximum 5 recipients allowed");
    }
  };

  const removeRecipient = (index: number) => {
    if (recipients.length > 2) {
      const updatedRecipients = recipients.filter((_, i) => i !== index);
      const updatedPercentages = percentages.filter((_, i) => i !== index);
      setRecipients(updatedRecipients);
      setPercentages(updatedPercentages);
      console.log(`Removed recipient at index ${index}`);
    } else {
      toast.error("Minimum 2 recipients required");
    }
  };

  const updateRecipient = (index: number, value: string) => {
    const updatedRecipients = [...recipients];
    updatedRecipients[index] = value;
    setRecipients(updatedRecipients);
    console.log(`Recipient ${index + 1}:`, value);
    console.log("All recipients:", updatedRecipients);
  };

  const updatePercentage = (index: number, value: string) => {
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    const updatedPercentages = [...percentages];
    updatedPercentages[index] = numericValue;
    setPercentages(updatedPercentages);
    console.log(`Percentage ${index + 1}:`, numericValue);
    console.log("All percentages:", updatedPercentages);
  };

  const handleSplit = async () => {
    // Check if wallet is connected
    if (!connected || !publicKey) {
      toast.error("Please connect your wallet first");
      return;
    }

    // Check if fraction name is provided
    if (!fractionName.trim()) {
      toast.error("Please enter a fraction name");
      return;
    }

    // Check if all recipients have addresses
    const emptyRecipients = recipients.filter(
      (recipient, index) => !recipient.trim() && percentages[index].trim()
    );

    if (emptyRecipients.length > 0) {
      toast.error("Please fill in all recipient addresses");
      return;
    }

    // Check if all percentages are filled
    const emptyPercentages = percentages.filter(
      (percentage, index) => !percentage.trim() && recipients[index].trim()
    );

    if (emptyPercentages.length > 0) {
      toast.error("Please fill in all percentage values");
      return;
    }

    // Calculate total percentage
    const totalPercentage = percentages.reduce((sum, percentage) => {
      const num = parseFloat(percentage);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

    // Check if total equals 100%
    if (Math.abs(totalPercentage - 100) > 0.01) {
      // Allow for small floating point errors
      toast.error(
        `Total percentage must equal 100%. Current total: ${totalPercentage.toFixed(
          2
        )}%`
      );
      return;
    }

    // Show loading toast only after all validations pass
    toast.loading("Creating fraction...");

    try {
      // Convert form data to participants array
      const participants = recipients
        .map((recipient, index) => {
          if (!recipient.trim() || !percentages[index].trim()) return null;

          const percentage = parseFloat(percentages[index]);
          const shareBps = Math.round(percentage * 100); // Convert percentage to basis points

          return {
            wallet: new PublicKey(recipient.trim())?.toBase58(),
            shareBps,
          };
        })
        .filter(Boolean) as Array<{ wallet: string; shareBps: number }>;

      console.log("participants", participants);
      console.log("authority", publicKey?.toBase58());
      console.log("fractionName", fractionName);
      console.log("botWallet", botWallet.publicKey.toBase58());

      // Convert participants to have PublicKey objects and ensure exactly 5 participants
      const participantsWithPublicKeys = participants.map((p) => ({
        wallet: new PublicKey(p.wallet),
        shareBps: p.shareBps,
      }));

      // Pad with SystemProgram.programId to ensure exactly 5 participants
      while (participantsWithPublicKeys.length < 5) {
        participantsWithPublicKeys.push({
          wallet: SystemProgram.programId,
          shareBps: 0,
        });
      }

      const { tx, fractionConfigPda } = await fraction.createFraction({
        authority: publicKey!,
        participants: participantsWithPublicKeys,
        botWallet: botWallet.publicKey, // no need to change to toBase58()
      });

      console.log("Transaction created:", tx);
      console.log("Fraction Config PDA:", fractionConfigPda);

      // Set up transaction properties like in the test
      if (tx instanceof VersionedTransaction) {
        tx.message.recentBlockhash = (
          await connection.getLatestBlockhash()
        ).blockhash;
      } else {
        tx.feePayer = publicKey!;
        tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      }

      // Sign and send the transaction using wallet adapter
      if (wallet?.adapter?.sendTransaction) {
        try {
          const signature = await wallet.adapter.sendTransaction(
            tx,
            connection
          );

          // Wait for confirmation
          await connection.confirmTransaction(signature, "confirmed");

          // Success case
          toast.dismiss(); // Dismiss loading toast
          toast.success(
            "Fraction created successfully! Transaction confirmed."
          );
          console.log("Split created with recipients:", recipients);
          console.log("Split created with percentages:", percentages);
          console.log("Transaction signature:", signature);
          console.log("Bot wallet generated:", botWallet.publicKey.toString());
          console.log("Fraction Config PDA:", fractionConfigPda);

          // clear the form data
          setRecipients(["", ""]);
          setPercentages(["", ""]);
          setFractionName("");
        } catch (signError) {
          console.error("Error signing or sending transaction:", signError);
          toast.dismiss(); // Dismiss loading toast
          toast.error("Failed to sign or send transaction. Please try again.");
        }
      } else {
        toast.dismiss(); // Dismiss loading toast
        toast.error("Wallet does not support transaction signing");
      }
    } catch (error) {
      console.error("Error creating fraction:", error);
      toast.dismiss(); // Dismiss loading toast
      toast.error("Failed to create fraction. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Create your own Fractions"
          subtitle="Fraction is a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares."
        />

        <div className="flex w-full mt-16 gap-8 relative bg-black/10 border border-white/10 rounded-xl p-8">
          {/* Left Side - Fractions Source Box - Hidden on tablet and mobile */}
          <div className="relative w-1/2 hidden lg:flex flex-col items-left z-10 p-16">
            <div
              className="w-fit px-6 py-4 text-white rounded-lg shadow-lg border-2 mb-8"
              style={{ background: "#05162A", borderColor: "#0B78FD" }}
            >
              <div className="font-polysans font-semibold text-lg flex items-center gap-2">
                <Image
                  src="/assets/icons/fraction-git.svg"
                  alt="SendAI"
                  width={32}
                  height={32}
                  className="w-fit h-4 md:h-4"
                />
                Fraction
              </div>
            </div>
          </div>

          {/* Dynamic Connector - Hidden on tablet and mobile */}
          <div className="absolute top-2 left-1/3 transform -translate-x-1/4 z-10 pointer-events-none hidden lg:block w-72">
            <DynamicConnector
              recipientCount={recipients.length}
              percentages={percentages}
            />
          </div>

          {/* Right Side - Form Section - Full width on tablet and mobile */}
          <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <div className="flex flex-col gap-4">
              {recipients.map((recipient, index) => (
                <div key={index} className="flex gap-4 items-end">
                  <Input
                    className="flex-1"
                    label={index === 0 ? "Recipients" : undefined}
                    placeholder="Enter Address.."
                    value={recipient}
                    onChange={(value) => updateRecipient(index, value)}
                  />
                  <Input
                    className="w-24"
                    label={index === 0 ? "%" : undefined}
                    placeholder="0"
                    value={percentages[index]}
                    onChange={(value) => updatePercentage(index, value)}
                    type="text"
                  />
                  <button
                    onClick={() => removeRecipient(index)}
                    className={`w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 mb-2 ${
                      recipients.length <= 2
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105"
                    }`}
                    disabled={recipients.length <= 2}
                    title={
                      recipients.length <= 2
                        ? "Minimum 2 recipients required"
                        : "Remove recipient"
                    }
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={addRecipient}
                className={`w-full px-4 py-3 rounded-lg font-polysans font-medium transition-all duration-200 focus:outline-none ${
                  recipients.length >= 5
                    ? "text-gray-400 cursor-not-allowed opacity-50"
                    : "text-[#4E88F0] hover:bg-[#4E88F0]/10"
                }`}
                disabled={recipients.length >= 5}
                title={
                  recipients.length >= 5
                    ? "Maximum 5 recipients allowed"
                    : "Add a new recipient"
                }
              >
                Add Recipients {recipients.length >= 5 ? "(Max reached)" : ""}
              </button>
            </div>

            <div className="flex gap-4 mt-8">
              <Input
                className="flex-1"
                label="Fraction Name"
                placeholder="Enter fraction name.."
                value={fractionName}
                onChange={(value) => setFractionName(value)}
              />
              {/* <Input
                className="flex-1"
                label="Upgrader"
                placeholder="None (immutable)"
              /> */}
            </div>

            <div className="flex gap-4">
              {connected ? (
                <>
                  <button
                    onClick={handleSplit}
                    className="px-4 py-3 rounded-lg font-polysans font-medium transition-all duration-200 focus:outline-none bg-[#4E88F0] text-white flex-1 hover:bg-[#4E88F0]/90"
                  >
                    Split
                  </button>
                  {/* <button
                    onClick={clearStoredData}
                    className="px-4 py-3 rounded-lg font-polysans font-medium transition-all duration-200 focus:outline-none bg-gray-600 text-white hover:bg-gray-700"
                    title="Clear all form data"
                  >
                    Clear
                  </button> */}
                </>
              ) : (
                <div className="flex gap-4 w-full">
                  <div className="flex-1">
                    <UnifiedWalletButton buttonClassName="!w-full !px-4 !py-3 !rounded-lg !font-polysans !font-medium !transition-all !duration-200 !focus:outline-none !bg-[#4E88F0] !text-white hover:!bg-[#4E88F0]/90" />
                  </div>
                  {/* <button
                    onClick={clearStoredData}
                    className="px-4 py-3 rounded-lg font-polysans font-medium transition-all duration-200 focus:outline-none bg-gray-600 text-white hover:bg-gray-700"
                    title="Clear all form data"
                  >
                    Clear
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Split;
