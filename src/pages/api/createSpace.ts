import { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { object, string, boolean } from 'zod';
import { Errors } from '@/lib/errors';
import { Regex } from '@/regex';
import validateLensAccount from '@/utils/validateLensAccount';

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

export function handler() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSpace = async (body: ExtensionRequest) => {
    setLoading(true);
    setError(null);

    try {
      const validation = validationSchema.safeParse(body);

      if (!validation.success) {
        throw new Error;
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
        throw new Error(Errors.SignWallet);
      }

      const { payload } = jwt.decode(accessToken) as { payload: any };
      const response = await axios.post(`https://api.huddle01.com/api/v1/create-room`, {
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
      const createRoomResponse: CreateRoomResponse = response.data;

      setLoading(false);
      return createRoomResponse;
    } catch (error) {
    
      setLoading(false);
    }
  };

  return { createSpace, loading, error };
}