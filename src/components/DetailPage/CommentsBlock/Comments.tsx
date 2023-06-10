import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppStore, useTransactionPersistStore } from "src/store/app";

import NoResults from "./NoResults";
import { useQuery } from "@apollo/client";
import { Profile, Publication, PublicationsDocument } from "@/types/lens";
import { useRouter } from "next/router";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import CreateComment from "./CreateComment";
import getAvatar from "@/lib/getAvatar";
import CommentData from "./CommentData";
import QueuedData from "../../QueuedData";
import LoginButton from "@/components/Login/LoginButton";
import Comments from "./Comment";
import CollectModule from "@/components/Buttons/Collects/CollectModule";
import DetailRender from "../DetailRender";
import InterweaveContent from "@/components/UI/InterweaveContent";
import getProfilePicture from "@/utils/functions/getProfilePicture";
import formatHandle from "@/utils/functions/formatHandle";
import UnfollowButton from "@/components/Buttons/UnfollowButton";
import FollowButton from "@/components/Buttons/FollowButton";
import { getModule } from "@/lib/getModule";

interface Props {
  publication: Publication;
  profile: Profile;
}

const CommentsVideo: FC<Props> = ({ publication,profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const [count, setCount] = useState(publication?.stats?.totalAmountOfCollects);

  const router = useRouter();
  const { id } = router.query;
  const variables = {
    request: {
      commentsOf: id,
    },
  };

  const { data, loading, error, refetch } = useQuery(PublicationsDocument, {
    variables,
  });
  const comments = data?.publications?.items ?? [];
  console.log("Comments", comments);

  const refetchComments = () => {
    refetch({
      ...variables,
    });
  };

  return (
    
      <div className="overflow-y-auto">
        <div className=" h-flex text-black flex-grow flex border-2 rounded-xl object-center pt-8 justify-center flex-col items-stretch gap-0.3 overflow-y-auto bg-gray-600/50 ">

         <div className="bg-gray-600/50 bg-gradient-to-b from-gray-900 to-transparent  border-2 pt-2 pb-1 flex-grow flex-col flex rounded-xl ">
         <Link legacyBehavior href={`/u/${publication?.profile?.id}`} key={publication?.profile?.id}>
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
            <div className="flex p-1 flex-col flex-grow justify-center">
              <Link href={`/u/${publication?.profile?.id}`} key={publication?.profile?.id}>
                <a className="font-bold block hover:underline items-center text-primary">
                  {publication?.profile?.name}
                </a>
              </Link>
              <p prefix="@" className="capitalize font-medium text-sm text-gray-900">

                @{formatHandle(publication?.profile?.handle)}
              </p>
            </div>
        </div>
        </div>
        <div className="flex-grow text-center bg-[#C0C0C0] mt-3 rounded-xl font-sans text-xs border-2 flex flex-col justify-center">
          <span className="font-bold bg-blue-500 rounded-xl text-center mb-3 text-lg p-1   ">Description</span>
          <InterweaveContent content={publication?.metadata?.content} />
        </div>
        <div className="bg-[#C0C0C0] border-2 pt-3 mt-3 rounded-xl ">
          <span className="font-bold  rounded-xl object-center bg-blue-500 ml-1 p-1 text-center">Comments</span>
        {comments?.map((comment) => (
                <CommentData
                  key={`${comment?.id}_${comment.createdAt}`}
                  comment={comment as Publication}
                  video={publication?.id as Publication}
                />
              ))}
         <CreateComment
          publication={publication as Publication}
          refetchComments={() => refetchComments()}
           />
          </div>
          <div className="bg-[#C0C0C0] border-2 mt-3 pt-2 rounded-xl ">
            <span className="font-bold rounded-xl bg-blue-500 ml-1 pb-1 p-1  object-center text-center">Collects</span>
            <div className="flex display:inline-block font-sans text-blue-700 pt-1  ">{getModule(publication?.collectModule?.type).name}</div>
            <CollectModule 
           setCount={setCount}
          count={count}  publication={publication as Publication} />
            </div>
     </div>
 
      

  );
};

export default CommentsVideo;