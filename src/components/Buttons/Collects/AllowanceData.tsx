import Spinner from "@/components/Spinner";
import { IS_MAINNET } from "@/constants";
import { useAppStore } from "@/store/app";
import { useApprovedModuleAllowanceAmountQuery } from "@/types/graph";
import { CollectModules, Erc20, FollowModules, ReferenceModules } from "@/utils/lens";
import { useState } from "react";
import Allowance from "./Allowance";


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
  const { data, loading, error, refetch } = useApprovedModuleAllowanceAmountQuery({
    variables: {
      request: getAllowancePayload(IS_MAINNET ? '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270' : '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889')
    },
    skip: !currentProfile?.id
  });
  return (
    <div>
          <div className="mx-5 mt-5">
            <div className="space-y-5">
              <div className="text-md font-bold">Allow / Revoke modules</div>
              <p>
                In order to use collect feature you need to allow the module you use, you can allow and revoke
                the module anytime.
              </p>
            </div>
            <div className="mt-6 label">Select Currency</div>
            <select
              className="w-full bg-white rounded-xl border border-gray-300 outline-none dark:bg-gray-800 disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:border-gray-700/80 focus:border-brand-500 focus:ring-brand-400"
              onChange={(e) => {
                setCurrencyLoading(true);
                refetch({
                  request: getAllowancePayload(e.target.value)
                }).finally(() => setCurrencyLoading(false));
              }}
            >
              {data?.enabledModuleCurrencies.map((currency: Erc20) => (
                <option key={currency.address} value={currency.address}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
          {currencyLoading ? (
            <div className="py-10 space-y-3 text-center">
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