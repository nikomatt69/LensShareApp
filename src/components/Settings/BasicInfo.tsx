
import { zodResolver } from '@hookform/resolvers/zod'
import {useAppStore} from '@/store/app'
import { utils } from 'ethers'
import type {
  CreatePublicSetProfileMetadataUriRequest,
  MediaSet,
  Profile
} from '@/utils/lens'
import {
  PublicationMetadataDisplayTypes,
  useBroadcastMutation,
  useCreateSetProfileMetadataTypedDataMutation,
  useCreateSetProfileMetadataViaDispatcherMutation
} from '@/utils/lens'
import Link from 'next/link'
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { v4 as uuidv4 } from 'uuid'
import { useContractWrite, useSignTypedData } from 'wagmi'
import { z } from 'zod'

import getCoverPicture from '@/utils/functions/getCoverPicture'
import { getValueFromKeyInAttributes } from '@/utils/functions/getFromAttributes'
import { CustomErrorWithData, IPFSUploadResult } from '@/utils/custom-types2'
import { APP_ID, ERROR_MESSAGE, IS_MAINNET, LENSTOK_URL, LENS_PERIPHERY, TALLY_VERIFICATION_FORM_URL } from '@/constants'
import { LENS_HUB_ABI } from '@/abi/abi'
import uploadToAr from '@/utils/functions/uploadToAr'
import trimify from '@/lib/trimify'
import { uploadToIPFS } from '@/utils/functions/uploadToIPFS2'
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl'
import Loader from '../UI/Loader'
import imageCdn from '@/lib/imageCdn'
import { VERIFIED_CHANNELS } from '@/utils/data/verified'
import CopyOutline from '../UI/Icons/CopyOutline'
import { Input } from '../UI/Input'
import { TextArea } from '../UI/TextArea'
import { Button } from '../UI/Button'
import omitKey from '@/lib/omit'
import useCopyToClipboard from '@/utils/hooks/useCopyToClipboard'

type Props = {
  channel: Profile & {
    coverPicture: MediaSet
  }
}
const formSchema = z.object({
  displayName: z.union([
    z
      .string()
      .min(4, { message: 'Name should be atleast 5 characters' })
      .max(30, { message: 'Name should not exceed 30 characters' }),
    z.string().max(0)
  ]),
  description: z.union([
    z
      .string()
      .min(5, { message: 'Description should be atleast 5 characters' })
      .max(1000, { message: 'Description should not exceed 1000 characters' }),
    z.string().max(0)
  ]),
  twitter: z.string(),
  location: z.string(),
  website: z.union([
    z
      .string()
      .url({ message: 'Enter valid website URL (eg. https://lenshareapp.xyz)' }),
    z.string().max(0)
  ])
})
type FormData = z.infer<typeof formSchema> & { coverImage?: string }

