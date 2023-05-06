import { LENS_HUB_ABI } from '@/abi/abi';
import { UpdateOwnableFeeCollectModule } from '@/abi/UpdateOwnableFeeCollectModule';
import Collectors from '@/components/ProfilePage/Collectors';
import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
import { IS_MAINNET, LENSHUB_PROXY, RELAY_ON, UPDATE_OWNABLE_FEE_COLLECT_MODULE_ADDRESS } from '@/constants';
import getAssetAddress from '@/lib/getAssetAddress';
import getCoingeckoPrice from '@/lib/getCoingeckoPrice';
import getSignature from '@/lib/getSignature';
import onError from '@/lib/onError';
import { useAppStore } from '@/store/app';
import { useApprovedModuleAllowanceAmountQuery, useCollectModuleQuery, useCreateCollectTypedDataMutation, useProxyActionMutation, usePublicationRevenueQuery } from '@/types/graph';
import { CollectModules, Publication } from '@/utils/lens';
import useBroadcast from '@/utils/useBroadcast';
import { CameraIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, FolderPlusIcon, PuzzlePieceIcon, UsersIcon } from '@heroicons/react/24/outline';
import { BigNumber } from 'ethers';
import { defaultAbiCoder, splitSignature } from 'ethers/lib/utils';
import React, { Dispatch, FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAccount, useBalance, useContractRead, useContractWrite, useSignTypedData } from 'wagmi';
import getTokenImage from '@/lib/getTokenImage';
import Loader from '../../UI/Loader';
import Image from 'next/image'
import AllowanceButton from './AllowanceButton';
import dayjs from 'dayjs';
import { Spinner } from '@/components/UI/Spinner';
import IndexStatus from '@/components/UI/IndexStatus';
import { encode } from 'punycode';

interface Props {
    publication: Publication
    setCount: Dispatch<number>
    count: number
}

