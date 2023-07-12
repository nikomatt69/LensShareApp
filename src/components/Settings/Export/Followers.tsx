import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import downloadJson from '@/lib/downloadJson';
import {
  FollowersRequest,
  useFollowersLazyQuery
} from '@/utils/lens/generatedLenster';
import { Trans } from '@lingui/macro';
import type { FC } from 'react';
import { useState } from 'react';
import { useAppStore } from 'src/store/app';

const Followers: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [followers, setFollowers] = useState<any[]>([]);
  const [exporting, setExporting] = useState(false);
  const [fetchCompleted, setFetchCompleted] = useState(false);

  const request: FollowersRequest = {
    profileId: currentProfile?.id,
    limit: 50
  };

  const [exportFollowers] = useFollowersLazyQuery({
    fetchPolicy: 'network-only'
  });

  const handleExportClick = async () => {
    setExporting(true);
    const fetchFollowers = async (cursor?: string) => {
      const { data } = await exportFollowers({
        variables: { request: { ...request, cursor } },
        onCompleted: (data) => {
          setFollowers((prev) => {
            const newFollowers = data.followers.items.filter((newFollower) => {
              return !prev.some(
                (follower) =>
                  follower.wallet.address === newFollower.wallet.address
              );
            });

            return [...prev, ...newFollowers];
          });
        }
      });

      if (
        data?.followers.items.length === 0 ||
        !data?.followers.pageInfo.next
      ) {
        setFetchCompleted(true);
        setExporting(false);
      } else {
        await fetchFollowers(data?.followers.pageInfo.next);
      }
    };

    await fetchFollowers();
  };

  const download = () => {
    downloadJson(followers, 'followers', () => {
      setFollowers([]);
      setFetchCompleted(false);
    });
  };

  return (
    <Card className="space-y-2 p-5">
      <div className="text-lg font-bold">Export followers</div>
      <div className="pb-2">Export all your followers to a JSON file.</div>
      {followers.length > 0 ? (
        <div className="pb-2">
          Exported <b>{followers.length}</b> followers
        </div>
      ) : null}
      {fetchCompleted ? (
        <Button onClick={download}>Download followers</Button>
      ) : (
        <Button onClick={handleExportClick} disabled={exporting}>
          {exporting ? 'Exporting...' : 'Export now'}
        </Button>
      )}
    </Card>
  );
};

export default Followers;
