import VideoCard from '@/components/HomePage/VideoCard';
import Loader from '@/components/UI/Loader';
import { EmptyState } from '@/components/UI/EmptyState';
import { useAppStore } from '@/store/app';
import type { FeedItem, Publication } from '@/utils/lens/generatedLenster';
import {
  FeedEventItemType,
  Profile,
  PublicationMainFocus,
  PublicationSortCriteria
} from '@/utils/lens/generatedLenster';
import React, { useCallback, useRef, useState } from 'react';
import { useInView } from 'react-cool-inview';
import Custom400 from '@/pages';
import Loading from '../Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card } from '../UI/Card';
import {
  LENSTUBE_BYTES_APP_ID,
  APP_ID,
  LENSTOK_APP_ID,
  LENSTUBE_APP_ID,
  SCROLL_ROOT_MARGIN,
  LENSTER_APP_ID,
  ORB_APP_ID,
  APP_NAME
} from '@/constants';
import Video from '../HomePage/Video';
import Bytes from '../Bytes';
import ByteVideo from '../Bytes/ByteVideo';
import router from 'next/router';
import { useFeedQuery } from '@/utils/lens/generated';
import Head from 'next/head';
import MetaTags from '../UI/MetaTags';
import { useTheme } from 'next-themes';
import { profile } from 'console';
import ProfileVideos from '../ProfilePage/ProfileVideos';

const FeedStory = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { resolvedTheme } = useTheme();
  const [currentViewingId, setCurrentViewingId] = useState('');

  const bytesContainer = useRef<HTMLDivElement>(null);
  const [byte, setByte] = useState<Publication>();
  const [following, setFollowing] = useState(false);
  const [show, setShow] = useState(false);

  const request = {
    sortCriteria: PublicationSortCriteria.Latest,
    feedEventItemTypes: [FeedEventItemType.Post],
    profileId: currentProfile,
    limit: 5,

    sources: [
      APP_ID,
      LENSTUBE_BYTES_APP_ID,
      LENSTUBE_APP_ID,
      LENSTOK_APP_ID,
      LENSTER_APP_ID,
      ORB_APP_ID
    ],
    metadata: {
      mainContentFocus: [PublicationMainFocus.Video]
    }
  };

  const { data, loading, error, fetchMore } = useFeedQuery({
    variables: {
      request
    },
    skip: !currentProfile?.id
  });

  const bytes = data?.feed?.items.map((item) => item.root) as Publication[];
  const pageInfo = data?.feed?.pageInfo;

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

  const openDetail = (byte: Publication) => {
    const nextUrl = `/${byte.id}`;
    history.pushState({ path: nextUrl }, '', nextUrl);
    setByte(byte);
    setShow(!show);
  };

  const closeDialog = () => {
    const nextUrl = `/`;
    history.pushState({ path: nextUrl }, '', nextUrl);
    setShow(false);
  };

  if (bytes?.length === 0) {
    return (
      <EmptyState icon message="You got no videos in your feed, explore!" />
    );
  }

  if (!loading && error) {
    return <EmptyState message={undefined} icon={undefined} />;
  }
  return (
    <div className="mt-2 border-0 bg-white pt-3 dark:bg-black">
      <Head>
        <meta
          name="theme-color"
          content={resolvedTheme === 'dark' ? '#1b1b1d' : '#ffffff'}
        />
      </Head>
      <MetaTags title={`Feed • ${APP_NAME} `} />

      {!error && !loading && (
        <>
          <div
            ref={bytesContainer}
            className="mt-3 h-screen border-0 bg-white pt-3 font-semibold dark:bg-black md:h-[calc(100vh-80px)]"
          >
            {bytes?.map((video: Publication, index) => <ProfileVideos />)}

            {pageInfo?.next && (
              <span ref={observe} className="flex justify-center border-0 ">
                <Loader />
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FeedStory;
