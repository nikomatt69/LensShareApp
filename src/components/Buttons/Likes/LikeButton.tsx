import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Publication } from '@/utils/lens/generatedLenster';
import Like from './Like';
import { useAppStore } from '@/store/app';

interface Props {
  publication: Publication;
}

const LikeButton: FC<Props> = ({ publication }) => {
  const [liked, setLiked] = useState(false);
  const isMirror = publication.__typename === 'Mirror';
  const [count, setCount] = useState(
    isMirror
      ? publication.mirrorOf.stats.totalUpvotes
      : publication.stats.totalUpvotes
  );
  const currentProfile = useAppStore((state) => state.currentProfile);

  useEffect(() => {
    if (publication?.reaction === 'UPVOTE') {
      setLiked(true);
    } else {
      setLiked(false);
    }
    if (!currentProfile) {
      setLiked(false);
    }
  }, [publication?.reaction]);

  return (
    <div className="block flex gap-6">
      <div className=" flex cursor-pointer flex-col items-center justify-center md:mt-4">
        <Like
          setCount={setCount}
          count={count}
          setLiked={setLiked}
          liked={liked}
          publication={publication as Publication}
        />
        <p className="hidden text-xs font-semibold text-gray-400 lg:block">
          {' '}
          {count}{' '}
        </p>
      </div>
    </div>
  );
};

export default LikeButton;
