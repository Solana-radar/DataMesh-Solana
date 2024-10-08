import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from "@solana/actions";

import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

export const GET = async (req: Request) => {
  const url = new URL(req.url)
  const payload: ActionGetResponse = {
    icon:"https://img.icons8.com/ios-filled/50/000000/donate.png",
    label: "Donate for DataMesh",
    description: "Donate so that we can get more data",
    title: "DataMesh Donation Blink",
    links: {
      actions: [
        {
          label: "Donate 0.1 SOL",
          href: `${url.href}?amount=0.1`,
          type : 'external-link'
        }
      ]
    }
  };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};

export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const body: ActionPostRequest = await req.json();
    let account; // changed
    try {
      account = new PublicKey(body.account);
      
    } catch (error) {
      throw "Invalid account provided. It's not a real Pubkey";
    }

    let amount: number = 0.1;
    if (url.searchParams.has("amount")) {
      try {
        amount = parseFloat(url.searchParams.get("amount") || "0.1") || amount;
        
      } catch (err) {
        throw "Invalid 'amount' input";
      }
    }
    console.log("amount", amount);

    const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed') //  change this to devnet before deplpoymnt

    const TO_PUBKEY = new PublicKey(
      // change this to reviver mainnet wallet address

      // devnet
      // "H71iRgaTaCft1nLZbMiiz6gWB8HaAxsbbZVRYGiWmSUT"

      // mainnet
      "H71iRgaTaCft1nLZbMiiz6gWB8HaAxsbbZVRYGiWmSUT" 
    );

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: amount * LAMPORTS_PER_SOL,
        toPubkey: TO_PUBKEY,
        programId: SystemProgram.programId,
      })
    );
    // transaction.feePayer = account;
    // transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
    const blockHeight = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockHeight.blockhash;
    transaction.lastValidBlockHeight = blockHeight.lastValidBlockHeight
    transaction.feePayer = account

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: transaction, // changed
        message: "Thank you for the donation",
        type: "transaction", // changed
      },
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (error) {
    console.log("error", error);
    let message = "An unknown error happened!";
    if (typeof error === "string") message === error;
    return Response.json(
      {
        message,
      },
      { headers: ACTIONS_CORS_HEADERS }
    );
  }
};
