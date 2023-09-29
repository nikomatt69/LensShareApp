import type { NewCommentNotification } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import getRelativeTime from '@/utils/functions/formatTime';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';

interface Props {
  notification: NewCommentNotification;
}

const CommentedNotification: FC<Props> = ({ notification }) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Link
          href={`/u/${notification?.profile?.id}`}
          className="font-base inline-flex items-center space-x-1.5"
        >
          <img
            className="h-5 w-5 rounded-full"
            src={getAvatar(notification?.profile)}
            alt={notification?.profile?.handle}
            draggable={false}
          />
          <div className="flex items-center space-x-0.5">
            <span>{notification?.profile?.name}</span>
          </div>
        </Link>
        <span className="truncate text-gray-600 dark:text-gray-400">
          commented
          <Link
            href={`/post/${
              notification?.comment?.commentOn &&
              notification?.comment?.commentOn?.id
            }`}
            className="ml-1 text-indigo-500"
          >
            post
          </Link>
        </span>
      </div>
      <div className="line-clamp-2 flex items-center justify-between truncate break-words">
        <Link
          href={`/post/${
            notification?.comment?.commentOn &&
            notification?.comment?.commentOn?.id
          }`}
          className="line-clamp-2 truncate break-words py-1 text-gray-600 dark:text-gray-400"
        ></Link>
        <div className="flex flex-none items-center text-xs text-blue-500">
          <span>{getRelativeTime(notification?.createdAt)}</span>
        </div>
      </div>
    </>
  );
};

export default CommentedNotification;
