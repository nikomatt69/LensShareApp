import ReportPublication from '@/components/ReportPublication'
import {Modal} from '@/components/UI/Modal'

import type { Publication } from '@/utils/lens'
import type { FC } from 'react'
import React from 'react'


type Props = {
  video: Publication
  show: boolean
  setShowReport: React.Dispatch<boolean>

}

const ReportModal: FC<Props> = ({ show, setShowReport, video }) => {
  return (
    <Modal
      title={`Report Publication`}
      onClose={() => setShowReport(false)}
      show={show}
      
    >
      <div className="mt-2">
        <ReportPublication
          publication={video}
          onSuccess={() => setShowReport(false)}
        />
      </div>
    </Modal>
  )
}

export default ReportModal
