import type { NextPage } from 'next';
import toast from 'react-hot-toast';
import Custom404 from 'src/pages/404';
import { useAppStore } from 'src/store/app';
import { useEffectOnce } from 'usehooks-ts';

import SettingsSidebar from '../Sidebar';
import { useDisconnectXmtp } from '@/utils/hooks/useXmtpClient';
import {
  GridItemEight,
  GridItemFour,
  GridLayout
} from '@/components/UI/GridLayout';
import { APP_NAME } from '@/constants';
import MetaTags from '@/components/UI/MetaTags';
import { Card } from '@/components/UI/Card';
import { Localstorage } from '@/storage';
import { Button } from '@/components/UI/Button';

const CleanupSettings: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const disconnectXmtp = useDisconnectXmtp();

  if (!currentProfile) {
    return <Custom404 />;
  }

  const cleanup = (key: string) => {
    localStorage.removeItem(key);
    toast.success(`Cleared ${key}`);
  };

  return (
    <GridLayout>
      <MetaTags title={`Cleanup settings • ${APP_NAME}`} />
      <GridItemFour>
        <SettingsSidebar />
      </GridItemFour>
      <GridItemEight>
        <Card className="p-5">
          <div className="space-y-5">
            <div className="text-lg font-bold">Cleanup Localstorage</div>
            <p>
              If you stuck with some issues, you can try to clean up the
              localstorage. This will remove all the data stored in your
              browser.
            </p>
          </div>
          <div className="divider my-5" />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <b>Optimistic publications</b>
                <div className="lt-text-gray-500 text-xs font-bold">
                  Clean your posts or comments that are not indexed
                </div>
              </div>
              <Button onClick={() => cleanup(Localstorage.TransactionStore)}>
                Cleanup
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <b>Timeline settings</b>
                <div className="lt-text-gray-500 text-xs font-bold">
                  Clean your timeline filter settings
                </div>
              </div>
              <Button onClick={() => cleanup(Localstorage.TimelineStore)}>
                Cleanup
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <b>Direct message keys</b>
                <div className="lt-text-gray-500 text-xs font-bold">
                  Clean your DM encryption key
                </div>
              </div>
              <Button
                onClick={() => {
                  disconnectXmtp();
                  toast.success(`Cleared DM keys`);
                }}
              >
                Cleanup
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <b>Feature flags cache</b>
                <div className="lt-text-gray-500 text-xs font-bold">
                  Clean your feature flags cache
                </div>
              </div>
              <Button onClick={() => cleanup(Localstorage.FeaturesCache)}>
                Cleanup
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <b className="text-red-500">App settings</b>
                <div className="lt-text-gray-500 text-xs font-bold">
                  Note: Cleaning will log you out
                </div>
              </div>
              <Button onClick={() => cleanup(Localstorage.LensshareStore)}>
                Cleanup
              </Button>
            </div>
          </div>
        </Card>
      </GridItemEight>
    </GridLayout>
  );
};

export default CleanupSettings;
