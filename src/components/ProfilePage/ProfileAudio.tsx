
import { FeedEventItemType, type Publication } from '@/types/lens'
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreLazyQuery,
  usePublicationDetailsLazyQuery,
  PublicationMainFocus,
  Profile,
  useFeedLazyQuery
} from '@/utils/lens'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-cool-inview'


import ByteVideo from '@/components/Bytes/ByteVideo'
import MetaTags from '../UI/MetaTags'
import { useAppStore } from '@/store/app'
import { APP_ID, APP_NAME, LENSTER_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID, LENS_CUSTOM_FILTERS, ORB_APP_ID, RIFF_APP_ID, SCROLL_ROOT_MARGIN, STATIC_ASSETS_URL } from '@/constants'
import Loader from '../UI/Loader'
import { EmptyState } from '../UI/EmptyState'
import FullScreen from '../Bytes/FullScreen'

import Loading from '../Loading'

import Wrapper from '../Echos/Wrapper'
import AudioCard from '../HomePage/AudioCard'
import Navbar from '../Navbar'
import BottomNav from '../Navs/BottomNav'

interface Props {
  profile: Profile
  publication : Publication
}


const ExploreAudio: FC<Props> = ({ publication }) => {
  const router = useRouter()
  const bytesContainer = useRef<HTMLDivElement>(null)
  const currentProfile = useAppStore((state) => state.currentProfile)
  const currentViewingId = useAppStore((state) => state.currentviewingId)
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId)
  const [byte, setByte] = useState<Publication>()
  const [following, setFollowing] = useState(false) 
  const { id } = router.query


  const activeTagFilter = useAppStore((state) => state.activeTagFilter)
  const request =
  {
    feedEventItemTypes: [FeedEventItemType.Post, FeedEventItemType.Comment],
    limit : 10,
    noRandomize: false,
    sources: [ APP_ID,LENSTUBE_APP_ID,LENSTER_APP_ID,RIFF_APP_ID,ORB_APP_ID],
    profileId: id,
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      tags:
      activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
        
      mainContentFocus: [PublicationMainFocus.Audio, PublicationMainFocus.Audio],
    }
  }

  const [show, setShow] = useState(false)

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationDetailsLazyQuery()

  const [fetchAllBytes, { data, loading, error, fetchMore }] =
    useFeedLazyQuery({
      // prevent the query from firing again after the first fetch
      
  
      variables: {
        request,
       
        reactionRequest: currentProfile
          ? { profileId: currentProfile?.id }
          : null,
          profileId: currentProfile?.id ?? null
      },
      onCompleted: ({ }) => {
      }
    })
  console.log(data);

  const bytes = data?.feed?.items.map(item => item.root) as Publication[]
  const pageInfo = data?.feed?.pageInfo
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
  };


  const full = useCallback(() => currentViewingId && byte && router.pathname ?
    <FullScreen
      profile={currentProfile as Profile}
      byte={byte}
      close={closeDialog}
      isShow={show}
      bytes={bytes}
      
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
   
 

  if (loading ) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid h-[80vh] place-items-center">
        <EmptyState message="No bytes found" icon />
      </div>
    )
  }

  return (
    <div>
      <Head>
        <meta name="theme-color" content="#000000" />
      </Head>
      <MetaTags title={`Explore • ${APP_NAME} `} />
      <Navbar />
      {full()}
      <div
        ref={bytesContainer}
        className="h-screen border-0 md:h-[calc(100vh-70px)]"
      >
       
        {bytes?.map((video: Publication, index) => (
          <AudioCard
          
          publication={video}
          key={`${video?.id}_${video.createdAt}1`}
          onDetail={openDetail} />
        ))}
        {pageInfo?.next && (
          <span ref={observe} className="flex  justify-center p-10">
            <Loading />
          </span>
        )}
      </div>
      <BottomNav />
    </div>
  )
}

export default ExploreAudio
