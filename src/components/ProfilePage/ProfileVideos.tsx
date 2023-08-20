//mapping for the prfile vids
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  PublicationsDocument,
  PublicationsQueryRequest,
  PaginatedPublicationResult,
  Publication,
  PublicationMainFocus,
  PublicationSortCriteria
} from '@/types/lens';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import { BsPlay } from 'react-icons/bs';
import {
  APP_ID,
  LENSTER_APP_ID,
  LENSTOK_APP_ID,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  ORB_APP_ID
} from '@/constants';
import getMedia from '@/lib/getMedia';
import Loading from '../Loading';
import { useInView } from 'react-cool-inview';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteLoader from '../UI/InfiniteLoader';
import Loader from '../UI/Loader';
import { date } from 'zod';


const ProfileVideos = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const timestamp= {formatTime(date: Date | undefined) { (date?.getDay)}}
 

  
   

 

  const  { data, loading, error,fetchMore } = useQuery<{
    publications: PaginatedPublicationResult;
  }>(PublicationsDocument, {
    variables: {
      expiresAt:{timestamp},
      request: {
        sources: [
          LENSTUBE_BYTES_APP_ID,
          LENSTOK_APP_ID,
          APP_ID,
          LENSTER_APP_ID,
          LENSTUBE_APP_ID,
          ORB_APP_ID
        ],
        profileId: id,
        publicationTypes: ['POST'],
        limit: 10,
        metadata: {
          mainContentFocus: [PublicationMainFocus.Video,PublicationMainFocus.Image]
        },
     
      }
    }
  });
 



  const publications = data?.publications.items;
  console.log('DATA', data?.publications?.items);

  const pageInfo = data?.publications?.pageInfo?.next;
  

  const hasMore = pageInfo?.next  ;


  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            
            cursor: pageInfo?.next,
      
           
          }
        }
      });
    }
  });



  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };

  return (
    <InfiniteScroll
        className='overflow-y-auto'
        scrollThreshold={0.5}
        hasMore={hasMore}
        next={observe}
    
        loader={<Loader/>}
        scrollableTarget="scrollableDiv" dataLength={0}>
   
       
      {publications?.length === 0 ? (
        <p className="text-center">No videos yet</p>
      ) : (
        <div className=" xs:grid-col-3 mb-2 mt-2 grid-cols-3 gap-2 gap-x-4 gap-y-2 pl-1 pr-1 sm:grid-cols-3 md:grid-cols-3 md:gap-y-6 lg:grid-cols-3">
         
          {publications?.map((pub) => (
            <div key={pub.id}>
              <Link href={`/post/${pub.id}`} key={pub.id}>
                <div className="relative  h-0 overflow-y-hidden rounded-lg border-2 border-blue-500 pb-[131%]">
                  <video
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
                </div>
              </Link>
            </div>
          ))}
           
          
        </div>
      )}
     
   
    </InfiniteScroll>
  );
};

export default ProfileVideos;
