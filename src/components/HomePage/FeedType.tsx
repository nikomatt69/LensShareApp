import {
  LightBulbIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

import { t } from '@lingui/macro';
import type { Dispatch, FC, SetStateAction } from 'react';
import TabButton from '../UI/TabButton';
import { HomeFeedType } from '@/enums';
import { useAppStore } from '@/store/app';

interface FeedTypeProps {
  setFeedType: Dispatch<SetStateAction<HomeFeedType>>;
  feedType: HomeFeedType;
}

const FeedType: FC<FeedTypeProps> = ({ setFeedType, feedType }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  return (
    <div className="flex flex-wrap items-center justify-between px-1 md:px-0">
      <div className="flex gap-3 overflow-x-auto sm:px-0">
        <TabButton
          className='text-blue-700'
          name={`Following`}
          icon={<UserGroupIcon className="h-4 w-4 text-blue-700" />}
          active={feedType === HomeFeedType.FOLLOWING}
          onClick={() => {
            setFeedType(HomeFeedType.FOLLOWING);
       
          }}
        />
        {currentProfile ? (
          <TabButton
            className='text-blue-700'
            name={`For you`}
            icon={<SparklesIcon className="h-4 w-4 text-blue-700" />}
            active={feedType === HomeFeedType.FOR_YOU}
            onClick={() => {
              setFeedType(HomeFeedType.FOR_YOU);
         
            }}
          />
        ) : null}
        <TabButton
          className='text-blue-700'
          name={`Highlights`}
          icon={<LightBulbIcon className="h-4 w-4 text-blue-700" />}
          active={feedType === HomeFeedType.HIGHLIGHTS}
          onClick={() => {
            setFeedType(HomeFeedType.HIGHLIGHTS);
           ;
          }}
        />
      </div>
     
    </div>
  );
};

export default FeedType;
