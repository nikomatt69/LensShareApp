import AddressExplorerLink from './AddressExplorerLink'
import type { NewCollectNotification } from '@/utils/lens'
import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'
import  getRelativeTime  from '@/utils/functions/formatTime'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import { getRandomProfilePicture } from '@/utils/functions/getRandomProfilePicture'
import imageCdn from '@/utils/functions/imageCdn'
import { shortenAddress } from '@/utils/functions/shortenAddress'
import getAvatar from '@/lib/getAvatar'
import formatHandle from '@/utils/functions/formatHandle'

interface Props {
  notification: NewCollectNotification
}

const CollectedNotification: FC<Props> = ({ notification }) => {
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
              src={getAvatar(
                notification.wallet?.defaultProfile,
                
              )}
              alt={notification.wallet?.defaultProfile?.handle}
              draggable={false}
            />
            <div className="flex items-center space-x-0.5">
              <span>{formatHandle(notification?.wallet?.defaultProfile?.handle)}</span>
            </div>
          </Link>
        ) : (
          <AddressExplorerLink address={notification?.wallet?.address}>
            <span className="font-base inline-flex items-center space-x-1.5">
              <img
                className="h-5 w-5 rounded-full"
                src={imageCdn(
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
         Collected your
          {notification.collectedPublication.__typename === 'Comment' && (
            'Comment on'
          )}
          <Link
            href={`/post/${notification?.collectedPublication.id}`}
            className="ml-1 text-indigo-500"
          >
            {notification.collectedPublication.__typename === 'Mirror'
              ? `mirror`
              : `video`}
          </Link>
        </span>
        <div className="flex items-center text-xs text-gray-600">
          <span>{getRelativeTime(notification?.createdAt)}</span>
        </div>
      </div>
    </>
  )
}

export default CollectedNotification
