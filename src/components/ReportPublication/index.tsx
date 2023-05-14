import MetaTags from '@/components/UI/MetaTags'
import { Button } from '@/components/UI/Button'
import type { Publication } from '@/utils/lens'
import { useReportPublicationMutation } from '@/utils/lens'
import type { FC } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import type { CustomErrorWithData } from '@/utils/custom-types'
import { APP_NAME, ERROR_MESSAGE} from '@/constants'



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
                onChange={(e) => handleChange(e)}
                value={reason}
                name="report"
                className="w-full rounded-xl border border-gray-200 bg-white p-2.5 text-sm outline-none disabled:bg-blue-500 disabled:bg-opacity-20 disabled:opacity-6"
                id="report"
              >
                <optgroup label="SPAM">
                  <option value="SPAM-FAKE_ENGAGEMENT">
                    Fake Engagement
                  </option>
                  <option value="SPAM-MANIPULATION_ALGO">
                    Algorithm Manipulation
                  </option>
                  <option value="SPAM-MISLEADING">
                    Misleading
                  </option>
                  <option value="SPAM-MISUSE_HASHTAGS">
                    Misuse Hashtags
                  </option>
                  <option value="SPAM-REPETITIVE">
                    Repetitive
                  </option>
                  <option value="SPAM-UNRELATED">
                    Unrelated
                  </option>
                  <option value="SPAM-SOMETHING_ELSE">
                    Something Else
                  </option>
                  <option value="ILLEGAL-ANIMAL_ABUSE">
                    Animal Abuse
                  </option>
                  <option value="ILLEGAL-HUMAN_ABUSE">
                    Human Abuse
                  </option>
                  <option value="ILLEGAL-DIRECT_THREAT">
                    Direct threat
                  </option>
                  <option value="ILLEGAL-THREAT_INDIVIDUAL">
                    Threat Individual
                  </option>
                  <option value="ILLEGAL-VIOLENCE">
                    Violence
                  </option>
                  <option value="FRAUD-SCAM">
                    Scam
                  </option>
                  <option value="FRAUD-IMPERSONATION">
                    Impersonation
                  </option>
                  <option value="SENSITIVE-NSFW">
                    NSFW
                  </option>
                  <option value="SENSITIVE-OFFENSIVE">
                    Offensive
                  </option>
                </optgroup>
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
