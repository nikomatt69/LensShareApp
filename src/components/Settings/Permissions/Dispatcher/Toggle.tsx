
import { utils } from 'ethers'
import type { CreateSetDispatcherBroadcastItemResult, Profile } from '@/utils/lens'
import {
  useBroadcastMutation,
  useCreateSetDispatcherTypedDataMutation,
  useProfileLazyQuery
} from '@/utils/lens'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import omitKey from '@/lib/omit'
import { useContractWrite, useSignTypedData } from 'wagmi'
import { useAppStore } from '@/store/app'
import { CustomErrorWithData } from '@/utils/custom-types2'
import { ERROR_MESSAGE, LENSHUB_PROXY } from '@/constants'
import usePendingTxn from '@/utils/hooks/usePendingTxn'
import { Button } from '@/components/UI/Button'
import { LENS_HUB_ABI } from '@/abi/abi'

const Toggle = () => {
  const [loading, setLoading] = useState(false)
  const currentProfile = useAppStore((state: { currentProfile: any }) => state.currentProfile)
  const setcurrentProfile = useAppStore((state) => state.setCurrentProfile)
  const userSigNonce = useAppStore((state) => state.userSigNonce)
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce)
  const canUseRelay = currentProfile?.dispatcher?.canUseRelay

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.message ?? ERROR_MESSAGE)
    setLoading(false)
  }

  const { signTypedDataAsync } = useSignTypedData({
    onError
  })

  const { write: writeDispatch, data: writeData } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: 'setDispatcherWithSig',
    mode: 'recklesslyUnprepared',
    onError
  })

  const [broadcast, { data: broadcastData }] = useBroadcastMutation({
    onError
  })

  const { indexed } = usePendingTxn({
    txHash: writeData?.hash,
    txId:
      broadcastData?.broadcast.__typename === 'RelayerResult'
        ? broadcastData?.broadcast?.txId
        : undefined
  })

  const [refetchChannel] = useProfileLazyQuery({
    onCompleted: (data) => {
      const profile = data?.profile as Profile
      setcurrentProfile(profile)
    }
  })

  useEffect(() => {
    if (indexed) {
      toast.success(`Dispatcher ${canUseRelay ? 'disabled' : 'enabled'}`)
     
      refetchChannel({
        variables: {
          request: { handle: currentProfile?.handle }
        },
        fetchPolicy: 'no-cache'
      })
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexed])

  const [createDispatcherTypedData] = useCreateSetDispatcherTypedDataMutation({
    onCompleted: async ({ createSetDispatcherTypedData }) => {
      const { id, typedData } =
        createSetDispatcherTypedData as CreateSetDispatcherBroadcastItemResult
      const { deadline } = typedData?.value
      try {
        const signature = await signTypedDataAsync({
          domain: omitKey(typedData?.domain, '__typename'),
          types: omitKey(typedData?.types, '__typename'),
          value: omitKey(typedData?.value, '__typename')
        })
        const { profileId, dispatcher } = typedData?.value
        const { v, r, s } = utils.splitSignature(signature)
        const args = {
          profileId,
          dispatcher,
          sig: { v, r, s, deadline }
        }
        setUserSigNonce(userSigNonce + 1)
        const { data } = await broadcast({
          variables: { request: { id, signature } }
        })
        if (data?.broadcast?.__typename === 'RelayError') {
          writeDispatch?.({ recklesslySetUnpreparedArgs: [args] })
        }
      } catch {
        setLoading(false)
      }
    },
    onError
  })
  const onClick = () => {
    setLoading(true)
    createDispatcherTypedData({
      variables: {
        options: { overrideSigNonce: userSigNonce },
        request: {
          profileId: currentProfile?.id,
          enable: !canUseRelay
        }
      }
    })
  }

  return (
    <Button
      variant={canUseRelay ? 'danger' : 'primary'}
      onClick={onClick}
      loading={loading}
    >
      {canUseRelay ? 'Disable' : 'Enable'} dispatcher
    </Button>
  )
}

export default Toggle
