
import type { NextPage } from 'next';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import SettingsSidebar from '../Sidebar';
import Fingerprint from './Fingerprint';
import Followers from './Followers';
import Following from './Following';
import Notifications from './Notifications';
import Profile from './Profile';
import Publications from './Publications';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/UI/GridLayout';
import MetaTags from '@/components/UI/MetaTags';
import { APP_NAME } from '@/constants';

const ExportSettings: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

 

  if (!currentProfile) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Account settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight className="space-y-5">
        <Profile />
        <Publications />
        <Notifications />
        <Following />
        <Followers />
        <Fingerprint />
      </GridItemEight>
    </GridLayout>
  );
};

export default ExportSettings;
