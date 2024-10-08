import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import {
  ComputeBudgetProgram,
  Connection,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import {
  ADMIN_ADDRESSES,
  COMMITMENT_LEVEL,
  DATAMESH_NODE_PDA_CONST,
  DATAMESH_PROGRAM_ID,
  DATAMESH_PROGRAM_INTERFACE,
  ENDPOINT,
} from '../utils/constants'
import { EconomicDataEntry, NodeAccount } from './types'
import { Den as SolanaDataMesh } from './types/den'

export class Web3Service {
  private readonly program: Program<SolanaDataMesh>
  private readonly connection = new Connection(ENDPOINT, COMMITMENT_LEVEL)

  constructor(private readonly wallet: AnchorWallet) {
    // Configure the client to use the local cluster
    const provider = new AnchorProvider(this.connection, this.wallet, {
      preflightCommitment: COMMITMENT_LEVEL,
    })

    if (!provider) {
      console.error('Anchor provider not initiated correctly!')
      throw new Error('Anchor provider not initialized correctly!')
    }

    /* create the program interface combining the idl, program Id, and provider */
    this.program = new Program(
      DATAMESH_PROGRAM_INTERFACE,
      DATAMESH_PROGRAM_ID,
      provider
    )
  }

  async submitEconomicData(economicData: EconomicDataEntry) {
    if (!this.program) return

    const [nodePublicKey] = findProgramAddressSync(
      [Buffer.from(DATAMESH_NODE_PDA_CONST), this.wallet.publicKey.toBuffer()],
      DATAMESH_PROGRAM_ID
    )

    const transactionInstructions: TransactionInstruction[] = []
    // Step 1: Create the compute budget instruction
    transactionInstructions.push(
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 500_000, // Set to the desired compute units
      })
    )

    // adding initialize instruction if account is not yet initialized
    await this.program.account.nodeAccount
      .fetch(nodePublicKey)
      .catch(async (error) => {
        console.log(error)
        transactionInstructions.push(
          await this.program.methods
            .initializeNode()
            .accounts({
              node: nodePublicKey,
              user: this.wallet.publicKey,
              systemProgram: SystemProgram.programId,
            })
            .instruction()
        )
      })

    transactionInstructions.push(
      await this.program.methods
        .submitEconomicData(
          economicData.invoiceData,
          economicData.hsnNumber,
          new BN(Number(economicData.amount)),
          Number(economicData.quantity),
          new BN(new Date(economicData.timestamp).getTime()),
          economicData.signature
        )
        .accounts({
          node: nodePublicKey,
          user: this.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .instruction()
    )

    return this.createAndSendTransaction(transactionInstructions)
  }

  async fetchNodeAccount(): Promise<NodeAccount | undefined> {
    if (!this.program) return

    try {
      const [nodePublicKey] = findProgramAddressSync(
        [
          Buffer.from(DATAMESH_NODE_PDA_CONST),
          this.wallet.publicKey.toBuffer(),
        ],
        DATAMESH_PROGRAM_ID
      )

      const nodeAccount =
        await this.program.account.nodeAccount.fetch(nodePublicKey)
      return { ...nodeAccount, nodeId: nodeAccount.nodeId.toBase58() }
    } catch (error) {
      console.log(error)
      return
    }
  }

  async fetchAllNodeAccounts(): Promise<NodeAccount[]> {
    if (!this.program) return []

    try {
      const nodeAccounts = await this.program.account.nodeAccount.all()
      console.log(nodeAccounts)
      return nodeAccounts.map(({ publicKey, account }) => ({
        ...account,
        data: account.data.map(({ amount, totalRewards, ...rest }) => ({
          ...rest,
          amount: Number(amount),
          totalRewards: Number(totalRewards),
        })),
        nodeId: publicKey.toBase58(),
        totalRewards: Number(account.totalRewards),
        activeSince: new Date(Number(account.activeSince)),
      }))
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async validateInvoiceData(nodePublicKey: string, hsnNumber: string) {
    if (!this.program) return
    const adminAddress = this.wallet.publicKey

    if (!ADMIN_ADDRESSES.includes(adminAddress.toString())) {
      throw new Error('Method not allowed!')
    }

    const instruction = await this.program.methods
      .validateInvoiceData(hsnNumber)
      .accounts({
        node: nodePublicKey,
        admin: this.wallet.publicKey,
      })
      .instruction()

    return this.createAndSendTransaction([instruction])
  }

  private async createAndSendTransaction(
    instructions: TransactionInstruction[]
  ) {
    // Fetch the latest blockhash (only once)
    const latestBlockhash = await this.connection.getLatestBlockhash()
    console.log('latestBlockhash: ', latestBlockhash)

    // Create a message (MessageV0)
    const messageV0 = new TransactionMessage({
      payerKey: this.wallet.publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions, // Transaction instructions
    }).compileToV0Message()

    // Create the versioned transaction
    const versionedTx = new VersionedTransaction(messageV0)

    // Sign the versioned transaction
    const signedVersionedTx = await this.wallet.signTransaction(versionedTx)
    console.log('Transaction sign successfully!')

    // Send the signed transaction
    const txId = await this.connection.sendRawTransaction(
      signedVersionedTx.serialize()
    )
    console.log('Raw transaction send successfully!')

    // Confirm the transaction
    await this.connection.confirmTransaction({
      signature: txId,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    })

    console.log('Transaction ID:', txId)
    return txId
  }
}
