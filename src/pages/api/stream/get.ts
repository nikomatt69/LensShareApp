import { connectToDatabase } from "@/mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  let stream = await db.collection("streams").findOne({
    playbackId: id,
  });

  res.status(200).json(stream);
}