const CollectModule: FC<Props> = ({publication, setCount, count }) => {
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [revenue, setRevenue] = useState(0);
  const [hasCollectedByMe, setHasCollectedByMe] = useState(publication?.hasCollectedByMe);
  const [showCollectorsModal, setShowCollectorsModal] = useState(false);
  const [allowed, setAllowed] = useState(true);
  const [usdPrice, setUsdPrice] = useState(0);
  const { address } = useAccount();
  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({ onError });

  const { data, loading } = useCollectModuleQuery({
    variables: { request: { publicationId: publication?.id } }
  })

  const collectModule: any = data?.publication?.collectModule

  const onCompleted = () => {
    setRevenue(revenue + parseFloat(collectModule?.amount?.value))
    setCount(count + 1)
    setHasCollectedByMe(true)
    toast.success('Collect Successfully')
  }

  const { isFetching, refetch } = useContractRead({
    address: UPDATE_OWNABLE_FEE_COLLECT_MODULE_ADDRESS,
    abi: UpdateOwnableFeeCollectModule,
    functionName: 'getPublicationData',
    args: [parseInt(publication.profile?.id), parseInt(publication?.id.split('-')[1])],
    enabled: false
  })

  const {
    data: writeData,
    isLoading: writeLoading,
    write
  } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: 'collectWithSig',
    mode: 'recklesslyUnprepared',
    onSuccess: onCompleted,
    onError
  })

  const percentageCollected = (count / parseInt(collectModule?.collectLimit)) * 100

  const { data: allowanceData, loading: allowanceLoading } = useApprovedModuleAllowanceAmountQuery({
    variables: {
      request: {
        currencies: collectModule?.amount?.asset?.address,
        followModules: [],
        collectModules: collectModule?.type,
        referenceModules: []
      }
    },
    skip: !collectModule?.amount?.asset?.address || !currentProfile,
    onCompleted: (data) => {
      setAllowed(data?.approvedModuleAllowanceAmount[0]?.allowance !== '0x00')
    }
  })

  const { data: revenueData, loading: revenueLoading } = usePublicationRevenueQuery({
    variables: {
      request: {
        publicationId: publication?.id
      }
    },
    pollInterval: 5000,
    skip: !publication?.id
  })

  useEffect(() => {
    setRevenue(parseFloat((revenueData?.publicationRevenue?.revenue?.total?.value as any) ?? 0))
    if (collectModule?.amount) {
      getCoingeckoPrice(getAssetAddress(collectModule?.amount?.asset?.symbol)).then((data) => {
        setUsdPrice(data)
      })
    }
  }, [collectModule?.amount, revenueData])

  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address: address,
    token: collectModule?.amount?.asset?.address,
    formatUnits: collectModule?.amount?.asset?.decimals,
    watch: true
  })

  let hasAmount = false
  if (balanceData && parseFloat(balanceData?.formatted) < parseFloat(collectModule?.amount?.value)) {
    hasAmount = false
  } else {
    hasAmount = true
  }

  const { broadcast, data: broadcastData, loading: broadcastLoading } = useBroadcast({ onCompleted })
  const [createCollectTypedData, { loading: typedDataLoading }] = useCreateCollectTypedDataMutation({
    onCompleted: async ({ createCollectTypedData }) => {
      try {
        const { id, typedData } = createCollectTypedData
        const { profileId, pubId, data: collectData, deadline } = typedData.value
        const signature = await signTypedDataAsync(getSignature(typedData))
        const { v, r, s } = splitSignature(signature)
        const sig = { v, r, s, deadline }
        const inputStruct = {
          collector: address,
          profileId,
          pubId,
          data: collectData,
          sig
        }

        setUserSigNonce(userSigNonce + 1)
        if (!RELAY_ON) {
          return write?.({ recklesslySetUnpreparedArgs: [inputStruct] })
        }

        const {
          data: { broadcast: result }
        } = await broadcast({ request: { id, signature } })

        if ('reason' in result) {
          write?.({ recklesslySetUnpreparedArgs: [inputStruct] })
        }
      } catch {}
    },
    onError
  })

  const [createCollectProxyAction, { loading: proxyActionLoading }] = useProxyActionMutation({
    onCompleted,
    onError
  })

  const createViaProxyAction = async (variables: any) => {
    const { data } = await createCollectProxyAction({ variables })
    if (!data?.proxyAction) {
      createCollectTypedData({
        variables: {
          request: { publicationId: publication?.id },
          options: { overrideSigNonce: userSigNonce }
        }
      })
    }
  }

  const createCollect = () => {
    if(!currentProfile) {
      return toast.error("Please connect your Wallet")
    }

    if (collectModule?.type === CollectModules.FeeCollectModule) {
      createViaProxyAction({
        request: { collect: { freeCollect: { publicationId: publication?.id } } }
      })
    } else if (collectModule?.__typename === 'UnknownCollectModuleSettings') {
      refetch().then(({ data }) => {
        if (data) {
          const decodedData: any = data
          const encodedData = defaultAbiCoder.encode(
            ['address', 'uint256'],
            [decodedData?.[2] as string, decodedData?.[1] as BigNumber]
          )
          createCollectTypedData ({
            variables: {
              options: { overrideSigNonce: userSigNonce },
              request: { publicationId: publication?.id, unknownModuleData: encode }
            }
          })
        }
      })
    } else {
      createCollectTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request: { publicationId: publication?.id }
        }
      })
    }
  }

  if (loading || revenueLoading) {
    return <Loader message="Loading collect" />
  }

  const isLoading = typedDataLoading || proxyActionLoading || signLoading || isFetching || writeLoading || broadcastLoading

  return (
    <>
      <>
      {(collectModule?.type === CollectModules.LimitedFeeCollectModule ||
        collectModule?.type === CollectModules.LimitedTimedFeeCollectModule) && (
          <div className="w-full h-2.5 bg-gray-200">
            <div className="h-2.5 bg-blue-500" style={{ width: `${percentageCollected}%` }} />
          </div>
        )}
        <div className="p-5">
          {collectModule?.followerOnly && (
            <div className="pb-5">
              Follower Only Collect Module
            </div>
          )}
          <div className="pb-2 space-y-1.5">
            <div className="flex items-center space-x-2">
              {publication?.metadata?.name && (
                <div className="text-xl font-bold">{publication?.metadata?.name}</div>
              )}
            </div>
            {publication?.metadata?.description && (
              <span className="text-gray-500 line-clamp-2">{publication?.metadata?.description}</span>
            )}
          </div>
          {collectModule?.amount && (
            <div className="flex items-center py-2 space-x-1.5">
              <Image 
                className="w-7 h-7"
                height={28}
                width={28}
                src={getTokenImage(collectModule?.amount?.asset?.symbol)}
                alt={collectModule?.amount?.asset?.symbol}
                title={collectModule?.amount?.asset?.symbol}
              />
              <span className="space-x-1">
                <span className="text-2x1 font-bold">{collectModule.amount.value}</span>
                <span className="text-xs">{collectModule?.amount?.asset?.symbol}</span>
                {usdPrice ? (
                  <>
                    <span className="text-gray-500 px-0.5">.</span>
                    <span>
                      ${(collectModule.amount.value * usdPrice).toFixed(2)}
                    </span>
                  </>
                ) : null}
              </span>
            </div>
          )}
          <div className="space-y-1.5">
            <div className="block space-y-1 sm:flex sm:space-x-5 item-center">
              <div className="flex items-center space-x-2">
                <UsersIcon className="w-4 h-4 text-gray-500" />
                <span className="font-bold text-xs cursor-pointer"
                  onClick={() => {setShowCollectorsModal(!showCollectorsModal)}}
                >
                  {count} Collectors 
                </span>
                <Modal
                  title="Collected by"
                  show={showCollectorsModal}
                  onClose={() => setShowCollectorsModal(false)}
                >
                  <Collectors
                    publicationId={publication?.id}
                  />
                </Modal>
              </div>
              {collectModule?.collectLimit && (
                <div className="flex items-center space-x-2">
                  <CameraIcon className="w-4 h-4 text-gray-500" />
                  <div className="font-bold">{parseInt(collectModule?.collectLimit) - count} Avaliable</div>
                </div>
              )}
              {collectModule?.referralFee ? (
                <div className="flex items-center space-x-2">
                  <CurrencyDollarIcon className="w-4 h-4 text-gray-500" />
                  <div className="font-bold">{collectModule.referralFee}% Referral fee</div>
                </div>
              ) : null}
            </div>
            {revenueData?.publicationRevenue && (
              <div className="flex items-center space-x-2">
                <CurrencyDollarIcon className="w-4 h-4 text-gray-500" />
                <div className="flex items-center space-x-1.5">
                  <span>Revenue:</span>
                  <span className="flex items-center space-x-1">
                    <Image 
                      src={getTokenImage(collectModule?.amount?.asset?.symbol)}
                      className="w-5 h-5"
                      height={20}
                      width={20}
                      alt={collectModule?.amount?.asset?.symbol}
                      title={collectModule?.amount?.asset?.symbol}
                    />
                    <div className="flex items-baseline space-x-1.5">
                      <div className="font-bold">{revenue}</div>
                      <div className="text-[10px]">{collectModule?.amount?.asset?.symbol}</div>
                      {usdPrice ? (
                        <>
                          <span className="text-gray-500">.</span>
                          <span className="text-xs font-bold text-gray-500">
                            ${(revenue * usdPrice).toFixed(2)}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </span>
                </div>
              </div>
            )}
            {collectModule?.endTimestamp && (
              <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-gray-500" />
                <div className="space-x-1.5">
                  <span>Sale Ends:</span>
                  <span className="font-bold text-gray-600">
                    {dayjs(collectModule.endTimestamp).format('MMMM DD, YYYY')} at{' '}
                    {dayjs(collectModule.endTimestamp).format('hh:mm a')}
                  </span>
                </div>
              </div>
            )}
            {data?.publication?.collectNftAddress && (
              <div></div>
            )}
          </div>
          {writeData?.hash ?? broadcastData?.broadcast?.txHash ? (
            <div>
              <IndexStatus txHash={writeData?.hash ?? broadcastData?.broadcast?.txHash} />
            </div>
          ) : null}
          <div className="flex items-center space-x-2 mt-5">
            {currentProfile && !hasCollectedByMe ? (
              allowanceLoading || balanceLoading ? (
                <div className="w-28 round-lg h-[34px] shimmer"
                />
              ) : allowed ? (
                hasAmount ? (
                  <Button
                    className="text-xs font-bold"
                    onClick={createCollect}
                    disabled={isLoading}
                    icon={isLoading ? <Spinner size="xs" /> : <FolderPlusIcon className="w-4 h-4" />}
                  >
                    Collect now
                  </Button>
                ) : (
                  "Not enough money"
                )
              ) : (
                <AllowanceButton 
                  title="Allow collect module"
                  module={allowanceData?.approvedModuleAllowanceAmount[0]}
                  allowed={allowed}
                  setAllowed={setAllowed}
                />
              )
            ) : null}
          </div>
          {publication?.hasCollectedByMe && (
            <div className="mt-3 font-bold text-green-500 flex items-center space-x-1.5">
              <CheckCircleIcon className="h-5 w-5" />
              <div>You already collected this</div>
            </div>
          )}
        </div>
      </>
    </>
  )
}

export default CollectModule