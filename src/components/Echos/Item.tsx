import useEchoStore from '@/store/echos';
import cn from '@/components/UI/cn';
import type { Publication } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { BsPlay } from 'react-icons/bs';
import { FcDvdLogo } from 'react-icons/fc';

import getAvatar from '@/lib/getAvatar';
import getMedia from '@/lib/getMedia';
import imageProxy from '@/lib/imageProxy';
import { Image } from '@/components/UI/Image';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import getThumbnailUrl from '@/utils/lib/getThumbnailUrl';

type Props = {
  publication: Publication;
};

const Item: FC<Props> = ({ publication }) => {
  const setSelectedTrack = useEchoStore((state) => state.setSelectedTrack);

  const onPlayPause = (track: Publication) => {
    setSelectedTrack(track);
  };

  return (
    <div className="flex h-full w-full flex-col rounded-sm p-2">
      <div className="group relative flex justify-center">
        <Image
          src={getThumbnailUrl(publication.metadata)}
          className="w-full rounded-lg object-cover transition duration-300 ease-in-out group-hover:scale-105 md:h-[220px]"
          alt={publication?.id.name}
        />
        <button
          onClick={() => onPlayPause(publication)}
          className={cn(
            'invisible absolute bottom-2.5 left-2.5 rounded-full bg-white dark:bg-gray-900/70 p-2 outline-none backdrop-blur-lg transition-all duration-100 ease-in-out group-hover:visible'
          )}
        >
          {publication?.id === 'selectedTrack?.id' ? (
            <FcDvdLogo className="animate-spin-slow text-black dark:text-white h-7 w-7" />
          ) : (
            <BsPlay className="h-7 w-7 pl-0.5 text-black dark:text-white" />
          )}
        </button>
      </div>
      <div className="mt-1">
        <Link
          href={`/u/${publication?.profile?.id}`}
          className="text-xs font-medium uppercase opacity-80 text-black dark:text-white hover:underline hover:opacity-70"
        >
          {publication?.profile?.handle}
        </Link>
        <Link
          href={`/post/${publication?.id}`}
          className="md:text-md line-clamp-1 text-sm text-black dark:text-white font-semibold hover:opacity-70"
        >
          {publication?.metadata?.name}
        </Link>
      </div>
    </div>
  );
};

export default Item;
