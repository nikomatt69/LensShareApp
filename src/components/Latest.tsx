import type { Publication } from '@/utils/lens/generatedLenster';
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedLazyQuery,
  usePublicationLazyQuery,
  PublicationMainFocus,
  Profile
} from '@/utils/lens/generatedLenster';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useInView } from 'react-cool-inview';

import ByteVideo from '@/components/Bytes/ByteVideo';

import { useAppStore } from '@/store/app';
import {
  APP_ID,
  APP_NAME,
  LENSTER_APP_ID,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  LENS_CUSTOM_FILTERS,
  ORB_APP_ID,
  RIFF_APP_ID,
  SCROLL_ROOT_MARGIN,
  STATIC_ASSETS_URL
} from '@/constants';

import Loader from './UI/Loader';
import { EmptyState } from './UI/EmptyState';
import MetaTags from './UI/MetaTags';
import Loading from './Loading';

import VideoCard from './HomePage/VideoCard';
import { useTheme } from 'next-themes';
import SinglePublication from './Composer/SinglePublication2';
import { Card } from './UI/Card';
import QueuedPublication from './Composer/QueuedPublication';
import { OptmisticPublicationType } from '@/enums';
import imageKit from '@/lib/imageKit';
import { useTransactionPersistStore } from '@/store/transaction';

const Latest = () => {
  const router = useRouter();
  const bytesContainer = useRef<HTMLDivElement>(null);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [byte, setByte] = useState<Publication>();
  const [following, setFollowing] = useState(false);
  const { resolvedTheme } = useTheme();
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);

  const request = {
    sortCriteria: PublicationSortCriteria.Latest,
    limit: 20,
    noRandomize: false,
    sources: [APP_ID, LENSTUBE_APP_ID, LENSTER_APP_ID, ORB_APP_ID, RIFF_APP_ID],
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
      mainContentFocus: [
        PublicationMainFocus.Video,
        PublicationMainFocus.Image,
        PublicationMainFocus.TextOnly,
        PublicationMainFocus.Article,
        PublicationMainFocus.Audio
      ]
    }
  };

  const [show, setShow] = useState(false);

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationLazyQuery();

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useExploreFeedLazyQuery({
      // prevent the query from firing again after the first fetch

      variables: {
        request,
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
        profileId: currentProfile?.id ?? null
      },
      onCompleted: ({ explorePublications: any }) => {}
    });
  console.log(data);

  const bytes = data?.explorePublications?.items as Publication[];
  const pageInfo = data?.explorePublications?.pageInfo;
  const singleBytePublication = singleByte?.publication as Publication;

  const fetchSingleByte = async () => {
    const publicationId = router.query.id;
    if (!publicationId) {
      return fetchAllBytes();
    }
    await fetchPublication({
      variables: {
        request: { publicationId },
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
        profileId: currentProfile?.id ?? null
      },
      onCompleted: () => fetchAllBytes()
    });
  };

  const openDetail = (byte: Publication) => {
    const nextUrl = `/${byte.id}`;
    setByte(byte);
    history.pushState({ path: nextUrl }, '', nextUrl);
    setShow(!show);
  };

  const closeDialog = () => {
    const nextUrl = `/`;
    history.pushState({ path: nextUrl }, '', nextUrl);
    setShow(false);
  };

  useEffect(() => {
    if (router.query.id && singleBytePublication) {
      openDetail(singleBytePublication);
    }
  }, [singleByte]);
  const hasMore = pageInfo?.next;
  useEffect(() => {
    if (router.isReady) {
      fetchSingleByte();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const { observe } = useInView({
    onChange: async ({ inView }) => {
      if (!inView || !hasMore) {
        return;
      }

      await fetchMore({
        variables: {
          request: { ...request, cursor: pageInfo?.next },

          profileId: currentProfile?.id
        }
      });
    }
  });

  if (error) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <EmptyState message="No bytes found" icon />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <meta name="theme-color" content="#000000" />
      </Head>
      <MetaTags  />
      <div className="mb-5 flex items-center space-x-2">
        <img
          src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
          draggable={false}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="lensshare"
        />
        <h1 className="text-xl font-semibold">Latest</h1>
      </div>

      <Card className="divide-y-[1px] rounded-xl border-2 border-blue-700 dark:divide-blue-700">
        {txnQueue.map(
          (txn) =>
            txn?.type === OptmisticPublicationType.NewPost && (
              <div key={txn.id}>
                <QueuedPublication txn={txn} />
              </div>
            )
        )}
        {bytes?.map((publication, index) => (
          <SinglePublication
            profile={currentProfile as Profile}
            key={`${publication?.id}_${index}`}
            isFirst={index === 0}
            isLast={index === bytes.length - 1}
            publication={publication as Publication}
            showCount={true}
            tags={''}
          />
        ))}
        {hasMore ? <span ref={observe} /> : null}
      </Card>
    </div>
  );
};

export default Latest;
