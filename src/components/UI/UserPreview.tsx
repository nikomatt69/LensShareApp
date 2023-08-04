import formatHandle from '@/utils/functions/formatHandle';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import type { Profile } from '@/utils/lens/generatedLenster';
import { useProfileLazyQuery } from '@/utils/lens/generatedLenster';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

import Follow from 'src/components/ProfilePage/Following';
import InterweaveContent from './InterweaveContent';
import { formatNumber } from '@/utils/functions/formatNumber';
import getProfilePicture from '@/utils/functions/getProfilePicture';

type Props = {
  profile: Profile;
  children: ReactNode;
  isBig?: boolean;
  followStatusLoading?: boolean;
  showUserPreview?: boolean;
};

const UserPreview: FC<Props> = ({
  profile,
  isBig,
  followStatusLoading,
  children,
  showUserPreview = true
}) => {
  const [lazyProfile, setLazyProfile] = useState(profile);
  const [following, setFollowing] = useState(profile?.isFollowedByMe);

  const [loadProfile] = useProfileLazyQuery({
    fetchPolicy: 'cache-first'
  });

  const UserAvatar = () => (
    <img
      src={getProfilePicture(lazyProfile)}
      loading="lazy"
      className={clsx(
        isBig ? 'h-14 w-14' : 'h-10 w-10',
        'rounded-full border bg-gray-200 '
      )}
      height={isBig ? 56 : 40}
      width={isBig ? 56 : 40}
      alt={formatHandle(lazyProfile?.handle)}
    />
  );

  const UserName = () => (
    <>
      <div className="flex max-w-sm items-center gap-1 truncate">
        <div className={clsx(isBig ? 'font-bold' : 'text-md')}>
          {lazyProfile?.name ?? formatHandle(lazyProfile?.handle)}
        </div>
      </div>
    </>
  );

  const Preview = () => (
    <>
      <div className="flex items-center justify-between">
        <UserAvatar />
        <div onClick={(e) => e.preventDefault()}>
          {!lazyProfile.isFollowedByMe &&
            (followStatusLoading ? (
              <div className="shimmer h-8 w-10 rounded-lg" />
            ) : (
              <Follow profile={lazyProfile} />
            ))}
        </div>
      </div>
      <div className="space-y-3 p-1">
        <UserName />
        <div>
          {lazyProfile?.bio && (
            <div
              className={clsx(
                isBig ? 'text-base' : 'text-sm',
                'mt-2',
                'linkify break-words leading-6'
              )}
            >
              <InterweaveContent content={lazyProfile?.bio} />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <div className="text-base">
              {formatNumber(lazyProfile?.stats?.totalFollowing)}
            </div>
            <div className="lt-text-gray-500 text-sm">Following</div>
          </div>
          <div className="text-md flex items-center space-x-1">
            <div className="text-base">
              {formatNumber(lazyProfile?.stats?.totalFollowers)}
            </div>
            <div className="lt-text-gray-500 text-sm">Followers</div>
          </div>
        </div>
      </div>
    </>
  );

  const onPreviewStart = async () => {
    if (!lazyProfile.id) {
      const { data } = await loadProfile({
        variables: {
          request: { handle: formatHandle(lazyProfile?.handle, true) }
        }
      });
      const getProfile = data?.profile;
      if (getProfile) {
        setLazyProfile(getProfile as Profile);
      }
    }
  };

  return showUserPreview ? (
    <span onMouseOver={onPreviewStart}>
      <Tippy
        placement="bottom-start"
        delay={[800, 0]}
        hideOnClick={false}
        content={<Preview />}
        arrow={false}
        interactive
        zIndex={1000}
        className="hidden w-64 !rounded-xl border !bg-white dark:bg-gray-900/70 !px-1.5 !py-3 !text-black dark:text-white dark:!bg-blue-400 dark:!text-black dark:text-white  md:block"
        appendTo={() => document.body}
      >
        <span>{children}</span>
      </Tippy>
    </span>
  ) : (
    <span>{children}</span>
  );
};

export default UserPreview;
