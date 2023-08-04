import type { Dispatch, FC } from 'react';
import { ProfileFeedType } from 'src/enums';

import MediaFilter from './Filters/MediaFilter';
import { BsCollection } from 'react-icons/bs';
import {
  ChatBubbleLeftEllipsisIcon,
  CurrencyDollarIcon,
  FilmIcon,
  PencilIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';
import TabButton from './TabButton';
import StreamOutline from '../UI/Icons/StreamOutline';

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
      <div className="text-md mt-3 flex gap-3 overflow-x-auto px-3.5 pb-2 text-blue-500 sm:mt-0 sm:px-0 md:pb-0">
        <TabButton
          name={`Feed`}
          icon={<PencilIcon className="text-md h-4 w-4 text-blue-500 " />}
          active={feedType === ProfileFeedType.Feed}
          type={ProfileFeedType.Feed.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Feed)}
        />
        <TabButton
          name={`Replies`}
          icon={
            <ChatBubbleLeftEllipsisIcon className="text-md h-4 w-4 text-blue-500" />
          }
          active={feedType === ProfileFeedType.Replies}
          type={ProfileFeedType.Replies.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Replies)}
        />
        <TabButton
          name={`Media`}
          icon={<FilmIcon className="text-md h-4 w-4 text-blue-500" />}
          active={feedType === ProfileFeedType.Media}
          type={ProfileFeedType.Media.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Media)}
        />
        <TabButton
          name={`Collected`}
          icon={<BsCollection className="text-md h-4 w-4 text-blue-500" />}
          active={feedType === ProfileFeedType.Collects}
          type={ProfileFeedType.Collects.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Collects)}
        />
        <TabButton
          name={`Subscribers`}
          icon={<CurrencyDollarIcon className="h-4 w-4" />}
          active={feedType === ProfileFeedType.Subscribers}
          type={ProfileFeedType.Subscribers.toLowerCase()}
          onClick={() => switchTab(ProfileFeedType.Subscribers)}
        />
        
      </div>
      <div>{feedType === ProfileFeedType.Media && <MediaFilter />}</div>
    </div>
  );
};

export default FeedType;
