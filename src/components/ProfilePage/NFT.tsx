import {
  RARIBLE_URL,
  STATIC_IMAGES_URL,
  USER_CONTENT_URL,
  OPENSEA_MARKETPLACE_URL,
  IS_MAINNET,
  STATIC_ASSETS_URL
} from '@/constants';
import type { Nft } from '@/utils/lens/generatedLenster';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import type { FC } from 'react';
import { CHAIN_ID } from 'src/constants';
import { Card } from '@/components/UI/Card';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import Link from 'next/link';

interface Props {
  nft: Nft;
  linkToDetail?: boolean;
}

const NFT: FC<Props> = ({ nft, linkToDetail = true }) => {
  const nftURL =
    `${RARIBLE_URL}/token/polygon/${nft.contractAddress}:${nft.tokenId}`.toLowerCase() ||
    `${OPENSEA_MARKETPLACE_URL}/assets/${IS_MAINNET ? 'matic' : 'mumbai'}/${
      nft.contractAddress
    }/${nft.tokenId}`.toLowerCase();

  return (
    <Card className="justify-center rounded-xl object-fill object-center">
      {nft?.originalContent?.animatedUrl ? (
        <div className="3xl:grid-cols-1 xs:grid-col-1 mt-2 grid items-center justify-center gap-2 rounded-xl object-fill object-center p-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          {nft?.originalContent?.animatedUrl?.includes('.gltf') ? (
            <Link href={nftURL} target="_blank" rel="noreferrer noopener">
              <div
                className="rounded-xl object-fill object-center"
                style={{
                  backgroundImage: `url(${
                    nft.originalContent.uri
                      ? sanitizeIpfsUrl(nft.originalContent.uri)
                      : `${STATIC_ASSETS_URL}/images/faviconok.png`
                  })`,
                  backgroundSize:
                    'contain items-center object-center object-fill',
                  backgroundPosition:
                    'rounded-xl items-center object-contain object-fill object-center center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </Link>
          ) : (
            <div className="items-center rounded-xl  object-fill object-center">
              <iframe
                className="cursor-pointer items-center rounded-xl object-fill object-center"
                sandbox=""
                title={`${nft.contractAddress}:${nft.tokenId}`}
                src={sanitizeIpfsUrl(nft?.originalContent?.animatedUrl)}
              />
            </div>
          )}
        </div>
      ) : (
        <a href={nftURL} target="_blank" rel="noreferrer noopener">
          <video
            className="cursor-pointer rounded-xl object-fill object-center"
            style={{
              backgroundImage: `url(${
                nft?.originalContent?.animatedUrl
                  ? sanitizeIpfsUrl(nft?.originalContent?.animatedUrl)
                  : `${STATIC_ASSETS_URL}/images/faviconok.png`
              })`,
              backgroundSize: ' object-fill items-center object-center contain',
              backgroundPosition:
                'center items-center object-fill object-center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </a>
      )}
      <div className="3xl:grid-cols-1 xs:grid-col-1 mt-2 grid gap-2  rounded-xl object-fill  object-center p-1 text-center sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
        {nft.collectionName && (
          <div className="lt-text-gray-500 truncate text-sm">
            {nft.collectionName}
          </div>
        )}
        <div className="truncate">
          <a
            className="font-bold"
            href={nftURL}
            target="_blank"
            rel="noreferrer noopener"
          >
            {nft.name ? nft.name : `#${nft.tokenId}`}
          </a>
        </div>
      </div>
    </Card>
  );
};

export default NFT;
