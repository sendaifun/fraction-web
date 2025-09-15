export type WalletKey = "phantom" | "backpack" | "solflare";

export const WALLET_DEEPLINKS: Record<WalletKey, {
  name: string;
  color: string;
  deeplink: string;
  ref: string;
  icon?: string;
}> = {
  phantom: {
    name: "Phantom",
    color: "from-purple-500 to-pink-500",
    deeplink: "https://phantom.app/ul/browse/",
    ref: "Fraction",
    icon: "/assets/logos/phantom.svg",
  },
  backpack: {
    name: "Backpack",
    color: "from-orange-500 to-red-500",
    deeplink: "https://backpack.app/ul/v1/browse/",
    ref: "Fraction",
    icon: "https://www.backpack.app/favicon.ico",
  },
  solflare: {
    name: "Solflare",
    color: "from-blue-500 to-cyan-500",
    deeplink: "https://solflare.com/ul/v1/browse/",
    ref: "Fraction",
    icon: "https://solflare.com/favicon.ico",
  },
};
