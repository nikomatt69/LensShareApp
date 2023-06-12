import { Profile, Publication } from '@/types/lens'
import { formatNumber } from '@/utils/functions/formatNumber'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import Link from 'next/link'
import { FC, useState } from 'react'
import React from 'react'
import UnfollowButton from '../Buttons/UnfollowButton'
import FollowButton from '../Buttons/FollowButton'
import { usePublicationDetailsLazyQuery } from '@/utils/lens/generated'
import formatAddress from '@/utils/functions/formatAddress'
import formatHandle from '@/utils/functions/formatHandle'
import { useAppStore } from '@/store/app'


type Props = {
  video: Publication
  following: boolean
  setFollowing: (following: boolean) => void
  profile: Profile
  
}

const MobileBottomOverlay: FC<Props> = ({ video }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [following, setFollowing] = useState(false) 
  const isMirror = video.__typename === 'Mirror'


  const subscribeType = video.profile?.followModule?.__typename
  const profile = video.profile 


  return (
    <div className="absolute border-b-2  border-blue-700 bottom-0 rounded-b-2xl  bg-blue-500 overflow-auto left-0 right-0 z-[1] bg-gradient-to-b from-gray-900 to-transparent px-3 pb-6 pt-3 md:rounded-b-xl">
       <Link href={`/bytes/${video?.id}`} key={video.id}>
      <div className="pb-2">
        {isMirror ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-blue-700">Mirror by {video?.profile.name}</span>
            <h1 className="text-xs text-blue-700">{video.metadata.name}</h1>
          </div>
        ) :  <h1 className="line-clamp-2 font-bold text-white">{video.metadata.name}</h1>}
   
      </div>
      </Link>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <Link
            href={`/u/${profile?.id}`}
            className="flex flex-none cursor-pointer items-center space-x-2"
          >
            <img
              src={getProfilePicture(profile, 'avatar')}
              className="h-9 w-9 rounded-full"
              draggable={false}
              alt={profile?.handle}
            />
            <div className="flex min-w-0 font-bold flex-col items-start text-white">
              <h6 className="flex max-w-full items-center space-x-1">
                <span className="truncate">{formatHandle(profile?.handle)}</span>
                
              </h6>
              <span className="inline-flex items-center space-x-1 text-xs">
                {formatNumber(profile?.stats.totalFollowers)} Followers
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center  space-x-2">
        {<div className="flex-shrink-0 pr-3">
          { following ? ( 
            <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile }  /> 
            ) : (
            <FollowButton setFollowing={ setFollowing } profile={ profile as Profile } />
          )}
        </div>}
        </div>
      </div>
    </div>
  )
}

export default MobileBottomOverlay
