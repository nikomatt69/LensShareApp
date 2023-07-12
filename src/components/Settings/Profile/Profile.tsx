import { LENS_HUB_ABI } from '@/abi/abi';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/UI/Button';
import { Card } from '@/components/UI/Card';
import { Form, useZodForm } from '@/components/UI/Form';
import { Input } from '@/components/UI/Input';
import { Modal } from '@/components/UI/Modal';
import { Spinner } from '@/components/UI/Spinner';
import { TextArea } from '@/components/UI/TextArea';
import { APP_NAME, COVER, LENS_PERIPHERY } from '@/constants';
import { Errors } from '@/lib/errors';
import getProfileAttribute from '@/lib/getProfileAttribute';
import getSignature from '@/lib/getSignature';
import imageKit from '@/lib/imageKit';
import uploadToArweave from '@/lib/uploadToArweave';
import { uploadFileToIPFS } from '@/lib/uploadToIPFS3';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import {
  CreatePublicSetProfileMetadataUriRequest,
  MediaSet,
  Profile,
  useBroadcastMutation,
  useCreateSetProfileMetadataTypedDataMutation,
  useCreateSetProfileMetadataViaDispatcherMutation
} from '@/utils/lens/generatedLenster';
import { Regex } from '@/utils/regex';
import { PencilIcon } from '@heroicons/react/24/outline';

import { readFile } from 'fs';
import type { ChangeEvent, FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAppStore } from 'src/store/app';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';
import { useContractWrite, useSignTypedData } from 'wagmi';
import { object, string, union } from 'zod';
import { Image } from '@/components/UI/Image';

const editProfileSchema = object({
  name: string()
    .max(100, {
      message: `Name should not exceed 100 characters`
    })
    .regex(Regex.profileNameValidator, {
      message: `Profile name must not contain restricted symbols`
    }),
  location: string().max(100, {
    message: `Location should not exceed 100 characters`
  }),
  website: union([
    string().regex(Regex.url, { message: `Invalid website` }),
    string().max(0)
  ]),
  twitter: string().max(100, {
    message: `Twitter should not exceed 100 characters`
  }),
  bio: string().max(260, { message: `Bio should not exceed 260 characters` })
});

interface ProfileSettingsFormProps {
  profile: Profile & { coverPicture: MediaSet };
}

