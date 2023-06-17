
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import React from 'react'

import ChannelPicture from './ChannelPicture'
import { RiAlarmWarningFill } from 'react-icons/ri'
import InterestsOutline from '../UI/Icons/InterestsOutline'
import KeyOutline from '../UI/Icons/KeyOutline'
import SubscribeOutline from '../UI/Icons/SubscribeOutline'
import UserOutline from '../UI/Icons/UserOutline'
import { Profile } from '@/types/lens'

type Props = {
  channel: Profile
}

export const SETTINGS_MEMBERSHIP = '/settings/membership'
export const SETTINGS_INTERESTS = '/settings/interests'
export const SETTINGS_PERMISSIONS = '/settings/permissions'
export const SETTINGS_DANGER_ZONE = '/settings/danger'
export const SETTINGS = '/settings'

const SideNav: FC<Props> = ({ channel }) => {
  const router = useRouter()

  const isActivePath = (path: string) => router.pathname === path

  return (
    <div className="rounded-lg pt-2">
      <div className="flex flex-col items-center space-y-2 py-4">
        <ChannelPicture channel={channel} />
      </div>
      <div className="py-1 ml-[-4px]  border-b dark:border-b-slate-800 mb-3 text-sm">
        <Link
          href={SETTINGS}
          className={clsx(
            'flex items-center py-2 px-1 focus:outline-none my-2 dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-lg',
            { 'dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg': isActivePath(SETTINGS) }
          )}
        >
          <UserOutline className="h-4 w-4 mr-4" /> <span>Basic Info</span>
        </Link>
        <Link
          href={SETTINGS_MEMBERSHIP}
          className={clsx(
            'flex items-center py-2 px-1 focus:outline-none my-2 dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-lg',
            {
              'dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg': isActivePath(SETTINGS_MEMBERSHIP)
            }
          )}
        >
          <SubscribeOutline className="h-4 w-4 mr-4" /> <span>Membership</span>
        </Link>
        <Link
          href={SETTINGS_PERMISSIONS}
          className={clsx(
            'flex items-center py-2 px-1  focus:outline-none my-2 dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-lg',
            {
              'dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg': isActivePath(SETTINGS_PERMISSIONS)
            }
          )}
        >
          <KeyOutline className="h-4 w-4 mr-4" /> <span>Permissions</span>
        </Link>
        <Link
          href={SETTINGS_INTERESTS}
          className={clsx(
            'flex items-center py-2 px-1  focus:outline-none my-2 dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-lg',
            {
              'dark:hover:bg-gray-800 hover:bg-gray-100 rounded-lg': isActivePath(SETTINGS_INTERESTS)
            }
          )}
        >
          <InterestsOutline className="h-4 w-4 mr-4" /> <span>Interests</span>
        </Link>
        <Link
          href={SETTINGS_DANGER_ZONE}
          className={clsx(
            'flex items-center py-2 px-1  focus:outline-none my-2 dark:hover:bg-gray-800 hover:bg-gray-100 hover:rounded-lg',
            {
              'bg-red-100 dark:bg-red-900/60 rounded-lg':
                isActivePath(SETTINGS_DANGER_ZONE)
            }
          )}
        >
          <RiAlarmWarningFill className="h-4 w-4 mr-4" /> <span>Danger Zone</span>
        </Link>
      </div>
    </div>
  )
}

export default SideNav
