import React, { Dispatch, FC, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppStore, useTransactionPersistStore } from "src/store/app";

import NoResults from "./NoResults";
import { useQuery } from "@apollo/client";
import { Publication, PublicationsDocument } from "@/types/lens";
import { useRouter } from "next/router";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import CreateComment from "./CreateComment";
import getAvatar from "@/lib/getAvatar";
import CommentData from "./CommentData";
import QueuedData from "../../QueuedData";
import LoginButton from "@/components/Login/LoginButton";

interface Props {
  publication: Publication;
}

const Comments: FC<Props> = ({ publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);

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
    <>
      <div className="overflow-y-auto">
        <div className=" h-screen text-black flex-grow flex flex-col items-stretch gap-0.3 overflow-y-auto bg-[#F2F4F7] ">
          {txnQueue.map(
            (txn) =>
              txn?.type === "NEW_COMMENT" &&
              txn?.parent === publication?.id && (
                <div key={txn.id}>
                  <QueuedData txn={txn} />
                </div>
              )
          )}
          {comments?.map((comment) => (
            <>
              <CommentData
                comment={comment as Publication}
                publication={publication as Publication}
              />
            </>
          ))}
        </div>
      </div>
      
      {currentProfile ? (
        <CreateComment
          publication={publication as Publication}
          refetchComments={() => refetchComments()}
        />
      ) : (
        <LoginButton />
      )}
      
    </>
  );
};

export default Comments;
