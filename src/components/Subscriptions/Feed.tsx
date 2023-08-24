import VideoCard from '@/components/HomePage/VideoCard';
import Loader from '@/components/UI/Loader';
import { EmptyState } from '@/components/UI/EmptyState';
import { useAppStore } from '@/store/app';
import type { FeedItem, Publication } from '@/utils/lens/generatedLenster';
import {
  FeedEventItemType,
  Profile,
  PublicationMainFocus
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
import FullScreen from '../Bytes/FullScreen';
import router from 'next/router';
import { useFeedQuery } from '@/utils/lens/generated';
import Head from 'next/head';
import MetaTags from '../UI/MetaTags';
import { useTheme } from 'next-themes';

interface Props {
  publication: Publication;
  onDetails?: (publication: Publication) => void;
  profile: Profile | null;
  isShow: boolean;
  video: Publication;
  following: boolean;
}

const Feed = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const activeTagFilter = useAppStore((state) => state.activeTagFilter);

  const { resolvedTheme } = useTheme();
  const [currentViewingId, setCurrentViewingId] = useState('')

  const bytesContainer = useRef<HTMLDivElement>(null);
  const [byte, setByte] = useState<Publication>();
  const [following, setFollowing] = useState(false);
  const [show, setShow] = useState(false);

  const request = {
    limit: 20,
    feedEventItemTypes: [FeedEventItemType.Post, FeedEventItemType.Comment],
    profileId: currentProfile?.id,
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

  const full = useCallback(
    () =>
      currentViewingId && byte && router.pathname ? (
        <FullScreen
          byte={byte}
          close={closeDialog}
          isShow={show}
          bytes={bytes}
          index={bytes?.findIndex((video) => video.id === currentViewingId)}
          profile={currentProfile as Profile}
        />
      ) : null,
    [byte, show]
  );

  if (bytes?.length === 0) {
    return (
      <EmptyState icon message="You got no videos in your feed, explore!" />
    );
  }

  if (!loading && error) {
    return <Custom400 />;
  }
  return (
    <div className="mt-2 border-0 dark:bg-black bg-white pt-3">
      <Head>
      <meta
          name="theme-color"
          content={resolvedTheme === 'dark' ? '#1b1b1d' : '#ffffff'}
        />
      </Head>  
      <MetaTags title={`Feed • ${APP_NAME} `} />
 
      {full()}
      {!error && !loading && (
        <>
          <div
            ref={bytesContainer}
            className="mt-3 h-screen border-0 pt-3 dark:bg-black bg-white font-semibold md:h-[calc(100vh-80px)]"
          >
            {bytes?.map((video: Publication, index) => (
              <ByteVideo
              currentViewingId={currentViewingId}
              intersectionCallback={(id) => setCurrentViewingId(id)}
                video={video}
                key={`${video?.id}_${video.createdAt}1`}
          
              />
            ))}

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

export default Feed;
