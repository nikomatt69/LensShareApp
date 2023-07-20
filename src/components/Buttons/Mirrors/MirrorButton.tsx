import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import type {
  CreateMirrorRequest,
  Publication
} from '@/utils/lens/generatedLenster';
import { useAppStore } from '@/store/app';
import { useContractWrite, useSignTypedData } from 'wagmi';
import onError from '@/lib/onError';
import { toast } from 'react-hot-toast';
import { LENSHUB_PROXY } from '@/constants';
import { LENS_HUB_ABI } from '@/abi/abi';
import {
  useBroadcastMutation,
  useCreateMirrorTypedDataMutation,
  useCreateMirrorViaDispatcherMutation
} from '@/types/graph';
import getSignature from '@/lib/getSignature';
import { splitSignature } from 'ethers/lib/utils';
import Spinner from '@/components/Spinner';
import MirrorOutline from '../MirrorOutline';
import { LensHub } from '@/abi/LensHub';

//should also add authorisation so user cant like posttwice

interface Props {
  publication: Publication;
}

const MirrorButton: FC<Props> = ({ publication }) => {
  const isMirror = publication.__typename === 'Mirror';
  const userSigNonce = useAppStore((state) => state.setUserSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);

  const [count, setCount] = useState(
    isMirror
      ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
      : publication?.stats?.totalAmountOfMirrors
  );

  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
    onError
  });

  const [alreadyMirrored, setAlreadyMirrored] = useState(
    // @ts-ignore
    isMirror ? publication?.mirrorOf?.mirrors?.length > 0 : null
  );

  const onCompleted = () => {
    setAlreadyMirrored(true);
    setCount(count + 1);
    toast.success('Post mirrored sucessfully!');
  };

  const { isLoading: writeLoading, write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'mirrorWithSig',

    onSuccess: onCompleted,
    onError
  });

  const [broadcast, { loading: broadcastLoading }] = useBroadcastMutation({
    onCompleted
  });

  const [createMirrorTypedData, { loading: typedDataLoading }] =
    useCreateMirrorTypedDataMutation({
      onCompleted: async ({ createMirrorTypedData }) => {
        const { id, typedData } = createMirrorTypedData;
        const {
          profileId,
          profileIdPointed,
          pubIdPointed,
          referenceModule,
          referenceModuleData,
          referenceModuleInitData,
          deadline
        } = typedData.value;
        const signature = await signTypedDataAsync(getSignature(typedData));
        const { v, r, s } = splitSignature(signature);
        const sig = { v, r, s, deadline };
        const inputStruct = {
          profileId,
          profileIdPointed,
          pubIdPointed,
          referenceModule,
          referenceModuleData,
          referenceModuleInitData,
          sig
        };
        const { data } = await broadcast({
          variables: { request: { id, signature } }
        });
        if (data?.broadcast.__typename === 'RelayError') {
          return write?.({ args: [inputStruct] });
        }
      },
      onError
    });

  const [createMirrorViaDispatcher, { loading: dispatcherLoading }] =
    useCreateMirrorViaDispatcherMutation({
      onCompleted,
      onError
    });

  const createViaDispatcher = async (request: CreateMirrorRequest) => {
    const { data } = await createMirrorViaDispatcher({
      variables: { request }
    });
    if (data?.createMirrorViaDispatcher?.__typename === 'RelayError') {
      await createMirrorTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request
        }
      });
    }
  };

  const createMirror = async () => {
    if (!currentProfile) {
      return toast.error('Please sign in with your wallet!');
    }

    try {
      const request: CreateMirrorRequest = {
        profileId: currentProfile?.id,
        publicationId: publication?.id,
        referenceModule: {
          followerOnlyReferenceModule: false
        }
      };

      if (currentProfile?.dispatcher?.canUseRelay) {
        return await createViaDispatcher(request);
      }

      return await createMirrorTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request
        }
      });
    } catch {}
  };

  const isLoading =
    typedDataLoading ||
    dispatcherLoading ||
    signLoading ||
    writeLoading ||
    broadcastLoading;

  return (
    <div className="flex gap-6">
      <div className="flex cursor-pointer flex-col items-center justify-center md:mt-4">
        {alreadyMirrored ? (
          <div className=" cursor-pointer rounded-full  bg-gray-600/50 p-2 dark:bg-gray-600/50 md:bg-gray-200">
            <MirrorOutline className="h-3 w-3 text-blue-700" />
          </div>
        ) : (
          <div className=" cursor-pointer rounded-full bg-gray-600/50 p-2 dark:bg-gray-600/50 md:bg-gray-200">
            {isLoading ? (
              <Spinner />
            ) : (
              <MirrorOutline
                onClick={createMirror}
                className="h-3 w-3 font-bold "
              />
            )}
            <span
              className="pointer-events-none absolute -bottom-7 left-7 hidden w-max cursor-pointer px-2 py-1 text-xs text-blue-700 
          opacity-0 shadow group-hover:opacity-100 md:block"
            >
              {' '}
              Mirror{' '}
            </span>
          </div>
        )}
        <p className="hidden text-xs font-semibold text-gray-400 lg:block">
          {count}
        </p>
      </div>
    </div>
  );
};

export default MirrorButton;
