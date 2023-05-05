import {  IS_MAINNET, OPENSEA_MARKETPLACE_URL } from '@/constants';
import { Nft } from '@/utils/lens';
import React, { FC, useRef, useState } from 'react';
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl';
import imageCdn from '@/lib/imageCdn';
import Image from 'next/image';
    
 interface Props {
        nft: Nft
}

const STATIC_ASSETS = "https://asset.lenshareapp.xyz"
const NFT: FC<Props> = ({ nft }) => {    
        const nftURL = `${OPENSEA_MARKETPLACE_URL}/assets/${IS_MAINNET ? 'matic/' : 'mumbai/'}${nft.contractAddress}/${
          nft.tokenId
        }`.toLowerCase();
    
 return (
        <div>
            <a href={nftURL}>
                <a className="block h-0 relative pb-[131%]">
                    {nft?.originalContent?.animatedUrl ? (
                      <iframe 
                        sandbox="allow-scripts"
                        className="absolute inset-0 h-full w-full object-cover rounded"
                        src={nft?.originalContent?.animatedUrl}
                      />
                    ) : (
                      <img 
                        className="absolute inset-0 h-full w-full object-cover rounded"
                        src={imageCdn(
                          nft.originalContent?.uri
                          ? sanitizeIpfsUrl(nft.originalContent?.uri)
                          : `${STATIC_ASSETS}/placeholder.webp`,
                          'thumbnail'
                        )}
                      />
                    )}
                </a>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {nft.collectionName}
                </p>
            </a>
        </div>
      )
}
export default NFT