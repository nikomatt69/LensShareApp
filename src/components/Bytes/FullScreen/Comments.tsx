import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { Image } from '@/components/UI/Image';
import Link from 'next/link';
import { useAppStore, useTransactionPersistStore } from 'src/store/app';


import { useQuery } from '@apollo/client';
import {
  Profile,
  Publication,
  PublicationDocument
} from '@/utils/lens/generatedLenster';
import { useRouter } from 'next/router';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';

import getAvatar from '@/lib/getAvatar';

import QueuedData from '../../QueuedData';
import LoginButton from '@/components/Login/LoginButton';

import CollectModule from '@/components/Buttons/Collects/CollectModule';

import InterweaveContent from '@/components/UI/InterweaveContent';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import formatHandle from '@/utils/functions/formatHandle';
import UnfollowButton from '@/components/Buttons/UnfollowButton';
import FollowButton from '@/components/Buttons/FollowButton';
import { getModule } from '@/lib/getModule';
import Feed from '@/components/Comment/Feed';

interface Props {
  publication: Publication;
  profile: Profile;
}

const CommentsVideo: FC<Props> = ({ publication, profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const [count, setCount] = useState(publication?.stats?.totalAmountOfCollects);
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const currentViewingId = useAppStore((state) => state.currentviewingId);

  const router = useRouter();
  const { id } = router.query;
  const variables = {
    request: {
      commentsOf: id
    }
  };

  const { data, loading, error, refetch } = useQuery(PublicationDocument, {
    variables
  });
  const comments = data?.publications?.items ?? [];
  console.log('Comments', comments);

  const refetchComments = () => {
    refetch({
      ...variables
    });
  };

  return (
    <div className="overflow-y-auto">
      <div className=" h-flex gap-0.3 flex flex-grow flex-col items-stretch justify-center overflow-y-auto rounded-xl border-2 bg-gray-600/50 object-center pt-8 text-black dark:text-white ">
        <div className="flex flex-grow flex-col rounded-xl  border-2 bg-gray-600/50 bg-gradient-to-b from-gray-900 to-transparent pb-1 pt-2 ">
          <Link
            legacyBehavior
            href={`/u/${publication?.profile?.id}`}
            key={publication?.profile?.id}
          >
            <a className="mr-3 flex-shrink-0 rounded-full">
              <Image
                src={getAvatar(publication?.profile)}
                alt="profile pic here"
                height={62}
                width={62}
                className="rounded-full"
              />
            </a>
          </Link>
          <div className="flex flex-grow flex-col justify-center p-1">
            <Link
              legacyBehavior
              href={`/u/${publication?.profile?.id}`}
              key={publication?.profile?.id}
            >
              <a className="block items-center font-bold text-primary hover:underline">
                {publication?.profile?.name}
              </a>
            </Link>
            <p
              prefix="@"
              className="text-sm font-medium capitalize text-gray-900"
            >
              @{formatHandle(publication?.profile?.handle)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-grow flex-col justify-center rounded-xl border-2 bg-[#F2F6F9] dark:bg-black text-center font-sans text-xs">
        <span className="mb-3 rounded-xl bg-blue-700 p-1 text-center text-lg font-bold   ">
          Description
        </span>
        <InterweaveContent content={publication?.metadata?.content} />
      </div>
      <div className="mt-3 rounded-xl border-2 bg-[#F2F6F9] dark:bg-black pt-3 ">
        <span className="ml-1  rounded-xl bg-blue-700 object-center p-1 text-center font-bold">
          Comments
        </span>
        {comments?.map((publication: Comment) => (
          <Feed />
        ))}
       
      </div>
      <div className="mt-3 rounded-xl border-2 bg-[#F2F6F9] dark:bg-black pt-2 ">
        <span className="ml-1 rounded-xl bg-blue-700 object-center p-1 pb-1  text-center font-bold">
          Collects
        </span>
        <div className="display:inline-block flex pt-1 font-sans text-blue-700  ">
          {getModule(publication?.collectModule?.type).name}
        </div>
        <CollectModule
          setCount={setCount}
          count={count}
          publication={publication as Publication}
        />
      </div>
    </div>
  );
};

export default CommentsVideo;
