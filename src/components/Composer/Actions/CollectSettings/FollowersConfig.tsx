import ToggleWithHelper from '@/components/ToggleWithHelper';
import { UserGroupIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';
import { useCollectModuleStore } from 'src/store/collect-module';

interface ReferralConfigProps {
  setCollectType: (data: any) => void;
}

const FollowersConfig: FC<ReferralConfigProps> = ({ setCollectType }) => {
  const collectModule = useCollectModuleStore((state) => state.collectModule);

  return (
    <div className="pt-5">
      <ToggleWithHelper
        on={collectModule.followerOnlyCollect ?? false}
        setOn={() => setCollectType({ followerOnlyCollect: true })}
        heading={`Who can collect`}
        description={`Only followers can collect`}
        icon={<UserGroupIcon className="h-4 w-4" />}
      />
    </div>
  );
};

export default FollowersConfig;
