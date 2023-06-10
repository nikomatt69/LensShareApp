
import Image from 'next/image'
import React, { FC } from 'react'
import Loader from '../UI/Loader'
import getAvatar from '@/lib/getAvatar'
import { GoVerified } from 'react-icons/go'
import InfiniteLoader from '../UI/InfiniteLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import formatHandle from '@/utils/functions/formatHandle'
import Link from 'next/link'
import { usePublicationQuery } from '@/types/graph'
import { Profile, useAllProfilesQuery } from '@/utils/lens/generated'
import { useInView } from 'react-cool-inview'

interface Props {
    publicationId: string
    publication: any
}

const MirroredList: FC<Props> = ({ publicationId }) => {
    const request = { whoMirroredPublicationId: publicationId, limit: 30 }
  
    const { data, loading, fetchMore } = useAllProfilesQuery({
      variables: {
        request
      },
      skip: !publicationId
    })
  
    const mirroredByProfiles = data?.profiles?.items as Profile[]
    const pageInfo = data?.profiles?.pageInfo
  
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
    const loadMore = async () => {
        await fetchMore({
            variables: { request: { ...request, cursor: pageInfo?.next} }
        })
    }

    if (loading) {
        return <Loader message="Loading collectors" />
    }

   

  return (
    <div className="overflow-y-auto overflow-auto display:absolute  max-h-[80vh]" id="scrollableDiv">
        <InfiniteScroll
            dataLength={mirroredByProfiles?.length ?? 0}
            scrollThreshold={0.5}
            hasMore={!!pageInfo?.next}
            next={loadMore}
            loader={<InfiniteLoader />}
            scrollableTarget="scrollableDiv"
        > 
            <div className="divide-y">
            {mirroredByProfiles?.map((profile: Profile) => (
                     <Link href={`/u/${profile.ownedBy?.id}`} key={profile.ownedBy}>
                    <div className="p-5" key={profile.ownedBy}>
                        {profile?.ownedBy ? (
                            <div className="flex gap-3  p-2 cursor-pointer font-semibold rounded items-center">
                                <div>
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full cursor-pointer"
                                        src={getAvatar(profile.ownedBy)}
                                        alt={profile.ownedBy?.handle}
                                    />
                                </div>
                             <div >
                             <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                             {profile.ownedBy.name}
                             </p>
                             <p className="capitalize text-gray-400 text-xs">
                            {formatHandle(profile?.ownedBy.handle)} {""}
                            </p>
                       </div>
                   </div>
                        ) : (
                            null
                        ) }
                        
                    </div>
                    </Link>
                ))}
            </div>
        </InfiniteScroll>
    </div>
  )
}

export default MirroredList