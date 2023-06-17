import { API_KEY, HUDDLE_API_KEY } from "@/constants";
import axios from "axios";
import { NextScript } from "next/document";
import { NextFetchEvent } from "next/server";

export default async function handler() {

const res = await axios.post(
  'https://api.huddle01.com/api/v1/create-room',
  {
    title: 'Huddle01-Test',
    roomLocked: true,
    topLevelAwait: true,

  },
  {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${HUDDLE_API_KEY}`,

    },
  }
)
const data = await res.data
console.log(data)
return data
}