import { API_KEY } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { id } = req.body;
    console.log("Request Body id:", id);
    // store vide on ipfs
    try {
      const response = await fetch(`https://livepeer.studio/api/asset/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storage: {
            ipfs: true,
          },
        }),
      });
      const data = await response.json();
      // wait until ipfs cid is generated
      for (let i = 1; i < 5; i++) {
        setTimeout(async function () {
          const data = await getAsset(id);
          try {
            if (data?.storage.ipfs.cid)
              return res.status(200).json(data?.storage.ipfs.cid);
          } catch (err) {
            console.log(err);
          }
        }, i * 3000);
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function getAsset(id: string) {
  const response = await fetch(`https://livepeer.studio/api/asset/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
