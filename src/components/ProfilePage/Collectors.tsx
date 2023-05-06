import { useCollectorsQuery } from '@/types/graph'
import Image from 'next/image'
import React, { FC } from 'react'
import Loader from '../UI/Loader'
import getAvatar from '@/lib/getAvatar'
import { GoVerified } from 'react-icons/go'
import InfiniteLoader from '../UI/InfiniteLoader'
import InfiniteScroll from 'react-infinite-scroll-component'
import formatHandle from '@/utils/functions/formatHandle'

interface Props {
    publicationId: string
}

const Collectors: FC<Props> = ({publicationId}) => {

    const request = { publicationId: publicationId, limit: 10 }

    const { data, loading, error, fetchMore } = useCollectorsQuery({
        variables: { request },
        skip: !publicationId
    })

    const profiles = data?.whoCollectedPublication?.items
    const pageInfo = data?.whoCollectedPublication?.pageInfo
    const hasMore = pageInfo?.next && profiles?.length !== pageInfo.totalCount

    const loadMore = async () => {
        await fetchMore({
            variables: { request: { ...request, cursor: pageInfo?.next} }
        })
    }

    if (loading) {
        return <Loader message="Loading collectors" />
    }

    if (profiles?.length === 0) {
        return (
        <div className="p-5">
            No Collectors
        </div>
        )
    }

  return (
    <div className="overflow-y-auto max-h-[80vh]" id="scrollableDiv">
        <InfiniteScroll
            dataLength={profiles?.length ?? 0}
            scrollThreshold={0.5}
            hasMore={hasMore}
            next={loadMore}
            loader={<InfiniteLoader />}
            scrollableTarget="scrollableDiv"
        > 
            <div className="divide-y">
                {profiles?.map((wallet) => (
                    <div className="p-5" key={wallet?.address}>
                        {wallet?.defaultProfile ? (
                            <div className="flex gap-3  p-2 cursor-pointer font-semibold rounded items-center">
                                <div>
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full cursor-pointer"
                                        src={getAvatar(wallet?.defaultProfile)}
                                        alt={wallet?.defaultProfile?.handle}
                                    />
                                </div>
                                <div className="flex">
                                    <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                        {(wallet?.defaultProfile?.name)}
                                      
                                    </p>
                                </div>
                            </div>
                        ) : (
                            null
                        ) }
                        
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    </div>
  )
}

export default Collectors