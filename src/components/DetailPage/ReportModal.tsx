import ReportPublication from '@/components/ReportPublication'
import {Modal} from '@/components/UI/Modal'

import type { Publication } from '@/utils/lens'
import type { FC } from 'react'
import React from 'react'
import { Card } from '../UI/Card'


type Props = {
  video: Publication
  show: boolean
  setShowReport: React.Dispatch<boolean>

}

const ReportModal: FC<Props> = ({ show, setShowReport, video }) => {
  return (
    <Modal
      title={`Report Publication`}
      onClose={() => setShowReport(true)}
      show={show}
      
    >
      <div className="text-center">
        <Card>
      <div className="mt-2 block ">
        <ReportPublication
          publication={video}
          onSuccess={() => setShowReport(false)}
        />
      </div>
      </Card>
      </div>
    </Modal>
  )
}

export default ReportModal
