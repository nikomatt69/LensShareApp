//mapping for the prfile vids
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  PublicationDocument,
  PublicationsQueryRequest,
  PaginatedPublicationResult,
  Publication,
  PublicationMainFocus
} from '@/utils/lens/generatedLenster';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { BsPlay } from 'react-icons/bs';
import {
  APP_ID,
  LENSTER_APP_ID,
  LENSTOK_APP_ID,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID
} from '@/constants';
import getMedia from '@/lib/getMedia';
import AudioPlayer from '../UI/AudioPlayer';

const ProfileAudioFeed = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery<{
    publications: PaginatedPublicationResult;
  }>(PublicationDocument, {
    variables: {
      request: {
        sources: [
          LENSTUBE_BYTES_APP_ID,
          LENSTOK_APP_ID,
          APP_ID,
          LENSTER_APP_ID,
          LENSTUBE_APP_ID
        ],
        profileId: id,
        publicationTypes: ['POST'],
        limit: 10,
        metadata: {
          mainContentFocus: [PublicationMainFocus.Audio]
        }
      }
    }
  });

  const publications = data?.publications.items;
  console.log('DATA', data?.publications?.items);

  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };

  return (
    <div>
      {publications?.length === 0 ? (
        <p className="text-center">No Music yet</p>
      ) : (
        <div className="3xl:grid-cols-4  xs:grid-col-1 mb-2 mt-2 grid gap-2 gap-x-4 gap-y-2 pl-1 pr-1 sm:grid-cols-2 md:grid-cols-3 md:gap-y-6 lg:grid-cols-3">
          {publications?.map((pub) => (
            <div key={pub.id}>
              <Link href={`/post/${pub.id}`} key={pub.id}>
                <a className="relative block h-0 rounded-lg border-2 border-blue-500 pb-[131%]">
                  <audio
                    loop
                    autoPlay
                    playsInline
                    draggable={false}
                    preload="metadata"
                    ref={videoRef}
                    src={getMedia(pub as Publication)}
                    muted // Needs to be there to be able to play
                    onMouseOver={handleOnMouseOver}
                    onMouseOut={handleOnMouseOut}
                    className="absolute inset-0 h-full w-full transform rounded-md border-white object-cover transition duration-500 md:hover:z-10 md:hover:scale-125 md:hover:border"
                  />
                  <p className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                    {pub.metadata.name}
                  </p>
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileAudioFeed;
