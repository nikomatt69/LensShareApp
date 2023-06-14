
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import { Profile, useProfileQuery } from '@/utils/lens/generated';
import { type FC } from 'react';
import Image from 'next/image';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';

interface SpaceUserProps {
  peer: {
    peerId: string;
    role: any;
    mic: MediaStreamTrack;
    cam: MediaStreamTrack;
    displayName: string;
  };
}

const SpaceUser: FC<SpaceUserProps> = ({ peer }) => {
  const profileId = peer.displayName;

  const { data, loading } = useProfileQuery({
    variables: { request: { profileId } },
    skip: !profileId || profileId === 'Guest'
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.profile) {
    return null;
  }

  const profile = data?.profile as Profile;

  const UserAvatar = () => (
    <Image
      src={getAvatar(profile)}
      loading="lazy"
      className="h-10 w-10 rounded-full border bg-gray-200 dark:border-gray-700 sm:h-12 sm:w-12"
      alt={formatHandle(profile?.handle)}
    />
  );

  const UserName = () => (
    <div className="flex items-center">
      <div className="max-w-[80px] truncate text-sm sm:max-w-[120px]">
        {sanitizeDisplayName(profile?.name) ?? formatHandle(profile?.handle)}
      </div>
      
    </div>
  );

  return (
    <div className="flex flex-col items-center space-y-2">
      <UserAvatar />
      <div className="space-y-1 text-center">
        <UserName />
        <div className="lt-text-gray-500 text-xs">
          {peer.role === 'host' ? 'Host' : 'Listener'}
        </div>
      </div>
    </div>
  );
};

export default SpaceUser;
