import onError from '@/lib/onError';
import { useAppStore } from '@/store/app';
import {
  useAddReactionMutation,
  useRemoveReactionMutation
} from '@/types/graph';
import { Publication, ReactionTypes } from '@/utils/lens/generatedLenster';
import { ApolloCache } from '@apollo/client';
import { HeartIcon } from '@heroicons/react/24/solid';
import React, { Dispatch, FC } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillHeart } from 'react-icons/ai';

interface Props {
  setCount: Dispatch<number>;
  setLiked: Dispatch<boolean>;
  count: number;
  liked: boolean;
  publication: Publication;
}

const Like: FC<Props> = ({ setCount, setLiked, count, liked, publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const [addReaction] = useAddReactionMutation({
    onCompleted: () => {
      toast.success('Like successfully!');
    },
    onError: (error) => {
      setLiked(!liked);
      setCount(count - 1);
      onError(error);
    }
  });

  const [removeReaction] = useRemoveReactionMutation({
    onCompleted: () => {
      toast.success('Like removed successfully!');
    },
    onError: (error) => {
      setLiked(!liked);
      setCount(count - 1);
      onError(error);
    }
  });

  const createLike = () => {
    if (!currentProfile) {
      return toast.error('Please connect your wallet!');
    }

    const variable = {
      variables: {
        request: {
          profileId: currentProfile?.id,
          reaction: ReactionTypes.Upvote,
          publicationId: publication?.id
        }
      }
    };

    if (liked) {
      setLiked(false);
      setCount(count - 1);
      removeReaction(variable);
    } else {
      setLiked(true);
      setCount(count + 1);
      addReaction(variable);
    }
  };
  return (
    <>
      {liked ? (
        <div
          onClick={createLike}
          className=" rounded-full  bg-gray-600/50 p-2 dark:bg-gray-600/50 md:bg-gray-200"
        >
          <AiFillHeart className="h-3 w-3 font-bold text-blue-500" />
        </div>
      ) : (
        <div
          onClick={createLike}
          className=" rounded-full  bg-gray-600/50 p-2 dark:bg-gray-600/50 md:bg-gray-200"
        >
          <AiFillHeart className="h-3 w-3 font-bold " />
        </div>
      )}
    </>
  );
};

export default Like;
