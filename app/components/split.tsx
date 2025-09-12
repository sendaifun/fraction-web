"use client";

import { useState } from "react";
import { toast } from "sonner";
import SectionHeader from "./common/SectionHeader";
import Input from "./common/Input";

const Split = () => {
  const [recipients, setRecipients] = useState<string[]>(["", ""]);
  const [percentages, setPercentages] = useState<string[]>(["", ""]);

  const addRecipient = () => {
    if (recipients.length < 5) {
      setRecipients((prev) => [...prev, ""]);
      setPercentages((prev) => [...prev, ""]);
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
    const numericValue = value.replace(/[^0-9.]/g, '');
    const updatedPercentages = [...percentages];
    updatedPercentages[index] = numericValue;
    setPercentages(updatedPercentages);
    console.log(`Percentage ${index + 1}:`, numericValue);
    console.log("All percentages:", updatedPercentages);
  };

  const handleSplit = () => {
    // Check if all recipients have addresses
    const emptyRecipients = recipients.filter((recipient, index) => 
      !recipient.trim() && percentages[index].trim()
    );
    
    if (emptyRecipients.length > 0) {
      toast.error("Please fill in all recipient addresses");
      return;
    }

    // Check if all percentages are filled
    const emptyPercentages = percentages.filter((percentage, index) => 
      !percentage.trim() && recipients[index].trim()
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
    if (Math.abs(totalPercentage - 100) > 0.01) { // Allow for small floating point errors
      toast.error(`Total percentage must equal 100%. Current total: ${totalPercentage.toFixed(2)}%`);
      return;
    }

    // Success case
    toast.success("Fraction created successfully! All percentages sum to 100%.");
    console.log("Split created with recipients:", recipients);
    console.log("Split created with percentages:", percentages);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Create your own Fractions"
          subtitle="Fraction is a Solana program that splits all incoming SPL tokens (eg. USDC) among the recipients according to the allocated % shares."
        />

        <div className="flex flex-col gap-4 w-full mt-16">
          <div className="flex flex-col max-w-4xl mx-auto gap-4">
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
                  className={`w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200 mb-2 ${recipients.length <= 2 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                  disabled={recipients.length <= 2}
                  title={recipients.length <= 2 ? "Minimum 2 recipients required" : "Remove recipient"}
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
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            

            <button
              onClick={addRecipient}
              className={`w-full px-4 py-3 rounded-lg font-polysans font-medium transition-all duration-200 focus:outline-none ${
                recipients.length >= 5 
                  ? 'text-gray-400 cursor-not-allowed opacity-50' 
                  : 'text-[#4E88F0] hover:bg-[#4E88F0]/10'
              }`}
              disabled={recipients.length >= 5}
              title={recipients.length >= 5 ? "Maximum 5 recipients allowed" : "Add a new recipient"}
            >
              Add Recipients {recipients.length >= 5 ? '(Max reached)' : ''}
            </button>
          </div>

        <div className="flex max-w-4xl mx-auto gap-4 mt-8">
          <Input
            className="flex-1"
            label="Fraction Name"
            placeholder="Enter Address.."
          />
          <Input
            className="flex-1"
            label="Upgrader"
            placeholder="None (immutable)"
          />
        </div>

{/* todo : rm mx-auto */}
        <div className="flex max-w-3xl gap-4 mx-auto">
          <button 
            onClick={handleSplit}
            className="px-4 py-3 rounded-lg font-polysans font-medium transition-all duration-200 focus:outline-none bg-[#4E88F0] text-white w-full hover:bg-[#4E88F0]/90"
          >
            Split
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Split;
