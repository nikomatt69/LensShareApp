
import { useAppStore } from '@/store/app'
import usePersistStore from '@/store/persist'
import type { Comment, Mirror, Publication } from '@/types/lens'
import type { FC } from 'react'
import React from 'react'
import VideoCard from '../HomePage/VideoCard'

type Props = {
  videos: Publication[]
  videoType?: 'Post' | 'Mirror' | 'Comment'
  onDetail: (video: Publication) => void;
}

const Timeline: FC<Props> = ({ videos, videoType = 'Post',onDetail }) => {
  
  const currentProfile = useAppStore((state) => state.currentProfile)

  const isComment = videoType === 'Comment'
  const isMirror = videoType === 'Mirror'
  const isChannelPage =
    location.pathname === `/u/${currentProfile?.id}`

  return (
    <div
      className="ultrawide:grid-cols-6 laptop:grid-cols-4 grid-col-1 grid gap-x-4 gap-y-2 md:grid-cols-2 md:gap-y-8 2xl:grid-cols-5"
      data-testid="curated-videos"
    >
      {isChannelPage && 
        videos?.map((video: Publication, i) => {
        const isPub = video.__typename === videoType
        return isPub && isComment ? (
          <VideoCard
            onDetail={onDetail}
            key={`${video?.id}_${i}`}
            publication={video as Comment}       />
        ) : isPub && isMirror ? (
          <VideoCard
            onDetail={onDetail}
            key={`${video?.id}_${i}`}
            publication={video as Mirror}
          />
        ) : (
          isPub && <VideoCard onDetail={onDetail} key={`${video?.id}_${i}`} publication={video} />
        )
      })}
    </div>
  )
}

export default Timeline
