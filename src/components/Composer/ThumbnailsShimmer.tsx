import cn from '@/components/UI/cn';
import React, { useMemo } from 'react';
import { THUMBNAIL_GENERATE_COUNT } from './ChooseThumbnail';

const ThumbnailsShimmer = () => {
  const thumbnails = useMemo(() => Array(THUMBNAIL_GENERATE_COUNT).fill(1), []);

  return (
    <>
      {thumbnails.map((e, i) => (
        <div
          key={`${e}_${i}`}
          className={cn(
            'h-32 w-full max-w-[5rem] animate-pulse rounded-lg',
            i === 0 && 'min-w-[4rem]'
          )}
        >
          <div className="h-32 rounded-lg bg-gray-300 dark:bg-gray-700" />
        </div>
      ))}
    </>
  );
};

export default ThumbnailsShimmer;
