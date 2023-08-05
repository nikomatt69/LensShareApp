import type { NextPage } from 'next';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import ProfileCard from '@/components/ProfilePage/ProfileCard';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { Profile, ProfileDocument } from '@/utils/lens/generatedLenster';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppStore } from '@/store/app';
import BottomNav from '../Navs/BottomNav';
import NavbarDetails from '../NavbarDetails';
import Following from './Following';
import formatHandle from '@/utils/functions/formatHandle';
import getAvatar from '@/lib/getAvatar';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import { Card } from '../UI/Card';

interface Props {
  profile: Profile;
  followStatusLoading?: boolean;
  isFollowing?: boolean;
  isBig?: boolean;
  linkToProfile?: boolean;
}

const UserProfiles: NextPage = () => {
  const linkToProfiles = true;
  const router = useRouter();
  const { id } = router.query;
  const [following, setFollowing] = useState(false);
  const currentProfile = useAppStore((state) => state.currentProfile);

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

  return (
    <div>
      <div
        className="flex items-center justify-between"
        data-testid={`user-profile-${profile.id}`}
      >
        {linkToProfiles ? (
          <Link href={`/u/${formatHandle(profile?.handle)}`}>
            <div className="flex cursor-pointer items-center gap-3 rounded p-2 font-semibold hover:bg-primary">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(profile)}
                  alt="profilepic"
                  className="rounded-full"
            
                />
              </div>
              <div />
              <div>
                <p className="text-md flex items-center gap-1 font-bold lowercase text-primary">
                  {profile.name}
                </p>
                <p className="text-xs capitalize text-gray-400">
                  {profile.name}
                  {formatHandle(profile.handle)}
                  {''}
                </p>
              </div>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfiles;
