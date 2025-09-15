import {
  Connection,
  Keypair,
  PublicKey,
} from "@solana/web3.js";

const solanaRpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "";

// Create Solana connection
export const connection = new Connection(
  solanaRpcUrl
);

// Generate a new keypair for botWallet
export const botWallet = Keypair.generate();

// Helper function to validate Solana public key
export const isValidPublicKey = (address: string): boolean => {
  if (!address.trim()) return true; // Allow empty addresses in input box
  try {
    new PublicKey(address.trim());
    return true;
  } catch {
    return false;
  }
};