const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({ profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const [coverIpfsUrl, setCoverIpfsUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [showCropModal, setShowCropModal] = useState(false);

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');

  // Dispatcher
  const canUseRelay = currentProfile?.dispatcher?.canUseRelay;
  const isSponsored = currentProfile?.dispatcher?.sponsor;

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
  const { error, write } = useContractWrite({
    address: LENS_PERIPHERY,
    abi: LENS_HUB_ABI,
    functionName: 'setProfileMetadataURI',
    onSuccess: () => onCompleted(),
    onError
  });

  const [broadcast] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => onCompleted(broadcast.__typename)
  });
  const [createSetProfileMetadataTypedData] =
    useCreateSetProfileMetadataTypedDataMutation({
      onCompleted: async ({ createSetProfileMetadataTypedData }) => {
        const { id, typedData } = createSetProfileMetadataTypedData;
        const signature = await signTypedDataAsync(getSignature(typedData));
        const { data } = await broadcast({
          variables: { request: { id, signature } }
        });
        if (data?.broadcast.__typename === 'RelayError') {
          const { profileId, metadata } = typedData.value;
          return write?.({ args: [profileId, metadata] });
        }
      },
      onError
    });

  const [createSetProfileMetadataViaDispatcher] =
    useCreateSetProfileMetadataViaDispatcherMutation({
      onCompleted: ({ createSetProfileMetadataViaDispatcher }) =>
        onCompleted(createSetProfileMetadataViaDispatcher.__typename),
      onError
    });

  const createViaDispatcher = async (
    request: CreatePublicSetProfileMetadataUriRequest
  ) => {
    const { data } = await createSetProfileMetadataViaDispatcher({
      variables: { request }
    });
    if (
      data?.createSetProfileMetadataViaDispatcher?.__typename === 'RelayError'
    ) {
      return await createSetProfileMetadataTypedData({
        variables: { request }
      });
    }
  };

  const form = useZodForm({
    schema: editProfileSchema,
    defaultValues: {
      name: profile?.name ?? '',
      location: getProfileAttribute(profile?.attributes, 'location'),
      website: getProfileAttribute(profile?.attributes, 'website'),
      twitter: getProfileAttribute(profile?.attributes, 'twitter')?.replace(
        /(https:\/\/)?twitter\.com\//,
        ''
      ),
      bio: profile?.bio ?? ''
    }
  });

  const editProfile = async (
    name: string,
    location: string | null,
    website?: string | null,
    twitter?: string | null,
    bio?: string | null
  ) => {
    if (!currentProfile) {
      return toast.error(Errors.SignWallet);
    }

    try {
      setIsLoading(true);
      const id = await uploadToArweave({
        name,
        bio,
        cover_picture: coverIpfsUrl ? coverIpfsUrl : null,
        attributes: [
          ...(profile?.attributes
            ?.filter(
              (attr) =>
                ![
                  'location',
                  'website',
                  'twitter',
                  'hasPrideLogo',
                  'statusEmoji',
                  'statusMessage',
                  'app'
                ].includes(attr.key)
            )
            .map(({ key, value }) => ({ key, value })) ?? []),
          { key: 'location', value: location },
          { key: 'website', value: website },
          { key: 'twitter', value: twitter },

          {
            key: 'statusEmoji',
            value: getProfileAttribute(profile?.attributes, 'statusEmoji')
          },
          {
            key: 'statusMessage',
            value: getProfileAttribute(profile?.attributes, 'statusMessage')
          },
          { key: 'app', value: APP_NAME }
        ],
        version: '1.0.0',
        metadata_id: uuid()
      });

      const request: CreatePublicSetProfileMetadataUriRequest = {
        profileId: currentProfile?.id,
        metadata: `https://arweave.net/${id}`
      };

      if (canUseRelay && isSponsored) {
        return await createViaDispatcher(request);
      }

      return await createSetProfileMetadataTypedData({
        variables: { request }
      });
    } catch (error) {
      onError(error);
    }
  };

  const coverPictureUrl = profile?.coverPicture?.original?.url;
  const coverPictureIpfsUrl = coverPictureUrl
    ? imageKit(sanitizeDStorageUrl(coverPictureUrl), COVER)
    : '';

  return (
    <>
      <Card className="p-5">
        <Form
          form={form}
          className="space-y-4"
          onSubmit={({ name, location, website, twitter, bio }) => {
            editProfile(name, location, website, twitter, bio);
          }}
        >
          {error && (
            <ErrorMessage
              className="mb-3"
              title={`Transaction failed!`}
              error={error}
            />
          )}
          <Input
            label={`Profile Id`}
            type="text"
            value={currentProfile?.id}
            disabled
          />
          <Input
            label={`Name`}
            type="text"
            placeholder="Gavin"
            {...form.register('name')}
          />
          <Input
            label={`Location`}
            type="text"
            placeholder="Miami"
            {...form.register('location')}
          />
          <Input
            label={`Website`}
            type="text"
            placeholder="https://hooli.com"
            {...form.register('website')}
          />
          <Input
            label={`Twitter`}
            type="text"
            prefix="https://twitter.com"
            placeholder="gavin"
            {...form.register('twitter')}
          />
          <TextArea
            label={`Bio`}
            placeholder={`Tell us something about you!`}
            {...form.register('bio')}
          />
          <div className="space-y-1.5">
            <div className="label">Cover</div>
            <div className="space-y-3">
              <div>
                <Image
                  className="h-60 w-full rounded-lg object-cover"
                  onError={({ currentTarget }) => {
                    currentTarget.src = sanitizeDStorageUrl(coverIpfsUrl);
                  }}
                  src={uploadedImageUrl || coverPictureIpfsUrl}
                  alt={`Cover picture crop preview`}
                />
              </div>
              <div className="flex items-center space-x-3">
                {uploading && <Spinner size="sm" />}
              </div>
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="flex items-center space-x-2"></div>
          </div>
          <Button
            className="ml-auto"
            type="submit"
            disabled={isLoading}
            icon={
              isLoading ? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            Save
          </Button>
        </Form>
      </Card>
      <Modal
        title={`Crop image`}
        show={showCropModal}
        size="md"
        onClose={
          isLoading
            ? undefined
            : () => {
                setImageSrc('');
                setShowCropModal(false);
              }
        }
      >
        <div className="p-5 text-right">
          <Button
            type="submit"
            disabled={uploading || !imageSrc}
            icon={
              uploading ? (
                <Spinner size="xs" />
              ) : (
                <PencilIcon className="h-4 w-4" />
              )
            }
          >
            Upload
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProfileSettingsForm;
