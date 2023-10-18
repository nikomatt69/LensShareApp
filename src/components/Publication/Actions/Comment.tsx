import { Tooltip } from '@/components/UI/Tooltip';
import humanize from '@/lib/humanize';
import nFormatter from '@/lib/nFormatter';
import { Publication } from '@/utils/lens/generatedLenster';
import {
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { FC } from 'react';

interface CommentProps {
  publication: Publication;
  showCount: boolean;
}

const Comment: FC<CommentProps> = ({ publication, showCount }) => {
  const count =
    publication.__typename === 'Mirror'
      ? publication?.mirrorOf?.stats?.commentsTotal
      : publication?.stats?.commentsTotal;
  const iconClassName = showCount
    ? 'w-[20px] sm:w-[20px] '
    : 'w-[20px] sm:w-[18px]';

  return (
    <div className="flex items-center space-x-1 text-blue-500">
      <motion.button whileTap={{ scale: 0.9 }} aria-label="Comment">
        <Link href={`/post/${publication.id}`}>
          <div className="rounded-full p-1.5 hover:bg-blue-300/20">
            <Tooltip
              placement="top"
              content={count > 0 ? `${humanize(count)} Comments` : `Comment`}
              withDelay
            >
              <ChatBubbleOvalLeftEllipsisIcon className={iconClassName} />
            </Tooltip>
          </div>
        </Link>
      </motion.button>
      {count > 0 && !showCount && (
        <span className="text-[11px] sm:text-xs">{nFormatter(count)}</span>
      )}
    </div>
  );
};

export default Comment;
