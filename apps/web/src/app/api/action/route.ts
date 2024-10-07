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
  const payload: ActionGetResponse = {
    icon: new URL(
      "/web/src/app/images/invoice.png",
      new URL(req.url).origin
    ).toString(),
    label: "Donate for DataMesh",
    description: "Donate so that we can get more data",
    title: "DataMesh Donation Blink",
    links: {
      actions: [
        {
          label: "0.1 SOL",
          href: "/api/action?amount=0.1",
          type : "transaction"
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

    const connection = new Connection(clusterApiUrl('mainnet-beta')) //  change this to devnet before deplpoymnt

    const TO_PIBKEY = new PublicKey(
      "H71iRgaTaCft1nLZbMiiz6gWB8HaAxsbbZVRYGiWmSUT" // change this to reviver mainnet wallet address
    );

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: account,
        lamports: amount * LAMPORTS_PER_SOL,
        toPubkey: TO_PIBKEY,
        programId: SystemProgram.programId,
      })
    );
    transaction.feePayer = account;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
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
