
import type { NextPage } from 'next';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import SettingsSidebar from '../Sidebar';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/UI/GridLayout';
import { Card } from '@/components/UI/Card';
import MetaTags from '@/components/UI/MetaTags';
import { APP_NAME } from '@/constants';
import Interests from './Interests';

const InterestsSettings: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

 
  if (!currentProfile) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Interests settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="p-5">
          <div className="space-y-5">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-bold">
                Select profile interests
              </div>
             
            </div>
            <p>
              
                Interests you select are used to personalize your experience
                across Lenster. You can adjust your interests if something
                doesn't look right.
              
            </p>
          </div>
          <div className="divider my-5" />
          <Interests />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default InterestsSettings;
