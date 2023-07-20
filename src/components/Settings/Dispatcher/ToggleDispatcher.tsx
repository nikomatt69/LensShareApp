import { LensHub } from '@/abi/LensHub';
import { LENS_HUB_ABI } from '@/abi/abi';
import { Button } from '@/components/UI/Button';
import IndexStatus from '@/components/UI/IndexStatus';
import { Spinner } from '@/components/UI/Spinner';
import { LENSHUB_PROXY, OLD_LENS_RELAYER_ADDRESS } from '@/constants';
import getIsDispatcherEnabled from '@/lib/getIsDispatcherEnabled';
import getSignature from '@/lib/getSignature';
import {
  useBroadcastMutation,
  useCreateSetDispatcherTypedDataMutation
} from '@/utils/lens/generatedLenster';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppStore } from 'src/store/app';

import { useContractWrite, useSignTypedData } from 'wagmi';

interface ToggleDispatcherProps {
  buttonSize?: 'sm';
}

const ToggleDispatcher: FC<ToggleDispatcherProps> = ({ buttonSize = 'md' }) => {
  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [isLoading, setIsLoading] = useState(false);
  const canUseRelay = getIsDispatcherEnabled(currentProfile);
  const isOldDispatcherEnabled =
    currentProfile?.dispatcher?.address?.toLocaleLowerCase() ===
    OLD_LENS_RELAYER_ADDRESS.toLocaleLowerCase();

  const onCompleted = (__typename?: 'RelayError' | 'RelayerResult') => {
    if (__typename === 'RelayError') {
      return;
    }

    setIsLoading(false);
    toast.success(`Profile updated successfully!`);
  };

  const onError = (error: any) => {
    setIsLoading(false);
    error;
  };

  const { signTypedDataAsync } = useSignTypedData({ onError });
  const { data: writeData, write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'setDispatcher',
    onSuccess: () => {
      onCompleted();
      setUserSigNonce(userSigNonce + 1);
    },
    onError: (error) => {
      onError(error);
      setUserSigNonce(userSigNonce - 1);
    }
  });

  const [broadcast, { data: broadcastData }] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => onCompleted(broadcast.__typename)
  });
  const [createSetDispatcherTypedData] =
    useCreateSetDispatcherTypedDataMutation({
      onCompleted: async ({ createSetDispatcherTypedData }) => {
        const { id, typedData } = createSetDispatcherTypedData;
        const signature = await signTypedDataAsync(getSignature(typedData));
        const { data } = await broadcast({
          variables: { request: { id, signature } }
        });
        if (data?.broadcast.__typename === 'RelayError') {
          const { profileId, dispatcher } = typedData.value;
          return write?.({
            args: [profileId, dispatcher]
          });
        }
      },
      onError
    });

  const toggleDispatcher = async () => {
    try {
      setIsLoading(true);
      return await createSetDispatcherTypedData({
        variables: {
          request: {
            profileId: currentProfile?.id,
            enable: canUseRelay ? false : true
          }
        }
      });
    } catch (error) {
      onError(error);
    }
  };

  const getButtonText = () => {
    if (canUseRelay) {
      return 'Disable';
    } else if (isOldDispatcherEnabled) {
      return 'Update';
    } else {
      return 'Enable';
    }
  };

  const broadcastTxHash =
    broadcastData?.broadcast.__typename === 'RelayerResult' &&
    broadcastData.broadcast.txHash;

  return writeData?.hash ?? broadcastTxHash ? (
    <div className="mt-2">
      <IndexStatus txHash={writeData?.hash ?? broadcastTxHash} reload />
    </div>
  ) : (
    <Button
      variant={canUseRelay ? 'danger' : 'primary'}
      className={clsx({ 'text-sm': buttonSize === 'sm' }, 'mr-auto')}
      disabled={isLoading}
      icon={
        isLoading ? (
          <Spinner variant={canUseRelay ? 'danger' : 'primary'} size="xs" />
        ) : canUseRelay ? (
          <XCircleIcon className="h-4 w-4" />
        ) : (
          <CheckCircleIcon className="h-4 w-4" />
        )
      }
      onClick={toggleDispatcher}
    >
      {getButtonText()}
    </Button>
  );
};

export default ToggleDispatcher;
