import { HUDDLE_API_KEY } from '@/constants';
import axios from 'axios';

import type { NextApiRequest, NextApiResponse } from 'next';

const createRoom= async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.post(
      'https://api.huddle01.com/api/v1/create-room',
      {
        title: 'Lenshare-Spaces',
      
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0',
        },
      }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default createRoom;
