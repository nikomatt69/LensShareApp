import { useQuery } from '@apollo/client';
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  FC
} from 'react';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import { GoVerified } from 'react-icons/go';
import {
  Profile,
  RecommendedProfilesDocument
} from '@/utils/lens/generatedLenster';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import { Virtuoso } from 'react-virtuoso';
import { useAppStore } from '@/store/app';
import { useRecommendedProfilesQuery } from '@/utils/lens/generated5';
import { Loader } from '@giphy/react-components';
import { EmptyState } from '../UI/EmptyState';
import { UsersIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '../UI/ErrorMessage';
import { motion } from 'framer-motion';
import UserProfile from '../ProfilePage/UserProfile';
import imageKit from '@/lib/imageKit';
import { STATIC_ASSETS_URL } from '@/constants';

interface Props {
  currentProfile: Profile;
}

const Suggested: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { data, loading, error } = useRecommendedProfilesQuery({
    variables: {
      options: { profileId: currentProfile?.id}
    }
  });

  if (loading) {
    return <Loader  />;
  }

  if (data?.recommendedProfiles?.length === 0) {
    return (
      <EmptyState
        message={`Nothing to suggest`}
        icon={<UsersIcon className="text-brand h-8 w-8" />}
        hideCard
      />
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <ErrorMessage title={`Failed to load recommendations`} error={error} />
      <div className="mb-5 mt-3 flex items-center space-x-2">
            <img
              src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
              draggable={false}
              className="h-12 w-12 md:h-16 md:w-16"
              alt="lensshare"
            />
            <h1 className="text-xl font-semibold">Suggested</h1>
          </div>
      <Virtuoso
        className="virtual-profile-list"
        data={data?.recommendedProfiles}
        itemContent={(index, profile) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3 p-5"
            >
              <div className="w-full">
                <UserProfile
                  profile={profile as Profile}
                  isFollowing={profile?.isFollowedByMe}
                  followUnfollowPosition={index + 1}
                 
                 
                  showFollow
                  showUserPreview
                />
              </div>
           
            </motion.div>
          );
        }}
      />
    </div>
  );
};

export default Suggested;