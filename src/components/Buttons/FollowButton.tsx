import { LENS_HUB_ABI } from '@/abi/abi';
import { LENSHUB_PROXY } from '@/constants';
import onError from '@/lib/onError';
import { Profile } from '@/utils/lens/generatedLenster';
import useBroadcast from '@/utils/useBroadcast';
import { ApolloCache } from '@apollo/client';
import { Dispatch, FC, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useAppStore } from 'src/store/app';

import { useAccount, useSignTypedData, useContractWrite } from 'wagmi';
import * as Apollo from '@apollo/client';
import getSignature from '@/lib/getSignature';
import splitSignature from '@/lib/splitSignature';
import {
  useCreateFollowTypedDataMutation,
  useProxyActionMutation
} from '@/types/graph';
import { LensHub } from '@/abi/LensHub';
import { useNonceStore } from '@/store/nonce';

interface Props {
  setFollowing: Dispatch<boolean>;
  profile: Profile;
}

const FollowButton: FC<Props> = ({ setFollowing, profile }) => {
  const userSigNonce = useNonceStore((state) => state.userSigNonce);
  const setUserSigNonce = useNonceStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { address } = useAccount();

  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
    onError
  });

  const onCompleted = () => {
    setFollowing(true);
    toast.success('Followed successfully!');
  };

  const updateCache = (cache: ApolloCache<any>) => {
    cache.modify({
      id: `Profile:${profile?.id}`,
      fields: {
        isFollowedByMe: () => true
      }
    });
  };

  const { isLoading: writeLoading, write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'followWithSig',

    onSuccess: onCompleted,
    onError
  });

  const { broadcast, loading: broadcastLoading } = useBroadcast({
    onCompleted
  });
  const [createFollowTypedData, { loading: typedDataLoading }] =
    useCreateFollowTypedDataMutation({
      onCompleted: async ({ createFollowTypedData }) => {
        const { id, typedData } = createFollowTypedData;
        const { deadline } = typedData.value;

        try {
          const signature = await signTypedDataAsync(
            getSignature(JSON.parse(JSON.stringify(typedData)))
          );
          setUserSigNonce(userSigNonce + 1);
          const { profileIds, datas: followData } = typedData.value;
          const { v, r, s } = splitSignature(signature);
          const sig = { v, r, s, deadline };
          const inputStruct = {
            follower: address,
            profileIds,
            datas: followData,
            sig
          };

          write?.({ args: [inputStruct] });

          const {
            data: { broadcast: result }
          } = await broadcast({ request: { id, signature } });

          if ('reason' in result) {
            write?.({ args: [inputStruct] });
          }
        } catch {}
      },
      onError,
      update: updateCache
    });

  const [createFollowProxyAction, { loading: proxyActionLoading }] =
    useProxyActionMutation({
      onCompleted,
      onError,
      update: updateCache
    });

  const createViaProxyAction = async (variables: any) => {
    const { data } = await createFollowProxyAction({
      variables
    });
    if (!data?.proxyAction) {
      createFollowTypedData({
        variables: {
          request: { follow: [{ profile: profile?.id }] },
          options: { overrideSigNonce: userSigNonce }
        }
      });
    }
  };

  const createFollow = () => {
    if (!currentProfile) {
      return toast.error('Please Connect Your Wallet');
    }

    if (profile?.followModule) {
      createFollowTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request: {
            follow: [
              {
                profile: profile?.id,
                followModule:
                  profile?.followModule?.__typename ===
                  'ProfileFollowModuleSettings'
                    ? { profileFollowModule: { profileId: currentProfile?.id } }
                    : null
              }
            ]
          }
        }
      });
    } else {
      createViaProxyAction({
        request: {
          follow: {
            freeFollow: {
              profileId: profile?.id
            }
          }
        }
      });
    }
  };

  const isLoading =
    typedDataLoading ||
    proxyActionLoading ||
    signLoading ||
    writeLoading ||
    broadcastLoading;

  return (
    <>
      <div>
        <button
          onClick={createFollow}
          disabled={isLoading}
          className="lg:text-md xl:text-md font-helvetica mt-2 cursor-pointer rounded-full border-2 border-black bg-blue-700 px-1 py-1 text-xs font-semibold text-[#000000] drop-shadow-xl transition hover:bg-[#57B8FF] hover:text-[#fff]"
        >
          Follow
        </button>
      </div>
    </>
  );
};

export default FollowButton;
