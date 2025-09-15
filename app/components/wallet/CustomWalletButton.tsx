"use client";

import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { WalletDeeplinksModal } from "./WalletDeeplinksModal";
import Image from "next/image";

interface CustomWalletButtonProps {
  buttonClassName?: string;
  showIcon?: boolean;
  variant?: "default" | "mobile";
}

export const CustomWalletButton = ({
  buttonClassName,
  showIcon,
  variant = "default",
}: CustomWalletButtonProps) => {
  const { wallets, connected } = useWallet();
  const [showDeeplinksModal, setShowDeeplinksModal] = useState(false);
  const [hasAvailableWallets, setHasAvailableWallets] = useState(true);

  // Check if any wallets are available/installed
  useEffect(() => {
    const checkWallets = () => {
      // Check if any wallets are installed/available
      const availableWallets = wallets.filter(
        (wallet) =>
          wallet.readyState === "Installed"
        // wallet.readyState === "Loadable"
      );

      setHasAvailableWallets(availableWallets.length > 0);
    };

    // Initial check
    checkWallets();

    // Check periodically in case wallets get installed
    const interval = setInterval(checkWallets, 2000);

    console.log("wallets", wallets);
    return () => clearInterval(interval);
  }, [wallets]);

  // If wallets are available or user is connected, show the normal wallet button
  if (hasAvailableWallets || connected) {
    return <UnifiedWalletButton buttonClassName={buttonClassName} />;
  }

  // If no wallets are available, show custom button with Radix Dialog trigger
  const defaultClasses =
    variant === "mobile"
      ? "!glass-button !flex !items-center !justify-center !gap-2 !px-4 !py-2 !rounded-full"
      : "glass-button px-4 py-2 rounded-full text-sm font-polysans font-medium text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2";

  const finalClassName = buttonClassName || defaultClasses;

  return (
    <>
      <Dialog.Root
        open={showDeeplinksModal}
        onOpenChange={setShowDeeplinksModal}
      >
        <Dialog.Trigger asChild>
          <button className={finalClassName} type="button">
          {showIcon && (
            <Image
              src="/assets/icons/wallet.svg"
              alt="Wallet"
                width={16}
                height={16}
              />
            )}
            Connect Wallet
          </button>
        </Dialog.Trigger>

        <WalletDeeplinksModal
          isOpen={showDeeplinksModal}
          onClose={() => setShowDeeplinksModal(false)}
        />
      </Dialog.Root>
    </>
  );
};
