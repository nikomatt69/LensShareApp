
import jwt from '@tsndr/cloudflare-worker-jwt';
import { boolean, object, string } from 'zod';

import type { WorkerRequest } from '../types';
import response from '../helpers/response';
import { Errors } from '../helpers/errors';
import { Regex } from '../helpers/regex';
import validateLensAccount from '../helpers/validateLensAccount';
import hasOwnedLensProfiles from '../helpers/hasOwnedLensProfiles';

type ExtensionRequest = {
  id: string;
  isMainnet: boolean;
  accessToken: string;
};

const validationSchema = object({
  accessToken: string().regex(Regex.accessToken),
  id: string(),
  isMainnet: boolean()
});

export default async (request: WorkerRequest) => {
  const body = await request.json();
  if (!body) {
    return response({ success: false, error: Errors.SomethingWentWrong});
  }

  

  const validation = validationSchema.safeParse(body);

  if (!validation.success) {
    return response({ success: false, error: Errors.SomethingWentWrong});
  }

  const { id, isMainnet ,accessToken} = body as ExtensionRequest;

  try {
    const isAuthenticated = await validateLensAccount(accessToken, isMainnet);
    if (!isAuthenticated) {
      return response({ success: false, error: Errors.InvalidAccesstoken });
    }

    const { payload } = jwt.decode(accessToken);
    const hasOwned = await hasOwnedLensProfiles(payload.id, id, isMainnet);
    if (!hasOwned) {
      return response({ success: false, error: Errors.SomethingWentWrong });
    }

    const livepeerResponse = await fetch('https://livepeer.studio/api/stream', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${request.env.LIVEPEER_API_KEY}`
      },
      body: JSON.stringify({
        name: `${id}-${crypto.randomUUID()}`,
        profiles: [
          { name: '720p0', fps: 0, bitrate: 3000000, width: 1280, height: 720 }
        ]
      })
    });

    const result = await livepeerResponse.json();

    return response({ success: true, result: result });
  } catch (error) {
    throw error;
  }
};
