import { API_KEY } from "@/constants";
import { useAppStore } from "@/store/app";
import { useCreateStream } from "@livepeer/react";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { useMemo, useState } from "react";


const currentProfile = useAppStore((state) => state.currentProfile);
const streamName = currentProfile?.handle;
  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PATCH") {
    const { id } = req.body;
    console.log("Request Body id:", id);
    // store vide on ipfs
    try {
      const response = await fetch(`https://livepeer.studio/api/stream/${stream?.playbackId}`, {
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
          const data = await CreatedStream(id);
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



async function CreatedStream(id: string) {
  const response = await fetch(`https://livepeer.studio/api/stream/${stream?.playbackId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const {
  mutate: createStream,
  data: stream,
  status: createStreamStatus,
} = useCreateStream(streamName
  ? {
      name: streamName,
      playbackPolicy: { type: "public" },
    }
    : null);
  
 console.log(stream);

