import { CHAIN_ID } from '@/constants';
import { useAppStore } from '@/store/app';
import { useNftFeedQuery } from '@/types/graph';
import { Nft, Profile } from '@/utils/lens';
import Link from 'next/link';
import React, { FC, useState } from 'react'
import { BsPlay } from 'react-icons/bs';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import NFT from './NFT';
import { useInView } from 'react-cool-inview';
import Loading from '../Loading';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Card } from '../UI/Card';


interface Props {
  profile: Profile
}

const CollectedVideos: FC<Props> = ({ profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  
  const request = {
    chainIds: [polygon.id],
    ownerAddress: profile?.ownedBy,
  };

  const { data, loading, error ,fetchMore} = useNftFeedQuery({
    variables: { request }
  });

  const nfts = data?.nfts?.items;
  const pageInfo = data?.nfts?.pageInfo

  const { observe } = useInView({
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            cursor: pageInfo?.next,
            ...request
          }
        }
      })
    }
  })
  

  return (
    <div>
      {nfts?.length === 0 ? (
        <p className=" rounded text-center">This user has no NFTs</p>
        ) : (
        <div className="grid rounded-xl mt-2 object-center lg:grid-cols-1 3xl:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 xs:grid-col-1">
           <InfiniteScroll
            dataLength={nfts?.length ?? 0}
           next={() => {}}
            hasMore={true}
           loader={pageInfo?.next && (
           <span ref={observe} className="flex justify-center p-10">
           <Loading />
            </span>
          )}
           endMessage={
            <p style={{ textAlign: "center" }}>
           <b>Yay! You have seen it all</b>
           </p>
           }
          >
        <Card>
          {nfts?.map((nft) => (
            
              <div key={nft.chainId}>
                <NFT nft={nft as Nft} />
              </div>
            
          ))}
        </Card>
        </InfiniteScroll>
        </div>
      )}
    </div>
  )
}

export default CollectedVideos

