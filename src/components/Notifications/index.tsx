import MetaTags from '@/components/UI/MetaTags';
import Loader from '@/components/UI/Loader';
import { Tab } from '@headlessui/react';
import { useAppStore } from '@/store/app';
import usePersistStore from '@/store/persist';
import clsx from 'clsx';
import type { Notification } from '@/utils/lens/generatedLenster';
import {
  NotificationTypes,
  useNotificationsQuery
} from '@/utils/lens/generatedLenster';
import React, { useState } from 'react';
import { useInView } from 'react-cool-inview';
import { LENS_CUSTOM_FILTERS, APP_ID, APP_NAME } from '@/constants';
import { CustomNotificationsFilterEnum } from '@/utils/custom-types';

import CollectedNotification from './Collected';
import CommentedNotification from './Commented';
import NotificationsFilter from './Filter';
import MentionedNotification from './Mentioned';
import MirroredNotification from './Mirrored';
import ReactedNotification from './Reacted';
import SubscribedNotification from './Subscribed';
import {
  BellAlertIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon,
  FolderPlusIcon,
  HeartIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { GoCommentDiscussion } from 'react-icons/go';
import { BiCollection } from 'react-icons/bi';
import { MdOutlineNotificationImportant } from 'react-icons/md';
import { EmptyState } from '../UI/EmptyState';
import { Card } from '../UI/Card';
import Navbar from '../Navbar';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import NavbarDetails from '../NavbarDetails';
import BottomNav from '../Navs/BottomNav';

const initialFilters = {
  all: false,
  mentions: false,
  subscriptions: false,
  likes: false,
  comments: false,
  collects: false
};

const Notifications = () => {
  const [activeFilter, setActiveFilter] = useState(initialFilters);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setHasNewNotification = useAppStore(
    (state) => state.setHasNewNotification
  );
  const selectedNotificationsFilter = usePersistStore(
    (state) => state.selectedNotificationsFilter
  );

  const getNotificationFilters = () => {
    if (activeFilter.mentions) {
      return [NotificationTypes.MentionPost, NotificationTypes.MentionComment];
    }
    if (activeFilter.subscriptions) {
      return [NotificationTypes.Followed];
    }
    if (activeFilter.likes) {
      return [
        NotificationTypes.ReactionPost,
        NotificationTypes.ReactionComment
      ];
    }
    if (activeFilter.comments) {
      return [NotificationTypes.CommentedPost];
    }
    if (activeFilter.collects) {
      return [
        NotificationTypes.CollectedPost,
        NotificationTypes.CollectedComment
      ];
    }
    return [
      NotificationTypes.CollectedPost,
      NotificationTypes.CommentedPost,
      NotificationTypes.Followed,
      NotificationTypes.MentionComment,
      NotificationTypes.MentionPost,
      NotificationTypes.ReactionComment,
      NotificationTypes.ReactionPost
    ];
  };

  const request = {
    limit: 30,
    sources: activeFilter ? undefined : [APP_ID],
    customFilters: LENS_CUSTOM_FILTERS,
    profileId: currentProfile?.id,
    highSignalFilter:
      selectedNotificationsFilter === CustomNotificationsFilterEnum.HIGH_SIGNAL,
    notificationTypes: getNotificationFilters()
  };

  const { data, loading, fetchMore } = useNotificationsQuery({
    variables: {
      request
    },
    onCompleted: () => setHasNewNotification(false)
  });

  const notifications = data?.notifications?.items as Notification[];
  const pageInfo = data?.notifications?.pageInfo;

  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            cursor: pageInfo?.next,
            ...request
          }
        }
      });
    }
  });

  return (
    <div className="mx-auto md:container truncate break-words md:max-w-3xl md:p-0">
      <MetaTags title={`Notifications • ${APP_NAME}`} />
      <Navbar/>

      <Card className="p-2">
        <Tab.Group as="div" className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <Tab.List className="no-scrollbar flex w-full space-x-4 overflow-x-auto pr-4">
              <Tab
                onClick={() => {
                  setActiveFilter({ ...initialFilters });
                }}
                className={({ selected }) =>
                  clsx(
                    'flex items-center space-x-2 border-b-2 px-1 py-2 text-sm focus:outline-none',
                    selected
                      ? 'border-indigo-900 opacity-100'
                      : 'border-transparent opacity-50'
                  )
                }
              >
                <BellIcon className="h-3.5 w-3.5" />
                <span className="whitespace-nowrap">All Notifications</span>
              </Tab>
              <Tab
                onClick={() => {
                  setActiveFilter({ ...initialFilters, subscriptions: true });
                }}
                className={({ selected }) =>
                  clsx(
                    'flex items-center space-x-2 border-b-2 px-1 py-2 text-sm focus:outline-none',
                    selected
                      ? 'border-indigo-900 opacity-100'
                      : 'border-transparent opacity-50'
                  )
                }
              >
                <UserPlusIcon className="h-3.5 w-3.5" />
              </Tab>
              <Tab
                onClick={() => {
                  setActiveFilter({ ...initialFilters, likes: true });
                }}
                className={({ selected }) =>
                  clsx(
                    'flex items-center space-x-2 whitespace-nowrap border-b-2 py-2 text-sm focus:outline-none',
                    selected
                      ? 'border-indigo-900 opacity-100'
                      : 'border-transparent opacity-50'
                  )
                }
              >
                <HeartIcon className="h-3.5 w-3.5" />
              </Tab>
              <Tab
                onClick={() => {
                  setActiveFilter({ ...initialFilters, comments: true });
                }}
                className={({ selected }) =>
                  clsx(
                    'flex items-center space-x-2 border-b-2 px-1 py-2 text-sm focus:outline-none',
                    selected
                      ? 'border-indigo-900 opacity-100'
                      : 'border-transparent opacity-50'
                  )
                }
              >
                <ChatBubbleLeftEllipsisIcon className="h-3.5 w-3.5" />
              </Tab>
              <Tab
                onClick={() => {
                  setActiveFilter({ ...initialFilters, mentions: true });
                }}
                className={({ selected }) =>
                  clsx(
                    'flex items-center space-x-2 border-b-2 px-1 py-2 text-sm focus:outline-none',
                    selected
                      ? 'border-indigo-900 opacity-100'
                      : 'border-transparent opacity-50'
                  )
                }
              >
                <MdOutlineNotificationImportant className="h-3.5 w-3.5" />
              </Tab>
              <Tab
                onClick={() => {
                  setActiveFilter({ ...initialFilters, collects: true });
                }}
                className={({ selected }) =>
                  clsx(
                    'flex items-center space-x-2 border-b-2 px-1 py-2 text-sm focus:outline-none',
                    selected
                      ? 'border-indigo-900 opacity-100'
                      : 'border-transparent opacity-50'
                  )
                }
              >
                <FolderPlusIcon className="h-3.5 w-3.5" />
              </Tab>
            </Tab.List>
            <NotificationsFilter />
          </div>
          <Tab.Panels>
            {loading && notifications?.length === 0 && null}
            {notifications?.map((notification: Notification, index: number) => (
              <div
                className="pb-3"
                key={`${notification.notificationId}_${index}`}
              >
                {notification?.__typename === 'NewFollowerNotification' && (
                  <SubscribedNotification notification={notification} />
                )}
                {notification?.__typename === 'NewCommentNotification' && (
                  <CommentedNotification notification={notification} />
                )}
                {notification?.__typename === 'NewMentionNotification' && (
                  <MentionedNotification notification={notification} />
                )}
                {notification?.__typename === 'NewMirrorNotification' && (
                  <MirroredNotification notification={notification} />
                )}
                {notification?.__typename === 'NewCollectNotification' && (
                  <CollectedNotification notification={notification} />
                )}
                {notification?.__typename === 'NewReactionNotification' && (
                  <ReactedNotification notification={notification} />
                )}
              </div>
            ))}
            {pageInfo?.next && (
              <span ref={observe} className="flex  justify-center p-10">
                <Loader />
              </span>
            )}
          </Tab.Panels>
        </Tab.Group>
      </Card>
      <div className="m-auto block h-[100vh] overflow-hidden border-0 lg:w-[1100px] xl:w-[1200px]">
        <BottomNav />
      </div>
    </div>
  );
};

export default Notifications;
