import { useEffect } from "react";
import { useAppStore, UPLOADED_VIDEO_FORM_DEFAULTS } from "@/store/app";
import { useMutation } from "@apollo/client";
import {
  CreatePublicPostRequest,
  PublicationMetadataMediaInput,
  PublicationMetadataV2Input,
} from "@/types/lens";
import {
  PublicationMainFocus,
  PublicationMetadataDisplayTypes,
  CreatePostTypedDataDocument,
} from "@/utils/lens";
import getSignature from "@/lib/getSignature";
import getUserLocale from "@/lib/getUserLocale";
import { splitSignature } from "ethers/lib/utils";
import { LENS_HUB_ABI } from "@/abi/abi";
import { LENSHUB_PROXY } from "@/constants";
import { useContractWrite, useSignTypedData } from "wagmi";
import toast from "react-hot-toast";
import onError from "@/lib/onError";
import { v4 as uuidv4 } from "uuid";
import { ARWEAVE_WEBSITE_URL } from "@/constants";
import { LENSTOK_URL } from "@/constants";
import { getCollectModule } from "@/utils/getCollectModule";

const LensSteps = () => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo);
  const currentUser = useAppStore((state) => state.currentProfile);
  const bundlrData = useAppStore((state) => state.bundlrData);
  const setBundlrData = useAppStore((state) => state.setBundlrData);
  const getBundlrInstance = useAppStore((state) => state.getBundlrInstance);

  useEffect(() => {
    if (uploadedVideo.videoSource) {
      setUploadedVideo(UPLOADED_VIDEO_FORM_DEFAULTS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [
    createPostTypedData,
    { error: errorAuthenticate, loading: authLoading },
  ] = useMutation(CreatePostTypedDataDocument);

  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({
    onError,
  });

  const onCompleted = () => {
    toast.success("Successfully post video");
    setUploadedVideo({
      isIndexed: true,
    });
  };

  const {
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
    write,
  } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LENS_HUB_ABI,
    functionName: "postWithSig",
   
    onSuccess: onCompleted,
    onError(error) {
      toast.error("You should be logged in with your Lens account to Lens");
    },
  });

  const uploadToBundlr = async () => {
    try {
      if (!bundlrData.instance) console.log("Bundlr instance is undefined");
      if (bundlrData.balance > bundlrData.estimatedPrice) {
        console.log(
          "BUNDLR INSTANCE",
          bundlrData.instance?.uploader.chunkedUploader
        );
        console.log("video stream:", uploadedVideo.stream);
        setUploadedVideo({ loading: true, buttonText: "Uploading to Arweave" });
        const uploader = bundlrData.instance?.uploader.chunkedUploader;
        uploader?.setBatchSize(4);
        uploader?.setChunkSize(10_000_000);
        uploader?.on("chunkUpload", (chunkInfo) => {
          const fileSize = uploadedVideo?.file?.size as number;
          const percentCompleted = Math.round(
            (chunkInfo.totalUploaded * 100) / fileSize
          );
          setUploadedVideo({
            percent: percentCompleted,
          });
        });
        console.log("UPLOADER ", uploader);
        const tags = [
          {
            name: "Content-Type",
            value: uploadedVideo.videoType || "video/mp4",
          },
          { name: "App-Name", value: "LensShare" },
        ];
        const upload = await uploader?.uploadData(uploadedVideo.stream as any, {
          tags: tags,
        });

        console.log("Upload", upload);
        const arweaveUrl: string = `${ARWEAVE_WEBSITE_URL}/${upload?.data.id}`;
        setUploadedVideo({
          loading: false,
          videoSource: arweaveUrl,
          isUploadToAr: true,
        });
        return createPublication(arweaveUrl);
      } else {
        toast.error(
          "Insuffisant balance on your account. Please fund it to reach the estimated price."
        );
      }
    } catch (error) {
      toast.error("Failed to upload video to bundlr.");
      console.log("Failed to upload video to bundlr: ", error);
      setUploadedVideo({
        loading: false,
        buttonText: "Post Video",
      });
    }
  };

  const uploadMetadata = async (contentUri: string) => {
    try {
      console.log("Arweave Url back from uploadToBundlr function", contentUri);
      uploadedVideo.videoSource = contentUri;
      setUploadedVideo({
        buttonText: "Storing metadata...",
        loading: true,
      });
      const metadata: PublicationMetadataV2Input = {
        version: "2.0.0",
        metadata_id: uuidv4(),
        description: uploadedVideo.description.trim(),
        content:
          `${uploadedVideo.title}\n\n${uploadedVideo.description}`.trim(),
        locale: getUserLocale(),
        tags: [""],
        mainContentFocus: PublicationMainFocus.Video,
        animation_url: uploadedVideo.videoSource,
        image: uploadedVideo.thumbnail,
        imageMimeType: uploadedVideo.thumbnailType,
        name: uploadedVideo.title,
        attributes: [],
        media: [
          {
            item: uploadedVideo.videoSource,
            type: uploadedVideo.videoType,
          },
        ],
        appId: "LensShare",
      };
      const response = await fetch(`${LENSTOK_URL}/api/meta-to-ipfs`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(metadata),
      });

      if (response.status !== 200) {
        console.log("Something wrong while trying storing to IPFS");
      } else {
        let responseJSON = await response.json();
        const contentURI = `https://infura-ipfs.io/ipfs/${responseJSON.cid}`;
        return contentURI;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createPublication = async (arweaveUri: string) => {
    try {
      const contentUri = await uploadMetadata(arweaveUri);
      console.log("Metadata content uri ", contentUri);
      console.log("Current User id", currentUser?.id);
      if (errorAuthenticate)
        console.log("AUTHENTICATION ERROR", errorAuthenticate);

      setUploadedVideo({ buttonText: "Post on Lens" });
      const result = await createPostTypedData({
        variables: {
          request: {
            profileId: currentUser?.id,
            contentURI: contentUri,
            collectModule: getCollectModule(uploadedVideo.collectModule),
            referenceModule: {
              followerOnlyReferenceModule: false,
            },
          },
        },
      });
      setUploadedVideo({ buttonText: "Posting on Lens" });
      const typedData = result.data?.createPostTypedData.typedData;

      const deadline = typedData?.value.deadline;
      const signature = await signTypedDataAsync(getSignature(typedData));
      const { v, r, s } = splitSignature(signature);
      const sig = { v, r, s, deadline };
      console.log("TypedData", typedData);
      const inputStruct = {
        profileId: typedData?.value.profileId,
        contentURI: typedData?.value.contentURI,
        referenceModuleData: typedData?.value.referenceModule,
        collectModule: typedData?.value.collectModule,
        collectModuleInitData: typedData?.value.collectModuleInitData,
        referenceModule: typedData?.value.referenceModule,
        referenceModuleInitData: typedData?.value.referenceModuleInitData,
        sig,
      };
      const tx = await write?.({ args: [inputStruct] });
      console.log("TX", tx);
    } catch (error) {
      console.log("Error while posting on lens:", error);
    }
  };
  return (
    <>
      <div onClick={uploadToBundlr}>{uploadedVideo.buttonText}</div>
    </>
  );
};

export default LensSteps;