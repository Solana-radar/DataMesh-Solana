import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';


const WalletConnection: FC = () => {
    const { wallet, connect, connected, publicKey } = useWallet();
    const [program, setProgram] = useState<Program | null>(null);

    useEffect(() => {
        const initProgram = async () => {
            if (wallet && publicKey) {
                const network = "https://api.devnet.solana.com";
                const connection = new Connection(network, "processed");
                const provider = new AnchorProvider(
                    connection,
                    wallet as unknown as import("@project-serum/anchor").Wallet,
                    { preflightCommitment: "processed" }
                );
            }
        };        initProgram();
    }, [wallet, publicKey]);

    const handleInteraction = async () => {
        if (program) {
            try {
                // Example interaction: calling a method from your program
                // const tx = await program.methods.yourMethodName().accounts({...}).rpc();
                // console.log("Transaction signature", tx);
            } catch (error) {
                console.error("Error interacting with the program:", error);
            }
        }
    };

    return (
        <div>
            <WalletMultiButton />
            {/* {connected && (
                <button onClick={handleInteraction}>
                    Interact with Program
                </button>
            )} */}
        </div>
    );
};

export default WalletConnection;