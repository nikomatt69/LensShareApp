import { NextApiRequest, NextApiResponse } from 'next';
 
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Use 308 for a permanent redirect, 307 for a temporary redirect
  return response.redirect(307, '/:path*');
}