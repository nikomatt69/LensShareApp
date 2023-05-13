import { CHAIN_ID } from '@/constants';
import { useAppStore } from '@/store/app';
import { useNftFeedQuery } from '@/types/graph';
import { Nft, Profile } from '@/utils/lens';
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { BsPlay } from 'react-icons/bs';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import NFT from './NFT';


interface Props {
  profile: Profile
}

const CollectedVideos: FC<Props> = ({ profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  
  const request = {
    chainIds: [CHAIN_ID, polygon.id],
    ownerAddress: profile?.ownedBy,
  };

  const { data, loading, error } = useNftFeedQuery({
    variables: { request }
  });

  const nfts = data?.nfts?.items;
  

  return (
    <div>
      {nfts?.length === 0 ? (
        <p className=" rounded text-center">This user has no NFTs</p>
        ) : (
        <div className="grid gap-2 rounded-xl mr-2 mt-2 object-contain object-center lg:grid-cols-3 md:gap-y-8 gap-y-2 3xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-col-1">
          {nfts?.map((nft) => (
            <>
              <div key={nft.chainId}>
                <NFT nft={nft as Nft} />
              </div>
            </>
          ))}
        </div>
      )}
    </div>
  )
}

export default CollectedVideos