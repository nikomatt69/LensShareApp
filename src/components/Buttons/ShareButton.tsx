import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Publication } from '@/utils/lens/generatedLenster';
import { useAppStore } from '@/store/app';
import ShareModal from '../HomePage/ShareModal';
import { ShareIcon } from '@heroicons/react/24/solid';
import ShareOutline from '../Bytes/ShareOutline';

interface Props {
  publication: Publication;
}

const ShareButton: FC<Props> = ({ publication }) => {
  const [liked, setLiked] = useState(false);
  const isMirror = publication.__typename === 'Mirror';
  const [count, setCount] = useState(
    isMirror
      ? publication.mirrorOf.stats.totalUpvotes
      : publication.stats.totalUpvotes
  );
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showShare, setShowShare] = useState(false);

  return (
    <div className="flex gap-6">
      <div
        className="  flex cursor-pointer  flex-col items-center justify-center rounded-full  bg-gray-600/50 p-2 dark:bg-gray-600/50 md:mt-2 md:bg-gray-200 md:text-black dark:text-white"
        onClick={() => setShowShare(true)}
      >
        <ShareModal
          show={showShare}
          setShowShare={setShowShare}
          publication={publication}
        />
        <p>
          <ShareOutline
            onClick={() => setShowShare(true)}
            className="h-3 w-3  cursor-pointer  rounded-full"
          />{' '}
        </p>
      </div>
    </div>
  );
};

export default ShareButton;
