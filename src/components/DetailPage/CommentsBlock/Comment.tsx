

import clsx from 'clsx'
import type { Attribute, Publication } from '@/types/lens'
import { PublicationMainFocus } from '@/types/lens'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlinePlayCircle } from 'react-icons/ai'
import getRelativeTime  from '@/utils/functions/formatTime'
import {
  checkValueInAttributes,
  getValueFromTraitType
} from '@/utils/functions/getFromAttributes'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import InterweaveContent from '@/components/UI/InterweaveContent'
import { Tooltip } from '@/components/UI/Tooltip'
import HashExplorerLink from './HashExplorerLink'
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid'
import ReportModal from '../ReportModal'
import CommentsByte from '@/components/Bytes/FullScreen/Comments'

const CommentOptions = dynamic(() => import('./CommentOptions'))
const PublicationReaction = dynamic(() => import('./PublicationReaction'))

interface Props {
  comment: Publication

}

const VideoComment: FC<Props> = ({ comment }) => {
  return (
    <div className="my-2 rounded-sm border py-3 px-4 dark:border-gray-700">
      <Link
        href={`/${comment.id}`}
        className="flex items-center space-x-2.5"
      >
        <AiOutlinePlayCircle className="h-5 w-5" />
        <span>Watch Video</span>
      </Link>
    </div>
  )
}

const Comments: FC<Props> = ({ comment }) => {
  const [clamped, setClamped] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    if (comment?.metadata?.content.trim().length > 500) {
      setClamped(true)
      setShowMore(true)
    }
  }, [comment?.metadata?.content])

  const getIsVideoComment = () => {
    return comment.metadata.mainContentFocus === PublicationMainFocus.Video
  }

  return (
    <div className="flex items-start justify-between mb-5" onMouseEnter={() => setShowOptions(true)} onMouseLeave={() => setShowOptions(false)}>
      <div className="flex items-start justify-between">
        <Link
          href={`/u/${comment.profile?.id}`}
          className="mr-3 mt-0.5 flex-none"
        >
          <img
            src={getProfilePicture(comment.profile, 'avatar')}
            className="h-10 w-10 rounded-full"
            draggable={false}
            alt={comment.profile?.handle}
          />
        </Link>
        <div className="mr-2 flex flex-col items-start">
          <span className="mb-1 flex items-center space-x-1">
            <Link
              href={`/u/${comment.profile?.id}`}
              className="flex items-center space-x-1 text-base font-bold"
            >
              <span>{comment?.profile?.name}</span>
              
            </Link>
            {checkValueInAttributes(
              comment?.metadata.attributes as Attribute[],
              'tip'
            ) && (
                <Tooltip placement="top" content="Tipper">
                  <span>
                    <HashExplorerLink
                      hash={
                        getValueFromTraitType(
                          comment?.metadata.attributes as Attribute[],
                          'hash'
                        ) || ''
                      }
                    >
                      <AiFillHeart className="text-sm text-pink-500" />
                    </HashExplorerLink>
                  </span>
                </Tooltip>
              )}

          </span>
          <div
            className={clsx(
              'text-base opacity-80',
              clamped ? 'line-clamp-2' : ''
            )}
          >
            {comment?.hidden ? (
              <span className="text-xs italic opacity-80">
                Comment deleted by user!
              </span>
            ) : getIsVideoComment() ? (
              <CommentsByte comment={comment} />
            ) : (
              <InterweaveContent content={comment?.metadata?.content} />
            )}
          </div>
          {showMore && (
            <div className="mt-3 inline-flex">
              <button
                type="button"
                onClick={() => setClamped(!clamped)}
                className="mt-2 flex items-center text-xs opacity-80 outline-none hover:opacity-100"
              >
                {clamped ? (
                  <>
                    Show more <ArrowUpCircleIcon className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  <>
                    Show less <ArrowDownCircleIcon className="ml-1 h-3 w-3" />
                  </>
                )}
              </button>
            </div>
          )}
          <span className="text-xs opacity-50">
            {getRelativeTime(comment.createdAt)}
          </span>
        </div>
      </div>
      <div>
        <ReportModal
          publication={comment}
          showReport={showReport}
          setShowReport={setShowReport}
        />
        {showOptions ? <CommentOptions  video={comment} setShowReport={setShowReport}  /> : <CommentOptions video={comment} setShowReport={setShowReport}  />}
        {!comment.hidden && (
          <div className="">
            <PublicationReaction publication={comment} isVertical={true} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Comments
