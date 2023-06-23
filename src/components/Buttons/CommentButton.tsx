import React, { useRef, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
import type { FC } from "react";
import type { Publication } from "@/utils/lens";
import { FaRegCommentAlt } from 'react-icons/fa';

//should also add authorisation so user cant like posttwice

interface Props {
  publication: Publication;
}

const CommentButton: FC<Props> = ({ publication }) => {
    const [alreadyCommented, setAlreadyLiked] = useState(false);
    const isMirror = publication.__typename === 'Mirror'
    const comments = isMirror ? publication.mirrorOf.stats.totalAmountOfComments : publication.stats.totalAmountOfComments

    return (
       <div className="flex block gap-6">
         <Link legacyBehavior href={`/bytes/${publication.id}`}> 
        <a className="md:mt-4 flex flex-col justify-center items-center cursor-pointer">        
        {alreadyCommented ? (
         
          <div className="flex items-center drop-shadow-lg rounded-full cursor-pointer md:bg-gray-200 bg-gray-600/50 dark:bg-gray-600/50 p-2 ">
          <FaRegCommentAlt  className="w-3 h-3 text-blue-700 " />
           </div>
       
        ) : (
          <div className="flex items-center drop-shadow-lg rounded-full cursor-pointer md:bg-gray-200 bg-gray-600/50 dark:bg-gray-600/50 p-2">
            <FaRegCommentAlt className='w-3 h-3 ' />
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