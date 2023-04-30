import React, { useRef, useState } from 'react';
import Link from "next/link";
import { PublicationsDocument, PublicationsQueryRequest, PaginatedPublicationResult} from "@/types/lens";
import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import type { FC } from "react";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import { BsPlay } from "react-icons/bs";


  const MirrorVideos = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();
    const { id } = router.query

  const { data, loading, error } = useQuery
  <{publications: PaginatedPublicationResult}>
  ((PublicationsDocument), {
    variables: { 
      request: {
        profileId: id,
        publicationTypes: ["MIRROR"],
        limit: 10,
        metadata: {
          mainContentFocus: ["VIDEO"],
        },
      }
     },
  });

    const publications = data?.publications.items;
    console.log("DATA", data?.publications?.items);

    const onVideoClick = () => {
        if (isPlaying) {
          videoRef?.current?.pause();
          setIsPlaying(false);
        } else {
          videoRef?.current?.play();
          setIsPlaying(true);
        }
      };

    return (
  <div>
        {publications?.length === 0 ? (
            <p className="text-center">No videos yet</p>
           ) : (
            <div className="grid gap-2 mr-2 mt-2 lg:grid-cols-3 md:gap-y-8 gap-y-2 3xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
            {publications?.map((pub) => (
                <div key={pub.id}>
                    <Link href={`/post/${pub.id}`} key={pub.id}>
                        <a className="block h-0 relative pb-[131%]">
                        <video
                        ref={videoRef}
                        loop
                        src={sanitizeIpfsUrl(pub.metadata.media[0].original.url)}
                        className="absolute inset-0 h-full w-full object-cover rounded"
                        


                        /> 
                        <BsPlay onClick={onVideoClick} className="absolute left-3 bottom-3 fill-white w-7 h-7" />
                        </a>
                     </Link>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {pub.metadata.name}
                    </p>
                </div>
             ))}
             </div>
         )}
        </div>
            )}
  
  export default MirrorVideos;