import type { NextApiResponse, NextApiRequest } from 'next';
 
export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.setHeader('Vercel-CDN-Cache-Control', 'max-age=3600');
  response.setHeader('CDN-Cache-Control', 'max-age=60');
  response.setHeader('Cache-Control', 'max-age=10');
 
  return response.status(200).json({ name: 'John Doe' });
}