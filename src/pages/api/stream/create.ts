import { connectToDatabase } from "@/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { db } = await connectToDatabase();

  let stream = await db.collection("streams").insertOne(req.body);

  res.status(200).json(stream);
}
