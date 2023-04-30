import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { RecommendedProfilesDocument } from "@/types/lens";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import getAvatar from "@/lib/getAvatar";
import formatHandle from "@/utils/functions/formatHandle";

const SuggestedAccounts = () => {
  const { data, loading, error } = useQuery(RecommendedProfilesDocument, {
    variables: { options: { shuffle: true } },
  });
  console.log("Recommended", data);
  return (
    <div className="lg:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden lg:block">
        Suggested Accounts
      </p>

      <div>
        {data?.recommendedProfiles.slice(0, 8).map((profile) => (
          <Link href={`/u/${profile.id}`} key={profile.id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(profile)}
                  alt={profile.handle}
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              <div/>
              <div >
              <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {formatHandle(profile.handle)}
                  
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {profile.name} {""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
