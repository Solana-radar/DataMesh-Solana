import React, { useEffect } from "react";
import * as web3 from "@solana/web3.js";
import * as walletAdapterReact from "@solana/wallet-adapter-react";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

const WalletConnectionButton = () => {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];

  useEffect(() => {
    const handleBodyScroll = () => {
      const modalOpen = document.querySelector(".wallet-adapter-modal-wrapper");
      if (modalOpen) {
        document.body.classList.add("scroll-enabled"); // Apply custom scroll class
      } else {
        document.body.classList.remove("scroll-enabled"); // Remove scroll class when modal closes
      }
    };

    const observer = new MutationObserver(handleBodyScroll);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <walletAdapterReact.ConnectionProvider
      endpoint="https://solana-devnet.g.alchemy.com/v2/J0Wh8WUuG5Cm0yeMfDNAqv3xoERG6OQK"
    >
      <walletAdapterReact.WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton className="!bg-helius-orange !rounded-xl hover:!bg-[#161b19] transition-all duration-200" />
        </WalletModalProvider>
      </walletAdapterReact.WalletProvider>
    </walletAdapterReact.ConnectionProvider>
  );
};

export default WalletConnectionButton;
