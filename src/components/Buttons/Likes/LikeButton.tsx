import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Publication } from '@/utils/lens';
import Like from './Like';
import { useAppStore } from '@/store/app';

interface Props {
  publication: Publication
}

const LikeButton: FC<Props> = ({publication }) => {
  const [liked, setLiked] = useState(false)
  const isMirror = publication.__typename === 'Mirror'
  const [count, setCount] = useState(isMirror ? publication.mirrorOf.stats.totalUpvotes : publication.stats.totalUpvotes)
  const currentProfile = useAppStore((state) => state.currentProfile);


  useEffect(() => {
    if (publication?.reaction === 'UPVOTE') {
      setLiked(true)
    } else {
      setLiked(false)
    }
    if (!currentProfile) {
      setLiked(false)
    }
  }, [publication?.reaction])
  

  return (
    <div className="flex block gap-6">
    <div className=" md:mt-4 flex flex-col justify-center items-center cursor-pointer">
      <Like setCount={setCount} count={count} setLiked={setLiked} liked={liked} publication={publication as Publication} />
        <p className="text-xs hidden lg:block font-semibold text-gray-400"> {count} </p>
      </div>
    </div>
  );
}

export default LikeButton; 