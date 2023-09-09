import type { Publication } from '@/utils/lens/generatedLenster';
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedQuery
} from '@/utils/lens/generatedLenster';
import React from 'react';
import { useInView } from 'react-cool-inview';
import {
  LENS_CUSTOM_FILTERS,
  SCROLL_ROOT_MARGIN,
  STATIC_ASSETS_URL,
  STATIC_IMAGES_URL
} from '@/constants';

import Item from './Item';
import { useAppStore } from '@/store/app';
import MetaTags from '../UI/MetaTags';
import Loader from '../UI/Loader';
import EchosShimmer from './EchosShimmer';
import { EmptyState } from '../UI/EmptyState';

import Search from '../Search/Search';
import SearchAudio from '../Search/SearchAudio';
import imageKit from '@/lib/imageKit';

const Curated = () => {


  const request = {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit: 12,
    noRandomize: false,
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
      
     
      mainContentFocus: [PublicationMainFocus.Audio]
    }
  };

  const { data, loading, error, fetchMore } = useExploreFeedQuery({
    variables: { request }
  });

  const pageInfo = data?.explorePublications?.pageInfo;
  const videos = data?.explorePublications?.items as Publication[];

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
      });
    }
  });

  if (videos?.length === 0) {
    return <EmptyState message={'No echoes found'} icon />;
  }

  return (
    <div>
      
      {loading && <EchosShimmer />}
      {!error && !loading && videos && (
        <>
        <div className="flex mb-5 items-center space-x-2">
          <img
            src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
            draggable={false}
            className="h-12 w-12 md:h-16 md:w-16"
            alt="lensshare"
          />
          <h1 className="text-xl font-semibold">Music</h1>
        </div>
          <div className="desktop:grid-cols-6 ultrawide:grid-cols-7 laptop:grid-cols-4 mx-auto mt-4 grid grid-cols-2 place-items-center gap-2 md:grid-cols-3 md:gap-3">
          
            {videos?.map((publication: Publication) => (
              <Item publication={publication} key={publication.id} />
            ))}
          </div>
          {pageInfo?.next && (
            <span ref={observe} className="flex justify-center border-0 p-10">
              <Loader />
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Curated;
