"use client";

import { UnifiedWalletProvider } from "@jup-ag/wallet-adapter";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnifiedWalletProvider
      wallets={[]}
      config={{
        autoConnect: true,
        env: "mainnet-beta",
        metadata: {
          name: "Fraction",
          description: "Fraction by SendAI",
          url: "https://fraction.sendai.fun",
          iconUrls: ["https://jup.ag/favicon.ico"],
        },
        notificationCallback: {
          onConnect: () => {},
          onConnecting: () => {},
          onDisconnect: () => {},
          onNotInstalled: () => {},
        },
        walletlistExplanation: {
          href: "https://station.jup.ag/docs/additional-topics/wallet-list",
        },
        theme: "dark",
        lang: "en",
      }}
    >
      {children}
    </UnifiedWalletProvider>
  );
};
