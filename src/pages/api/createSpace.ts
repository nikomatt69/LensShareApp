import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { object, string, boolean } from 'zod';
import { Errors } from '@/lib/errors';
import { Regex } from '@/regex';
import validateLensAccount from '@/utils/validateLensAccount';
import  jwt  from 'jsonwebtoken';

type ExtensionRequest = {
  accessToken: string;
  isMainnet: boolean;
  isTokenGated: boolean;
  conditionType?: string;
  conditionValue?: string;
  startTime?: string;
};

type CreateRoomResponse = {
  message: string;
  data: { roomId: string };
};

const validationSchema = object({
  accessToken: string().regex(Regex.accessToken),
  isMainnet: boolean(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  const body: ExtensionRequest = req.body;

  const validation = validationSchema.safeParse(body);

  if (!validation.success) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  const {
    accessToken,
    isMainnet,
    isTokenGated,
    conditionType,
    conditionValue,
    startTime,
  } = body;

  const isAuthenticated = await validateLensAccount(accessToken, isMainnet);
  if (!isAuthenticated) {
    res.status(401).json({ message: Errors.SignWallet });
    return;
  }

  const { payload } = jwt.decode(accessToken) as { payload: any };
  try {
    const response = await axios.post(`https://api.huddle01.com/api/v1/create-room`, {
      title: 'LensShare-Meet',
      hostWallets: [payload.id],
      startTime: startTime,
      ...(isTokenGated
        ? {
            chain: 'POLYGON',
            tokenType: 'LENS',
            conditionType: conditionType,
            conditionValue: conditionValue,
          }
        : {}),
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'R9CTyoxx4nupRkFs5qgsdkBYbdY6JZH8' || '',
        'Access-Control-Allow-Origin': '*',
      },
    });
    const createRoomResponse: CreateRoomResponse = response.data;

    res.status(200).json(createRoomResponse);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}