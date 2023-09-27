import { NextApiRequest, NextApiResponse } from 'next';
import { object, string, boolean } from 'zod';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { Errors } from '@/lib/errors';
import { Regex } from '@/regex';
import validateLensAccount from '@/utils/validateLensAccount';
import axios from 'axios';

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body: ExtensionRequest = req.body;
    const validation = validationSchema.safeParse(body);

    if (!validation.success) {
      return res.status(400).json({ success: false, error: validation.error.issues });
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
      return res.status(401).json({ success: false, error: Errors.SignWallet });
    }

    const { payload } = jwt.decode(accessToken) as { payload: any };
    const { data } = await axios.post(`https://api.huddle01.com/api/v1/create-room`, {
      fetchPolicy:'no-cors',
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
    const createRoomResponse: CreateRoomResponse = await data.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;