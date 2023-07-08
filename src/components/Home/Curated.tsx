import Timeline from '@/components/Home/Timeline'
import { APP_ID, LENSTER_APP_ID, LENSTOK_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID, LENS_CUSTOM_FILTERS, SCROLL_ROOT_MARGIN } from '@/constants'

import {useAppStore} from '@/store/app'
import type { Publication } from '@/utils/lens/generatedLenster'
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedQuery
} from '@/utils/lens/generatedLenster'
import React, { useEffect } from 'react'
import { useInView } from 'react-cool-inview'
import { EmptyState } from '../UI/EmptyState'
import Loader from '../UI/Loader'
import TimelineShimmer from './TimelineShimmer'
import App from 'next/app'

const Curated = (onDetail: (video: Publication) => void) => {
  const activeTagFilter = useAppStore((state) => state.activeTagFilter)

 

  const request = {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit: 32,
    noRandomize: false,
    sources: [LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID,APP_ID,LENSTOK_APP_ID,LENSTER_APP_ID],
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
      tags:
        activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
      mainContentFocus: [PublicationMainFocus.Video]
    }
  }

  const { data, loading, error, fetchMore } = useExploreFeedQuery({
    variables: { request }
  })

  const pageInfo = data?.explorePublications?.pageInfo
  const videos = data?.explorePublications?.items as Publication[]

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

  if (videos?.length === 0) {
    return <EmptyState message="No videos found" icon/>
  }

  return (
    <div>
      {loading && <TimelineShimmer />}
      {!error && !loading && videos && (
        <>
          <Timeline videos={videos} onDetail={onDetail} />
          {pageInfo?.next && (
            <span ref={observe} className="flex justify-center p-10">
              <Loader />
            </span>
          )}
        </>
      )}
    </div>
  )
}

export default Curated
