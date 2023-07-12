import type { FC } from 'react';
import { Button } from '../UI/Button';
import { BsMailbox } from 'react-icons/bs';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';

interface MessageProps {
  onClick: () => void;
}

const Message: FC<MessageProps> = ({ onClick }) => {
  return (
    <Button
      className="!px-3 !py-1.5 text-sm"
      icon={<ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />}
      onClick={onClick}
      aria-label="Message"
    />
  );
};

export default Message;
