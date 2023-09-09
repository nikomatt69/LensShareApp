import { useQuery } from '@apollo/client';
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal
} from 'react';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import { GoVerified } from 'react-icons/go';
import {
  Profile,
  RecommendedProfilesDocument
} from '@/utils/lens/generatedLenster';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';

interface Props {
  currentProfile: Profile;
}

const SuggestedAccounts = () => {
  const { data, loading, error } = useQuery(RecommendedProfilesDocument, {
    nextFetchPolicy: 'standby',
    variables: { options: { shuffle: true ,limit: 10} },

  });
  console.log('Recommended', data);
  return (
    <div className="border-gray-200 pb-4 lg:border-b-2">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 dark:text-white lg:block">
        Suggested Accounts
      </p>

      <div>
        {data?.recommendedProfiles
          .slice(0, 10)
          .map(
            (currentProfile: {
              id: Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | ReactElement<any, string | JSXElementConstructor<any>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
              handle: string | null;
            }) => (
              <Link href={`/u/${currentProfile.id}`} key={currentProfile.id}>
                <div className="flex cursor-pointer items-center gap-3 rounded p-2 font-semibold hover:bg-blue-100 dark:hover:bg-gray-700">
                  <div className="relative h-[32px] w-[32px]">
                    <Image
                      src={getAvatar(currentProfile)}
                      alt={getAvatar(currentProfile)}
                      className="rounded-full"
                      
                    />
                  </div>
                  <div />
                  <div>
                    <p className="text-md flex items-center gap-1 font-bold lowercase text-primary dark:text-white">
                      {currentProfile.name}
                    </p>
                    <p className="text-xs capitalize text-gray-400">
                      {formatHandle(currentProfile.handle)} {''}
                    </p>
                  </div>
                </div>
              </Link>
            )
          )}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
