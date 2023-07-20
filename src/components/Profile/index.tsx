import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ProfileFeedType } from 'src/enums';
import Custom404 from 'src/pages/404';

import { useAppStore } from 'src/store/app';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';

import Cover from './Cover';
import Details from './Details';
import Feed from './Feed';
import FeedType from './FeedType';
import FollowDialog from './FollowDialog';

import isFeatureEnabled from '@/utils/functions/isFeatureEnabled';
import { FeatureFlag } from '@/utils/data/feature-flags';
import formatHandle from '@/utils/functions/formatHandle';
import {
  Profile,
  ProfileDocument,
  Publication,
  useProfileQuery
} from '@/utils/lens/generatedLenster';
import { GridItemEight, GridItemFour, GridLayout } from '../UI/GridLayout';
import NewPost from '../Composer/Post/New';
import { APP_NAME, STATIC_IMAGES_URL } from '@/constants';
import MetaTags from '../UI/MetaTags';
import { Modal } from '../UI/Modal';
import { useQuery } from '@apollo/client';
import ProfileCard from '../ProfilePage/ProfileCard';
import Navbar from '../Navbar';
import BottomNav from '../Navs/BottomNav';
import Loading from '../Loading';
import SubscribersFeed from './SubscribersFeed';

const ViewProfile: NextPage = () => {
  const {
    query: { id, type, followIntent }
  } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [feedType, setFeedType] = useState(
    type &&
    ['feed', 'replies', 'media', 'collects', 'nft', 'subscribers'].includes(
      type as string
    )
      ? type.toString().toUpperCase()
      : ProfileFeedType.Feed
  );

  const isNftGalleryEnabled = isFeatureEnabled(FeatureFlag.NftGallery);

  const { data, loading, error } = useQuery(ProfileDocument, {
    variables: {
      request: {
        profileId: id
      }
    }
  });

  const profile = data?.profile;
  console.log('Profile', profile);

  useEffect(
    () => {
      if (profile?.isFollowedByMe === true) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
      if (!currentProfile) {
        setFollowing(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile?.isFollowedByMe]
  );

  const [following, setFollowing] = useState<boolean | null>(null);
  const [showFollowModal, setShowFollowModal] = useState(false);
  const isFollowedByMe =
    Boolean(currentProfile) && Boolean(profile?.isFollowedByMe);

  const followType = profile?.followModule?.__typename;
  const initState = following === null;
  // profile is not defined until the second render
  if (initState && profile) {
    const canFollow =
      followType !== 'RevertFollowModuleSettings' && !isFollowedByMe;
    if (followIntent && canFollow) {
      setShowFollowModal(true);
    }
    setFollowing(isFollowedByMe);
  }

  // Profile changes when user selects a new profile from search box
  useUpdateEffect(() => {
    if (profile) {
      setFollowing(null);
    }
  }, [profile]);

  useUpdateEffect(() => {
    if (following) {
      setShowFollowModal(false);
    }
  }, [following]);

  if (error) {
    return <Custom404 />;
  }

  if (loading || !data) {
    return <Loading />;
  }

  if (!data?.profile) {
    return <Custom404 />;
  }

  return (
    <>
      <Modal show={showFollowModal} onClose={() => setShowFollowModal(false)}>
        <FollowDialog
          profile={profile as Profile}
          setFollowing={setFollowing}
          setShowFollowModal={setShowFollowModal}
        />
      </Modal>
      {profile?.name ? (
        <MetaTags
          title={`${profile?.name} (@${formatHandle(
            profile?.handle
          )}) • ${APP_NAME}`}
        />
      ) : (
        <MetaTags title={`@${formatHandle(profile?.handle)} • ${APP_NAME}`} />
      )}
      <div className="m-auto w-full flex overflow-hidden border-0 lg:w-[1100px] xl:w-[1200px]"><Navbar/></div>

      <Cover
        cover={
          profile?.coverPicture?.__typename === 'MediaSet'
            ? profile?.coverPicture?.original?.url
            : `${STATIC_IMAGES_URL}/patterns/2.svg`
        }
      />
      <GridLayout className="max-w-[1200px] pt-6">
        <GridItemFour>
          <ProfileCard
            profile={profile as Profile}
            following={Boolean(following)}
            setFollowing={setFollowing}
          />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType} />

          {(feedType === ProfileFeedType.Feed ||
            feedType === ProfileFeedType.Replies ||
            feedType === ProfileFeedType.Media ||
            feedType === ProfileFeedType.Collects) && (
            <Feed profile={profile as Profile} type={feedType} />
          )}
          {feedType === ProfileFeedType.Subscribers && (
            <SubscribersFeed profile={profile as Profile} />
          )}
        </GridItemEight>
      </GridLayout>
      <BottomNav />
    </>
  );
};

export default ViewProfile;
