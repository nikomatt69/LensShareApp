
import Link from 'next/link'
import type { Profile, Publication } from '@/types/lens'
import type { Dispatch, FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl'
import getThumbnailUrl from '@/utils/functions/getThumbnailUrl'
import imageCdn from '@/utils/functions/imageCdn'
import {sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'

import VideoPlayer from '@/utils/VideoPlayer'

import BottomOverlay from './BottomOverlay'
import ByteActions from './ByteActions'
import TopOverlay from './TopOverlay'
import clsx from 'clsx'
import {useAppStore} from '@/store/app'
import MobileBottomOverlay from './MobileBottomOverlay'

type Props = {
  video: Publication
  onDetail: (video: Publication) => void
  isShow: boolean
  index?: number
  setFollowing: Dispatch<boolean>

}

const ByteVideo: FC<Props> = ({
  video,
  onDetail,
  isShow,
  index,
 
}) => {
  const videoRef = useRef<HTMLMediaElement>()
  const [following, setFollowing] = useState(false) 
  const [width, setWidth] = useState<number>(window.innerWidth);
  const intersectionRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const thumbnailUrl = imageCdn(
    sanitizeIpfsUrl(getThumbnailUrl(video)),
    'thumbnail_v'
  )
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);
  const isMobile = width <= 768;

  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId)
  const currentViewingId = useAppStore((state) => state.currentviewingId)

  const playVideo = () => {
    if (!videoRef.current || isShow) {
      return
    }
    videoRef.current.currentTime = 0
    videoRef.current.volume = 1
    videoRef.current.autoplay = true
    videoRef.current?.play().catch(() => { })
    setPlaying(true)
  }

  const observer = new IntersectionObserver((data, observer) => {
    if (data[0].target.id && data[0].isIntersecting) {
      const id = data[0].target.id
      id != currentViewingId && setCurrentViewingId(id)
      // if (isShow) {
      //   const nextUrl = `${location.origin}/${video?.id}`
      //   history.replaceState({ path: nextUrl }, '', nextUrl)
      // }
    }
  }, { rootMargin: "0px 0px -50% 0px" })

  useEffect(() => {
    if (intersectionRef.current) {
      observer.observe(intersectionRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pauseVideo = () => {
    if (!videoRef.current) {
      return
    }
    videoRef.current?.pause()
    videoRef.current.autoplay = false
    setPlaying(false)
  }

  const onClickVideo = (event: any) => {
    event.preventDefault();
    setCurrentViewingId(video.id)
    onDetail(video)
  }

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return
    }
    videoRef.current = ref
    playVideo()
  }


  useEffect(() => {
    if (currentViewingId == video.id) {
      isShow ? pauseVideo() : playVideo()
    }
  }, [isShow])


  const profile = video.profile
  return (
    <div className={clsx(index != 0 && ' border-t dark:border-slate-600 ', !isMobile && 'flex mt-8 md:ml-2')}>
      <Link
        href={`/u/${profile?.id}`}
        className="flex flex-none cursor-pointer items-top space-x-2 mt-4  max-md:hidden"
      >
        <img
          src={getProfilePicture(profile, 'avatar')}
          className="h-14 w-14 md:rounded-full md:mr-3"
          draggable={false}
          alt={profile?.id}
        />
      </Link>
      <div className='h-full w-full relative'>
        {!isMobile && <BottomOverlay video={video}  />}
        <div
          className="flex snap-center"
          data-testid="byte-video"
        >
          <div className="relative bottom-0">
            <div
              className={clsx(!isMobile ? "ultrawide:w-[336px] flex h-screen w-screen min-w-[260px] max-w-[336px] items-center overflow-hidden  bg-black md:w-[19.5vw] md:rounded-xl md:h-[65vh] md:max-xl:h-[30vh] max-h-[600px] min-h-[500px]" : "flex h-screen w-screen")}
              id={currentViewingId === video.id ? "currentVideo" : video.id + "1"}
              style={{
                backgroundColor: 'transparent'
              }}
            >
              <div
                className="absolute top-[50%]"
                ref={intersectionRef}
                id={video.id}
              />
              {currentViewingId === video.id ? (
                <VideoPlayer
                  refCallback={refCallback}
                  permanentUrl={getPublicationMediaUrl(video)}
                  posterUrl={thumbnailUrl}
                  ratio="9to16"
                  publicationId={video.id}
                  showControls={true}
                  options={{
                    autoPlay: false,
                    loop: true,
                    loadingSpinner: true,
                    muted: true,
                    isCurrentlyShown: true,
                  }}
                />
              ) : (
                <img
                  className="w-full object-contain rounded-[10px]"
                  src={thumbnailUrl}
                  alt="thumbnail"
                  draggable={false}
                />
              )}
            </div>
            {!isMobile && <TopOverlay onClickVideo={onClickVideo} id={video.id} />}
            {isMobile && <MobileBottomOverlay video={video} setFollowing={setFollowing} profile={profile as Profile} following={false}  />}
            <div className="absolute right-2 bottom-[15%] z-[1] md:hidden">
              <ByteActions trigger video={video} showDetail={() => onDetail(video)} />
              {/* {video?.collectModule?.__typename !==
                'RevertCollectModuleSettings' && (
                  <div className="text-center text-white md:text-gray-500">
                    <CollectVideo video={video} />
                    <div className="text-xs">
                      {video.stats?.totalAmountOfCollects || 'Collect'}
                    </div>
                  </div>
                )} */}
            </div>
          </div>
          <div className="hidden md:flex">
            <ByteActions trigger video={video} showDetail={() => onDetail(video)} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default React.memo(ByteVideo)
