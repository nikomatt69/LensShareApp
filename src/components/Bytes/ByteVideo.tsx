import Link from 'next/link';
import type { Profile, Publication } from '@/utils/lens/generatedLenster';
import type { Dispatch, FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import getThumbnailUrl from '@/utils/functions/getThumbnailUrl';
import imageCdn from '@/utils/functions/imageCdn';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';

import VideoPlayer from '@/utils/VideoPlayer';

import BottomOverlay from './BottomOverlay';
import ByteActions from './ByteActions';
import TopOverlay from './TopOverlay';
import clsx from 'clsx';
import { useAppStore } from '@/store/app';
import MobileBottomOverlay from './MobileBottomOverlay';

type Props = {
  video: Publication;
  onDetail: (video: Publication) => void;
  isShow: boolean;
  index?: number;
  setFollowing: Dispatch<boolean>;
};

const ByteVideo: FC<Props> = ({ video, onDetail, isShow, index }) => {
  const videoRef = useRef<HTMLMediaElement>();
  const [following, setFollowing] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const intersectionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = imageCdn(getThumbnailUrl(video.metadata), 'thumbnail_v')
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;

  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const currentViewingId = useAppStore((state) => state.currentviewingId);

  const playVideo = () => {
    if (!videoRef.current || isShow) {
      return;
    }
    videoRef.current.currentTime = 0;
    videoRef.current.volume = 1;
    videoRef.current.autoplay = true;
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };

  const observer = new IntersectionObserver(
    (data, observer) => {
      if (data[0].target.id && data[0].isIntersecting) {
        const id = data[0].target.id;
        id != currentViewingId && setCurrentViewingId(id);
        // if (isShow) {
          // const nextUrl = `${location.origin}/${video?.id}`
          // history.replaceState({ path: nextUrl }, '', nextUrl)
        // }
      }
    },
    { rootMargin: '0px 0px -50% 0px' }
  );

  useEffect(() => {
    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pauseVideo = () => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current?.pause();
    videoRef.current.autoplay = false;
    setPlaying(false);
  };

  const onClickVideo = (event: any) => {
    event.preventDefault();
    setCurrentViewingId(video.id);
    onDetail(video);
  };

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return;
    }
    videoRef.current = ref;
    playVideo();
  };

  useEffect(() => {
    if (currentViewingId == video.id) {
      isShow ? pauseVideo() : playVideo();
    }
  }, [isShow]);

  const profile = video.profile;
  return (
    <div
    className="flex snap-center justify-center md:mt-6"
    data-testid="byte-video"
  >
    <div className="relative">
      <div
         className={clsx(
          !isMobile
            ? 'ultrawide:w-[650px] flex h-screen w-screen min-w-[250px] items-center overflow-hidden bg-black  md:h-[65vh] md:w-[19.5vw] md:rounded-xl md:max-xl:h-[30vh]'
            : 'flex h-screen w-screen'
        )}
        style={{
          backgroundColor: 'transparent'
        }}
      >
        <div
          className="absolute top-[50%]"
          ref={intersectionRef}
          id={video?.id}
        />
        {currentViewingId === video.id ? (
          <VideoPlayer
            publicationId={video.id}
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
            <img
              className="w-full object-cover"
              src={thumbnailUrl}
              alt="thumbnail"
              draggable={false}
            />
            <span className="invisible absolute">
              <VideoPlayer
                permanentUrl={getPublicationMediaUrl(video)}
                publicationId={video.id}
                showControls={false}
                options={{
                  autoPlay: false,
                  muted: false,
                  loadingSpinner: false,
                  isCurrentlyShown: currentViewingId === video.id
                }}
              />
            </span>
          </div>
        )}
      </div>
      {isMobile && (
            <MobileBottomOverlay
              video={video}
              setFollowing={setFollowing}
              profile={profile as Profile}
              following={following}
            />
          )}
      <div className="absolute bottom-[15%] right-2 z-[1] md:hidden">
      <ByteActions
            publication={video as Publication}
            publicationId={video as Publication}
            trigger
            video={video}
            showDetail={() => onDetail(video)}
          />
        
      </div>
    </div>
    <div className="hidden md:flex">
    <ByteActions
            publication={video as Publication}
            publicationId={video as Publication}
            trigger
            video={video}
            showDetail={() => onDetail(video)}
          />
    </div>
  </div>
  
  );
};

export default React.memo(ByteVideo);
