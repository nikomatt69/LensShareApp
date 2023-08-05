import { useQuery } from '@apollo/client';
import { useState, useEffect, FC, Key } from 'react';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import {
  FollowingDocument,
  PaginatedFollowingResult,
  FollowingRequest,
  Profile
} from '@/utils/lens/generatedLenster';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import getAvatar from '@/lib/getAvatar';
import { useAppStore } from '@/store/app';
import { useAccount } from 'wagmi';
import formatHandle from '@/utils/functions/formatHandle';

const FollowingAccounts = () => {
  // const currentProfile = "0x1efDb7fBAc17c8c7C9C163741e6043aC9974381b"
  const currentProfile = useAppStore((state) => state.currentProfile);
  console.log('ADDRESSS', currentProfile?.id);
  const { address } = useAccount();

  const { data, loading, error } = useQuery<{
    following: PaginatedFollowingResult;
  }>(FollowingDocument, {
    nextFetchPolicy: 'standby',
    variables: {
      request: {
        address: address
      }
    }
  });

  const iFollow = data?.following.items;
  console.log('I Follow', iFollow);

  return (
    <div className="border-gray-200 pb-4 lg:border-b-2">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 lg:block">
        Following
      </p>

      <div>
        {iFollow?.map((following) => (
          <Link
            href={`/u/${following?.profile.id}`}
            key={following?.profile.id}
          >
            <div className="flex cursor-pointer items-center gap-3 rounded p-2 font-semibold hover:bg-primary dark:hover:bg-gray-800">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(following?.profile)}
                  alt="profilepic"
                  className="rounded-full"
             
                />
              </div>
              <div />
              <div>
                <p className="text-md flex items-center gap-1 font-bold lowercase text-primary dark:text-white">
                  {following?.profile.name}
                </p>
                <p className="text-xs capitalize text-gray-400">
                  {formatHandle(following?.profile.handle)} {''}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FollowingAccounts;
