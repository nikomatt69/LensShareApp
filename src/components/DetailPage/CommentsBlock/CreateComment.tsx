import {
  CreatePublicCommentRequest,
  Publication,
  PublicationMainFocus
} from '@/utils/lens/generatedLenster';
import React, { Dispatch, FC, useRef, useState, Fragment } from 'react';
import { LENS_HUB_ABI } from '@/abi/abi';
import { useAppStore, useTransactionPersistStore } from 'src/store/app';
import { useContractWrite, useSignTypedData } from 'wagmi';
import onError from '@/lib/onError';
import toast from 'react-hot-toast';
import { Switch } from '@headlessui/react';
import { APP_NAME, LENSHUB_PROXY, RELAY_ON } from '@/constants';
import getSignature from '@/lib/getSignature';
import { splitSignature } from 'ethers/lib/utils';
import { uploadIpfs } from '@/utils/functions/uploadToIPFS';
import { v4 as uuid } from 'uuid';
import useBroadcast from '@/utils/useBroadcast';
import {
  useCreateCommentTypedDataMutation,
  useCreateCommentViaDispatcherMutation
} from '@/types/graph';
import lit from '@/lib/lit';
import LitJsSdk from '@lit-protocol/sdk-browser';
import Link from 'next/link';
import getAvatar from '@/lib/getAvatar';
import Image from 'next/image';
import { MentionTextArea } from '@/components/UI/MentionTextArea';
import InputMentions from '@/components/UI/InputMentions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LensHub } from '@/abi/LensHub';

interface Props {
  publication: Publication;
  refetchComments: () => void;
}

const formSchema = z.object({
  comment: z
    .string({ required_error: 'Enter valid comment' })
    .trim()
    .min(1, { message: 'Enter valid comment' })
    .max(5000, { message: 'Comment should not exceed 5000 characters' })
});
type FormData = z.infer<typeof formSchema>;

