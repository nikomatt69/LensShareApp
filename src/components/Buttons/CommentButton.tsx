import React, { useRef, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import type { FC } from "react";
import type { Publication } from "@/utils/lens";

//should also add authorisation so user cant like posttwice

interface Props {
  publication: Publication;
}

const CommentButton: FC<Props> = ({ publication }) => {
    const [alreadyCommented, setAlreadyLiked] = useState(false);
    const isMirror = publication.__typename === 'Mirror'
    const comments = isMirror ? publication.mirrorOf.stats.totalAmountOfComments : publication.stats.totalAmountOfComments

    return (
       <div className="flex gap-6">
         <Link href={`/post/${publication.id}`}> 
        <a className="md:mt-4 flex flex-col justify-center items-center cursor-pointer">        
        {alreadyCommented ? (
         
          <div className="flex items-center drop-shadow-lg border-2 border-black md:border-none bg-blue-500 rounded-lg p-2 md:p-3">
          <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#57B8FF] font-bold" />
           </div>
       
        ) : (
          <div className="flex items-center drop-shadow-lg border-2 border-black md:border-none bg-blue-500 rounded-lg p-2 md:p-3
          md:hover:bg-[#57B8FF] group relative w-max">
            <ChatBubbleLeftEllipsisIcon className='w-3 h-3 font-bold text-black' />
            <span className="hidden md:block pointer-events-none absolute -bottom-7 left-7 w-max shadow px-2 py-1 text-xs text-blue-700 opacity-0 group-hover:opacity-100"> Comment </span>
          </div>
        )}
        <p className="text-xs hidden lg:block font-semibold text-gray-400">{comments}</p>
        </a>
        </Link>
        </div>
    );
}

export default CommentButton