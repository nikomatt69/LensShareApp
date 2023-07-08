
import CheckOutline from '@/components/UI/Icons/CheckOutline'

import { CollectModuleType, UploadedVideo } from '@/custom-types'

import clsx from 'clsx'
import type { FC } from 'react'
import React from 'react'

type Props = {
  uploadedVideo: UploadedVideo
  setCollectType: (data: CollectModuleType) => void
}

const LimitDurationQuestion: FC<Props> = ({
  uploadedVideo,
  setCollectType
}) => {
  return (
    <div className="space-y-2">
      <h6>
        Would you like to limit the collect duration?
      </h6>
      <div className="flex flex-wrap gap-1.5 md:flex-nowrap">
        <button
          type="button"
          onClick={() =>
            setCollectType({
              isTimedFeeCollect:false,
            
             
             
            })
          }
          className={clsx(
            'flex w-full items-center justify-between rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none dark:border-gray-700',
            {
              '!border-indigo-500':
                !uploadedVideo.collectModule
            }
          )}
        >
          <span>
         Unlimited duration
          </span>
          {!uploadedVideo.collectModule && (
            <CheckOutline className="h-3 w-3" />
          )}
        </button>
        <button
          type="button"
          onClick={() =>
            setCollectType({
              isTimedFeeCollect: true,
       
            })
          }
          className={clsx(
            'flex w-full items-center justify-between rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none dark:border-gray-700',
            {
              '!border-indigo-500': uploadedVideo.collectModule
            }
          )}
        >
          <span>
            Limit to 24 hours sale
          </span>
          {uploadedVideo.collectModule && (
            <CheckOutline className="h-3 w-3" />
          )}
        </button>
      </div>
    </div>
  )
}

export default LimitDurationQuestion
