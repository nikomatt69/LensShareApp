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
        <div className="grid rounded-xl mt-2 object-center lg:grid-cols-1 3xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xs:grid-col-1">
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