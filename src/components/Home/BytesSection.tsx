import {
  APP_ID,
  LENSTER_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  LENS_CUSTOM_FILTERS,
  STATIC_ASSETS_URL
} from '@/constants';

import type { Publication } from '@/utils/lens/generatedLenster';
import {
  PublicationMainFocus,
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedQuery
} from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import getLensHandle from '@/utils/functions/getLensHandle';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import { useAppStore } from '@/store/app';
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import BytesShimmer from './BytesShimmer';

import getThumbnailUrl  from '@/utils/lib/getThumbnailUrl';
import imageKit from '@/lib/imageKit';


const BytesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);


  const request = {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit: 30,
    noRandomize: false,
    sources: [LENSTUBE_BYTES_APP_ID, APP_ID],
    publicationTypes: [PublicationTypes.Post],
    customFilters: LENS_CUSTOM_FILTERS,
    metadata: {
     

      mainContentFocus: [PublicationMainFocus.Video]
    }
  };

  const { data, error, loading } = useExploreFeedQuery({
    nextFetchPolicy: 'standby',
    variables: { request }
  });

  const bytes = data?.explorePublications?.items as Publication[];

  const sectionOffsetWidth = sectionRef.current?.offsetWidth ?? 1000;
  const scrollOffset = sectionOffsetWidth / 1.2;

  const scroll = (offset: number) => {
    if (sectionRef.current) {
      sectionRef.current.scrollLeft += offset;
    }
  };

  if (loading) {
    return <BytesShimmer />;
  }

  return (
    <div className="block border-0 lg:block" data-testid="bytes-section">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
            draggable={false}
            className="h-12 w-12 md:h-16 md:w-16"
            alt="lensshare"
          />
          <h1 className="text-xl font-semibold">Bytes</h1>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => scroll(-scrollOffset)}
            className="rounded-full bg-gray-500 bg-opacity-10 p-2 backdrop-blur-xl hover:bg-opacity-25 focus:outline-none"
          >
            <ArrowLeftCircleIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(scrollOffset)}
            className="rounded-full bg-gray-500 bg-opacity-10 p-2 backdrop-blur-xl hover:bg-opacity-25 focus:outline-none"
          >
            <ArrowRightCircleIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={sectionRef}
        className="no-scrollbar relative mb-3 flex touch-pan-x items-start space-x-4 overflow-x-auto scroll-smooth"
      >
        {bytes?.map((byte) => (
          <div key={byte.id} className="w-44 space-y-1">
            <Link href={`/bytes/${byte.id}`}>
              <div className="aspect-[9/16] h-[280px]">
                <img
                  className="rounded-xl"
                  src={imageKit(getThumbnailUrl(byte.metadata))}
                  alt={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
                  draggable={false}
                />
              </div>
              <h1 className="line-clamp-2 break-words pt-2 text-[13px]">
                {byte.metadata?.name}
              </h1>
            </Link>
            <div className="flex items-end space-x-1.5">
              <Link
                href={`/u/${getLensHandle(byte.profile?.id)}`}
                className="flex-none"
                title={getLensHandle(byte.profile.id)}
              >
                <img
                  className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-800"
                  src={getProfilePicture(byte.profile, 'avatar')}
                  alt={getLensHandle(byte.profile?.handle)}
                  draggable={false}
                />
              </Link>
              <span className="text-xs leading-3 opacity-70">
                {byte.stats?.totalUpvotes} likes
              </span>
            </div>
          </div>
        ))}
      </div>
      <hr className="border-theme my-8 border-opacity-10" />
    </div>
  );
};

export default BytesSection;
