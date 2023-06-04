import React, { useEffect, useState } from 'react';
import type { FC } from 'react'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import type { CreateMirrorRequest, Publication } from '@/utils/lens';
import { useAppStore } from '@/store/app';
import { useContractWrite, useSignTypedData } from 'wagmi';
import onError from '@/lib/onError';
import { toast } from 'react-hot-toast';
import { LENSHUB_PROXY } from '@/constants';
import { LENS_HUB_ABI } from '@/abi/abi';
import { useBroadcastMutation, useCreateMirrorTypedDataMutation, useCreateMirrorViaDispatcherMutation } from '@/types/graph';
import getSignature from '@/lib/getSignature';
import { splitSignature } from 'ethers/lib/utils';
import Spinner from '@/components/Spinner';

//should also add authorisation so user cant like posttwice

interface Props {
  publication: Publication
}

const MirrorButton: FC<Props> = ({publication}) => {
    const isMirror = publication.__typename === 'Mirror'
    const userSigNonce = useAppStore((state) => state.setUserSigNonce)
    const setUserSigNonce = useAppStore((state) => state.setUserSigNonce)
    const currentProfile = useAppStore((state) => state.currentProfile)

    const [count, setCount] = useState(
      isMirror
      ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
      : publication?.stats?.totalAmountOfMirrors
    )

    
    const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({ onError })

    const [alreadyMirrored, setAlreadyMirrored] = useState(
    // @ts-ignore
    isMirror ? publication?.mirrorOf?.mirrors?.length > 0 : publication?.mirrors?.length > 0
    );

    const onCompleted = () => {
      setAlreadyMirrored(true)
      setCount( count + 1 )
      toast.success('Post mirrored sucessfully!')
    }

    const { isLoading: writeLoading, write } = useContractWrite({
      address: LENSHUB_PROXY,
      abi: LENS_HUB_ABI,
      functionName: 'mirrorWithSig',
      mode: 'recklesslyUnprepared',
      onSuccess: onCompleted,
      onError
    })

    const [ broadcast, { loading: broadcastLoading }] = useBroadcastMutation({
      onCompleted 
    })

    const [ createMirrorTypedData, { loading: typedDataLoading } ] = useCreateMirrorTypedDataMutation({
      onCompleted: async ({ createMirrorTypedData }) => {
        const { id, typedData } = createMirrorTypedData
        const {
          profileId,
          profileIdPointed,
          pubIdPointed,
          referenceModule,
          referenceModuleData,
          referenceModuleInitData,
          deadline
        } = typedData.value
        const signature = await signTypedDataAsync(getSignature(typedData))
        const { v, r, s } = splitSignature(signature)
        const sig = { v, r, s, deadline }
        const inputStruct = {
          profileId,
          profileIdPointed,
          pubIdPointed,
          referenceModule,
          referenceModuleData,
          referenceModuleInitData,
          sig
        }
        const { data } = await broadcast({ variables: { request: { id, signature } } })
        if (data?.broadcast.__typename === 'RelayError') {
          return write?.({ recklesslySetUnpreparedArgs: [ inputStruct ] })
        }
      },
      onError
    })

    const [ createMirrorViaDispatcher, { loading: dispatcherLoading } ] = useCreateMirrorViaDispatcherMutation({
      onCompleted, 
      onError
    })

    const createViaDispatcher = async ( request: CreateMirrorRequest ) => {
      const { data } = await createMirrorViaDispatcher({
        variables: { request }
      })
      if (data?.createMirrorViaDispatcher?.__typename === 'RelayError') {
        await createMirrorTypedData({
          variables: {
            options: { overrideSigNonce: userSigNonce },
            request
          }
        })
      }
    }

    const createMirror = async () => {
      if (!currentProfile) {
        return toast.error('Please sign in with your wallet!')
      }

      try {
        const request: CreateMirrorRequest = {
          profileId: currentProfile?.id,
          publicationId: publication?.id,
          referenceModule: {
            followerOnlyReferenceModule: false
          }
        }

        if (currentProfile?.dispatcher?.canUseRelay) {
          return await createViaDispatcher(request)
        }

        return await createMirrorTypedData({
          variables: {
            options: { overrideSigNonce: userSigNonce },
            request
          }
        })
      } catch {}
    }

    const isLoading = typedDataLoading || dispatcherLoading || signLoading || writeLoading || broadcastLoading;

    return (
       <div className="flex gap-6">
        <div className="md:mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyMirrored ? (
         <div className="flex items-center drop-shadow-lg  md:border-none bg-blue-500 border-2 border-black rounded-lg p-2 md:p-3">
         <ArrowsRightLeftIcon className="w-3 h-3 text-[#57B8FF] font-bold" />
          </div>
        ) : (
        <div 
        className="flex items-center drop-shadow-lg  md:border-none bg-blue-500 border-2 border-black rounded-lg p-2 md:p-3
        md:hover:bg-[#57B8FF] group relative w-max">
        {isLoading ? <Spinner /> : <ArrowsRightLeftIcon onClick={createMirror} className='w-3 h-3 font-bold text-black' /> }
         <span className="hidden md:block pointer-events-none absolute -bottom-7 left-7 w-max shadow px-2 py-1 
          text-xs text-blue-700 opacity-0 group-hover:opacity-100"> Mirror </span>
          </div>
        )}
        <p className="text-xs hidden lg:block font-semibold text-gray-400">{count}</p>
        </div>
        </div>
    );
}

export default MirrorButton; 