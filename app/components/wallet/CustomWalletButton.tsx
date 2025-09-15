"use client";

import { UnifiedWalletButton, useWallet } from "@jup-ag/wallet-adapter";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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
  const { wallets, connected, publicKey, disconnect } = useWallet();
  const [showDeeplinksModal, setShowDeeplinksModal] = useState(false);
  const [hasAvailableWallets, setHasAvailableWallets] = useState(true);
  const [copied, setCopied] = useState(false);

  // Helper function to format wallet address
  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Copy address to clipboard
  const copyAddress = async () => {
    if (publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toString());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy address:", err);
      }
    }
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

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

  // If wallet is connected, show address with dropdown
  if (connected && publicKey) {
    const connectedButtonClasses = 
      variant === "mobile"
        ? "!glass-button !flex !items-center !justify-center !gap-2 !px-4 !py-2 !rounded-full"
        : "glass-button px-4 py-2 rounded-full text-sm font-polysans font-medium text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2";
    
    const finalConnectedClassName = buttonClassName || connectedButtonClasses;
    
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={finalConnectedClassName} type="button">
            {showIcon && (
              <Image
                src="/assets/icons/wallet.svg"
                alt="Wallet"
                width={16}
                height={16}
              />
            )}
            {formatAddress(publicKey.toString())}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="glass rounded-xl p-2 min-w-[200px] z-50"
            sideOffset={8}
            align="end"
          >
            <DropdownMenu.Item
              className="glass-button flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-polysans font-medium text-white/80 hover:text-white transition-colors duration-200 cursor-pointer outline-none"
              onClick={copyAddress}
              onSelect={(e) => e.preventDefault()}
            >
              {copied ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5L6 12L2.5 8.5"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <Image
                  src="/assets/icons/copy.svg"
                  alt="Copy"
                  width={16}
                  height={16}
                />
              )}
              {copied ? "Copied!" : "Copy Address"}
            </DropdownMenu.Item>
            
            <DropdownMenu.Item
              className="glass-button flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-polysans font-medium text-white/80 hover:text-white transition-colors duration-200 cursor-pointer outline-none mt-1"
              onClick={handleDisconnect}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6M11.3333 11.3333L14 8L11.3333 4.66667M14 8H6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Disconnect
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }

  // If wallets are available but not connected, show the normal wallet button
  if (hasAvailableWallets) {
    // Apply consistent styling with icon for UnifiedWalletButton
    const unifiedButtonClasses = 
      variant === "mobile"
        ? "!glass-button !flex !items-center !justify-center !gap-2 !px-4 !py-2 !rounded-full"
        : "glass-button px-4 py-2 rounded-full text-sm font-polysans font-medium text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2";
    
    const finalUnifiedClassName = buttonClassName || unifiedButtonClasses;
    
    return (
      <UnifiedWalletButton 
        buttonClassName={finalUnifiedClassName}
        currentUserClassName="flex items-center gap-2"
        overrideContent={showIcon ? (
          <>
            <Image
              src="/assets/icons/wallet.svg"
              alt="Wallet"
              width={16}
              height={16}
            />
            Connect Wallet
          </>
        ) : undefined}
      />
    );
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
