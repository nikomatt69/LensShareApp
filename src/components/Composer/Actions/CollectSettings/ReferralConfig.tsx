
import ToggleWithHelper from '@/components/ToggleWithHelper';
import MirrorOutline from '@/components/UI/Icons/MirrorOutline';
import { Input } from '@/components/UI/Input';
import { CollectModules } from '@/utils/lens/generatedLenster';




import type { FC } from 'react';
import { useCollectModuleStore } from 'src/store/collect-module';

interface ReferralConfigProps {
  setCollectType: (data: any) => void;
}

const ReferralConfig: FC<ReferralConfigProps> = ({ setCollectType }) => {
  const collectModule = useCollectModuleStore((state) => state.collectModule);

  return (
    <div className="pt-5">
      <ToggleWithHelper
        on={Boolean(collectModule.referralFee)}
        setOn={() =>
          setCollectType({
            type: collectModule.recipients?.length
              ? CollectModules.MultirecipientFeeCollectModule
              : CollectModules.SimpleCollectModule,
            referralFee: collectModule.referralFee ? 0 : 25
          })
        }
        heading={`Mirror referral reward`}
        description={`Share your fee with people who amplify your content`}
        icon={<MirrorOutline className="h-4 w-4" />}
      />
      {collectModule.referralFee ? (
        <div className="flex space-x-2 pt-4 text-sm">
          <Input
            label={`Referral fee`}
            type="number"
            placeholder="5"
            iconRight="%"
            min="0"
            max="100"
            value={collectModule.referralFee}
            onChange={(event) => {
              setCollectType({
                referralFee: parseInt(
                  event.target.value ? event.target.value : '0'
                )
              });
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReferralConfig;
