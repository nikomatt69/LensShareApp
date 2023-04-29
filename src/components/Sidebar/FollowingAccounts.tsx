import { useQuery } from "@apollo/client";
import { useState, useEffect, FC, Key } from "react";
import Link from "next/link";
import Image from "next/image";
import { FollowingDocument, PaginatedFollowingResult, FollowingRequest, Profile } from "@/utils/lens";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import getAvatar from "@/lib/getAvatar";
import { useAppStore } from "@/store/app";
import { useAccount } from "wagmi";
import formatHandle from "@/utils/functions/formatHandle";

const FollowingAccounts = () => {
  // const currentProfile = "0x1efDb7fBAc17c8c7C9C163741e6043aC9974381b"
  const currentProfile = useAppStore((state) => state.currentProfile)
  console.log('ADDRESSS', currentProfile?.id);
  const { address } = useAccount()

  const { data, loading, error } = useQuery
  <{following: PaginatedFollowingResult}>
  ((FollowingDocument), {
    variables: { 
      request: {
          address: address,
          
      }
     },
  });

    const iFollow = data?.following.items
    console.log('I Follow', iFollow);
  
  return (
    <div className="lg:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden lg:block">
        Following
      </p>

      <div>
        {iFollow?.map((following) => (
          <Link href={`/profile/${following?.profile.id}`} key={following?.profile.id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(following?.profile)}
                  alt="profilepic"
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              <div/>
              <div >
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {formatHandle(following?.profile.handle)}
                </p>
                <p className="capitalize text-gray-400 text-xs">
                {following?.profile.name} {""}
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
