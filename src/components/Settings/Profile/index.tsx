import type { NextPage } from 'next';
import { useState } from 'react';
import Custom404 from 'src/pages/404';

import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import SettingsSidebar from '../Sidebar';
import NftPicture from './NftPicture';

import { useProfileSettingsQuery } from '@/utils/lens/generatedLenster';
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '@/components/UI/GridLayout';
import MetaTags from '@/components/UI/MetaTags';
import Loading from '@/components/Loading';
import { APP_NAME } from '@/constants';
import TabButton from '@/components/Profile/TabButton';
import { Card } from '@/components/UI/Card';
import { CubeIcon, PhotoIcon } from '@heroicons/react/24/outline';
import ProfileSettingsForm from './Profile';
import Loader from '@/components/UI/Loader';
import PushNotifications from './PushNotifications';

const ProfileSettings: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [settingsType, setSettingsType] = useState<'NFT' | 'AVATAR'>('AVATAR');

  const { data, loading, error } = useProfileSettingsQuery({
    variables: { request: { profileId: currentProfile?.id } },
    skip: !currentProfile?.id,
    onCompleted: ({ profile }) => {
      const picture = profile?.picture;
      setSettingsType(picture?.hasOwnProperty('uri') ? 'NFT' : 'AVATAR');
    }
  });

  if (error) {
    return <Custom404 />;
  }

  if (loading) {
    return <Loader />;
  }

  if (!currentProfile) {
    return <Custom404 />;
  }

  const profile = data?.profile;

  return (
    <GridLayout>
      <MetaTags title={`Profile settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <ProfileSettingsForm profile={profile as any} />
        <PushNotifications />
        <Card className="space-y-5 p-5">
          <div className="flex items-center space-x-2">
            <TabButton
              name="Upload avatar"
              icon={<PhotoIcon className="h-5 w-5" />}
              active={settingsType === 'AVATAR'}
              onClick={() => setSettingsType('AVATAR')}
            />
            <TabButton
              name="NFT Avatar"
              icon={<CubeIcon className="h-5 w-5" />}
              active={settingsType === 'NFT'}
              onClick={() => setSettingsType('NFT')}
            />
          </div>
          {settingsType === 'NFT'}
          <NftPicture profile={profile as any} />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default ProfileSettings;
