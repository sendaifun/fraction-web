import { Fraction } from "@sendaifun/fraction";

// Create a new fraction instance and call createFraction method
export const fraction = new Fraction(process.env.NEXT_PUBLIC_RPC_URL || "");
