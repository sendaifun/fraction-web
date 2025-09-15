"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "motion/react";
import Image from "next/image";
import { WALLET_DEEPLINKS, WalletKey } from "../../lib/wallet-deeplinks";

interface WalletDeeplinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletDeeplinksModal = ({ isOpen, onClose }: WalletDeeplinksModalProps) => {
  const handleWalletClick = (walletKey: WalletKey) => {
    const wallet = WALLET_DEEPLINKS[walletKey];
    const currentUrl = window.location.href;
    const deeplink = `${wallet.deeplink}${currentUrl}?ref=${wallet.ref}`;
    
    // Try to open the deeplink
    window.open(deeplink, "_blank");
    
    // Close the modal after clicking
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </Dialog.Overlay>
        
        <Dialog.Content asChild>
          <motion.div
            className="fixed left-1/2 top-1/2 z-[61] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="glass rounded-2xl p-6">
              {/* Close Button */}
              <Dialog.Close asChild>
                <button
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-white/60 hover:text-white"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </Dialog.Close>

              {/* Header */}
              <div className="text-center mb-6">
                <Dialog.Title asChild>
                  <h2 className="text-xl font-polysans font-semibold text-white mb-2">
                    Connect Wallet
                  </h2>
                </Dialog.Title>
                <Dialog.Description asChild>
                  <p className="text-sm text-white/60">
                    No wallets detected. Choose a Solana wallet to continue.
                  </p>
                </Dialog.Description>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3">
                {(Object.keys(WALLET_DEEPLINKS) as WalletKey[]).map((walletKey) => {
                  const wallet = WALLET_DEEPLINKS[walletKey];
                  return (
                    <motion.button
                      key={walletKey}
                      onClick={() => handleWalletClick(walletKey)}
                      className="w-full p-4 rounded-xl glass-button hover:bg-white/10 transition-all duration-200 flex items-center gap-4 group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Wallet Icon */}
                      <div className={`w-12 h-8 rounded-xl  flex-shrink-0`}>
                        <div className="w-full h-full rounded-[10px]  flex items-center justify-center">
                          {wallet.icon ? (
                            <Image
                              src={wallet.icon}
                              alt={wallet.name}
                              width={24}
                              height={24}
                              className="w-6 h-6"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white font-semibold text-sm">
                              {wallet.name[0]}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Wallet Info */}
                      <div className="flex-1 text-left">
                        <h3 className="font-polysans font-medium text-white group-hover:text-white/90">
                          {wallet.name}
                        </h3>
                      </div>

                      {/* Arrow Icon */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-white/40 group-hover:text-white/60 transition-colors duration-200"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-white/40 text-center">
                  By connecting a wallet, you agree to the Terms of Service
                </p>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
