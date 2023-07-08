
import React, { useState } from 'react'

import ChargeQuestion from './ChargeQuestion'
import FeeCollectForm from './FeeCollectForm'
import LimitDurationQuestion from './LimitDurationQuestion'
import LimitQuestion from './LimitQuestion'
import PermissionQuestion from './PermissionQuestion'
import { useAppStore } from '@/store/app'
import { CollectModuleType } from '@/custom-types'
import { useEnabledModulesQuery } from '@/utils/lens/generatedLenster'
import { Tooltip } from '@/components/UI/Tooltip'
import { GiSplitArrows } from 'react-icons/gi'
import CheckOutline from '@/components/UI/Icons/CheckOutline'

import { Button } from '@/components/UI/Button'
import { Modal } from '@/components/UI/Modal'
import { useEnabledModuleCurrrenciesQuery } from '@/utils/lens/generated'


const CollectModule = () => {
  const [showModal, setShowModal] = useState(false)
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
  const selectedChannel = useAppStore((state) => state.currentProfile)

  const setCollectType = (data: CollectModuleType) => {
    setUploadedVideo({
      collectModule: { ...uploadedVideo.collectModule, ...data }
    })
  }

  const { data: enabledCurrencies } = useEnabledModuleCurrrenciesQuery({
    variables: { request: { profileIds: selectedChannel?.id } },
    skip: !selectedChannel?.id
  })

  const getSelectedCollectType = () => {
    const followerOnlyCollect = uploadedVideo.collectModule.followerOnlyCollect
    const isTimedFeeCollect = uploadedVideo.collectModule.isTimedFeeCollect
    const isLimitedFeeCollect = uploadedVideo.collectModule.isLimitedFeeCollect
    const collectLimit = uploadedVideo.collectModule.collectLimit
    if (uploadedVideo.collectModule.isRevertCollect) {
      return 'No one can collect this publication'
    }
    if (uploadedVideo.collectModule.isFreeCollect) {
      return `${followerOnlyCollect ? 'Only Subscribers' : 'Anyone'
        } can collect for free ${isTimedFeeCollect ? 'within 24hrs' : ''}`
    }
    if (!uploadedVideo.collectModule.isFreeCollect) {
      return `${followerOnlyCollect ? 'Only Subscribers' : 'Anyone'
        } can collect ${isLimitedFeeCollect ? `maximum of ${collectLimit}` : ''
        } for given fees ${isTimedFeeCollect ? 'within 24hrs' : ''}`
    }
  }
   

  return (
    <>
    <div className="mb-1 flex items-center space-x-1.5">
      <div className="text-[13px] font-semibold uppercase opacity-70">
        Collect Type
      </div>
    </div>
    <button
      type="button"
      onClick={() => setShowModal(true)}
      className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2.5 text-left text-sm focus:outline-none dark:border-gray-700"
    >
      <span>{getSelectedCollectType()}</span>
      <CheckOutline className="h-3 w-3" />
    </button>
    <Modal
      title="Select collect type"
      onClose={()=> setShowModal(false)}
      
      show={showModal}
    >
      <div className="mt-2 space-y-4">
        <PermissionQuestion
          setCollectType={setCollectType}
          uploadedVideo={uploadedVideo}
        />
        {!uploadedVideo.collectModule.isRevertCollect && (
          <LimitDurationQuestion
            setCollectType={setCollectType}
            uploadedVideo={uploadedVideo}
          />
        )}
        {!uploadedVideo.collectModule.isRevertCollect && (
          <LimitQuestion
            setCollectType={setCollectType}
            uploadedVideo={uploadedVideo}
          />
        )}
        {!uploadedVideo.collectModule.isRevertCollect &&
          !uploadedVideo.collectModule.isTimedFeeCollect &&
          !uploadedVideo.collectModule.isLimitedFeeCollect && (
            <ChargeQuestion
              setCollectType={setCollectType}
              uploadedVideo={uploadedVideo}
            />
          )}
        {!uploadedVideo.collectModule.isFreeCollect &&
          !uploadedVideo.collectModule.isRevertCollect &&
          enabledCurrencies ? (
          <FeeCollectForm
            setCollectType={setCollectType}
            uploadedVideo={uploadedVideo}
            setShowModal={setShowModal}
            enabledCurrencies={enabledCurrencies}
          />
        ) : (
          <div className="flex justify-end">
            <Button type="button" onClick={() => setShowModal(false)}>
              Set Collect Type
            </Button>
          </div>
        )}
      </div>
    </Modal>
  </>
  )
}

export default CollectModule
