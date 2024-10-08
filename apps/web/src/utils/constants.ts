import idl from "../web3/idl/den.json"
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

/* Constants for RPC Connection the Solana Blockchain */
export const COMMITMENT_LEVEL = "processed";
export const ENDPOINT =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl("devnet");

/* Constants for the Deployed "Hello World" Program */
export const DATAMESH_PROGRAM_ID = new PublicKey(process.env.PROGRAM_ID || idl.metadata.address);
// export const DATAMESH_PROGRAM_ID = new PublicKey("D8tQBi2nELbNkAzkZz5FQBN28tAQFNpWL73HakbC4qCT");
export const DATAMESH_PROGRAM_INTERFACE = JSON.parse(JSON.stringify(idl));
// export const DATAMESH_PROGRAM_INTERFACE = JSON.parse(JSON.stringify({}));

export const DATAMESH_NODE_PDA_CONST = "DATAMESH_NODE"

export const ADMIN_ADDRESSES = [
  'FH5uTSXBJF4ZdF6UPPB5hzatuftB7mcyv6zsBWGz488p',
  'HfnUVwxtz83sF812JcVDACiJootAkuc2wyXvHiRpGTpi',
]