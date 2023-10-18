import {
  LightBulbIcon,
  SparklesIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

import { t } from '@lingui/macro';
import type { Dispatch, FC, SetStateAction } from 'react';

import { HomeFeedType } from '@/enums';
import { useAppStore } from '@/store/app';
import { BiInfinite, BiWorld } from 'react-icons/bi';

import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import TabButton from './UI/TabButton';
import ExploreOutline from './UI/Icons/ExploreOutline';


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
          className="text-blue-700"
          name={`Highlights`}
          icon={<LightBulbIcon className="h-4 w-4 text-blue-700" />}
          active={feedType === HomeFeedType.HIGHLIGHTS}
          onClick={() => {
            setFeedType(HomeFeedType.HIGHLIGHTS);
          }}
        />
        <TabButton
          className="text-blue-700"
          name={`Latest`}
          icon={<ExploreOutline className="h-4 w-4 text-blue-700" />}
          active={feedType === HomeFeedType.LATEST}
          onClick={() => {
            setFeedType(HomeFeedType.LATEST);
          }}
        />
         <TabButton
          className="text-blue-700"
          name={`Explore`}
          icon={<BiWorld className="h-4 w-4 text-blue-700" />}
          active={feedType === HomeFeedType.EXPLORE}
          onClick={() => {
            setFeedType(HomeFeedType.EXPLORE);
          }}
        />
         <TabButton
          className="text-blue-700"
          name={`Music`}
          icon={<MusicalNoteIcon className="h-4 w-4 text-blue-700" />}
          active={feedType === HomeFeedType.MUSIC}
          onClick={() => {
            setFeedType(HomeFeedType.MUSIC);
          }}
        />
      </div>
    </div>
  );
};

export default FeedType;
