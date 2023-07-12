import {
  FollowingRequest,
  Profile,
  useFollowingQuery
} from '@/utils/lens/generatedLenster';

import type { FC } from 'react';
import { useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Loader from '../UI/Loader';
import { EmptyState } from '../UI/EmptyState';
import formatHandle from '@/utils/functions/formatHandle';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '../ErrorMessage';
import UserProfile from '../ProfilePage/UserProfile';

interface FollowingProps {
  profile: Profile;
  onProfileSelected?: (profile: Profile) => void;
}

const Following: FC<FollowingProps> = ({ profile, onProfileSelected }) => {
  const [hasMore, setHasMore] = useState(true);

  // Variables
  const request: FollowingRequest = { address: profile?.ownedBy, limit: 30 };

  const { data, loading, error, fetchMore } = useFollowingQuery({
    variables: { request },
    skip: !profile?.id
  });

  const followings = data?.following?.items;
  const pageInfo = data?.following?.pageInfo;

  const onEndReached = async () => {
    if (!hasMore) {
      return;
    }

    await fetchMore({
      variables: { request: { ...request, cursor: pageInfo?.next } }
    }).then(({ data }) => {
      setHasMore(data?.following?.items?.length > 0);
    });
  };

  if (loading) {
    return <Loader message={`Loading following`} />;
  }

  if (followings?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{formatHandle(profile?.handle)}
            </span>
            <span>doesn’t follow anyone.</span>
          </div>
        }
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <div
      className="max-h-[80vh] overflow-y-auto"
      data-testid="followings-modal"
    >
      <ErrorMessage
        className="m-5"
        title={`Failed to load following`}
        error={error}
      />
      <Virtuoso
        className="virtual-profile-list"
        data={followings}
        endReached={onEndReached}
        itemContent={(index, following) => {
          return (
            <div
              className={`p-5 ${
                onProfileSelected &&
                'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900'
              }`}
              onClick={
                onProfileSelected && following.profile
                  ? () => {
                      onProfileSelected(following.profile as Profile);
                    }
                  : undefined
              }
              aria-hidden="true"
            >
              <UserProfile
                profile={following?.profile as Profile}
                linkToProfile={!onProfileSelected}
                isFollowing={following?.profile?.isFollowedByMe}
                followUnfollowPosition={index + 1}
                showBio
                showFollow
                showUserPreview={false}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default Following;
