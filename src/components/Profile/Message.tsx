import type { FC } from 'react';
import { Button } from '../UI/Button';
import { BsMailbox } from 'react-icons/bs';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

interface MessageProps {
  onClick: () => void;
}

const Message: FC<MessageProps> = ({ onClick }) => {
  return (
    <button
      className="!px-3 !py-1.5 text-sm"
   
      onClick={onClick}
      aria-label="Message"
    >
      <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
    </button>
  );
};

export default Message;
