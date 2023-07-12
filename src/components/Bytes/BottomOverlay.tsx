import type { Publication } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import React from 'react';
import { Tooltip } from '../UI/Tooltip';

type Props = {
  video: Publication;
  btnSize?: 'sm' | 'md' | 'lg' | 'xl';
};

const BottomOverlay: FC<Props> = ({ video, btnSize }) => {
  const subscribeType = video.profile?.followModule?.__typename;
  const profile = video.profile;
  return (
    <div className="z-[1] mr-1 pb-3 md:rounded-b-xl">
      <div className="flex justify-between">
        <div>
          <Link href={`/u/${profile?.id}`}>
            <span className="text-base font-bold">{video.profile.name}</span>
            <span className="inline-flex text-sm font-thin">
              @{video.profile.id} &nbsp;{' '}
            </span>
          </Link>
          <Link href={`/bytes/${video.id}`} key={video.id}>
            <h1 className="mt-2 line-clamp-2 text-base font-normal">
              {video.metadata.name}{' '}
              <span>
                {video.metadata.tags?.map((tag) => (
                  <span key={tag} className="font-bold">
                    #{tag}
                  </span>
                ))}
              </span>
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomOverlay;
