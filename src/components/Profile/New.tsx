import { APP_NAME } from '@/constants';

import type { NextPage } from 'next';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';
import { GridItemEight, GridItemFour, GridLayout } from '../UI/GridLayout';
import MetaTags from '../UI/MetaTags';
import { Card } from '../UI/Card';
import SettingsHelper from './SettingsHelper';

const NewProfile: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  if (!currentProfile) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Create Profile • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsHelper
          heading="Create profile"
          description={`Create new decentralized profile`}
        />
      </GridItemFour>
      <GridItemEight>
        <Card className="p-5">
          
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default NewProfile;
