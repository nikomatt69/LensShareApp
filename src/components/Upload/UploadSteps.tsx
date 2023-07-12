import {
  BUNDLR_CONNECT_MESSAGE,
  ERROR_MESSAGE,
  LENSHUB_PROXY,
  APP_ID,
  APP_NAME,
  LENSTUBE_BYTES_APP_ID,
  LENSTOK_URL,
  REQUESTING_SIGNATURE_MESSAGE
} from '@/constants';

import {
  useBroadcastDataAvailabilityMutation,
  CreateDataAvailabilityPostRequest,
  CreatePostBroadcastItemResult,
  CreatePublicPostRequest,
  MetadataAttributeInput,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input,
  useCreateDataAvailabilityPostTypedDataMutation,
  useCreateDataAvailabilityPostViaDispatcherMutation,
  PublicationMetadataDisplayTypes,
  PublicationMainFocus,
  PublicationContentWarning
} from '@/utils/lens/generatedLenster';
import { ReferenceModules } from '@/utils/lens/generatedLenster';
import type { CustomErrorWithData } from '@/utils/custom-types2';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { useAccount, useContractWrite, useSignTypedData } from 'wagmi';

import type { VideoFormData } from './Details';
import Details from './Details';
import { UPLOADED_VIDEO_FORM_DEFAULTS, useAppStore } from '@/store/app';
import usePersistStore from '@/store/persist';
import useEthersWalletClient from '@/utils/hooks/useEthersWalletClient';
import { getCollectModule } from '@/utils/getCollectModule';
import { useBroadcastMutation } from '@/types/graph';
import getSignature from '@/lib/getSignature';
import {
  useCreatePostTypedDataMutation,
  useCreatePostViaDispatcherMutation
} from '@/utils/lens/generatedLenster';
import { LENS_HUB_ABI } from '@/abi/abi';
import getUserLocale from '@/utils/functions/getUserLocale';
import trimify from '@/utils/functions/trimify';

import { canUploadedToIpfs } from './canUploadedToIpfs';
import MetaTags from '../UI/MetaTags';
import { logger } from '@/logger';
import uploadToAr from '@/utils/functions/uploadToAr';
import uploadToIPFS, { uploadFileToIPFS } from '@/lib/uploadToIPFS3';

