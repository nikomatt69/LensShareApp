import Spinner from '@/components/Spinner';
import { IS_MAINNET } from '@/constants';
import { useAppStore } from '@/store/app';

import {
  CollectModules,
  Erc20,
  FollowModules,
  ReferenceModules,
  useApprovedModuleAllowanceAmountQuery
} from '@/utils/lens/generatedLenster';
import { useState } from 'react';
import Allowance from './Allowance';

const getAllowancePayload = (currency: string) => {
  return {
    currencies: [currency],
    collectModules: [
      CollectModules.LimitedFeeCollectModule,
      CollectModules.FeeCollectModule,
      CollectModules.LimitedTimedFeeCollectModule,
      CollectModules.TimedFeeCollectModule,
      CollectModules.FreeCollectModule,
      CollectModules.RevertCollectModule
    ],
    followModules: [FollowModules.FeeFollowModule],
    referenceModules: [ReferenceModules.FollowerOnlyReferenceModule]
  };
};

const AllowanceData = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [currencyLoading, setCurrencyLoading] = useState(false);
  const { data, loading, error, refetch } =
    useApprovedModuleAllowanceAmountQuery({
      variables: {
        request: getAllowancePayload(
          IS_MAINNET
            ? '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270'
            : '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889'
        )
      },
      skip: !currentProfile?.id
    });
  return (
    <div>
      <div className="mx-5 mt-5">
        <div className="space-y-5">
          <div className="text-md font-bold">Allow / Revoke modules</div>
          <p>
            In order to use collect feature you need to allow the module you
            use, you can allow and revoke the module anytime.
          </p>
        </div>
        <div className="label mt-6">Select Currency</div>
        <select
          className="focus:border-brand-500 focus:ring-brand-400 w-full rounded-xl border border-gray-300 bg-white dark:bg-gray-900/70 outline-none disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:border-gray-700/80 dark:bg-gray-800"
          onChange={(e) => {
            setCurrencyLoading(true);
            refetch({
              request: getAllowancePayload(e.target.value)
            }).finally(() => setCurrencyLoading(false));
          }}
        >
          yar
        </select>
      </div>
      {currencyLoading ? (
        <div className="space-y-3 py-10 text-center">
          <Spinner />
          <div>Loading allowance data!</div>
        </div>
      ) : (
        <Allowance allowance={data} />
      )}
    </div>
  );
};

export default AllowanceData;
