import axios from 'axios';
 
import type { NextApiRequest, NextApiResponse } from 'next';
 
const apiCall = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      'https://api.huddle01.com/api/v1/create-room',
      {
        title: 'LensShare Meet',
        roomLock: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
    );
 
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
 
export default apiCall;