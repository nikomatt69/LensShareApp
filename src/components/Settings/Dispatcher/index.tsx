import type { FC } from 'react';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import SettingsSidebar from '../Sidebar';
import ToggleDispatcher from './ToggleDispatcher';
import getIsDispatcherEnabled from '@/lib/getIsDispatcherEnabled';
import { APP_NAME, OLD_LENS_RELAYER_ADDRESS } from '@/constants';
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '@/components/UI/GridLayout';
import MetaTags from '@/components/UI/MetaTags';
import { Card } from '@/components/UI/Card';

const DispatcherSettings: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const canUseRelay = getIsDispatcherEnabled(currentProfile);
  const isOldDispatcherEnabled =
    currentProfile?.dispatcher?.address?.toLocaleLowerCase() ===
    OLD_LENS_RELAYER_ADDRESS.toLocaleLowerCase();

  const getTitleText = () => {
    if (canUseRelay) {
      return 'Disable Signless Transactions';
    } else if (isOldDispatcherEnabled) {
      return 'Signless Transactions Upgrade';
    } else {
      return 'Signless Transactions';
    }
  };

  const getDescription = () => {
    if (isOldDispatcherEnabled) {
      return ' Upgrade your dispatcher to the latest version for better faster stronger signless transactions.';
    }
    return  `${APP_NAME}`;
  };

  if (!currentProfile) {
    return <Custom404 />;
  }

  return (
    <GridLayout>
      <MetaTags title={`Dispatcher • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="linkify space-y-2 p-5">
          <div className="flex items-center space-x-2">
            <div className="text-lg font-bold">{getTitleText()}</div>
          </div>
          <div className="pb-2">{getDescription()}</div>
          <ToggleDispatcher />
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default DispatcherSettings;
