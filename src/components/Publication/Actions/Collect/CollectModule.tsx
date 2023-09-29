import Collectors from '@/components/ProfilePage/Collectors';
import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
import { LENSHUB_PROXY, POLYGONSCAN_URL } from '@/constants';
import getAssetAddress from '@/lib/getAssetAddress';
import getCoingeckoPrice from '@/lib/getCoingeckoPrice';
import getSignature from '@/lib/getSignature';
import onError from '@/lib/onError';
import { useAppStore } from '@/store/app';
import {
  useApprovedModuleAllowanceAmountQuery,
  useCollectModuleQuery,
  useCreateCollectTypedDataMutation,
  useProxyActionMutation,
  usePublicationRevenueQuery
} from '@/utils/lens/generatedLenster';
import {
  ApprovedAllowanceAmount,
  CollectModules,
  ElectedMirror,
  Publication,
  useBroadcastMutation
} from '@/utils/lens/generatedLenster';

import {
  CameraIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FolderPlusIcon,
  PhotoIcon,
  PuzzlePieceIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

import React, { Dispatch, FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useSignTypedData
} from 'wagmi';
import getTokenImage from '@/lib/getTokenImage';

import dayjs from 'dayjs';
import { Spinner } from '@/components/UI/Spinner';

import AllowanceButton from '@/components/Buttons/Collects/AllowanceButton';
import Loader from '@/components/UI/Loader';
import { LensHub } from '@/abi/LensHub';
import { useQuery } from '@tanstack/react-query';
import { useUpdateEffect } from 'usehooks-ts';
import { Errors } from '@/lib/errors';
import { WarningMessage } from '@/components/UI/WarningMessage';
import { BsCash, BsCollection, BsPuzzle } from 'react-icons/bs';
import Splits from './Splits';
import Link from 'next/link';
import formatAddress from '@/lib/formatAddress';

import humanize from '@/lib/humanize';
import Markup from '@/components/UI/Markup';
import formatHandle from '@/utils/functions/formatHandle';
import { Tooltip } from '@/components/UI/Tooltip';
import CollectWarning from './CollectWarning';
import ReferralAlert from './ReferralAlert';
import formatTime from '@/utils/functions/formatTime';
import { useNonceStore } from '@/store/nonce';

interface CollectModuleProps {
  count: number;
  setCount: Dispatch<number>;
  publication: Publication;
  electedMirror?: ElectedMirror;
}

const CollectModule: FC<CollectModuleProps> = ({
  count,
  setCount,
  publication,
  electedMirror
}) => {
  const userSigNonce = useNonceStore((state) => state.userSigNonce);
  const setUserSigNonce = useNonceStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [revenue, setRevenue] = useState(0);
  const [hasCollectedByMe, setHasCollectedByMe] = useState(
    publication?.hasCollectedByMe
  );
  const [showCollectorsModal, setShowCollectorsModal] = useState(false);
  const [allowed, setAllowed] = useState(true);
  const { address } = useAccount();

  const { data, loading } = useCollectModuleQuery({
    variables: { request: { publicationId: publication?.id } }
  });

  const collectModule: any = data?.publication?.collectModule;

  const endTimestamp =
    collectModule?.endTimestamp ?? collectModule?.optionalEndTimestamp;
  const collectLimit =
    collectModule?.collectLimit ?? collectModule?.optionalCollectLimit;
  const amount =
    collectModule?.amount?.value ?? collectModule?.fee?.amount?.value;
  const currency =
    collectModule?.amount?.asset?.symbol ??
    collectModule?.fee?.amount?.asset?.symbol;
  const assetAddress =
    collectModule?.amount?.asset?.address ??
    collectModule?.fee?.amount?.asset?.address;
  const assetDecimals =
    collectModule?.amount?.asset?.decimals ??
    collectModule?.fee?.amount?.asset?.decimals;
  const referralFee =
    collectModule?.referralFee ?? collectModule?.fee?.referralFee;

  const isRevertCollectModule =
    collectModule?.type === CollectModules.RevertCollectModule;
  const isMultirecipientFeeCollectModule =
    collectModule?.type === CollectModules.MultirecipientFeeCollectModule;
  const isFreeCollectModule =
    collectModule?.type === CollectModules.FreeCollectModule;
  const isSimpleFreeCollectModule =
    collectModule?.type === CollectModules.SimpleCollectModule && !amount;

  const onCompleted = (__typename?: 'RelayError' | 'RelayerResult') => {
    if (__typename === 'RelayError') {
      return;
    }

    setIsLoading(false);
    setRevenue(revenue + parseFloat(amount));
    setCount(count + 1);
    setHasCollectedByMe(true);
    toast.success(`Collected successfully!`);
  };

  const onError = (error: any) => {
    setIsLoading(false);
    error(error);
  };

  const { signTypedDataAsync } = useSignTypedData({ onError });

  const { write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'collect',
    onSuccess: () => {
      onCompleted();
      setUserSigNonce(userSigNonce + 1);
    },
    onError: (error) => {
      onError(error);
      setUserSigNonce(userSigNonce - 1);
    }
  });

  const percentageCollected = (count / parseInt(collectLimit)) * 100;

  const { data: allowanceData, loading: allowanceLoading } =
    useApprovedModuleAllowanceAmountQuery({
      variables: {
        request: {
          currencies: assetAddress,
          followModules: [],
          collectModules: collectModule?.type,
          referenceModules: []
        }
      },
      skip: !assetAddress || !currentProfile,
      onCompleted: ({ approvedModuleAllowanceAmount }) => {
        setAllowed(approvedModuleAllowanceAmount[0]?.allowance !== '0x00');
      }
    });

  const { data: revenueData, loading: revenueLoading } =
    usePublicationRevenueQuery({
      variables: {
        request: {
          publicationId:
            publication.__typename === 'Mirror'
              ? publication?.mirrorOf?.id
              : publication?.id
        }
      },
      pollInterval: 5000,
      skip: !publication?.id || isFreeCollectModule || isSimpleFreeCollectModule
    });

  const { data: usdPrice } = useQuery(
    ['coingeckoData'],
    () => getCoingeckoPrice(getAssetAddress(currency)).then((res) => res),
    { enabled: Boolean(amount) }
  );

  useUpdateEffect(() => {
    setRevenue(
      parseFloat(
        (revenueData?.publicationRevenue?.revenue?.total?.value as any) ?? 0
      )
    );
  }, [revenueData]);

  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address,
    token: assetAddress,
    formatUnits: assetDecimals,
    watch: true
  });

  let hasAmount = false;
  if (balanceData && parseFloat(balanceData?.formatted) < parseFloat(amount)) {
    hasAmount = false;
  } else {
    hasAmount = true;
  }

  const [broadcast] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => onCompleted(broadcast.__typename)
  });
  const [createCollectTypedData] = useCreateCollectTypedDataMutation({
    onCompleted: async ({ createCollectTypedData }) => {
      const { id, typedData } = createCollectTypedData;
      const signature = await signTypedDataAsync(getSignature(typedData));
      const { data } = await broadcast({
        variables: { request: { id, signature } }
      });
      if (data?.broadcast.__typename === 'RelayError') {
        const { profileId, pubId, data: collectData } = typedData.value;
        return write?.({ args: [profileId, pubId, collectData] });
      }
    },
    onError
  });

  const [createCollectProxyAction] = useProxyActionMutation({
    onCompleted: () => onCompleted(),
    onError
  });

  const createViaProxyAction = async (variables: any) => {
    const { data, errors } = await createCollectProxyAction({ variables });

    if (
      errors?.toString().includes('You have already collected this publication')
    ) {
      return;
    }

    if (!data?.proxyAction) {
      return await createCollectTypedData({
        variables: {
          request: { publicationId: publication?.id },
          options: { overrideSigNonce: userSigNonce }
        }
      });
    }
  };

  const createCollect = async () => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    try {
      setIsLoading(true);
      const canUseProxy =
        (isSimpleFreeCollectModule || isFreeCollectModule) &&
        !collectModule?.followerOnly;
      if (canUseProxy) {
        return await createViaProxyAction({
          request: {
            collect: { freeCollect: { publicationId: publication?.id } }
          }
        });
      }

      return await createCollectTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request: {
            publicationId: electedMirror
              ? electedMirror.mirrorId
              : publication?.id
          }
        }
      });
    } catch (error) {
      onError(error);
    }
  };

  if (loading || revenueLoading) {
    return <Loader message={`Loading collect`} />;
  }

  const isLimitedCollectAllCollected = collectLimit
    ? count >= parseInt(collectLimit)
    : false;
  const isCollectExpired = endTimestamp
    ? new Date(endTimestamp).getTime() / 1000 < new Date().getTime() / 1000
    : false;

  return (
    <>
      {Boolean(collectLimit) && (
        <Tooltip
          placement="top"
          content={`${percentageCollected.toFixed(0)}% Collected`}
        >
          <div className="h-2.5 w-full bg-gray-200 ">
            <div
              className="bg-brand-500 h-2.5"
              style={{ width: `${percentageCollected}%` }}
            />
          </div>
        </Tooltip>
      )}
      <div className="p-5">
        {collectModule?.followerOnly && (
          <div className="pb-5">
            <CollectWarning
              handle={formatHandle(publication?.profile?.handle)}
              isSuperFollow={
                publication?.profile?.followModule?.__typename ===
                'FeeFollowModuleSettings'
              }
            />
          </div>
        )}
        <div className="space-y-1.5 pb-2">
          {publication?.metadata?.name && (
            <div className="text-xl font-bold">
              {publication?.metadata?.name}
            </div>
          )}
          {publication?.metadata?.content && (
            <Markup className="lt-text-gray-500 line-clamp-2">
              {publication?.metadata?.content}
            </Markup>
          )}
          <ReferralAlert
            electedMirror={electedMirror}
            mirror={publication}
            referralFee={referralFee}
          />
        </div>
        {amount && (
          <div className="flex items-center space-x-1.5 py-2">
            <img
              className="h-7 w-7"
              height={28}
              width={28}
              src={getTokenImage(currency)}
              alt={currency}
              title={currency}
            />
            <span className="space-x-1">
              <span className="text-2xl font-bold">{amount}</span>
              <span className="text-xs">{currency}</span>
              {usdPrice ? (
                <>
                  <span className="lt-text-gray-500 px-0.5">·</span>
                  <span className="lt-text-gray-500 text-xs font-bold">
                    ${(amount * usdPrice).toFixed(2)}
                  </span>
                </>
              ) : null}
            </span>
          </div>
        )}
        <div className="space-y-1.5">
          <div className="block items-center space-y-1 sm:flex sm:space-x-5">
            <div className="flex items-center space-x-2">
              <UsersIcon className="lt-text-gray-500 h-4 w-4" />
              <button
                className="font-bold"
                type="button"
                onClick={() => setShowCollectorsModal(!showCollectorsModal)}
              >
                {humanize(count)}{' '}
              </button>
              <Modal
                title={`Collected by`}
                icon={<BsCollection className="text-brand h-5 w-5" />}
                show={showCollectorsModal}
                onClose={() => setShowCollectorsModal(false)}
              >
                <Collectors
                  publicationId={
                    publication.__typename === 'Mirror'
                      ? publication?.mirrorOf?.id
                      : publication?.id
                  }
                />
              </Modal>
            </div>
            {collectLimit && (
              <div className="flex items-center space-x-2">
                <PhotoIcon className="lt-text-gray-500 h-4 w-4" />
                <div className="font-bold">
                  {parseInt(collectLimit) - count} available
                </div>
              </div>
            )}
            {referralFee ? (
              <div className="flex items-center space-x-2">
                <BsCash className="lt-text-gray-500 h-4 w-4" />
                <div className="font-bold">{referralFee}% referral fee</div>
              </div>
            ) : null}
          </div>
          {revenueData?.publicationRevenue && (
            <div className="flex items-center space-x-2">
              <BsCash className="lt-text-gray-500 h-4 w-4" />
              <div className="flex items-center space-x-1.5">
                <span>Revenue:</span>
                <span className="flex items-center space-x-1">
                  <img
                    src={getTokenImage(currency)}
                    className="h-5 w-5"
                    height={20}
                    width={20}
                    alt={currency}
                    title={currency}
                  />
                  <div className="flex items-baseline space-x-1.5">
                    <div className="font-bold">{revenue}</div>
                    <div className="text-[10px]">{currency}</div>
                    {usdPrice ? (
                      <>
                        <span className="lt-text-gray-500">·</span>
                        <span className="lt-text-gray-500 text-xs font-bold">
                          ${(revenue * usdPrice).toFixed(2)}
                        </span>
                      </>
                    ) : null}
                  </div>
                </span>
              </div>
            </div>
          )}
          {endTimestamp && (
            <div className="flex items-center space-x-2">
              <ClockIcon className="lt-text-gray-500 h-4 w-4" />
              <div className="space-x-1.5">
                <span>Sale Ends:</span>
                <span
                  className="font-bold text-gray-600"
                  title={formatTime(endTimestamp)}
                >
                  {dayjs(endTimestamp).format('MMMM DD, YYYY')} at{' '}
                  {dayjs(endTimestamp).format('hh:mm a')}
                </span>
              </div>
            </div>
          )}
          {data?.publication?.collectNftAddress && (
            <div className="flex items-center space-x-2">
              <BsPuzzle className="lt-text-gray-500 h-4 w-4" />
              <div className="space-x-1.5">
                <span>Token:</span>
                <Link
                  href={`${POLYGONSCAN_URL}/token/${data?.publication?.collectNftAddress}`}
                  target="_blank"
                  className="font-bold text-gray-600"
                  rel="noreferrer noopener"
                >
                  {formatAddress(data?.publication?.collectNftAddress)}
                </Link>
              </div>
            </div>
          )}
          {isMultirecipientFeeCollectModule && (
            <Splits recipients={collectModule?.recipients} />
          )}
        </div>
        <div className="flex items-center space-x-2">
          {currentProfile &&
          (!hasCollectedByMe ||
            (!isFreeCollectModule && !isSimpleFreeCollectModule)) ? (
            allowanceLoading || balanceLoading ? (
              <div className="shimmer mt-5 h-[34px] w-28 rounded-lg" />
            ) : allowed ? (
              hasAmount ? (
                !isLimitedCollectAllCollected && !isCollectExpired ? (
                  <Button
                    className="mt-5"
                    onClick={createCollect}
                    disabled={isLoading}
                    icon={
                      isLoading ? (
                        <Spinner size="xs" />
                      ) : (
                        <BsCollection className="h-4 w-4" />
                      )
                    }
                  >
                    Collect now
                  </Button>
                ) : null
              ) : (
                <WarningMessage className="mt-5 w-full" />
              )
            ) : (
              <span className="mt-5">
                <AllowanceButton
                  title="Allow collect module"
                  module={
                    allowanceData
                      ?.approvedModuleAllowanceAmount[0] as ApprovedAllowanceAmount
                  }
                  allowed={allowed}
                  setAllowed={setAllowed}
                />
              </span>
            )
          ) : null}
        </div>
        {publication?.hasCollectedByMe && (
          <div className="mt-3 flex items-center space-x-1.5 font-bold text-green-500">
            <CheckCircleIcon className="h-5 w-5" />
            <div>You already collected this</div>
          </div>
        )}
      </div>
    </>
  );
};

export default CollectModule;
