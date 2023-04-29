import type { NextApiRequest, NextApiResponse } from "next";
import { create } from "ipfs-http-client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("REQUEST FROOOM", req.body.url);
    const response = await fetch(req.body.url);
    //console.log("RESPONSE", response);
    const jsonLit = await response.json();
    // console.log("JsonLit", jsonLit);
    return res.status(200).json(jsonLit);
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}
