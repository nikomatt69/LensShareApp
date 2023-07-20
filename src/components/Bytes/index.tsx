import type { Profile, Publication } from '@/utils/lens/generatedLenster';
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedLazyQuery,
  usePublicationLazyQuery,
  PublicationMainFocus
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

import ByteVideo from './ByteVideo';
import MetaTags from '../UI/MetaTags';
import { useAppStore } from '@/store/app';
import {
  APP_ID,
  LENSTER_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  LENS_CUSTOM_FILTERS,
  SCROLL_ROOT_MARGIN
} from '@/constants';
import Loader from '../UI/Loader';
import { EmptyState } from '../UI/EmptyState';
import FullScreen from './FullScreen';
import Link from 'next/link';
import {
  useExploreLazyQuery,
  usePublicationDetailsLazyQuery
} from '@/utils/lens/generated';
import Navbar from '../Navbar';

interface Props {
  following?: boolean;
  setFollowing?: (following: boolean) => void;
}

const Bytes = () => {
  const router = useRouter();
  const bytesContainer = useRef<HTMLDivElement>(null);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const currentViewingId = useAppStore((state) => state.currentviewingId);
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const [byte, setByte] = useState<Publication>();
  const [following, setFollowing] = useState(false);

  const activeTagFilter = useAppStore((state) => state.activeTagFilter);
  const request = {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit: 10,
    noRandomize: false,
    sources: [APP_ID, LENSTUBE_BYTES_APP_ID],
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
      tags:
        activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
      mainContentFocus: [PublicationMainFocus.Video, PublicationMainFocus.Image]
    }
  };

  const [show, setShow] = useState(false);

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationDetailsLazyQuery();

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useExploreLazyQuery({
      // prevent the query from firing again after the first fetch
      nextFetchPolicy: 'standby',
      variables: {
        request,
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
        profileId: currentProfile?.id ?? null
      },
      onCompleted: ({ explorePublications }) => {}
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
    [byte, show, currentViewingId]
  );

  useEffect(() => {
    if (router.query.id && singleBytePublication) {
      openDetail(singleBytePublication);
    }
  }, [singleByte]);

  useEffect(() => {
    if (router.isReady) {
      fetchSingleByte();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      });
    }
  });

  if (loading || singleByteLoading) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <EmptyState message="No bytes found" icon />
      </div>
    );
  }

  return (
    <div className="border-0">
      <Head>
        <meta name="theme-color" content="#000000" />
      </Head>
      <MetaTags title="LensShare" />
      <Navbar/>

      {full()}
      <div
        ref={bytesContainer}
        className="h-screen border-0 md:h-[calc(100vh-70px)]"
      >
        {singleByte && (
          <ByteVideo
            setFollowing={setFollowing}
            video={singleBytePublication}
            key={`${singleBytePublication?.id}_${singleBytePublication.createdAt}0`}
            onDetail={openDetail}
            isShow={show}
          />
        )}
        {bytes?.map((video: Publication, index) => (
          <ByteVideo
            video={video}
            key={`${video?.id}_${video.createdAt}1`}
            onDetail={openDetail}
            isShow={show}
            setFollowing={setFollowing}
          />
        ))}
        {pageInfo?.next && (
          <span ref={observe} className="flex justify-center border-0 p-10">
            <Loader />
          </span>
        )}
      </div>
    </div>
  );
};

export default Bytes;
