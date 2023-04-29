import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("REQUEST", req.body);
    return uploadIpfs(req, res);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}
const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const secret = process.env.NEXT_PUBLIC_INFURA_SECRET;

if (!projectId || !secret) {
  throw new Error(
    "Must define INFURA_PROJECT_ID and INFURA_SECRET in the .env to run this"
  );
}

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(
      `${projectId}:${secret}`,
      "utf-8"
    ).toString("base64")}`,
  },
});

const uploadIpfs = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await client.add(JSON.stringify(req.body));

  console.log("upload result ipfs", result.path);
  return res.status(200).json({ success: true, cid: result.path });
};
