import type { Publication } from '@/utils/lens/generated5';
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedLazyQuery,
  usePublicationLazyQuery,
  PublicationMainFocus,
  Profile
} from '@/utils/lens/generated5';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useInView } from 'react-cool-inview';

import ByteVideo from '@/components/Bytes/ByteVideo';
import MetaTags from '../UI/MetaTags';
import { useAppStore } from '@/store/app';
import {
  APP_ID,
  APP_NAME,
  BUTTRFLY_APP_ID,
  LENSTER_APP_ID,
  LENSTOK_APP_ID,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  LENS_CUSTOM_FILTERS,
  ORB_APP_ID,
  PHAVER_APP_ID,
  RIFF_APP_ID,
  SCROLL_ROOT_MARGIN,
  STATIC_ASSETS_URL
} from '@/constants';
import Loader from '../UI/Loader';
import { EmptyState } from '../UI/EmptyState';

import VideoCard from './VideoCard';
import Loading from '../Loading';
import NewPost from '../Composer/Post/New';
import { Modal } from '../UI/Modal';
import NewPublication from '../Composer/NewPublication';
import { useGlobalModalStateStore } from '@/store/modals';
import { Card } from '../UI/Card';
import SinglePublication from '../Composer/SinglePublication2';
import QueuedPublication from '../Composer/QueuedPublication';
import { OptmisticPublicationType } from '@/enums';
import { useTransactionPersistStore } from '@/store/transaction';
import imageKit from '@/lib/imageKit';
import {
  ExplorePublicationRequest,
  useExploreFeedQuery
} from '@/utils/lens/generated5';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '../UI/ErrorMessage';

interface FeedProps {
  focus?: PublicationMainFocus;
  feedType?: PublicationSortCriteria;
}

const Explore: FC<FeedProps> = ({
  focus,
  feedType = PublicationSortCriteria.CuratedProfiles
}) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  // Variables
  const request: ExplorePublicationRequest = {
    sortCriteria: feedType,
    noRandomize: feedType === 'LATEST',
    metadata: {
      ...(focus && { mainContentFocus: [focus] })
    },
    limit: 30
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;

  const { data, loading, error, fetchMore } = useExploreFeedQuery({
    variables: { request, reactionRequest, profileId }
  });

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
  const hasMore = pageInfo?.next;

  const { observe } = useInView({
    onChange: async ({ inView }) => {
      if (!inView || !hasMore) {
        return;
      }

      await fetchMore({
        variables: {
          request: { ...request, cursor: pageInfo?.next },
          reactionRequest,
          profileId
        }
      });
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (publications?.length === 0) {
    return (
      <EmptyState
        message={`No posts yet!`}
        icon={<RectangleStackIcon className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return <ErrorMessage title={`Failed to load explore feed`} error={error} />;
  }

  return (
    <div>
      <MetaTags />
      <div className="mb-5 flex items-center space-x-2">
        <img
          src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
          draggable={false}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="lensshare"
        />
        <h1 className="text-2xl font-semibold">Explore</h1>
      </div>

      <Card
        className="divide-y-[1px] rounded-xl border-2 border-blue-700 dark:divide-blue-700"
        dataTestId="explore-feed"
      >
        {publications?.map((publication, index) => (
          <SinglePublication
            key={`${publication.id}_${index}`}
            isFirst={index === 0}
            isLast={index === publications.length - 1}
            publication={publication as Publication}
            profile={currentProfile as Profile}
            showCount={true}
            tags={''}
          />
        ))}
        {hasMore ? <span ref={observe} /> : null}
      </Card>
    </div>
  );
};

export default Explore;