const CreateComment: FC<Props> = ({ publication, refetchComments }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEncrypted, setIsEncrypted] = useState(false);

  const userSigNonce = useAppStore((state) => state.userSigNonce);
  const setUserSigNonce = useAppStore((state) => state.setUserSigNonce);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const setTxnQueue = useTransactionPersistStore((state) => state.setTxnQueue);
  const [postContentError, setPostContentError] = useState('');

  const { signTypedDataAsync } = useSignTypedData({ onError });

  const {
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues
  } = useForm<FormData>({
    defaultValues: {
      comment: ''
    },
    resolver: zodResolver(formSchema)
  });

  async function encryptComment(comment: string) {
    try {
      const { encryptedFile, encryptedSymmetricKey } = await lit.encryptString(
        comment,
        publication?.profile?.ownedBy,
        currentProfile?.ownedBy
      );
      // Convert a Blob to a base64urlpad string. This function returns a promise.
      const encryptedComment = await LitJsSdk.blobToBase64String(encryptedFile);
      return { encryptedComment, encryptedSymmetricKey };
    } catch (err) {
      console.log('Error during encryption', err);
    }
  }
  const onCompleted = () => {
    toast.success('Post has been commented!');
    setComment('');
  };

  console.log('PUBLICATION ADDRESS', publication?.profile?.ownedBy);
  console.log('CURRENT PROFILE ADDRESS', currentProfile?.ownedBy);

  const generateOpitimisticComment = ({
    txHash,
    txId
  }: {
    txHash?: string;
    txId?: string;
  }) => {
    return {
      id: uuid(),
      parent: publication.id,
      type: 'NEW_COMMENT',
      content: comment,
      txHash,
      txId
    };
  };

  const { error, write } = useContractWrite({
    address: LENSHUB_PROXY,
    abi: LensHub,
    functionName: 'commentWithSig',

    onSuccess: ({ hash }) => {
      onCompleted();
      setTxnQueue([generateOpitimisticComment({ txHash: hash }), ...txnQueue]);
    },
    onError
  });

  const { broadcast } = useBroadcast({
    onCompleted: (data) => {
      onCompleted();
      setTxnQueue([
        generateOpitimisticComment({ txId: data?.broadcast?.txId }),
        ...txnQueue
      ]);
    }
  });

  const [createCommentTypedData] = useCreateCommentTypedDataMutation({
    onCompleted: async ({ createCommentTypedData }) => {
      try {
        const { id, typedData } = createCommentTypedData;
        const {
          profileId,
          contentURI,
          profileIdPointed,
          pubIdPointed,
          collectModule,
          collectModuleInitData,
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
          contentURI,
          profileIdPointed,
          pubIdPointed,
          collectModule,
          collectModuleInitData,
          referenceModule,
          referenceModuleData,
          referenceModuleInitData,
          sig
        };

        setUserSigNonce(userSigNonce + 1);
        if (!RELAY_ON) {
          return write?.({ args: [inputStruct] });
        }

        const {
          data: { broadcast: result }
        } = await broadcast({ request: { id, signature } });

        if ('reason' in result) {
          write?.({ args: [inputStruct] });
        }
      } catch {}
    },
    onError
  });

  const [createCommentViaDispatcher] = useCreateCommentViaDispatcherMutation({
    onCompleted,
    onError
  });

  const createViaDispatcher = async (request: any) => {
    const { data } = await createCommentViaDispatcher({
      variables: { request }
    });
    if (data?.createCommentViaDispatcher.__typename === 'RelayError') {
      createCommentTypedData({
        variables: {
          options: { overrideSigNonce: userSigNonce },
          request
        }
      });
    }
  };

  async function createComment() {
    let encryptedComment = '';
    let encryptedUri = '';
    if (!currentProfile) {
      return toast.error('Please connect your Wallet!');
    }
    console.log('Is encryped toggle', isEncrypted);
    // 1. Encrypt comment with Lit
    if (isEncrypted) {
      setIsSubmitting(true);
      const litResponse = await encryptComment(comment);
      //console.log("LitResponse:", litResponse);
      encryptedComment = litResponse?.encryptedComment;
      const encryptedKey = litResponse?.encryptedSymmetricKey;
      //console.log("ENCRYPTED COMMENT", encryptedComment);

      // 2. Store encrypted File and encrypted Key and retrieve URI
      const body = {
        litComment: encryptedComment,
        litKkey: encryptedKey
      };
      try {
        console.log('Fetch api route');
        const response = await fetch('/api/store-encrypted', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (response.status !== 200) {
          alert('Something went wrong while creating CID');
        } else {
          let responseJSON = await response.json();
          const cid = responseJSON.cid;
          console.log('Encrypted URI', cid);
          encryptedUri = `https://ipfs/${responseJSON.cid}`;
        }
      } catch (err) {
        console.log('Error while uploading encrypted comment to ipfs', err);
      }
    }
    try {
      setIsSubmitting(true);
      const ipfsResult = await uploadIpfs({
        version: '2.0.0',
        mainContentFocus: PublicationMainFocus.TextOnly,
        metadata_id: uuid(),
        description: 'Description',
        locale: 'en-US',
        content: isEncrypted ? encryptedComment : comment,
        external_url: null,
        image: null,
        imageMimeType: null,
        name: 'Name',
        attributes: isEncrypted
          ? [
              {
                displayType: 'string',
                traitType: 'encrypted',
                value: encryptedUri
              }
            ]
          : [],
        tags: [],
        appId: APP_NAME
      });

      const request = {
        profileId: currentProfile?.id,
        publicationId: publication.id,
        contentURI: `ipfs://${ipfsResult.path}`,
        collectModule: {
          revertCollectModule: true
        },
        referenceModule: {
          followerOnlyReferenceModule: false
        }
      };
      if (currentProfile?.dispatcher?.canUseRelay) {
        await createViaDispatcher(request);
      } else {
        await createCommentTypedData({
          variables: {
            options: { overrideSigNonce: userSigNonce },
            request: request as CreatePublicCommentRequest
          }
        });
      }
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="assolute fixed-bottom flex gap-3 rounded-xl border-t p-5">
      <Link
        legacyBehavior
        href={`/u/${currentProfile?.id}`}
        key={currentProfile?.id}
      >
        <a className="mr-3 flex-shrink-0 rounded-full">
          <Image
            src={getAvatar(currentProfile)}
            alt="profile pic here"
            height={42}
            width={42}
            className="rounded-full"
          />
        </a>
      </Link>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="flex-grow rounded-xl border border-transparent bg-[#F1F1F2] p-2 text-sm outline-none transition placeholder:text-gray-500 focus:border-gray-300"
        placeholder="Add comment.."
      >
        <InputMentions
          placeholder="How's this video?"
          autoComplete="off"
          validationError={errors.comment?.message}
          value={watch('comment')}
          onContentChange={(value) => {
            setValue('comment', value);
            clearErrors('comment');
          }}
          mentionsSelector="input-mentions-single"
        />
      </textarea>

      <div className="flex flex-col">
        <button
          className="text-md border-gray-600 text-black"
          onClick={createComment}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            'Commenting...'
          ) : (
            <div className="border-1 cursor-pointer hover:text-[#57B8FF]">
              Comment
            </div>
          )}
        </button>
        <Switch.Group>
          <div className="flex items-center">
            <Switch.Label className="mr-4">Encrypted</Switch.Label>
            <Switch
              checked={isEncrypted}
              onChange={setIsEncrypted}
              as={Fragment}
            >
              {({ checked }) => (
                /* Use the `checked` state to conditionally style the button. */
                <button
                  className={`${
                    checked ? 'bg-blue-600' : 'bg-gray-400'
                  } relative inline-flex h-4 w-8 items-center rounded-full`}
                >
                  <span
                    className={`${
                      checked ? 'translate-x-5' : 'translate-x-1'
                    } inline-block h-2 w-2 transform rounded-full bg-white transition`}
                  />
                </button>
              )}
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </div>
  );
};

export default CreateComment;
