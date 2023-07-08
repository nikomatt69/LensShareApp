
import type { Dispatch, FC } from 'react';
import { ProfileFeedType } from 'src/enums';

import MediaFilter from './Filters/MediaFilter';
import { BsCollection } from 'react-icons/bs';
import { ChatBubbleLeftEllipsisIcon, FilmIcon, PencilIcon, PhotoIcon } from '@heroicons/react/24/outline';
import TabButton from './TabButton';

interface FeedTypeProps {
  setFeedType: Dispatch<string>;
  feedType: string;
}

const FeedType: FC<FeedTypeProps> = ({ setFeedType, feedType }) => {
  const switchTab = (type: string) => {
    setFeedType(type);
   
  };

  return (
    <div className="flex items-center justify-between">
      <div className="mt-3 flex gap-3 text-md text-blue-500 overflow-x-auto px-5 pb-2 sm:mt-0 sm:px-0 md:pb-0">
        <TabButton
          name={`Feed`}
          icon={<PencilIcon className="h-4 w-4 text-md text-blue-500 " />}
          active={feedType === ProfileFeedType.Feed}
          type={ProfileFeedType.Feed.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Feed)}
        />
        <TabButton
          name={`Replies`}
          icon={<ChatBubbleLeftEllipsisIcon className="h-4 w-4 text-md text-blue-500" />}
          active={feedType === ProfileFeedType.Replies}
          type={ProfileFeedType.Replies.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Replies)}
        />
        <TabButton
          name={`Media`}
          icon={<FilmIcon className="h-4 w-4 text-md text-blue-500" />}
          active={feedType === ProfileFeedType.Media}
          type={ProfileFeedType.Media.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Media)}
        />
        <TabButton
          name={`Collected`}
          icon={<BsCollection className="h-4 w-4 text-md text-blue-500" />}
          active={feedType === ProfileFeedType.Collects}
          type={ProfileFeedType.Collects.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Collects)}
        />
        
      </div>
      <div>{feedType === ProfileFeedType.Media && <MediaFilter />}</div>
    </div>
  );
};

export default FeedType;
