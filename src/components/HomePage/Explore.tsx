
import type { Publication } from '@/utils/lens/generatedLenster'
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedLazyQuery,
  usePublicationLazyQuery,
  PublicationMainFocus,
  Profile
} from '@/utils/lens/generatedLenster'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-cool-inview'


import ByteVideo from '@/components/Bytes/ByteVideo'
import MetaTags from '../UI/MetaTags'
import { useAppStore } from '@/store/app'
import { APP_ID, APP_NAME, LENSTER_APP_ID, LENSTOK_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID, LENS_CUSTOM_FILTERS, ORB_APP_ID, RIFF_APP_ID, SCROLL_ROOT_MARGIN, STATIC_ASSETS_URL } from '@/constants'
import Loader from '../UI/Loader'
import { EmptyState } from '../UI/EmptyState'
import FullScreen from '../Bytes/FullScreen'
import VideoCard from './VideoCard'
import Loading from '../Loading'
import NewPost from '../Composer/Post/New'
import { Modal } from '../UI/Modal'
import NewPublication from '../Composer/NewPublication'
import { useGlobalModalStateStore } from '@/store/modals'



const Explore = () => {
  const router = useRouter()
  const bytesContainer = useRef<HTMLDivElement>(null)
  const currentProfile = useAppStore((state) => state.currentProfile)
  const currentViewingId = useAppStore((state) => state.currentviewingId)
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId)
  const [byte, setByte] = useState<Publication>()
  const [following, setFollowing] = useState(false) 
  const setShowNewPostModal = useGlobalModalStateStore(
    (state) => state.setShowNewPostModal
    
  );
  const showNewPostModal = useGlobalModalStateStore(
    (state) => state.showNewPostModal
  );



  const activeTagFilter = useAppStore((state) => state.activeTagFilter)
  const request =
  {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit : 10,
    noRandomize: false,
    sources: [ APP_ID,LENSTUBE_APP_ID,LENSTOK_APP_ID ,LENSTER_APP_ID,ORB_APP_ID,RIFF_APP_ID],
    publicationTypes: [PublicationTypes.Post],
    metadata: {
      tags:
      activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
        
      mainContentFocus: [PublicationMainFocus.Video,PublicationMainFocus.Image,PublicationMainFocus.Article,PublicationMainFocus.Audio,PublicationMainFocus.TextOnly],
    }
  }

  const [show, setShow] = useState(false)

  const [fetchPublication, { data: singleByte, loading: singleByteLoading }] =
    usePublicationLazyQuery()

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
      onCompleted: ({ explorePublications }) => {
      }
    })
  console.log(data);

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
      <div onClick={() => setShowNewPostModal(true)} >
      <NewPost/>
      <Modal
        title={`Create post`}
        size="md"
        show={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
      >
        
        <NewPublication />
      </Modal>
      </div>
      {full()}
      <div
        ref={bytesContainer}
        className="h-screen border-0 md:h-[calc(100vh-70px)]"
      >
       
        {bytes?.map((video: Publication, index) => (
          <VideoCard
          
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
    </div>
  )
}

export default Explore
