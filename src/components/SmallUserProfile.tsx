import getAvatar from '@/lib/getAvatar';

import formatHandle from '@/utils/functions/formatHandle';
import { FC, memo } from 'react';
import { Image } from '@/components/UI/Image';
import Slug from '@/components/UI/Slug';
import formatTime from '@/utils/functions/formatTime';
import Link from 'next/link';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';

import cn from '@/components/UI/cn';
import { getTwitterFormat } from '@/lib/formatTime4';
import { Profile } from '@/utils/lens/generatedLenster';

interface UserProfileProps {
  profile: Profile;
  timestamp?: Date;
  smallAvatar?: boolean;
}

const SmallUserProfile: FC<UserProfileProps> = ({
  profile,
  timestamp = '',
  smallAvatar = true
}) => {
  const UserAvatar = () => (
    <Image
      src={getAvatar(profile)}
      loading="lazy"
      className={cn(
        smallAvatar ? 'h-5 w-5' : 'h-6 w-6',
        'rounded-full border bg-gray-200 dark:border-gray-700'
      )}
      height={smallAvatar ? 20 : 24}
      width={smallAvatar ? 20 : 24}
      alt={formatHandle(profile?.handle)}
    />
  );

  const UserName = () => (
    <div className="flex max-w-sm items-center">
      <div className="truncate">{profile?.name}</div>

      <Slug
        className="ml-2 text-sm"
        slug={formatHandle(profile?.id)}
        prefix="@"
      />
      {timestamp ? (
        <span className="lt-text-gray-500">
          <span className="mx-1.5">·</span>
          <span className="text-xs" title={formatTime(timestamp as Date)}>
            {getTwitterFormat(timestamp)}
          </span>
        </span>
      ) : null}
    </div>
  );

  return (
    <Link href={`/u/${profile?.id}`}>
      <div className="flex items-center space-x-2">
        <UserAvatar />
        <UserName />
      </div>
    </Link>
  );
};

export default memo(SmallUserProfile);
