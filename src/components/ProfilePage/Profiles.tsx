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
import { Publication } from '@/utils/lens/generatedLenster';
import { SpaceMetadata } from '@/typesLenster';

interface Props {
  space: SpaceMetadata;
  publication: Publication;
}

const Profile: NextPage = (space, publication) => {
  const router = useRouter();

  const [following, setFollowing] = useState(false);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { id } = router.query;
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
      <div className="m-auto h-[100vh] overflow-hidden lg:w-[1100px] xl:w-[1200px]">
        <Toaster position="bottom-right" />

        <div className="flex gap-6">
          <div className="hidden h-[92vh] overflow-hidden lg:block lg:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="videos mt-2 flex h-[88vh] flex-1 flex-col gap-10 overflow-auto">
            <ProfileCard
              profile={profile as Profile}
              setFollowing={setFollowing}
              following={following}
            />
          </div>
        </div>
        <div className="block md:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
