import { RARIBLE_URL, STATIC_IMAGES_URL, USER_CONTENT_URL,OPENSEA_MARKETPLACE_URL, IS_MAINNET, STATIC_ASSETS_URL } from '@/constants';
import type { Nft } from '@/utils/lens';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import type { FC } from 'react';
import { CHAIN_ID } from 'src/constants';
import { Card } from '@/components/UI/Card';

interface Props {
  nft: Nft;
  linkToDetail?: boolean;
}

const NFT: FC<Props> = ({ nft, linkToDetail = true }) => {
  const nftURL = 
     `${RARIBLE_URL}/token/polygon/${nft.contractAddress}/${
        nft.tokenId
      }`.toLowerCase()
    || `${OPENSEA_MARKETPLACE_URL}/assets/${IS_MAINNET ? 'matic/' : 'mumbai/'}${nft.contractAddress}/${
      nft.tokenId
    }`.toLowerCase() 


  return (
    <Card>
      {nft?.originalContent?.animatedUrl ? (
        <div className="grid gap-2 p-1 rounded-xl mr-2 mt-2 lg:grid-cols-3 md:gap-y-8 gap-y-2 3xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
          {nft?.originalContent?.animatedUrl?.includes('.gltf') ? (
            <a href={nftURL} target="_blank" rel="noreferrer noopener">
              <div
                style={{
                  backgroundImage: `url(${
                    nft.originalContent.uri
                      ? sanitizeDStorageUrl(nft.originalContent.uri)
                      : `${STATIC_ASSETS_URL}/placeholder.webp`
                  })`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </a>
          ) : (
            <iframe
              title={`${nft.contractAddress}:${nft.tokenId}`}
              sandbox=""
              src={sanitizeDStorageUrl(nft?.originalContent?.animatedUrl)}
            />
          )}
        </div>
      ) : (
        <a href={nftURL} target="_blank" rel="noreferrer noopener">
          <img
           
            style={{
              backgroundImage: `url(${
                nft.originalContent.uri
                  ? sanitizeDStorageUrl(nft.originalContent.uri)
                  : `${STATIC_ASSETS_URL}/placeholder.webp`
              })`,
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </a>
      )}
      <div className="grid gap-2 rounded mr-2 mt-2 lg:grid-cols-3 md:gap-y-8 gap-y-2 3xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
        {nft.collectionName && <div className="lt-text-gray-500 truncate text-sm">{nft.collectionName}</div>}
        <div className="truncate">
          <a className="font-bold" href={nftURL} target="_blank" rel="noreferrer noopener">
            {nft.name ? nft.name : `#${nft.tokenId}`}
          </a>
        </div>
      </div>
    </Card>
  );
};

export default NFT;
