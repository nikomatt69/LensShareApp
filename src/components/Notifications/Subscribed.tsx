import AddressExplorerLink from './AddressExplorerLink';
import { useAppStore } from '@/store/app';
import type { NewFollowerNotification } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import getRelativeTime from '@/utils/functions/formatTime';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import { getRandomProfilePicture } from '@/utils/functions/getRandomProfilePicture';
import imageKit from '@/lib/imageKit';
import { shortenAddress } from '@/utils/functions/shortenAddress';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';

interface Props {
  notification: NewFollowerNotification;
}

const SubscribedNotification: FC<Props> = ({ notification }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <>
      <div className="flex items-center space-x-3">
        {notification?.wallet?.defaultProfile ? (
          <Link
            href={`/u/${notification?.wallet?.defaultProfile?.id}`}
            className="font-base inline-flex items-center space-x-1.5"
          >
            <img
              className="h-5 w-5 rounded-full"
              src={getAvatar(notification.wallet.defaultProfile)}
              alt={notification.wallet?.defaultProfile?.handle}
              draggable={false}
            />
            <div className="flex items-center space-x-0.5">
              <span>
                {(notification?.wallet?.defaultProfile?.name)}
              </span>
            </div>
          </Link>
        ) : (
          <AddressExplorerLink address={notification?.wallet?.address}>
            <span className="font-base inline-flex items-center space-x-1.5">
              <img
                className="h-5 w-5 rounded-full"
                src={imageKit(
                  getRandomProfilePicture(notification.wallet.address),
                  'avatar'
                )}
                alt={notification.wallet?.address}
                draggable={false}
              />
              <div>{shortenAddress(notification?.wallet?.address)}</div>
            </span>
          </AddressExplorerLink>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-gray-600 dark:text-gray-400">
          {currentProfile?.followModule ? `joined` : `followed you`}{' '}
        </span>
        <div className="flex flex-none items-center text-xs text-blue-500">
          <span>{getRelativeTime(notification?.createdAt)}</span>
        </div>
      </div>
    </>
  );
};

export default SubscribedNotification;
