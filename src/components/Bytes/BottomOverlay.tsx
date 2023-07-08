
import type { Publication } from '@/utils/lens/generatedLenster'
import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'
import { Tooltip } from '../UI/Tooltip'


type Props = {
  video: Publication
  btnSize?: "sm" | "md" | "lg" | "xl"
}

const BottomOverlay: FC<Props> = ({ video, btnSize }) => {
  const subscribeType = video.profile?.followModule?.__typename
  const profile = video.profile
  return (
    <div className="z-[1] pb-3 md:rounded-b-xl mr-1">
      <div className="flex justify-between">
        <div>
          <Link href={`/u/${profile?.id}`}>
            <span className="font-bold text-base">{video.profile.name}</span>
            <span className='text-sm font-thin inline-flex'>@{video.profile.id} &nbsp; <Tooltip content="Verified" placement="right">
             
            </Tooltip>
            </span>
          </Link>
          <Link href={`/bytes/${video.id}`} key={video.id}> 
          <h1 className="line-clamp-2 text-base mt-2 font-normal">{video.metadata.name} <span>
            {
              video.metadata.tags?.map(tag => <span key={tag} className='font-bold'>#{tag}</span>)
            }
          </span></h1>
          </Link>
        </div>
      
      </div>
    </div>
  )
}

export default BottomOverlay
