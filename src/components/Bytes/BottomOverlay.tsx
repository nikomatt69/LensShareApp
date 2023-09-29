import { formatNumber } from '@/utils/functions/formatNumber';
import { Profile, Publication } from '@/utils/lens/generatedLenster';
import getProfilePicture from '@/utils/lib/getProfilePicture';
import Link from 'next/link';
import { FC, useState } from 'react';
import Follow from '../Profile/Follow';
import FollowButton from '../Buttons/FollowButton';
import UnfollowButton from '../Buttons/UnfollowButton';
import getAvatar from '@/lib/getAvatar';
import useAverageColor from '@/utils/hooks/useAverageColor';
import Unfollow from '../Profile/Unfollow';

type Props = {
  video: Publication;
};

const BottomOverlay: FC<Props> = ({ video }) => {
  const subscribeType = video.profile?.followModule?.__typename;
  const channel = video.profile;
  const [following, setFollowing] = useState(false);

  return (
    <div className="from-trasparent absolute bottom-0 left-0 right-0 z-[1] mb-24 rounded-xl  bg-gradient-to-t to-transparent px-3 pb-3 text-xs text-gray-400 md:rounded-b-xl">
      <div className="pb-2">
        <Link href={`/post/${video?.id}`} key={video.id}>
          <h1 className="backdrop-brightness-25 backdrop-contrast-20 line-clamp-2 flex-grow rounded-xl px-3 py-2 text-xs text-gray-200 backdrop-blur-sm">
            {video.metadata.name}
          </h1>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <Link
            href={`/u/${channel?.id}`}
            className="backdrop-brightness-25 backdrop-contrast-20 flex flex-none cursor-pointer items-center space-x-2 rounded-xl px-3 py-2 backdrop-blur-sm"
          >
            <img
              src={getAvatar(channel)}
              className="h-9 w-9 rounded-full"
              draggable={false}
              alt={channel?.handle}
            />
            <div className="flex min-w-0 flex-col items-start text-xs text-gray-200">
              <h6 className="flex max-w-full items-center space-x-1">
                <span className="truncate text-xs text-gray-200">
                  {channel?.name}
                </span>
              </h6>
              <span className="inline-flex items-center space-x-1 text-xs text-gray-200">
                {formatNumber(channel?.stats.totalFollowers)} Followers
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          {following ? (
            <UnfollowButton
              setFollowing={setFollowing}
              profile={channel as Profile}
            />
          ) : (
            <FollowButton
              setFollowing={setFollowing}
              profile={channel as Profile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BottomOverlay;
