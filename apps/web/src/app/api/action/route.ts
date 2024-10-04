import {
  ActionGetResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    icon: new URL("/apps/web/src/app/images/invoice.png", new URL(req.url).origin).toString(),
    label: "Donate for DataMesh",
    description:
      "Donate so that we can get more data",
    title: "DataMesh Donation Blink",
  };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
};
export const OPTIONS = GET;
