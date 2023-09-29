import cn from '@/components/UI/cn';
import React from 'react';

export const CardShimmer = ({ rounded = true }) => {
  return (
    <div className={cn('w-full', rounded && 'rounded-sm')}>
      <div className="flex animate-pulse flex-col space-x-2">
        <div
          className={cn(
            'aspect-h-9 aspect-w-16 bg-gray-300 dark:bg-gray-700',
            rounded && 'rounded-sm'
          )}
        />
      </div>
    </div>
  );
};

const VideoCardShimmer = () => {
  return (
    <div className="w-full rounded-sm">
      <div className="flex animate-pulse flex-col space-x-2">
        <div className="aspect-h-9 aspect-w-16 rounded-sm bg-gray-300 dark:bg-gray-700" />
        <div className="flex space-x-2 py-3">
          <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-2 py-1">
            <span className="space-y-2">
              <div className="h-2 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-2 rounded bg-gray-300 dark:bg-gray-700" />
            </span>
            <div>
              <div className="grid grid-cols-3">
                <div className="col-span-2 h-2 rounded bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
