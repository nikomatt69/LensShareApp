import MetaTags from '@/components/UI/MetaTags'
import { Button } from '@/components/UI/Button'
import type { Publication } from '@/utils/lens'
import { useReportPublicationMutation } from '@/utils/lens'
import type { FC } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import type { CustomErrorWithData } from '@/utils/custom-types'
import { APP_NAME, ERROR_MESSAGE} from '@/constants'
import { topics } from "@/utils/const";



type Props = {
  publication: Publication
  onSuccess: () => void
}

const ReportPublication: FC<Props> = ({ publication, onSuccess }) => {
  const [reason, setReason] = useState('ILLEGAL')

  const [createReport, { loading: reporting }] = useReportPublicationMutation({
    onError: (error: CustomErrorWithData) => {
      toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE)
    },
    onCompleted: () => {
      toast.success(`Publication reported successfully.`)
      onSuccess()
     
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
          publicationId: publication.id,
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReason(e.target.value)
  }

  function setCategory(value: string): void {
    throw new Error('Function not implemented.')
  }

  return (
    <>
     <MetaTags title={`Report Publication • ${APP_NAME}`} />
     <div className="flex justify-center">
        <div className="w-full">
          <div className="opacity-60 p-2">
            <h1>{publication.metadata.name}</h1>
            <span className="text-sm pl-2">by {publication.profile.handle}</span>
          </div>
          <div className="mt-4">
            <label
              className="block text-xs font-semibold uppercase opacity-70"
              htmlFor="report"
            >
              Reason
            </label>
            <div className="mt-1">
            <select
                  onChange={(e) => setCategory(e.target.value)}
                  className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                  >
                    {topics.map((topic) => (
                      <option
                      key={topic.name}
                      className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                      value={topic.name}
                      >
                        {topic.name}
                      </option>
                     ))};
                  </select>
            </div>
            <div className="mb-1 mt-4 flex justify-end">
              <Button loading={reporting} onClick={() => onReport()}>
                Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReportPublication
