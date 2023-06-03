
import {useAppStore} from '@/store/app'
import usePersistStore from '@/store/persist'
import clsx from 'clsx'
import type { Publication } from '@/types/lens'
import {
  ReactionTypes,
  useAddReactionMutation,
  useRemoveReactionMutation
} from '@/utils/lens'
import type { FC } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import {  SIGN_IN_REQUIRED_MESSAGE} from '@/constants'
import {formatNumber} from '@/utils/functions/formatNumber'

type Props = {
  publication: Publication
  iconSize?: 'sm' | 'base' | 'lg'
  textSize?: 'sm' | 'base'
  isVertical?: boolean
  showLabel?: boolean
}

const PublicationReaction: FC<Props> = ({
  publication,
  iconSize = 'sm',
  textSize = 'sm',
  isVertical = false,
  showLabel = true
}) => {
  const currentProfileId = usePersistStore((state) => state.currentProfileId)
  const currentProfile = useAppStore((state) => state.currentProfile)

  const [reaction, setReaction] = useState({
    isLiked: publication.reaction === 'UPVOTE',
    isDisliked: publication.reaction === 'DOWNVOTE',
    likeCount: publication.stats?.totalUpvotes
  })

  const [addReaction] = useAddReactionMutation({
    onError: (error) => {
      toast.error(error?.message)
    }
  })
  const [removeReaction] = useRemoveReactionMutation({
    onError: (error) => {
      toast.error(error?.message)
    }
  })

  const likeVideo = () => {
    if (!currentProfileId) {
      return toast.error(SIGN_IN_REQUIRED_MESSAGE)
    }
    
    setReaction((prev) => ({
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      isLiked: !prev.isLiked,
      isDisliked: false
    }))
    if (reaction.isLiked) {
      removeReaction({
        variables: {
          request: {
            profileId: currentProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: publication.id
          }
        }
      })
    } else {
      addReaction({
        variables: {
          request: {
            profileId: currentProfile?.id,
            reaction: ReactionTypes.Upvote,
            publicationId: publication.id
          }
        }
      })
    }
  }

  const dislikeVideo = () => {
    if (!currentProfileId) {
      return toast.error(SIGN_IN_REQUIRED_MESSAGE)
    }
   
    setReaction((prev) => ({
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount,
      isLiked: false,
      isDisliked: !prev.isDisliked
    }))
    if (reaction.isDisliked) {
      removeReaction({
        variables: {
          request: {
            profileId: currentProfile?.id,
            reaction: ReactionTypes.Downvote,
            publicationId: publication.id
          }
        }
      })
    } else {
      addReaction({
        variables: {
          request: {
            profileId: currentProfile?.id,
            reaction: ReactionTypes.Downvote,
            publicationId: publication.id
          }
        }
      })
    }
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-end',
        isVertical
          ? 'flex-col space-y-2.5 px-3 md:space-y-4'
          : 'space-x-2.5 md:space-x-5'
      )}
    >
      <button
        className="focus:outline-none disabled:opacity-50"
        onClick={() => likeVideo()}
      >
        <span
          className={clsx(
            'flex items-center focus:outline-none',
            {
              'font-semibold text-green-500': reaction.isLiked
            }, isVertical ? 'flex-col' : 'gap-1'
          )}
        >

          <div className=' rounded-full  md:bg-gray-200 bg-gray-600/50 dark:bg-gray-600/50 p-2'>
            {reaction.isLiked ? <AiFillHeart
              className={clsx({
                'h-3.5 w-3.5': iconSize === 'sm',
                'h-6 w-6': iconSize === 'lg',
                'h-4 w-4': iconSize === 'base',
              },)}
            /> :
              <AiOutlineHeart
                className={clsx({
                  'h-3.5 w-3.5': iconSize === 'sm',
                  'h-6 w-6': iconSize === 'lg',
                  'h-4 w-4': iconSize === 'base',
                  'text-green-500': reaction.isLiked
                },)}
              />}
          </div>
          {showLabel && (
            <span
              className={clsx({
                'text-xs': textSize === 'sm',
                'text-base': textSize === 'base',
                'text-green-500': reaction.isLiked
              })}
            >
              {formatNumber(reaction.likeCount)}
            </span>
          )}
        </span>
      </button>
    </div>
  )
}

export default PublicationReaction
