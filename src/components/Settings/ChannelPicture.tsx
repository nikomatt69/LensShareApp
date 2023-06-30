
import clsx from 'clsx'
import { utils } from 'ethers'
import type {
  CreateSetProfileImageUriBroadcastItemResult,
  Profile,
  UpdateProfileImageRequest
} from '@/utils/lens'
import {
  useBroadcastMutation,
  useCreateSetProfileImageUriTypedDataMutation,
  useCreateSetProfileImageUriViaDispatcherMutation
} from '@/utils/lens'
import type { ChangeEvent, FC } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RiImageAddLine } from 'react-icons/ri'

import { useContractWrite, useSignTypedData } from 'wagmi'
import { useAppStore } from '@/store/app'
import { CustomErrorWithData, IPFSUploadResult } from '@/utils/custom-types2'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import { ERROR_MESSAGE, LENSHUB_PROXY } from '@/constants'
import { LENS_HUB_ABI } from '@/abi/abi'
import { uploadToIPFS } from '@/utils/functions/uploadToIPFS2'
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl'
import Loader from '../UI/Loader'
import omitKey from '@/lib/omit'

type Props = {
  channel: Profile
}

const ChannelPicture: FC<Props> = ({ channel }) => {
  const [selectedPfp, setSelectedPfp] = useState('')
  const [loading, setLoading] = useState(false)
  const currentProfile = useAppStore((state) => state.currentProfile)
  const setcurrentProfile = useAppStore((state) => state.setCurrentProfile)
  const userSigNonce = useAppStore((state) => state.userSigNonce)
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce)

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
    setLoading(false)
    setSelectedPfp(getProfilePicture(channel, 'avatar_lg'))
  }

  const onCompleted = () => {
    setLoading(false)
    if (currentProfile && selectedPfp) {
      setcurrentProfile({
        ...currentProfile,
        picture: { original: { url: selectedPfp } }
      })
    }
    toast.success('Channel image updated')
  }

  const { signTypedDataAsync } = useSignTypedData({
    onError
  })

  const { data: pfpData, write: writePfpUri } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: 'setProfileImageURIWithSig',

    onError,
    onSuccess: onCompleted
  })

  const [createSetProfileImageViaDispatcher] =
    useCreateSetProfileImageUriViaDispatcherMutation({
      onError,
      onCompleted
    })

  const [broadcast] = useBroadcastMutation({
    onError,
    onCompleted
  })

  const [createSetProfileImageURITypedData] =
    useCreateSetProfileImageUriTypedDataMutation({
      onCompleted: async ({ createSetProfileImageURITypedData }) => {
        const { typedData, id } =
          createSetProfileImageURITypedData as CreateSetProfileImageUriBroadcastItemResult
        try {
          const signature = await signTypedDataAsync({
            domain: omitKey(typedData?.domain, '__typename'),
            types: omitKey(typedData?.types, '__typename'),
            primaryType: 'CreateSetProfileImageUriBroadcastItemResult',
            message: omitKey(typedData?.value, '__typename')
          })
          const { profileId, imageURI } = typedData?.value
          const { v, r, s } = utils.splitSignature(signature)
          const args = {
            profileId,
            imageURI,
            sig: { v, r, s, deadline: typedData.value.deadline }
          }
          setUserSigNonce(userSigNonce + 1)
          const { data } = await broadcast({
            variables: { request: { id, signature } }
          })
          if (data?.broadcast?.__typename === 'RelayError') {
            writePfpUri?.({ args: [args] })
          }
        } catch {
          setLoading(false)
        }
      },
      onError
    })

  const signTypedData = (request: UpdateProfileImageRequest) => {
    createSetProfileImageURITypedData({
      variables: { options: { overrideSigNonce: userSigNonce }, request }
    })
  }

  const createViaDispatcher = async (request: UpdateProfileImageRequest) => {
    const { data } = await createSetProfileImageViaDispatcher({
      variables: { request }
    })
    if (
      data?.createSetProfileImageURIViaDispatcher.__typename === 'RelayError'
    ) {
      signTypedData(request)
    }
  }

  const onPfpUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      try {
        setLoading(true)
        const result: IPFSUploadResult = await uploadToIPFS(e.target.files[0])
        const request = {
          profileId: currentProfile?.id,
          url: result.url
        }
        setSelectedPfp(result.url)
        const canUseDispatcher = currentProfile?.dispatcher?.canUseRelay
        if (!canUseDispatcher) {
          return signTypedData(request)
        }
        await createViaDispatcher(request)
      } catch (error) {
        onError(error as CustomErrorWithData)
      }
    }
  }

  return (
    <div className="group relative flex-none overflow-hidden rounded-full">
      <img
        src={
          selectedPfp
            ? sanitizeIpfsUrl(selectedPfp)
            : getProfilePicture(channel, 'avatar_lg')
        }
        className="h-32 w-32 rounded-full border-2 object-cover"
        draggable={false}
        alt={selectedPfp ? currentProfile?.id : channel?.id}
      />
      <label
        htmlFor="choosePfp"
        className={clsx(
          'dark:bg-theme invisible absolute top-0 grid h-32 w-32 cursor-pointer place-items-center rounded-full bg-white bg-opacity-70 backdrop-blur-lg group-hover:visible',
          { '!visible': loading && !pfpData?.hash }
        )}
      >
        {loading && !pfpData?.hash ? (
          <Loader />
        ) : (
          <RiImageAddLine className="text-xl" />
        )}
        <input
          id="choosePfp"
          type="file"
          accept=".png, .jpg, .jpeg, .svg, .gif"
          className="hidden w-full"
          onChange={onPfpUpload}
        />
      </label>
    </div>
  )
}

export default ChannelPicture
