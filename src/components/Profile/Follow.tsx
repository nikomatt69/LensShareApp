import { LENS_HUB_ABI } from '@/abi/abi';
import { LENSHUB_PROXY } from '@/constants';
import getSignature from '@/lib/getSignature';
import { useAppStore } from '@/store/app';
import { useGlobalModalStateStore } from '@/store/modals';

import {
  Profile,
  useBroadcastMutation,
  useCreateFollowTypedDataMutation,
  useProxyActionMutation
} from '@/utils/lens/generatedLenster';
import { ApolloCache } from '@apollo/client';
import { useRouter } from 'next/router';
import { Dispatch, FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useContractWrite, useSignTypedData } from 'wagmi';
import { Button } from '../UI/Button';
import { Spinner } from '../UI/Spinner';
import { UserIcon } from '@heroicons/react/24/outline';
import { LensHub } from '@/abi/LensHub';

interface FollowProps {
  profile: Profile;
  setFollowing: Dispatch<boolean>;
  showText?: boolean;
  outline?: boolean;

  // For data analytics
  followUnfollowPosition?: number;
  followUnfollowSource?: string;
}

const Follow: FC<FollowProps> = ({
  profile,
  showText = false,
  setFollowing,
  outline = true,
  followUnfollowSource,
  followUnfollowPosition
}) => {
  const { pathname } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const setShowAuthModal = useGlobalModalStateStore(
    (state) => state.setShowAuthModal
  );
  const [isLoading, setIsLoading] = useState(false);

  const updateCache = (cache: ApolloCache<any>) => {
    cache.modify({
      id: `Profile:${profile?.id}`,
      fields: {
        isFollowedByMe: () => true
      }
    });
  };

  const onCompleted = (__typename?: 'RelayError' | 'RelayerResult') => {
    if (__typename === 'RelayError') {
      return;
    }

    setIsLoading(false);
    setFollowing(true);
    toast.success(`Followed successfully!`);
  };

  const onError = (error: any) => {
    setIsLoading(false);
    error;
  };

  const { signTypedDataAsync } = useSignTypedData({ onError });
  const { write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'follow',
    onSuccess: () => onCompleted(),
    onError
  });

  const [broadcast] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => onCompleted(broadcast.__typename)
  });
  const [createFollowTypedData] = useCreateFollowTypedDataMutation({
    onCompleted: async ({ createFollowTypedData }) => {
      const { id, typedData } = createFollowTypedData;
      // TODO: Replace deep clone with right helper
      const signature = await signTypedDataAsync(
        getSignature(JSON.parse(JSON.stringify(typedData)))
      );
      setUserSigNonce(userSigNonce + 1);
      const { data } = await broadcast({
        variables: { request: { id, signature } }
      });
      if (data?.broadcast.__typename === 'RelayError') {
        const { profileIds, datas } = typedData.value;
        return write?.({ args: [profileIds, datas] });
      }
    },
    onError,
    update: updateCache
  });

  const [createFollowProxyAction] = useProxyActionMutation({
    onCompleted: () => onCompleted(),
    onError,
    update: updateCache
  });

  const createViaProxyAction = async (variables: any) => {
    const { data } = await createFollowProxyAction({
      variables
    });
    if (!data?.proxyAction) {
      return await createFollowTypedData({
        variables: {
          request: { follow: [{ profile: profile?.id }] },
          options: { overrideSigNonce: userSigNonce }
        }
      });
    }
  };

  const createFollow = async () => {
    if (!currentProfile) {
      setShowAuthModal(true);
      return;
    }

    try {
      setIsLoading(true);
      if (profile?.followModule) {
        return await createFollowTypedData({
          variables: {
            options: { overrideSigNonce: userSigNonce },
            request: {
              follow: [
                {
                  profile: profile?.id,
                  followModule:
                    profile?.followModule?.__typename ===
                    'ProfileFollowModuleSettings'
                      ? {
                          profileFollowModule: { profileId: currentProfile?.id }
                        }
                      : null
                }
              ]
            }
          }
        });
      }

      return await createViaProxyAction({
        request: {
          follow: { freeFollow: { profileId: profile?.id } }
        }
      });
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Button
      className="!px-3 !py-1.5 text-sm"
      outline={outline}
      onClick={createFollow}
      aria-label="Follow"
      disabled={isLoading}
      icon={
        isLoading ? <Spinner size="xs" /> : <UserIcon className="h-4 w-4" />
      }
    >
      {showText && `Follow`}
    </Button>
  );
};

export default Follow;
