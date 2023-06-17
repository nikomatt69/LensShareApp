import { signAccessJwt } from "livepeer/crypto";
import { NextApiRequest, NextApiResponse } from "next";
import { useAccount } from "wagmi";


const PUBLIC_KEY='LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFeUJyM2EySit2N1FhQk5SRmE3QkE4ZVYzNWRVcApyZCtiQ29NUWQ3b1ZLczZ4c1QwNjhGYzBidTFjYk41VXhkcG5UNSs5a3YrQWRzUTBvbnJQMWo4ZG53PT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg=='

const PRIVATE_KEY="LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JR0hBZ0VBTUJNR0J5cUdTTTQ5QWdFR0NDcUdTTTQ5QXdFSEJHMHdhd0lCQVFRZ3dYVWF2R0pZbzRZeXowbWwKK2Y1c2VtZkxOQmZYMG5SaFFTdWFvNXJZdm0raFJBTkNBQVRJR3ZkclluNi90Qm9FMUVWcnNFRHg1WGZsMVNtdAozNXNLZ3hCM3VoVXF6ckd4UFRyd1Z6UnU3VnhzM2xURjJtZFBuNzJTLzRCMnhEU2llcy9XUHgyZgotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tCg=="


const accessControl = {
  publicKey: `${PUBLIC_KEY!}`,
  privateKey: `${PRIVATE_KEY!}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playbackId, secret } = req.body;

  if (!accessControl.privateKey || !accessControl.publicKey) {
    return res
      .status(500)
      .json({ message: "Access control keys are not configured" });
  }
  if (!playbackId || !secret) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const token = await signAccessJwt({
    privateKey: accessControl.privateKey,
    publicKey: accessControl.publicKey,
    issuer: "Polygon",
    playbackId,
    expiration: "1hr",
  });
  return res.status(200).json({ token });
}
