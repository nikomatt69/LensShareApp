import { Profile } from '@/utils/lens/generatedLenster';
import type { Dispatch, FC } from 'react';
import { Button } from '../UI/Button';
import Follow from './Follow';
import formatHandle from '@/utils/functions/formatHandle';
import getAvatar from '@/lib/getAvatar';
import Slug from '../UI/Slug';
import { Image } from '../UI/Image';

interface FollowModalProps {
  profile: Profile;
  setShowFollowModal: Dispatch<boolean>;
  setFollowing: Dispatch<boolean | null>;
}

const FollowModal: FC<FollowModalProps> = ({
  profile,
  setFollowing,
  setShowFollowModal
}) => {
  const followType = profile?.followModule?.__typename;

  return (
    <div className="p-5">
      <div className="flex justify-between text-lg font-bold">
        <span className="flex">
          <Image
            src={getAvatar(profile)}
            className="mr-2 h-10 w-10 rounded-full border bg-gray-200 dark:border-gray-700"
            alt={formatHandle(profile?.handle)}
          />
          <Slug
            className="flex items-center"
            slug={formatHandle(profile?.handle)}
            prefix="@"
          />{' '}
        </span>
        <span className="flex">
          <div className="flex space-x-2">
            <Follow
              profile={profile}
              setFollowing={setFollowing}
              showText
              outline={false}
            />
          </div>

          <Button
            className="ml-3 !px-3 !py-1.5 text-sm"
            outline
            onClick={() => {
              setShowFollowModal(false);
            }}
            aria-label={`Not now`}
          >
            Not now
          </Button>
        </span>
      </div>
    </div>
  );
};

export default FollowModal;
