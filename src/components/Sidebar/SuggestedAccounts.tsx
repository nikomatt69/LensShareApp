import { useQuery } from "@apollo/client";
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from "react";
import Link from "next/link";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { Profile, RecommendedProfilesDocument } from "@/utils/lens/generatedLenster";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import getAvatar from "@/lib/getAvatar";
import formatHandle from "@/utils/functions/formatHandle";


interface Props {
  currentProfile :Profile
}

const SuggestedAccounts = () => {

  const { data, loading, error, } = useQuery(RecommendedProfilesDocument, {
    nextFetchPolicy: 'standby',
    variables: { options: { shuffle: true } },
  });
  console.log("Recommended", data);
  return (
    <div className="lg:border-b-2 border-gray-200 pb-4">
      <p className="text-gray-500 font-semibold m-3 mt-4 hidden lg:block">
        Suggested Accounts
      </p>

      <div>
        {data?.recommendedProfiles.slice(0, 20).map((currentProfile: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; handle: string | null; }) => (
          <Link href={`/u/${currentProfile.id}`} key={currentProfile.id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(currentProfile)}
                  alt={getAvatar(currentProfile)}
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              <div/>
              <div >
              <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
              {currentProfile.name}
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {formatHandle(currentProfile.handle)} {""}
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