const UploadSteps = () => {
  const getBundlrInstance = useAppStore((state) => state.getBundlrInstance);
  const setBundlrData = useAppStore((state) => state.setBundlrData);
  const bundlrData = useAppStore((state) => state.bundlrData);
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo);
  const selectedChannel = useAppStore((state) => state.currentProfile);

  const queuedVideos = usePersistStore((state) => state.queuedVideos);
  const setQueuedVideos = usePersistStore((state) => state.setQueuedVideos);
  const { address } = useAccount();
  const { data: signer } = useEthersWalletClient();
  const router = useRouter();

  const degreesOfSeparation = uploadedVideo.referenceModule
    ?.degreesOfSeparationReferenceModule?.degreesOfSeparation as number;
  const enabledReferenceModule = uploadedVideo.referenceModule
    ?.degreesOfSeparationReferenceModule
    ? ReferenceModules.DegreesOfSeparationReferenceModule
    : uploadedVideo.referenceModule.followerOnlyReferenceModule
    ? ReferenceModules.FollowerOnlyReferenceModule
    : null;

  // Dispatcher
  const canUseRelay = selectedChannel?.dispatcher?.canUseRelay;
  const isSponsored = selectedChannel?.dispatcher;

  const redirectToChannelPage = () => {
    router.push(
      uploadedVideo
        ? `/u/${selectedChannel?.id}?tab=bytes`
        : `/u/${selectedChannel?.id}`
    );
  };

  const redirectToWatchPage = (videoId: string) => {
    router.push(`/bytes/${videoId}`);
  };

  const setToQueue = (txn: { txnId?: string; txnHash?: string }) => {
    if (txn?.txnId) {
      setQueuedVideos([
        {
          thumbnailUrl: uploadedVideo.thumbnail,
          title: uploadedVideo.title,
          txnId: txn.txnId,
          txnHash: txn.txnHash
        },
        ...(queuedVideos || [])
      ]);
    }
    redirectToChannelPage();
  };

  const resetToDefaults = () => {
    setUploadedVideo(UPLOADED_VIDEO_FORM_DEFAULTS);
  };

  const onError = (error: CustomErrorWithData) => {
    toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE);
    setUploadedVideo({
      buttonText: `Post Video`,
      loading: false
    });
  };

  const onCompleted = (__typename?: 'RelayError' | 'RelayerResult') => {
    if (__typename === 'RelayError') {
      return;
    }

    return setUploadedVideo({
      buttonText: `Post Video`,
      loading: false
    });
  };

  const { signTypedDataAsync } = useSignTypedData({
    onError
  });
  const [broadcast] = useBroadcastMutation({
    onCompleted: ({ broadcast }) => {
      onCompleted(broadcast.__typename);
      if (broadcast.__typename === 'RelayerResult') {
        const txnId = broadcast?.txId;
        setToQueue({ txnId });
      }
    }
  });

  const { write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: 'post',
    onSuccess: (data) => {
      setUploadedVideo({
        buttonText: 'Post Video',
        loading: false
      });
      if (data.hash) {
        setToQueue({ txnHash: data.hash });
      }
    },
    onError
  });

  const getSignatureFromTypedData = async (
    data: CreatePostBroadcastItemResult
  ) => {
    const { typedData } = data;
    toast.loading(REQUESTING_SIGNATURE_MESSAGE);
    const signature = await signTypedDataAsync(getSignature(typedData));
    return signature;
  };

  /**
   * DATA AVAILABILITY STARTS
   */
  const [broadcastDataAvailabilityPost] = useBroadcastDataAvailabilityMutation({
    onCompleted: (data) => {
      onCompleted();
      if (data.broadcastDataAvailability.__typename === 'RelayError') {
        return toast.error(ERROR_MESSAGE);
      }
      if (
        data?.broadcastDataAvailability.__typename ===
        'CreateDataAvailabilityPublicationResult'
      ) {
        redirectToChannelPage();
      }
    },
    onError
  });

  const [createDataAvailabilityPostTypedData] =
    useCreateDataAvailabilityPostTypedDataMutation({
      onCompleted: async ({ createDataAvailabilityPostTypedData }) => {
        const { id } = createDataAvailabilityPostTypedData;
        const signature = await getSignatureFromTypedData(
          createDataAvailabilityPostTypedData
        );
        return await broadcastDataAvailabilityPost({
          variables: { request: { id, signature } }
        });
      }
    });

  const [createDataAvailabilityPostViaDispatcher] =
    useCreateDataAvailabilityPostViaDispatcherMutation({
      onCompleted: ({ createDataAvailabilityPostViaDispatcher }) => {
        if (
          createDataAvailabilityPostViaDispatcher?.__typename === 'RelayError'
        ) {
          return;
        }
        if (
          createDataAvailabilityPostViaDispatcher.__typename ===
          'CreateDataAvailabilityPublicationResult'
        ) {
          onCompleted();
          resetToDefaults();
          redirectToWatchPage(createDataAvailabilityPostViaDispatcher.id);
        }
      },
      onError
    });
  /**
   * DATA AVAILABILITY ENDS
   */

  const [createPostViaDispatcher] = useCreatePostViaDispatcherMutation({
    onError,
    onCompleted: ({ createPostViaDispatcher }) => {
      onCompleted(createPostViaDispatcher.__typename);
      if (createPostViaDispatcher.__typename === 'RelayerResult') {
        setToQueue({ txnId: createPostViaDispatcher.txId });
      }
    }
  });

  const initBundlr = async () => {
    if (signer && address && !bundlrData.instance) {
      toast.loading(BUNDLR_CONNECT_MESSAGE);
      const bundlr = await getBundlrInstance(signer);
      if (bundlr) {
        setBundlrData({ instance: bundlr });
      }
    }
  };

  const [createPostTypedData] = useCreatePostTypedDataMutation({
    onCompleted: async ({ createPostTypedData }) => {
      const { typedData, id } =
        createPostTypedData as CreatePostBroadcastItemResult;
      try {
        const signature = await getSignatureFromTypedData(createPostTypedData);
        const { data } = await broadcast({
          variables: { request: { id, signature } }
        });
        if (data?.broadcast?.__typename === 'RelayError') {
          return write?.({ args: [typedData.value] });
        }
      } catch {}
    },
    onError
  });

  const createTypedData = async (request: CreatePublicPostRequest) => {
    await createPostTypedData({
      variables: { request }
    });
  };

  const createViaDispatcher = async (request: CreatePublicPostRequest) => {
    const { data } = await createPostViaDispatcher({
      variables: { request }
    });
    if (data?.createPostViaDispatcher.__typename === 'RelayError') {
      await createTypedData(request);
    }
  };

  const createViaDataAvailablityDispatcher = async (
    request: CreateDataAvailabilityPostRequest
  ) => {
    const variables = { request };

    const { data } = await createDataAvailabilityPostViaDispatcher({
      variables
    });

    if (
      data?.createDataAvailabilityPostViaDispatcher?.__typename === 'RelayError'
    ) {
      return await createDataAvailabilityPostTypedData({ variables });
    }
  };

  const createPublication = async ({
    videoSource
  }: {
    videoSource: string;
  }) => {
    try {
      setUploadedVideo({
        buttonText: `Storing metadata`,
        loading: true
      });
      uploadedVideo.videoSource = videoSource;
      const media: Array<PublicationMetadataMediaInput> = [
        {
          item: uploadedVideo.videoSource,
          type: uploadedVideo.videoType,
          cover: uploadedVideo.thumbnail
        }
      ];
      const attributes: MetadataAttributeInput[] = [
        {
          displayType: PublicationMetadataDisplayTypes.String,
          traitType: 'id',
          value: `${selectedChannel?.id}`
        },
        {
          displayType: PublicationMetadataDisplayTypes.String,
          traitType: 'app',
          value: APP_ID
        }
      ];
      if (uploadedVideo.durationInSeconds) {
        attributes.push({
          displayType: PublicationMetadataDisplayTypes.String,
          traitType: 'durationInSeconds',
          value: uploadedVideo.durationInSeconds
        });
      }
      const metadata: PublicationMetadataV2Input = {
        version: '2.0.0',
        metadata_id: uuidv4(),
        description: trimify(uploadedVideo.description),
        content: trimify(
          `${uploadedVideo.title}\n\n${uploadedVideo.description}`
        ),
        locale: getUserLocale(),

        mainContentFocus: PublicationMainFocus.Video,
        external_url: `${LENSTOK_URL}/u/${selectedChannel?.id}`,
        animation_url: uploadedVideo.videoSource,
        image: uploadedVideo.thumbnail,
        imageMimeType: uploadedVideo.thumbnailType,
        name: trimify(uploadedVideo.title),
        attributes,
        media,
        appId: uploadedVideo ? APP_ID : APP_ID
      };
      if (uploadedVideo.isSensitiveContent) {
        metadata.contentWarning = PublicationContentWarning.Sensitive;
      }
      const metadataUri = await uploadToAr(metadata);
      setUploadedVideo({
        buttonText: `Posting video`,
        loading: false
      });

      const isRestricted = Boolean(degreesOfSeparation);
      const referenceModuleDegrees = {
        commentsRestricted: isRestricted,
        mirrorsRestricted: isRestricted,
        degreesOfSeparation: degreesOfSeparation
      };

      // Create Data Availability post
      const { isRevertCollect } = uploadedVideo.collectModule;
      const dataAvailablityRequest = {
        from: selectedChannel?.id,
        contentURI: metadataUri
      };

      const request = {
        profileId: selectedChannel?.id,
        contentURI: metadataUri,
        collectModule: getCollectModule(uploadedVideo.collectModule),
        referenceModule: {
          followerOnlyReferenceModule:
            uploadedVideo.referenceModule?.followerOnlyReferenceModule,
          degreesOfSeparationReferenceModule: uploadedVideo.referenceModule
            ?.degreesOfSeparationReferenceModule
            ? referenceModuleDegrees
            : null
        }
      };

      if (canUseRelay) {
        if (isRevertCollect && isSponsored) {
          return await createViaDataAvailablityDispatcher(
            dataAvailablityRequest
          );
        }

        return await createViaDispatcher(request);
      }

      return await createTypedData(request);
    } catch {}
  };

  const uploadVideoToIpfs = async () => {
    const result = await uploadFileToIPFS(uploadedVideo.file as File);
    if (!result) {
      return toast.error(`IPFS Upload failed`);
    }
    setUploadedVideo({
      percent: 100,
      videoSource: result.original.url
    });
    return await createPublication({
      videoSource: result.original.url
    });
  };

  const uploadToBundlr = async () => {
    if (!bundlrData.instance) {
      return await initBundlr();
    }
    if (!uploadedVideo.stream) {
      return toast.error(`Video not uploaded correctly`);
    }
    if (
      parseFloat(bundlrData.balance) < parseFloat(bundlrData.estimatedPrice)
    ) {
      return toast.error(`Insufficient storage balance`);
    }
    try {
      setUploadedVideo({
        loading: true,
        buttonText: `Uploading to Arweave`
      });
      const bundlr = bundlrData.instance;
      const tags = [
        { name: 'Content-Type', value: uploadedVideo.videoType || 'video/mp4' },
        { name: 'App-Name', value: APP_NAME },
        { name: 'Profile-Id', value: selectedChannel?.id },
        // ANS-110 standard
        { name: 'Title', value: trimify(uploadedVideo.title) },
        { name: 'Type', value: 'video' },
        { name: 'Topic', value: uploadedVideo.title },

        {
          name: 'Description',
          value: trimify(uploadedVideo.description)
        }
      ];
      const fileSize = uploadedVideo?.file?.size as number;
      const uploader = bundlr.uploader.chunkedUploader;
      const chunkSize = 10000000; // 10 MB
      uploader.setChunkSize(chunkSize);
      if (fileSize < chunkSize) {
        toast.loading(REQUESTING_SIGNATURE_MESSAGE, { duration: 8000 });
      }
      uploader.on('chunkUpload', (chunkInfo) => {
        const expectedChunks = Math.floor(fileSize / chunkSize);
        if (expectedChunks === chunkInfo.id) {
          toast.loading(REQUESTING_SIGNATURE_MESSAGE, { duration: 8000 });
        }
        const percentCompleted = Math.round(
          (chunkInfo.totalUploaded * 100) / fileSize
        );
        setUploadedVideo({
          loading: true,
          percent: percentCompleted
        });
      });
      const upload = uploader.uploadData(uploadedVideo.stream as any, {
        tags
      });
      const response = await upload;
      setUploadedVideo({
        loading: false,
        videoSource: `ar://${response.data.id}`
      });
      return await createPublication({
        videoSource: `ar://${response.data.id}`
      });
    } catch (error) {
      toast.error(`Failed to upload video to Arweave`);
      logger.error('[Error Bundlr Upload Video]', error);
      return setUploadedVideo({
        loading: false,
        buttonText: `Post Video`
      });
    }
  };

  const onUpload = async (data: VideoFormData) => {
    uploadedVideo.title = data.title;
    uploadedVideo.description = data.description;
    uploadedVideo.isSensitiveContent = data.isSensitiveContent;
    setUploadedVideo({ ...uploadedVideo });
    // Upload video directly from source without uploading again
    if (
      uploadedVideo.videoSource.length &&
      (uploadedVideo.videoSource.includes('ar://') ||
        uploadedVideo.videoSource.includes('ipfs://'))
    ) {
      return await createPublication({
        videoSource: uploadedVideo.videoSource
      });
    }
    if (
      canUploadedToIpfs(uploadedVideo.file?.size) &&
      uploadedVideo.isUploadToIpfs
    ) {
      return await uploadVideoToIpfs();
    } else {
      await uploadToBundlr();
    }
  };

  return (
    <div className="mx-auto my-10 max-w-5xl gap-5">
      <MetaTags title="Video Details" />
      <div className="mt-10">
        <Details onCancel={resetToDefaults} onUpload={onUpload} />
      </div>
    </div>
  );
};

export default UploadSteps;
