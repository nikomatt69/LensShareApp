
import DropMenu from '@/components/UI/DropMenu'
import { ERROR_MESSAGE } from '@/constants'
import {useAppStore} from '@/store/app'
import type { Publication } from '@/utils/lens/generatedLenster'
import { CustomErrorWithData } from '@/utils/custom-types2'
import { useHidePublicationMutation, useReportPublicationMutation } from '@/utils/lens/generatedLenster'
import { FlagIcon } from '@heroicons/react/24/outline'
import { Dispatch, FC, useState } from 'react'
import React from 'react'
import toast from 'react-hot-toast'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'


type Props = {
  setShowReport: Dispatch<boolean>
  video: Publication

}

const CommentOptions: FC<Props> = ({ video, setShowReport }) => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  const [reason, setReason] = useState('ILLEGAL')

  const [hideComment] = useHidePublicationMutation({
    update(cache) {
      const normalizedId = cache.identify({
        id: video?.id,
        __typename: 'Post'
      })
      cache.evict({ id: normalizedId })
      cache.gc()
    },
    onCompleted: () => {
      
      toast.success('Post deleted')
    }
  })

  const onHideComment = () => {
    if (
      confirm(
        'This will hide your post from lens, are you sure want to continue?\n\nNote: This cannot be reverted.'
      )
    ) {
      hideComment({ variables: { request: { publicationId: video?.id } } })
    }
  }

  const [createReport, { loading: reporting }] = useReportPublicationMutation({
    onError: (error: CustomErrorWithData) => {
      toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
    },
    onCompleted: () => {
      toast.success(`Publication reported successfully.`)
      setShowReport(false)
     
    }
  })

  const getReasonType = (type: string) => {
    if (type === 'ILLEGAL') {
      return 'illegalReason'
    }
    if (type === 'FRAUD') {
      return 'fraudReason'
    }
    if (type === 'SENSITIVE') {
      return 'sensitiveReason'
    }
    if (type === 'SPAM') {
      return 'spamReason'
    }
    return 'illegalReason'
  }

  const onReport = () => {
    const type = reason.split('-')[0]
    const subReason = reason.split('-')[1]
    createReport({
      variables: {
        request: {
          publicationId: video.id,
          reason: {
            [getReasonType(type)]: {
              reason: type,
              subreason: subReason
            }
          },
          additionalComments: `${type} - ${subReason}`
        }
      }
    })
  }

  return (
    <DropMenu
      trigger={
        <div className="p-1 m-auto">
          <BsThreeDots className="h-3.5 w-3.5"  />
        </div>
      }
    >

      <div className="bg-secondary mt-0.5 w-36 display:absolute rounded-lg border border-gray-200 p-1 shadow dark:border-gray-800">
        <div className="flex flex-col rounded-lg text-sm transition duration-150 ease-in-out">
          {currentProfile?.id === video?.profile?.id && (
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
            onClick={() => onReport()}
            className="inline-flex items-center space-x-2 rounded-lg px-3 py-1.5 text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FlagIcon className="h-3.5 w-3.5 text-white" />
            <span className="whitespace-nowrap text-white">Report</span>
          </button>
        </div>
      </div>
    </DropMenu>
  )
}

export default CommentOptions
