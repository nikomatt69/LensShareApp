import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl'
import { Publication } from '@/utils/lens/generated5'


import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false })
  }

  const format = req.query.format as string
  const videoId = req.query.id as unknown as Publication

  try {
    if (format === 'json') {
      return res
        .setHeader('Content-Type', 'application/json')
        .setHeader('Cache-Control', 's-maxage=86400')
        .json(await getPublicationMediaUrl(videoId))
    }

    if (format === 'xml') {
      return res
        .setHeader('Content-Type', 'application/xml')
        .setHeader('Cache-Control', 's-maxage=86400')
        .send(await getPublicationMediaUrl(videoId,))
    }

    return null
  } catch (error) {
    return null
  }
}

export default handler
