
import type { Publication } from '@/types/lens'
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreQuery
} from '@/utils/lens'
import React from 'react'
import { useInView } from 'react-cool-inview'
import { LENS_CUSTOM_FILTERS, SCROLL_ROOT_MARGIN, STATIC_ASSETS_URL, STATIC_IMAGES_URL } from '@/constants'

import Item from './Item'
import { useAppStore } from '@/store/app'
import MetaTags from '../UI/MetaTags'
import Loader from '../UI/Loader'
import EchosShimmer from './EchosShimmer'
import { EmptyState } from '../UI/EmptyState'

const Curated = () => {
  const activeTagFilter = useAppStore((state) => state.activeTagFilter)

  const request = {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit: 32,
    noRandomize: false,
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
      tags:
        activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
      mainContentFocus: [PublicationMainFocus.Audio]
    }
  }

  const { data, loading, error, fetchMore } = useExploreQuery({
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
    return <EmptyState message={"No echoes found"} icon  />
  }

  return (
    <div>
      <MetaTags title="Echos" />
      {loading && <EchosShimmer />}
      {!error && !loading && videos && (
        <>
          <div className="desktop:grid-cols-6 ultrawide:grid-cols-7 laptop:grid-cols-4 mx-auto mt-4 grid grid-cols-2 place-items-center gap-2 md:grid-cols-3 md:gap-3">
            {videos?.map((publication: Publication) => (
              <Item publication={publication} key={publication.id} />
            ))}
          </div>
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
