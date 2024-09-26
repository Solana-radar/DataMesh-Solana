import Link from "next/link";
import React from "react";
import * as web3 from "@solana/web3.js";
import * as walletAdapterReact from "@solana/wallet-adapter-react";
import * as walletAdapterWallets from "@solana/wallet-adapter-wallets";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

const WalletConnectionButton = () => {
  const endpoint = web3.clusterApiUrl("devnet");
  const wallets = [new walletAdapterWallets.PhantomWalletAdapter()];
  const conneciton = useConnection();

  return (
    <div>
      <walletAdapterReact.ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/J0Wh8WUuG5Cm0yeMfDNAqv3xoERG6OQK'}>
        <walletAdapterReact.WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WalletMultiButton className="!bg-helius-orange !rounded-xl hover:!bg-[#161b19] transition-all duration-200" />
            {/* <WalletDisconnectButton /> */}
          </WalletModalProvider>
        </walletAdapterReact.WalletProvider>
      </walletAdapterReact.ConnectionProvider>
    </div>
  );
};

export default WalletConnectionButton;
