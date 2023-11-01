import { useNotificationPersistStore } from '@/store/notification';
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { FC } from 'react';

const NotificationIcon: FC = () => {
  const {
    latestNotificationId,
    lastOpenedNotificationId,
    setLastOpenedNotificationId
  } = useNotificationPersistStore();

  return (
    <Link
      href="/notifications"
      className="dark:bg-gray-900/70-300/20 flex min-w-[40px] items-start  justify-center rounded-md p-1 hover:bg-white dark:hover:bg-gray-700 "
      onClick={() => {
        if (latestNotificationId) {
          setLastOpenedNotificationId(latestNotificationId);
        }
      }}
    >
      <BellIcon className="h-6 w-6 text-blue-500 sm:h-6 sm:w-6" />
      {lastOpenedNotificationId !== latestNotificationId ? (
        <span className="z-[6] h-2 w-2 rounded-full  bg-red-500 text-red-500" />
      ) : null}
    </Link>
  );
};

export default NotificationIcon;
