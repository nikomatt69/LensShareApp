import VideoCard from '@/components/HomePage/VideoCard'
import  Loader  from '@/components/UI/Loader'
import {EmptyState} from '@/components/UI/EmptyState'
import {useAppStore} from '@/store/app'
import type { FeedItem, Publication } from '@/utils/lens'
import { FeedEventItemType, PublicationMainFocus, useFeedQuery } from '@/utils/lens'
import React from 'react'
import { useInView } from 'react-cool-inview'
import Custom400 from '@/pages'
import Loading from '../Loading'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card } from '../UI/Card'


const Feed = () => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  


  const request = {
    limit: 20,
    feedEventItemTypes: [FeedEventItemType.Post],
    profileId: currentProfile?.id,
    metadata: {
      
      mainContentFocus: [PublicationMainFocus.Video]
    }
  }

  const { data, loading, error, fetchMore } = useFeedQuery({
    variables: {
      request
    },
    skip: !currentProfile?.id
  })

  const pub = data?.feed?.items as FeedItem[]
  const pageInfo = data?.feed?.pageInfo

  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            cursor: pageInfo?.next,
            ...request
          }
        }
      })
    }
  })

  if (pub?.length === 0) {
    return (
      <EmptyState message={'No video on your Feed'} icon={undefined} />
    )
  }

  if (!loading && error) {
    return <Custom400 />
  }

  return (
    <div>
 <InfiniteScroll
  dataLength={pub?.length ?? 0}
  next={() => {}}
  hasMore={true}
  loader={pageInfo?.next && (
    <span ref={observe} className="flex justify-center p-10">
      <Loading />
    </span>
  )}
  endMessage={
    <p style={{ textAlign: "center" }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
 >
 <Card className="rounded-xl px-3">
  {pub?.map((feedItem: FeedItem) => {
              const pub = feedItem.root
              return (
                <VideoCard
                  key={`${pub?.id}_${pub.createdAt}`}
                  publication={pub as Publication}
                />
              )
            })}
 </Card>
 </InfiniteScroll>
 </div>
  )
}


export default Feed
