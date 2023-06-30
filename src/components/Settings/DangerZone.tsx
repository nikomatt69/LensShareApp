
import { utils } from 'ethers'
import type { CreateBurnProfileBroadcastItemResult } from '@/utils/lens'
import { useCreateBurnProfileTypedDataMutation } from '@/utils/lens'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Custom404 from 'src/pages/404'

import type { CustomErrorWithData } from '@/utils/custom-types'
import {formatNumber} from '@/utils/functions/formatNumber'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import omitKey from '@/utils/functions/omit'
import {
  useContractWrite,
  useSignTypedData,
  useWaitForTransaction
} from 'wagmi'
import { LENS_HUB_ABI } from '@/abi/abi'
import { LENSHUB_PROXY } from '@/constants'
import { signOut } from '@/store/auth'
import { Button } from '../UI/Button'
import { useAppStore } from '@/store/app'

const DangerZone = () => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  const [loading, setLoading] = useState(false)
  const [txnHash, setTxnHash] = useState<`0x${string}`>()
  const { signTypedDataAsync } = useSignTypedData({
    onError(error) {
      toast.error(error?.message)
    }
  })

  const onError = (error: CustomErrorWithData) => {
    setLoading(false)
    toast.error(error?.data?.message ?? error?.message)
  }

  const { write: writeDeleteProfile } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: 'burnWithSig',

    onError,
    onSuccess: (data) => setTxnHash(data.hash)
  })

  useWaitForTransaction({
    enabled: txnHash && txnHash.length > 0,
    hash: txnHash,
    onSuccess: () => {
      toast.success('Channel deleted')
      setLoading(false)
      signOut()
      location.href = '/'
    },
    onError
  })

  const [createBurnProfileTypedData] = useCreateBurnProfileTypedDataMutation({
    onCompleted: async (data) => {
      const { typedData } =
        data.createBurnProfileTypedData as CreateBurnProfileBroadcastItemResult
      try {
        const signature = await signTypedDataAsync({
          domain: omitKey(typedData?.domain, '__typename'),
          types: omitKey(typedData?.types, '__typename'),
          primaryType: 'CreateBurnProfileBroadcastItemResult',
          message: omitKey(typedData?.value, '__typename')
        })
        const { tokenId } = typedData?.value
        const { v, r, s } = utils.splitSignature(signature)
        const sig = { v, r, s, deadline: typedData.value.deadline }
        writeDeleteProfile?.({ args: [tokenId, sig] })
      } catch {
        setLoading(false)
      }
    },
    onError
  })

  const onClickDelete = () => {
    setLoading(true)
    createBurnProfileTypedData({
      variables: {
        request: { profileId: currentProfile?.id }
      }
    })
  }

  if (!currentProfile) {
    return <Custom404 />
  }

  return (
    <div className="rounded-lg  p-4 dark:divide-gray-900">
      <div className="mb-5 flex flex-wrap items-center justify-between rounded-sm border p-4 dark:border-gray-700">
        <div className="flex items-center">
          <div className="mr-3 mt-0.5 flex-none">
            <img
              src={getProfilePicture(currentProfile, 'avatar')}
              className="h-9 w-9 rounded-full"
              draggable={false}
              alt={currentProfile?.handle}
            />
          </div>
          <div className="flex flex-col">
            {currentProfile.name && (
              <h6 className="font-medium">{currentProfile.name}</h6>
            )}
            <span className="flex items-center space-x-1">
              <span className="text-sm">{currentProfile?.handle}</span>
              
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span>
            {formatNumber(currentProfile.stats.totalPosts)}{' '}
            <small>videos</small>
          </span>
          <span>
            {formatNumber(currentProfile.stats.totalFollowers)}{' '}
            <small>subscribers</small>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between px-2">
        <div className="mb-4">
          <h1 className="mb-1 text-xl font-semibold">Delete Channel</h1>
          <p className="text-sm opacity-80">
            Delete your channel and its data from Lens.
            <span className="ml-1 text-sm text-red-500">
              It can not be reverted
            </span>
          </p>
        </div>
        <Button
          loading={loading}
          onClick={() => onClickDelete()}
          variant="danger"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DangerZone
