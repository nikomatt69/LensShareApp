import {
  CustomFiltersTypes,
  useNotificationCountQuery
} from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useAppStore } from 'src/store/app';
import { useNotificationPersistStore } from '@/store/notification';
import { BellIcon } from '@heroicons/react/24/outline';

const NotificationIcon: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const getNotificationCount = useNotificationPersistStore(
    (state) => state.getNotificationCount
  );
  const setNotificationCount = useNotificationPersistStore(
    (state) => state.setNotificationCount
  );
  const [unreadNotificationCount, setUnreadNotificationCount] =
    useState<number>(0);

  const { data, loading } = useNotificationCountQuery({
    variables: {
      request: {
        profileId: currentProfile?.id,
        customFilters: [CustomFiltersTypes.Gardeners]
      }
    },
    skip: !currentProfile?.id,
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (!currentProfile || loading) {
      return;
    }

    const currentTotalCount = data?.notifications?.pageInfo?.totalCount || 0;
    const readNotificationCount = getNotificationCount(currentProfile?.id);

    if (readNotificationCount) {
      setUnreadNotificationCount(currentTotalCount - readNotificationCount);
    } else {
      setNotificationCount(currentProfile?.id, currentTotalCount);
      setUnreadNotificationCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  return (
    <Link
      href="/notifications"
      className="hover:bg-white dark:bg-gray-900/70-300/20 dark:hover:bg-gray-700 flex  min-w-[40px] items-start justify-center rounded-md p-1 "
      onClick={() => {
        setNotificationCount(
          currentProfile?.id,
          data?.notifications?.pageInfo?.totalCount || 0
        );
        setUnreadNotificationCount(0);
      }}
    >
      <BellIcon className="h-6 w-6 text-blue-500 sm:h-6 sm:w-6" />
      {unreadNotificationCount > 0 && (
        <span className="z-[6] h-2 w-2 rounded-full  bg-red-500 text-red-500" />
      )}
    </Link>
  );
};

export default NotificationIcon;
