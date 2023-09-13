
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

import Link from 'next/link';
import {

} from '@/utils/lens/generatedLenster';
import Navbar from '../Navbar';
import { useTheme } from 'next-themes';
import ChevronDownOutline from '../UI/Icons/ChevronDownOutline';
import ChevronUpOutline from '../UI/Icons/ChevronUpOutline';

interface Props {
  following?: boolean;
  setFollowing?: (following: boolean) => void;
}

const request = {
  sortCriteria: PublicationSortCriteria.CuratedProfiles,
  limit: 50,
  noRandomize: false,
  sources: [LENSTUBE_BYTES_APP_ID],
  publicationTypes: [PublicationTypes.Post],
  customFilters: LENS_CUSTOM_FILTERS
}

const Bytes = () => {
  const router = useRouter()
  const bytesContainer = useRef<HTMLDivElement>(null)
  const [currentViewingId, setCurrentViewingId] = useState('')
  const currentProfile = useAppStore((state) => state.currentProfile)

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationLazyQuery()

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useExploreFeedLazyQuery({
      variables: {
        request,
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
        profileId: currentProfile?.id ?? null
      },
      onCompleted: ({ explorePublications }) => {
        const items = explorePublications?.items as Publication[]
        const publicationId = router.query.id
        if (!publicationId) {
          const nextUrl = `${location.origin}/bytes/${items[0]?.id}`
          history.pushState({ path: nextUrl }, '', nextUrl)
        }
      }
    })

  const bytes = data?.explorePublications?.items as Publication[]
  const pageInfo = data?.explorePublications?.pageInfo
  const singleBytePublication = singleByte?.publication as Publication

  const fetchSingleByte = async () => {
    const publicationId = router.query.id
    if (!publicationId) {
      return fetchAllBytes()
    }
    await fetchPublication({
      variables: {
        request: { publicationId },
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
        profileId: currentProfile?.id ?? null
      },
      onCompleted: () => fetchAllBytes(),
      fetchPolicy: 'network-only'
    })
  }

  useEffect(() => {
    if (router.isReady) {
      fetchSingleByte()
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const { observe } = useInView({
    rootMargin: SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      })
    }
  })

  if (loading || singleByteLoading) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <EmptyState message icon />
      </div>
    )
  }

  return (
    <div className="overflow-y-hidden">
      <Head>
        <meta name="theme-color" content="#000000" />
      </Head>
      <MetaTags title="Bytes" />
      <div
        ref={bytesContainer}
        className="no-scrollbar h-screen bg-white dark:bg-black snap-y pb-3 snap-mandatory overflow-y-scroll scroll-smooth md:h-[calc(100vh-70px)]"
      >
        
        {bytes?.map(
          (video: Publication, index) =>
            singleByte?.publication?.id !== video.id && (
              <ByteVideo
                video={video}
                currentViewingId={currentViewingId}
                intersectionCallback={(id) => setCurrentViewingId(id)}
                key={`${video?.id}_${index}`}
              />
            )
        )}
        {pageInfo?.next && (
          <span ref={observe} className="flex justify-center ">
            <Loader />
          </span>
        )}
        <div className="bottom-7 right-4  flex-col space-y-3 lg:absolute lg:flex">
          <button
            className="rounded-full bg-gray-300 p-3 focus:outline-none dark:bg-gray-700"
            onClick={() => bytesContainer.current?.scrollBy({ top: -30 })}
          >
            <ChevronUpOutline className="h-5 w-5" />
          </button>
          <button
            className="rounded-full bg-gray-300 p-3 focus:outline-none dark:bg-gray-700"
            onClick={() => bytesContainer.current?.scrollBy({ top: 30 })}
          >
            <ChevronDownOutline className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bytes
