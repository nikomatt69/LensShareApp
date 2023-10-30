import { NextApiRequest, NextApiResponse } from 'next';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { boolean, object, string } from 'zod';
import validateLensAccount from '@/utils/validateLensAccount';
import { Errors } from '@/lib/errors';
import hasOwnedLensProfiles from '@/utils/live/src/helpers/hasOwnedLensProfiles';
import { Regex } from '@/regex copia';

type ExtensionRequest = {
  id: string;
  isMainnet: boolean;
  accessToken: string;
};

const LIVEPEER_API_KEY ="30c0057f-d721-414e-8e03-7ff98f407535"


const validationSchema = object({
  accessToken: string().regex(Regex.accessToken),
  id: string(),
  isMainnet: boolean()
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false, error: Errors.SomethingWentWrong});
  }

  const validation = validationSchema.safeParse(body);

  if (!validation.success) {
    return res.status(400).json({ success: false, error: Errors.SomethingWentWrong});
  }

  const { id, isMainnet ,accessToken} = body as ExtensionRequest;

  try {
    const isAuthenticated = await validateLensAccount(accessToken, isMainnet);
    if (!isAuthenticated) {
      return res.status(401).json({ success: false, error: Errors.InvalidAccesstoken });
    }

    const { payload } = jwt.decode(accessToken);
    const hasOwned = await hasOwnedLensProfiles(payload.id, id, isMainnet);
    if (!hasOwned) {
      return res.status(400).json({ success: false, error: Errors.SomethingWentWrong });
    }

    const livepeerResponse = await fetch('https://livepeer.studio/api/stream', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${LIVEPEER_API_KEY}`
      },
      body: JSON.stringify({
        name: `${id}-${crypto.randomUUID()}`,
        profiles: [
          { name: '720p0', fps: 0, bitrate: 3000000, width: 1280, height: 720 }
        ]
      })
    });

    const result = await livepeerResponse.json();

    return res.status(200).json({ success: true, result: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: Errors.SomethingWentWrong });
  }
};