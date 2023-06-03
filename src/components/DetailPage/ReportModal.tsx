import ReportPublication from '@/components/ReportPublication'
import {Modal} from '@/components/UI/Modal'

import type { Publication } from '@/types/lens'
import type { FC } from 'react'
import React from 'react'
import { Card } from '../UI/Card'


type Props = {
 publication: Publication
  showReport: boolean
  setShowReport: React.Dispatch<boolean>


}

const ReportModal: FC<Props> = ({ showReport, setShowReport, publication }) => {
     

  return (
    <Modal
      title={`Report Publication`}
      onClose={() => setShowReport(false)}
      show={showReport}
      
    >
      <div className="text-center">
        <Card>
      <div className="mt-2 block ">
        <ReportPublication
          publication={publication}
          onSuccess={() => setShowReport(!showReport)}
          
        />
      </div>
      </Card>
      </div>
    </Modal>
  )
}

export default ReportModal
