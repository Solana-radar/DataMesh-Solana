"use client";
import "./globals.css";
import "@repo/ui/styles.css";
import { ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { NavbarDemo } from "./components/navbar";
import Footer from "./components/Footer";
// Import wallet adapter CSS
import "@solana/wallet-adapter-react-ui/styles.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  return (
    <html lang="en">
      <body>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <header>
                <NavbarDemo />
              </header>

              {children}
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
