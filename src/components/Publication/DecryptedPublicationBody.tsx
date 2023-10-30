import {
  LIT_PROTOCOL_ENV,
  LIT_PROTOCOL_ENVIRONMENT,
  POLYGONSCAN_URL,
  RARIBLE_URL
} from '@/constants';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import useEthersWalletClient from '@/utils/hooks/useEthersWalletClient';
import {
  Profile,
  DecryptFailReason,
  Publication,
  PublicationMetadataV2Input,
  useCanDecryptStatusQuery
} from '@/utils/lens/generatedLenster';
import type { LensEnvironment } from '@lens-protocol/sdk-gated';
import { LensGatedSDK } from '@lens-protocol/sdk-gated';
import type {
  CollectConditionOutput,
  Erc20OwnershipOutput,
  NftOwnershipOutput
} from '@lens-protocol/sdk-gated/dist/graphql/types';

import axios from 'axios';
import cn from '@/components/UI/cn';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useAppStore } from 'src/store/app';
import { useGlobalModalStateStore } from 'src/store/modals';
import { usePublicClient, useToken } from 'wagmi';
import { Card } from '../UI/Card';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { RiLogoutCircleFill } from 'react-icons/ri';
import {
  ArrowRightOnRectangleIcon,
  CircleStackIcon,
  EyeIcon,
  FingerPrintIcon,
  LockClosedIcon,
  PhotoIcon,
  RectangleStackIcon,
  UserPlusIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { BsCollection, BsDatabase, BsDatabaseFill } from 'react-icons/bs';
import formatHandle from '@/utils/functions/formatHandle';
import { Tooltip } from '../UI/Tooltip';
import { ErrorMessage } from '../ErrorMessage';
import Markup from '../UI/Markup';
import Attachments from '../Composer/Attachments';
import getURLs from '../Composer/getURLs';
import Oembed from '../Oembed';
import useNft from '@/lib/useNft';
import removeUrlAtEnd from '@/lib/removeUrlAtEnd';
import { BiLogInCircle, BiLogOut } from 'react-icons/bi';
import { SuperfluidInflowsDocument } from '@/utils/lens/generated4';

import useContractMetadata from '@/utils/hooks/useContractMetadata';
interface DecryptMessageProps {
  icon: ReactNode;
  children: ReactNode;
}

const DecryptMessage: FC<DecryptMessageProps> = ({ icon, children }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span>{children}</span>
  </div>
);

interface DecryptedPublicationBodyProps {
  encryptedPublication: Publication;
}

const DecryptedPublicationBody: FC<DecryptedPublicationBodyProps> = ({
  encryptedPublication
}) => {
  const [content, setContent] = useState<any>();
  const { pathname } = useRouter();
  const currentProfile = useAppStore((state) => state.currentProfile);
  const setShowAuthModal = useGlobalModalStateStore(
    (state) => state.setShowAuthModal
  );
  const [decryptedData, setDecryptedData] = useState<any>(null);
  const [decryptError, setDecryptError] = useState<any>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [canDecrypt, setCanDecrypt] = useState<boolean>(
    encryptedPublication?.canDecrypt?.result
  );
  const [reasons, setReasons] = useState<any>(
    encryptedPublication?.canDecrypt.reasons
  );
  const publicClient = usePublicClient();
  const { data: walletClient } = useEthersWalletClient();

  const showMore =
    encryptedPublication?.metadata?.content?.length > 450 &&
    pathname !== '/post/[id]';

  useCanDecryptStatusQuery({
    variables: {
      request: { publicationId: encryptedPublication.id },
      profileId: currentProfile?.id ?? null
    },
    pollInterval: 5000,
    skip: canDecrypt || !currentProfile,
    onCompleted: ({ publication }) => {
      setCanDecrypt(publication?.canDecrypt.result || false);
      setReasons(publication?.canDecrypt.reasons || []);
    }
  });

  const getCondition = (key: string) => {
    const criteria: any =
      encryptedPublication.metadata.encryptionParams?.accessCondition.or
        ?.criteria;

    const getCriteria = (key: string) => {
      return criteria.map((item: any) => item[key]).find((item: any) => item);
    };

    if (getCriteria('and')?.criteria) {
      return getCriteria('and')
        .criteria.map((item: any) => item[key])
        .find((item: any) => item);
    }

    if (getCriteria('or')?.criteria) {
      return getCriteria('or')
        .criteria.map((item: any) => item[key])
        .find((item: any) => item);
    }

    return criteria.map((item: any) => item[key]).find((item: any) => item);
  };

  // Conditions
  const tokenCondition: Erc20OwnershipOutput = getCondition('token');
  const nftCondition: NftOwnershipOutput = getCondition('nft');
  const collectCondition: CollectConditionOutput = getCondition('collect');

  const { data: tokenData } = useToken({
    address: tokenCondition?.contractAddress,
    chainId: tokenCondition?.chainID,
    enabled: Boolean(tokenCondition)
  });

  const { data: contractMetadata } = useContractMetadata({
    address: nftCondition?.contractAddress,
    chainId: nftCondition?.chainID,
    enabled: Boolean(nftCondition)
  });

  // Style
  const cardClasses =
    'text-sm rounded-xl w-fit p-9 shadow-sm bg-gradient-to-tr from-brand-400 to-brand-600';

  // Status
  // Collect checks - https://docs.lens.xyz/docs/gated#collected-publication
  const hasNotCollectedPublication = reasons?.includes(
    DecryptFailReason.HasNotCollectedPublication
  );
  const collectNotFinalisedOnChain =
    !hasNotCollectedPublication &&
    reasons?.includes(DecryptFailReason.CollectNotFinalisedOnChain);
  // Follow checks - https://docs.lens.xyz/docs/gated#profile-follow
  const doesNotFollowProfile = reasons?.includes(
    DecryptFailReason.DoesNotFollowProfile
  );
  const followNotFinalisedOnChain =
    !doesNotFollowProfile &&
    reasons?.includes(DecryptFailReason.FollowNotFinalisedOnChain);
  // Token check - https://docs.lens.xyz/docs/gated#erc20-token-ownership
  const unauthorizedBalance = reasons?.includes(
    DecryptFailReason.UnauthorizedBalance
  );
  // NFT check - https://docs.lens.xyz/docs/gated#erc20-token-ownership
  const doesNotOwnNft = reasons?.includes(DecryptFailReason.DoesNotOwnNft);

  const getDecryptedData = async () => {
    if (!walletClient || isDecrypting) {
      return;
    }

    setIsDecrypting(true);
    const contentUri = sanitizeDStorageUrl(
      encryptedPublication?.onChainContentURI
    );
    const { data } = await axios.get(contentUri);
    const sdk = await LensGatedSDK.create({
      provider: publicClient as any,
      signer: walletClient as any,
      env: LIT_PROTOCOL_ENVIRONMENT as LensEnvironment
    });
    const { decrypted, error } = await sdk.gated.decryptMetadata(data);
    setDecryptedData(decrypted);
    setContent(decrypted?.content);
    setDecryptError(error);
    setIsDecrypting(false);
  };

  if (!currentProfile) {
    return (
      <Card
        className={cn(cardClasses, '!cursor-pointer')}
        onClick={(event) => {
          stopEventPropagation(event);
          setShowAuthModal(true);
        }}
      >
        <div className="flex items-center space-x-1 font-bold text-white">
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>Login to decrypt</span>
        </div>
      </Card>
    );
  }

  if (!canDecrypt) {
    return (
      <Card
        className={cn(cardClasses, 'cursor-text')}
        onClick={stopEventPropagation}
      >
        <div className="flex items-center space-x-2 font-bold">
          <LockClosedIcon className="h-5 w-5 text-green-300" />
          <span className="text-base font-black text-blue-700 dark:text-blue-700">
            To view this...
          </span>
        </div>
        <div className="space-y-2 pt-3.5 text-blue-700">
          {/* Collect checks */}
          {hasNotCollectedPublication ? (
            <DecryptMessage icon={<RectangleStackIcon className="h-4 w-4 text-blue-700" />}>
              Collect the{' '}
              <Link
                href={`/post/${collectCondition?.publicationId}`}
                className="font-bold lowercase underline text-blue-700"
              >
                {encryptedPublication?.__typename}
              </Link>
            </DecryptMessage>
          ) : null}
          {collectNotFinalisedOnChain ? (
            <DecryptMessage
              icon={<RectangleStackIcon className="h-4 w-4 animate-pulse text-blue-700" />}
            >
              Collect finalizing on chain...
            </DecryptMessage>
          ) : null}

          {/* Follow checks */}
          {doesNotFollowProfile ? (
            <DecryptMessage icon={<UserPlusIcon className="h-4 w-4 text-blue-700" />}>
              Follow{' '}
              <Link
                href={`/u/${formatHandle(encryptedPublication?.profile?.id)}`}
                className="font-bold text-blue-700"
              >
                @{formatHandle(encryptedPublication?.profile?.handle)}
              </Link>
            </DecryptMessage>
          ) : null}
          {followNotFinalisedOnChain ? (
            <DecryptMessage
              icon={<UserPlusIcon className="h-4 w-4 animate-pulse text-blue-700" />}
            >
              Follow finalizing on chain...
            </DecryptMessage>
          ) : null}

          {/* Token check */}
          {unauthorizedBalance ? (
            <DecryptMessage icon={<CircleStackIcon className="h-4 w-4 text-blue-700" />}>
              You need{' '}
              <Link
                href={`${POLYGONSCAN_URL}/token/${tokenCondition.contractAddress}`}
                className="font-bold text-blue-700 underline"
                target="_blank"
                rel="noreferrer noopener"
              >
                {tokenCondition.amount} {tokenData?.symbol}
              </Link>{' '}
              to unlock
            </DecryptMessage>
          ) : null}

          {/* NFT check */}
          {doesNotOwnNft ? (
            <DecryptMessage icon={<PhotoIcon className="h-4 w-4" />}>
              You need{' '}
              <Tooltip content={contractMetadata?.name} placement="top">
                <Link
                  href={`${RARIBLE_URL}/collection/polygon/${nftCondition.contractAddress}/items`}
                  className="font-bold text-blue-700 underline"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {contractMetadata?.symbol}
                </Link>
              </Tooltip>{' '}
              nft to unlock
            </DecryptMessage>
          ) : null}
        </div>
      </Card>
    );
  }

  if (decryptError) {
    return (
      <ErrorMessage title={`Error while decrypting!`} error={decryptError} />
    );
  }

  if (!decryptedData && isDecrypting) {
    return (
      <div className="space-y-2">
        <div className="shimmer h-3 w-7/12 rounded-lg" />
        <div className="shimmer h-3 w-1/3 rounded-lg" />
      </div>
    );
  }

  if (!decryptedData) {
    return (
      <Card
        className={cn(cardClasses, '!cursor-pointer')}
        onClick={async (event) => {
          stopEventPropagation(event);
          await getDecryptedData();
        }}
      >
        <div className="flex items-center space-x-1 font-bold text-blue-700">
          <FingerPrintIcon className="h-5 w-5" />
          <span>
            Decrypt{' '}
            <span className="lowercase">{encryptedPublication.__typename}</span>
          </span>
        </div>
      </Card>
    );
  }

  const publication: PublicationMetadataV2Input = decryptedData;
  const urls = getURLs(content);

  const onData = () => {
    const updatedContent = removeUrlAtEnd(urls, content);
    if (updatedContent !== content) {
      setContent(updatedContent);
    }
  };

  return (
    <div className="break-words">
      <Markup
        className={cn(
          { 'line-clamp-5': showMore },
          'markup linkify text-md break-words'
        )}
      >
        {content}
      </Markup>
      {showMore ? (
        <div className="mt-4 flex items-center space-x-1 text-sm font-bold text-gray-500">
          <EyeIcon className="h-4 w-4" />
          <Link href={`/post/${encryptedPublication?.id}`}>Show more</Link>
        </div>
      ) : null}
      {publication?.media?.length ? (
        <Attachments attachments={publication?.media} />
      ) : content && urls.length > 0 ? (
        <Oembed
          url={urls[0]}
          publicationId={encryptedPublication.id}
          onData={onData}
        />
      ) : null}
    </div>
  );
};

export default DecryptedPublicationBody;
