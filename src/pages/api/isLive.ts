import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

type IsLiveResponse = {
  roomId: string;
};

const isLive = async (
  req: NextApiRequest,
  res: NextApiResponse,
  spaceId: string
) => {
  try {
    const huddleResponse = await axios(
      `http://api.huddle01.com/api/v1/live-meeting?roomId=${spaceId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0' || '',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );

    const isLiveResponse: IsLiveResponse = huddleResponse.data;

    res.status(200).json({
      success: true,
      isLive: isLiveResponse.roomId === spaceId
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export default isLive;
