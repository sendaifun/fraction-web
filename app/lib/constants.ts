import { Connection as SolanaConnection, Keypair } from "@solana/web3.js";

export const BG_BLACK = "#030405";
export const BG_BLUE = "#1355A6"; //gradient blue

export const STROKE_GRAY_1 = "#828282";
export const STROKE_GRAY_2 = "#757575";

export const CTA_BLUE_1 = "#0B78FD";
export const CTA_BLUE_2 = "#4E88F0";

// Create Solana connection
export const connection = new SolanaConnection(
  process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com"
);

// Generate a new keypair for botWallet
export const botWallet = Keypair.generate();
