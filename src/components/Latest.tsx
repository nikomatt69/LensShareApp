
import type { Publication } from '@/types/lens'
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreLazyQuery,
  usePublicationDetailsLazyQuery,
  PublicationMainFocus,
  Profile
} from '@/utils/lens'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-cool-inview'


import ByteVideo from '@/components/Bytes/ByteVideo'

import { useAppStore } from '@/store/app'
import { APP_ID, APP_NAME, LENSTER_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID, LENS_CUSTOM_FILTERS, ORB_APP_ID, RIFF_APP_ID, SCROLL_ROOT_MARGIN } from '@/constants'
import FullScreen from './Bytes/FullScreen'
import Loader from './UI/Loader'
import { EmptyState } from './UI/EmptyState'
import MetaTags from './UI/MetaTags'
import Loading from './Loading'
import BytesCard from './HomePage/BytesCard'




const Latest = () => {
  const router = useRouter()
  const bytesContainer = useRef<HTMLDivElement>(null)
  const currentProfile = useAppStore((state) => state.currentProfile)
  const currentViewingId = useAppStore((state) => state.currentviewingId)
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId)
  const [byte, setByte] = useState<Publication>()
  const [following, setFollowing] = useState(false) 


  const activeTagFilter = useAppStore((state) => state.activeTagFilter)
  const request =
  {
    sortCriteria: PublicationSortCriteria.Latest,
    limit: 20,
    noRandomize: false,
    sources: [ APP_ID, LENSTUBE_BYTES_APP_ID,LENSTUBE_APP_ID,LENSTER_APP_ID,ORB_APP_ID,RIFF_APP_ID ],
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
      tags:
      activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
      mainContentFocus: [PublicationMainFocus.Video],
    }
  }

  const [show, setShow] = useState(false)

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
  usePublicationDetailsLazyQuery()

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useExploreLazyQuery({
      // prevent the query from firing again after the first fetch
     
      variables: {
        request,
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
          profileId: currentProfile?.id ?? null
      },
      onCompleted: ({ explorePublications }) => {
      }
    })
  console.log(data)

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
      onCompleted: () => fetchAllBytes()
    })
  }

  const openDetail = (byte: Publication) => {
    const nextUrl = `/${byte.id}`
    setByte(byte)
    history.pushState({ path: nextUrl }, '', nextUrl)
    setShow(!show)
  }

  const closeDialog = () => {
    const nextUrl = `/`
    history.pushState({ path: nextUrl }, '', nextUrl)
    setShow(false)
  }


  const full = useCallback(() => currentViewingId && byte && router.pathname ?
    <FullScreen
      profile={currentProfile as Profile}
      byte={byte}
      close={closeDialog}
      isShow={show}
      bytes={bytes}
      index={bytes?.findIndex((video) => video.id === currentViewingId)}
    /> : null, [byte, show, currentViewingId])

  useEffect(() => {
    if (router.query.id && singleBytePublication) {
      openDetail(singleBytePublication)
    }
  }, [singleByte])


  useEffect(() => {
    if (router.isReady) {
      fetchSingleByte()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const { observe } = useInView({
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


  if (error ) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <EmptyState message="No bytes found" icon />
      </div>
    )
  }

  return (
    <div>
      <Head>
        <meta name="theme-color" content="#fff" />
      </Head>
      <MetaTags title={`Latest • ${APP_NAME} `} />
      {full()}
      <div
        ref={bytesContainer}
        className="h-[screen] border-0 mt-3 pt-3 font-semibold md:h-[calc(100vh-70px)]"
      >
        {bytes?.map((video: Publication, index) => (
           <BytesCard
           publication={video}
           following={following}
           setFollowing={ setFollowing } 
           video={video}
           key={`${video?.id}_${video.createdAt}1`}
           onDetail={openDetail}
           isShow={show}
       
         />
        ))}
        {pageInfo?.next && (
          <span ref={observe} className="flex border-0 justify-center p-10">
            <Loading />
          </span>
        )}
      </div>
    </div>
  )
}

export default Latest
