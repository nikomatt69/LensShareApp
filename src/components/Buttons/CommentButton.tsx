import React, { useRef, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';
import type { Publication } from '@/utils/lens/generatedLenster';
import { FaRegCommentAlt } from 'react-icons/fa';

//should also add authorisation so user cant like posttwice

interface Props {
  publication: Publication;
}

const CommentButton: FC<Props> = ({ publication }) => {
  const [alreadyCommented, setAlreadyLiked] = useState(false);
  const isMirror = publication.__typename === 'Mirror';
  const comments = isMirror
    ? publication.mirrorOf.stats.totalAmountOfComments
    : publication.stats.totalAmountOfComments;

  return (
    <div className="block flex gap-6">
      <Link legacyBehavior href={`/post/${publication.id}`}>
        <a className="flex cursor-pointer flex-col items-center justify-center md:mt-4">
          {alreadyCommented ? (
            <div className="flex cursor-pointer items-center rounded-full bg-gray-600/50 p-2 drop-shadow-lg dark:bg-gray-600/50 md:bg-gray-200 ">
              <FaRegCommentAlt className="h-3 w-3 text-blue-700 " />
            </div>
          ) : (
            <div className="flex cursor-pointer items-center rounded-full bg-gray-600/50 p-2 drop-shadow-lg dark:bg-gray-600/50 md:bg-gray-200">
              <FaRegCommentAlt className="h-3 w-3 " />
              <span className="pointer-events-none absolute -bottom-7 left-7 hidden w-max px-2 py-1 text-xs text-blue-700 opacity-0 shadow group-hover:opacity-100 md:block">
                {' '}
                Comment{' '}
              </span>
            </div>
          )}
          <p className="hidden text-xs font-semibold text-gray-400 lg:block">
            {comments}
          </p>
        </a>
      </Link>
    </div>
  );
};

export default CommentButton;
