import {  CHAIN_ID, IS_MAINNET, OPENSEA_MARKETPLACE_URL, RARIBLE_URL } from '@/constants';
import { Nft } from '@/utils/lens'
import React, { FC, useRef, useState } from 'react'
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import imageCdn from '@/lib/imageCdn';

interface Props {
    nft: Nft
}

const NFT: FC<Props> = ({ nft }) => {
    
    const nftURL = `${RARIBLE_URL}/token/${nft.chainId === CHAIN_ID ? 'polygon/' : ''}${nft.contractAddress}:${
      nft.tokenId
    }`.toLowerCase()

    const STATIC_ASSETS = "https://assets.lenshareapp.xyz"

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