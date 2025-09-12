"use client";

import { botWallet, connection } from "@/app/lib/constants";
import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import { Fraction } from "@sendaifun/fraction";
import {
  PublicKey,
  SystemProgram,
  VersionedTransaction,
} from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Connection,
  Edge,
  Handle,
  Node,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { toast } from "sonner";
import Input from "./common/Input";
import SectionHeader from "./common/SectionHeader";

// Create a new fraction instance and call createFraction method
const fraction = new Fraction(
  process.env.NEXT_PUBLIC_RPC_URL || ""
);

// LocalStorage keys
const STORAGE_KEYS = {
  RECIPIENTS: 'fraction-recipients',
  PERCENTAGES: 'fraction-percentages',
  FRACTION_NAME: 'fraction-name'
};

// Helper functions for localStorage
const saveToStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }
};

const loadFromStorage = (key: string, defaultValue: any) => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
};


// Custom node for the Fractions source
const FractionsNode = ({ data }: { data: any }) => {
  return (
    <div
      className="px-6 py-4 text-white rounded-lg shadow-lg border-2"
      style={{ background: "#05162A", borderColor: "#0B78FD" }}
    >
      <div className="font-polysans font-semibold text-lg">Fractions</div>
      <div className="text-sm opacity-90 mt-1">Token Distribution</div>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#fff", border: "2px 1px 1px 1px solid #0B78FD" }}
      />
    </div>
  );
};

// Custom node for recipients
const RecipientNode = ({ data }: { data: any }) => {
  return (
    <div className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#4E88F0", border: "2px solid #4E88F0" }}
      />
      <div className="font-polysans font-medium text-gray-800">
        Recipient {data.index + 1}
      </div>
      <div className="text-sm text-gray-600 mt-1">{data.percentage}% share</div>
    </div>
  );
};

const nodeTypes = {
  fractions: FractionsNode,
  recipient: RecipientNode,
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

  // React Flow state - only Fractions node, connections will be drawn to form inputs
  const initialNodes: Node[] = [
    {
      id: "fractions",
      type: "fractions",
      position: { x: 200, y: 150 },
      data: {},
    },
  ];

  const initialEdges: Edge[] = [];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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

  // Update React Flow elements when component mounts with loaded data
  useEffect(() => {
    updateFlowElements(recipients, percentages);
  }, [recipients, percentages, ]);

  // Function to clear all stored data
  const clearStoredData = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.RECIPIENTS);
      localStorage.removeItem(STORAGE_KEYS.PERCENTAGES);
      localStorage.removeItem(STORAGE_KEYS.FRACTION_NAME);
    }
    setRecipients(["", ""]);
    setPercentages(["", ""]);
    setFractionName("");
  };

  // Function to update React Flow - only keep the Fractions node
  const updateFlowElements = useCallback(
    (newRecipients: string[], newPercentages: string[]) => {
      const newNodes: Node[] = [
        {
          id: "fractions",
          type: "fractions",
          position: { x: 200, y: 150 },
          data: {},
        },
      ];

      // No edges needed since we're connecting to actual form inputs
      const newEdges: Edge[] = [];

      setNodes(newNodes);
      setEdges(newEdges);
    },
    [setNodes, setEdges]
  );

  const addRecipient = () => {
    if (recipients.length < 5) {
      const newRecipients = [...recipients, ""];
      const newPercentages = [...percentages, ""];
      setRecipients(newRecipients);
      setPercentages(newPercentages);
      updateFlowElements(newRecipients, newPercentages);
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
      updateFlowElements(updatedRecipients, updatedPercentages);
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
    updateFlowElements(recipients, updatedPercentages);
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
          toast.success(
            "Fraction created successfully! Transaction confirmed."
          );
          console.log("Split created with recipients:", recipients);
          console.log("Split created with percentages:", percentages);
          console.log("Transaction signature:", signature);
          console.log("Bot wallet generated:", botWallet.publicKey.toString());
          console.log("Fraction Config PDA:", fractionConfigPda);
        } catch (signError) {
          console.error("Error signing or sending transaction:", signError);
          toast.error("Failed to sign or send transaction. Please try again.");
        }
      } else {
        toast.error("Wallet does not support transaction signing");
      }
    } catch (error) {
      console.error("Error creating fraction:", error);
      toast.error("Failed to create fraction. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Create your own Fractions"
          subtitle="Fraction is a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares."
        />

        <div className="flex w-full mt-16 gap-8 relative bg-black/10 border border-white/10 rounded-lg p-4">
          {/* Left Side - React Flow Visualization - Hidden on tablet and mobile */}
          <div className="relative w-1/2 h-96 hidden lg:block">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              fitView={false}
              style={{ background: "transparent" }}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
            />
          </div>

          {/* SVG Connections Bridge - Hidden on tablet and mobile */}
          <svg
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none hidden lg:block"
            width="200"
            height="400"
            style={{ left: "calc(50% - 100px)" }}
          >
            {recipients.map((_, index) => {
              // Bridge coordinates from left section to right section
              const startX = 20; // Start from left edge of SVG (connects to Fractions node)
              const startY = 200; // Center height for Fractions node
              const endX = 180; // End at right edge of SVG (connects to form inputs)
              const endY = 50 + index * 85; // Position for each input field

              return (
                <g key={index}>
                  <path
                    d={`M ${startX} ${startY} Q 100 ${
                      (startY + endY) / 2
                    } ${endX} ${endY}`}
                    stroke="#0B78FD"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.7"
                  />
                  {/* Connection point at the end */}
                  <circle
                    cx={endX}
                    cy={endY}
                    r="4"
                    fill="#0B78FD"
                    opacity="0.8"
                  />
                </g>
              );
            })}
          </svg>

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