const BasicInfo = ({ channel }: Props) => {
  const [copy] = useCopyToClipboard()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [coverImage, setCoverImage] = useState(getCoverPicture(channel))
  const currentProfile = useAppStore((state) => state.currentProfile)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: channel.name || '',
      description: channel.bio || '',
      location: getValueFromKeyInAttributes(channel?.attributes, 'location'),
      twitter: getValueFromKeyInAttributes(channel?.attributes, 'twitter'),
      website: getValueFromKeyInAttributes(channel?.attributes, 'website')
    }
  })

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
    setLoading(false)
  }

  const onCompleted = () => {
    toast.success('Channel details submitted')
   
    setLoading(false)
  }

  const { signTypedDataAsync } = useSignTypedData({
    onError
  })

  const { write: writeMetaData } = useContractWrite({
    address: LENS_PERIPHERY,
    abi: LENS_HUB_ABI,
    functionName: 'setProfileMetadataURIWithSig',
    mode: 'recklesslyUnprepared',
    onError,
    onSuccess: onCompleted
  })

  const [broadcast] = useBroadcastMutation({
    onError,
    onCompleted
  })

  const [createSetProfileMetadataViaDispatcher] =
    useCreateSetProfileMetadataViaDispatcherMutation({
      onError,
      onCompleted
    })

  const [createSetProfileMetadataTypedData] =
    useCreateSetProfileMetadataTypedDataMutation({
      onCompleted: async (data) => {
        const { typedData, id } = data.createSetProfileMetadataTypedData
        try {
          const signature = await signTypedDataAsync({
            domain: omitKey(typedData?.domain, '__typename'),
            types: omitKey(typedData?.types, '__typename'),
            value: omitKey(typedData?.value, '__typename')
          })
          const { profileId, metadata } = typedData?.value
          const { v, r, s } = utils.splitSignature(signature)
          const args = {
            user: channel?.ownedBy,
            profileId,
            metadata,
            sig: { v, r, s, deadline: typedData.value.deadline }
          }
          const { data } = await broadcast({
            variables: { request: { id, signature } }
          })
          if (data?.broadcast?.__typename === 'RelayError') {
            writeMetaData?.({ recklesslySetUnpreparedArgs: [args] })
          }
        } catch {
          setLoading(false)
        }
      },
      onError
    })

  const onCopyChannelUrl = async (value: string) => {
    await copy(value)
    toast.success('Copied to clipboard')
  }

  const signTypedData = (request: CreatePublicSetProfileMetadataUriRequest) => {
    createSetProfileMetadataTypedData({
      variables: { request }
    })
  }

  const createViaDispatcher = async (
    request: CreatePublicSetProfileMetadataUriRequest
  ) => {
    const { data } = await createSetProfileMetadataViaDispatcher({
      variables: { request }
    })
    if (
      data?.createSetProfileMetadataViaDispatcher.__typename === 'RelayError'
    ) {
      signTypedData(request)
    }
  }

  const otherAttributes =
    channel?.attributes
      ?.filter(
        (attr) => !['website', 'location', 'twitter', 'app'].includes(attr.key)
      )
      .map(({ traitType, key, value }) => ({ traitType, key, value })) ?? []

  const onSaveBasicInfo = async (data: FormData) => {
  
    setLoading(true)
    try {
      const { url } = await uploadToAr({
        version: '1.0.0',
        name: data.displayName || null,
        bio: trimify(data.description),
        cover_picture: data.coverImage ?? coverImage,
        attributes: [
          ...otherAttributes,
          {
            displayType: PublicationMetadataDisplayTypes.String,
            traitType: 'website',
            key: 'website',
            value: data.website
          },
          {
            displayType: PublicationMetadataDisplayTypes.String,
            traitType: 'location',
            key: 'location',
            value: data.location
          },
          {
            displayType: PublicationMetadataDisplayTypes.String,
            traitType: 'twitter',
            key: 'twitter',
            value: data.twitter
          },
          {
            displayType: PublicationMetadataDisplayTypes.String,
            traitType: 'app',
            key: 'app',
            value: APP_ID
          }
        ],
        metadata_id: uuidv4()
      })
      const request = {
        profileId: channel?.id,
        metadata: url
      }
      const canUseDispatcher = currentProfile?.dispatcher?.canUseRelay
      if (!canUseDispatcher) {
        return signTypedData(request)
      }
      createViaDispatcher(request)
    } catch {
      setLoading(false)
    }
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setUploading(true)
      const result: IPFSUploadResult = await uploadToIPFS(e.target.files[0])
      setCoverImage(result.url)
      setUploading(false)
      onSaveBasicInfo({ ...getValues(), coverImage: result.url })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSaveBasicInfo)}
      className="p-4"
    >
      <div className="relative w-full flex-none">
        {uploading && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center rounded bg-black opacity-40">
            <Loader />
          </div>
        )}
        <img
          src={
            sanitizeIpfsUrl(coverImage) ??
            imageCdn(
              sanitizeIpfsUrl(getCoverPicture(channel)),
              'thumbnail'
            )
          }
          className="h-48 w-full rounded bg-white object-cover object-center dark:bg-gray-900 md:h-56"
          draggable={false}
          alt={`${channel.handle}'s cover`}
        />
        <label
          htmlFor="chooseCover"
          className="dark:bg-theme absolute bottom-2 left-2 cursor-pointer rounded-lg bg-white p-1 px-3 text-sm"
        >
          Change
          <input
            id="chooseCover"
            
            type="file"
            accept=".png, .jpg, .jpeg, .svg"
            className="hidden w-full"
            onChange={handleUpload}
          />
        </label>
      </div>
      <div className="pt-1 text-right text-xs opacity-80">2560 x 1440</div>
      <div className="mb-1 flex items-center">
        <div className="text-[11px] font-semibold uppercase opacity-60">
          Channel
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <h6 className="flex items-center space-x-1">
          <span>{channel?.handle}</span>
         
        </h6>
        {IS_MAINNET &&
          !VERIFIED_CHANNELS.includes(channel?.id) &&
          channel.stats.totalFollowers > 500 && (
            <Link
              href={TALLY_VERIFICATION_FORM_URL}
            
              target="_blank"
              rel="noreferer noreferrer"
              className="bg-gradient-to-br from-purple-500 to-green-600 bg-clip-text text-sm text-transparent"
            >
              ( Get Verified )
            </Link>
          )}
      </div>
      <div className="mt-4">
        <div className="mb-1 flex items-center">
          <div className="text-[11px] font-semibold uppercase opacity-60">
            Channel URL
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span>
            {LENSTOK_URL}/u/{channel.id}
          </span>
          <button
            className="hover:opacity-60 focus:outline-none"
            onClick={() =>
              onCopyChannelUrl(`${LENSTOK_URL}/u/${channel.id}`)
            }
            type="button"
          >
            <CopyOutline className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="mt-6">
        <Input
          label="Display Name"
          type="text"
          placeholder="T Series"
          {...register('displayName')}
     
        />
      </div>
      <div className="mt-4">
        <TextArea
          label="Channel Description"
          placeholder="More about your channel"
          rows={4}
        
          {...register('description')}
        />
      </div>
      <div className="mt-4">
        <Input
          label="Twitter"
          placeholder="johndoe"
          {...register('twitter')}
         
          prefix="https://twitter.com/"
        />
      </div>
      <div className="mt-4">
        <Input
          label="Website"
          placeholder="https://johndoe.xyz"
          {...register('website')}
     
        />
      </div>
      <div className="mt-4">
        <Input
          label="Location"
          placeholder="Metaverse"
          {...register('location')}
       
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button loading={loading}>Save</Button>
      </div>
    </form>
  )
}

export default BasicInfo
