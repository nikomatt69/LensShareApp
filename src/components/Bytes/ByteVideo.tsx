import Link from 'next/link';
import type { Profile, Publication } from '@/utils/lens/generatedLenster';
import type { Dispatch, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import {getThumbnailUrl} from '@/utils/functions/getThumbnailUrl';

import VideoPlayer from '@/utils/VideoPlayer';

import BottomOverlay from './BottomOverlay';
import ByteActions from './ByteActions';
import TopOverlay from './TopOverlay';
import clsx from 'clsx';
import { useAppStore } from '@/store/app';
import MobileBottomOverlay from './MobileBottomOverlay';
import { Image } from '../UI/Image';

import Collect from '../Publication/Actions/Collect';
import useAverageColor from '@/utils/hooks/useAverageColor';
import sanitizeDStorageUrl from '@/utils/lib/sanitizeDStorageUrl';
import imageKit from '@/lib/imageKit';

type Props = {
  video: Publication;
 
  currentViewingId: string
  intersectionCallback: (id: string) => void
};

const ByteVideo: FC<Props> = ({
  video,
  currentViewingId,
  intersectionCallback
}) => {
  const videoRef = useRef<HTMLMediaElement>()
  const intersectionRef = useRef<HTMLDivElement>(null)
  const thumbnailUrl = imageKit(
    sanitizeDStorageUrl(getThumbnailUrl(video)),
    'THUMBNAIL_V'
  )
  const { color: black } = useAverageColor(thumbnailUrl, true)
  const currentProfile = useAppStore((state) => state.currentProfile)

  const playVideo = () => {
    if (!videoRef.current) {
      return
    }
    videoRef.current.currentTime = 0
    videoRef.current.volume = 1
    videoRef.current.autoplay = true
    videoRef.current?.play().catch(() => {})
   
  }

  const observer = new IntersectionObserver((data) => {
    if (data[0].target.id && data[0].isIntersecting) {
      intersectionCallback(data[0].target.id)
      const nextUrl = `${location.origin}/bytes/${video?.id}`
      history.replaceState({ path: nextUrl }, '', nextUrl)
    }
  })

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
    videoRef.current.volume = 0
    videoRef.current?.pause()
    videoRef.current.autoplay = false
  }

  const onClickVideo = () => {
    if (videoRef.current?.paused) {
      playVideo()
    } else {
      pauseVideo()
    }
  }

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return
    }
    videoRef.current = ref
    playVideo()
  }

  if (!video) {
    return null
  }

  return (
    <div
      className=" snap-center justify-center md:mt-6"
      data-testid="byte-video"
    >
      <div className="relative">
        <div
          className="ultrawide:w-[650px] flex h-screen w-screen min-w-[250px] items-center overflow-hidden bg-black md:h-[calc(100vh-145px)] md:w-[400px] md:rounded-xl"
          style={{
            backgroundColor: black ? black: black
          }}
        >
          <div
            className="absolute top-[50%]"
            ref={intersectionRef}
            id={video?.id}
          />
          {currentViewingId === video.id ? (
            <VideoPlayer
              
              refCallback={refCallback}
              permanentUrl={getPublicationMediaUrl(video)}
             
              posterUrl={thumbnailUrl}
              ratio="9to16"
              showControls={false}
              options={{
                autoPlay: false,
                muted: false,
                loop: true,
                loadingSpinner: false,
                isCurrentlyShown: currentViewingId === video.id
              }}
            />
          ) : (
            <div className="h-full w-full">
              
              <span className="invisible absolute">
                <VideoPlayer
                  permanentUrl={getPublicationMediaUrl(video)}
                  showControls={false}
                  options={{
                    autoPlay: false,
                    muted: true,
                    loadingSpinner: false,
                    isCurrentlyShown: currentViewingId === video.id
                  }}
                />
              </span>
            </div>
          )}
          
        </div>
        <TopOverlay onClickVideo={onClickVideo} />
        <BottomOverlay video={video} />
        <div className="absolute bottom-[36%] right-2 z-[1] md:hidden">
          <ByteActions video={video} />
          {video?.collectModule?.__typename !==
            'RevertCollectModuleSettings' && (
            <div className="text-center text-white md:text-gray-500">
              <Collect publication={video as Publication} showCount={true} />
              
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:flex">
        <ByteActions video={video} />
      </div>
    </div>
  )
}

export default React.memo(ByteVideo);
