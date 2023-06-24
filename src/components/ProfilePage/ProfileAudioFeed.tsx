//mapping for the prfile vids
import React, { useRef, useState } from 'react';
import Link from "next/link";
import { PublicationsDocument, PublicationsQueryRequest, PaginatedPublicationResult, Publication, PublicationMainFocus} from "@/types/lens";
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import type { FC } from "react";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import { BsPlay } from "react-icons/bs";
import { APP_ID, LENSTER_APP_ID, LENSTOK_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID } from '@/constants';
import getMedia from '@/lib/getMedia';
import AudioPlayer from '../UI/AudioPlayer';


  const ProfileAudioFeed = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const { id } = router.query
    

  const { data, loading, error } = useQuery
  <{publications: PaginatedPublicationResult}>
  ((PublicationsDocument), {
    variables: { 
      request: {
        sources: [LENSTUBE_BYTES_APP_ID, LENSTOK_APP_ID, APP_ID,LENSTER_APP_ID,LENSTUBE_APP_ID],
        profileId: id,
        publicationTypes: ["POST"],
        limit: 10,
        metadata: {
          mainContentFocus: [PublicationMainFocus.Audio],
        },
      }
     },
  });

    const publications = data?.publications.items;
    console.log("DATA", data?.publications?.items);

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
            <div className="grid  gap-2 pl-1 pr-1 mt-2 mb-2 lg:grid-cols-3 md:gap-y-6 gap-x-4 gap-y-2 3xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
            {publications?.map((pub) => (
                <div key={pub.id}>
                    <Link href={`/bytes/${pub.id}`} key={pub.id}>
                        <a  className="block h-0 border-2 border-blue-500 rounded-lg relative pb-[131%]">
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
                        className="absolute inset-0 h-full w-full object-cover rounded-md transform transition duration-500 md:hover:scale-125 md:hover:z-10 md:hover:border border-white"
                        /> 
                         <p className="absolute left-3 bottom-3 text-white font-semibold text-xs">
                        {pub.metadata.name}
                        
                        </p> 
                        </a>
                     </Link>
                </div>
             ))}
             </div>
         )}
  </div>
            )}
  
  export default ProfileAudioFeed;