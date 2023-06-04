import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Publication } from '@/utils/lens';
import { useAppStore } from '@/store/app';
import ShareModal from '../HomePage/ShareModal';
import { ShareIcon } from '@heroicons/react/24/solid';

interface Props {
  publication: Publication
}

const ShareButton: FC<Props> = ({publication }) => {
  const [liked, setLiked] = useState(false)
  const isMirror = publication.__typename === 'Mirror'
  const [count, setCount] = useState(isMirror ? publication.mirrorOf.stats.totalUpvotes : publication.stats.totalUpvotes)
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showShare, setShowShare] = useState(false);



  

  return (
    <div className="flex gap-6">
    <div className=" drop-shadow-lg  md:border-none bg-blue-500 border-2 border-black rounded-lg p-2 md:p-3 md:mt-4 flex flex-col justify-center items-center cursor-pointer" onClick={() => setShowShare(true)}>
      <ShareModal show={showShare} setShowShare={setShowShare}  publication={publication as Publication} />
       <p><ShareIcon onClick={() => setShowShare(true)} className="h-4 w-4 bg-blue-500 rounded-lg border-2 border-black p-2 text-black hover:text-gray-500" /> </p>
      </div>
    </div>
  );
}

export default ShareButton; 