import { LENSTOK_URL } from '@/constants';
import useCreateSpace from '@/lib/useCreateSpace';

import useSendMessage from '@/utils/hooks/useSendMessage';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { FC } from 'react';

const MeetingIcon: FC = () => {
  const handleClick = async () => {
    const response = await axios.post(
      '/api/create-room',
      {
        title: 'LensShare-Spaces'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0'
        }
      }
    );

    const roomId = response.data.data;
    const sendMessage = useSendMessage(`Join here for a call: /meet/${roomId}`);
    useSendMessage(`Join here for a call: /meet/${roomId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="mb-2 mr-4 inline h-8 w-8 cursor-pointer"
      draggable="false"
    >
      <VideoCameraIcon />
    </button>
  );
};

export default MeetingIcon;
