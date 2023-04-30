import { create } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const secret = process.env.NEXT_PUBLIC_INFURA_SECRET;

if (!projectId || !secret) {
  throw new Error(
    "Must define EVER_ACCESS_KEY and EVER_ACCESS_SECRET in the .env to run this"
  );
}

const client = create({
  host: "ipfs",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(
      `${projectId}:${secret}`,
      "utf-8"
    ).toString("base64")}`,
  },
});

export const uploadIpfs = async <T>(data: T) => {
  const result = await client.add(JSON.stringify(data));

  console.log("upload result ipfs", result);
  return result;
};
