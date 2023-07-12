import type { Profile } from '@/utils/lens/generatedLenster';
import formatHandle from '@/utils/functions/formatHandle';
import getAvatar from '@/lib/getAvatar';

import { Image } from '../UI/Image';

import clsx from 'clsx';
import Link from 'next/link';
import type { FC } from 'react';
import { memo, useState } from 'react';
import Slug from '../UI/Slug';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';
import formatTime from '@/utils/functions/formatTime';
import UserPreview from '../UI/UserPreview';
import Markup from '../UI/Markup';
import UnfollowButton from '../Buttons/UnfollowButton';
import FollowButton from '../Buttons/FollowButton';
import getProfileAttribute from '@/lib/getProfileAttribute';
import { getTwitterFormat } from '@/lib/formatTime4';

interface UserProfileProps {
  profile: Profile;
  followStatusLoading?: boolean;
  isFollowing?: boolean;
  isBig?: boolean;
  linkToProfile?: boolean;
  showBio?: boolean;
  showFollow?: boolean;
  showStatus?: boolean;
  showUserPreview?: boolean;
  timestamp?: Date;

  // For data analytics
  followUnfollowPosition?: number;
  followUnfollowSource?: string;
}

const UserProfile: FC<UserProfileProps> = ({
  profile,
  followStatusLoading = false,
  isFollowing = false,
  isBig = false,
  linkToProfile = true,
  showBio = false,
  showFollow = false,
  showStatus = false,
  showUserPreview = true,
  timestamp = '',
  followUnfollowPosition,
  followUnfollowSource
}) => {
  const [following, setFollowing] = useState(isFollowing);
  const statusEmoji = getProfileAttribute(profile?.attributes, 'statusEmoji');
  const statusMessage = getProfileAttribute(
    profile?.attributes,
    'statusMessage'
  );
  const hasStatus = statusEmoji && statusMessage;

  const UserAvatar = () => (
    <Image
      src={getAvatar(profile)}
      loading="lazy"
      className={clsx(
        isBig ? 'h-14 w-14' : 'h-10 w-10',
        'rounded-full border bg-gray-200 dark:border-gray-700'
      )}
      height={isBig ? 56 : 40}
      width={isBig ? 56 : 40}
      alt={formatHandle(profile?.handle)}
    />
  );

  const UserName = () => (
    <>
      <div className="flex max-w-sm items-center">
        <div className={clsx(isBig ? 'font-bold' : 'text-md', 'grid')}>
          <div className="truncate">
            {sanitizeDisplayName(profile?.name) ??
              formatHandle(profile?.handle)}
          </div>
        </div>

        {showStatus && hasStatus ? (
          <div className="lt-text-gray-500 flex items-center">
            <span className="mx-1.5">·</span>
            <span className="flex max-w-[10rem] items-center space-x-1 text-xs">
              <span>{statusEmoji}</span>
              <span className="truncate">{statusMessage}</span>
            </span>
          </div>
        ) : null}
      </div>
      <div>
        <Slug
          className="text-sm"
          slug={formatHandle(profile?.handle)}
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
    </>
  );

  const UserInfo: FC = () => {
    return (
      <UserPreview
        isBig={isBig}
        profile={profile}
        followStatusLoading={followStatusLoading}
        showUserPreview={showUserPreview}
      >
        <div className="mr-8 flex items-center space-x-3">
          <UserAvatar />
          <div>
            <UserName />
            {showBio && profile?.bio && (
              <div
                // Replace with Tailwind
                style={{ wordBreak: 'break-word' }}
                className={clsx(
                  isBig ? 'text-base' : 'text-sm',
                  'mt-2',
                  'linkify leading-6'
                )}
              >
                <Markup>{profile?.bio}</Markup>
              </div>
            )}
          </div>
        </div>
      </UserPreview>
    );
  };

  return (
    <div
      className="flex items-center justify-between"
      data-testid={`user-profile-${profile.id}`}
    >
      {linkToProfile ? (
        <Link href={`/u/${profile?.id}`}>
          <UserInfo />
        </Link>
      ) : (
        <UserInfo />
      )}
    </div>
  );
};

export default memo(UserProfile);
