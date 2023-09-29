import Profiles from '@/components/Publication/Profiles';
import { FeedItem } from '@/utils/lens/generatedLenster';
import { SparklesIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

interface CombinedProps {
  feedItem: FeedItem;
}

const Combined: FC<CombinedProps> = ({ feedItem }) => {
  const { mirrors, collects, reactions } = feedItem;
  const comments = feedItem.comments ?? [];

  const mirrorsLength = mirrors.length;
  const collectsLength = collects.length;
  const reactionsLength = reactions.length;
  const commentsLength = comments?.length ?? 0;

  const getReactionsLength = () => {
    return [
      mirrorsLength,
      collectsLength,
      reactionsLength,
      commentsLength ?? 0
    ].filter((n) => n > 0).length;
  };

  const totalActions = getReactionsLength();

  const getAllProfiles = () => {
    let profiles = [...mirrors, ...collects, ...reactions, ...comments].map(
      (event) => event.profile
    );
    profiles = profiles.filter(
      (profile, index, self) =>
        index === self.findIndex((t) => t.id === profile.id)
    );
    return profiles;
  };

  return (
    <div className="lt-text-gray-500 flex flex-wrap items-center space-x-1 pb-4 text-[13px] leading-6">
      <SparklesIcon className="h-4 w-4" />
      <Profiles profiles={getAllProfiles()} />
      <div className="flex items-center space-x-1">
        {mirrorsLength ? (
          <span>
            mirrored
            {totalActions < 3 ? (totalActions !== 1 ? ' and ' : '') : ', '}
          </span>
        ) : null}
        {commentsLength ? (
          <span>
            commented
            {totalActions < 3
              ? collectsLength && reactionsLength
                ? ' and '
                : !mirrorsLength && totalActions !== 1
                ? ' and '
                : ''
              : ', '}
            {totalActions >= 3 && (!collectsLength || !reactionsLength)
              ? ' and '
              : ''}
          </span>
        ) : null}
        {collectsLength ? (
          <span>
            collected
            {totalActions >= 3 && reactionsLength
              ? ' and '
              : reactionsLength
              ? ' and '
              : ''}
          </span>
        ) : null}
        {reactionsLength ? <span>liked</span> : null}
      </div>
    </div>
  );
};

export default Combined;
