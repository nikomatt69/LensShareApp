
import DropMenu from '@/components/UI/DropMenu'
import {useAppStore} from '@/store/app'
import type { Publication } from '@/types/lens'
import { useHidePublicationMutation } from '@/utils/lens'
import { FlagIcon } from '@heroicons/react/24/outline'
import type { Dispatch, FC } from 'react'
import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'


type Props = {
  setShowReport: Dispatch<boolean>
  comment: Publication
}

const CommentOptions: FC<Props> = ({ comment, setShowReport }) => {
  const currentProfile = useAppStore((state) => state.currentProfile)

  const [hideComment] = useHidePublicationMutation({
    update(cache) {
      const normalizedId = cache.identify({
        id: comment?.id,
        __typename: 'Comment'
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
    onCompleted: () => {
      
      toast.success('Comment deleted')
    }
  })

  const onHideComment = () => {
    if (
      confirm(
        'This will hide your comment from lens, are you sure want to continue?\n\nNote: This cannot be reverted.'
      )
    ) {
      hideComment({ variables: { request: { publicationId: comment?.id } } })
    }
  }

  return (
    <DropMenu
      trigger={
        <div className="p-1 m-auto">
          <BsThreeDots className="h-3.5 w-3.5" />
        </div>
      }
    >
      <div className="bg-secondary mt-0.5 w-36 overflow-hidden rounded-lg border border-gray-200 p-1 shadow dark:border-gray-800">
        <div className="flex flex-col rounded-lg text-sm transition duration-150 ease-in-out">
          {currentProfile?.id === comment?.profile?.id && (
            <button
              type="button"
              onClick={() => onHideComment()}
              className="inline-flex items-center space-x-2 rounded-lg px-3 py-1.5 text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
            >
              <AiOutlineDelete className="text-base" />
              <span className="whitespace-nowrap">Delete</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowReport(true)}
            className="inline-flex items-center space-x-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FlagIcon className="h-3.5 w-3.5" />
            <span className="whitespace-nowrap">Report</span>
          </button>
        </div>
      </div>
    </DropMenu>
  )
}

export default CommentOptions
