import MetaTags from '@/components/UI/MetaTags';
import { Button } from '@/components/UI/Button';
import type { Publication } from '@/utils/lens/generatedLenster';
import { useReportPublicationMutation } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import type { CustomErrorWithData } from '@/utils/custom-types';
import { APP_NAME, ERROR_MESSAGE } from '@/constants';
import { topics } from '@/utils/const';

type Props = {
  publication: Publication;
  onSuccess: () => void;
};

const ReportPublication: FC<Props> = ({ publication, onSuccess }) => {
  const [reason, setReason] = useState('ILLEGAL');

  const [createReport, { loading: reporting }] = useReportPublicationMutation({
    onError: (error: CustomErrorWithData) => {
      toast.error(error?.data?.message ?? error?.message ?? ERROR_MESSAGE);
    },
    onCompleted: () => {
      toast.success(`Publication reported successfully.`);
      onSuccess();
    }
  });

  const getReasonType = (type: string) => {
    if (type === 'ILLEGAL') {
      return 'illegalReason';
    }
    if (type === 'FRAUD') {
      return 'fraudReason';
    }
    if (type === 'SENSITIVE') {
      return 'sensitiveReason';
    }
    if (type === 'SPAM') {
      return 'spamReason';
    }
    return 'illegalReason';
  };

  const onReport = () => {
    const type = reason.split('-')[0];
    const subReason = reason.split('-')[1];
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
    });
  };

  return (
    <>
      <MetaTags title={`Report Publication • ${APP_NAME}`} />
      <div className="flex justify-center">
        <div className="w-full">
          <div className="p-2 opacity-60">
            <h1>{publication.metadata.name}</h1>
            <span className="pl-2 text-sm">by {publication.profile.id}</span>
          </div>
          <div className="mt-4">
            <label
              className="block text-xs font-semibold uppercase opacity-70"
              htmlFor="report"
            >
              Reason
            </label>
            <div className="mt-1">
              <select className="text-md cursor-pointer rounded border-2 border-gray-200 p-2 capitalize outline-none lg:p-4">
                {topics.map((topic) => (
                  <option
                    key={topic.name}
                    className="text-md bg-white dark:bg-gray-900/70 p-2 capitalize text-gray-700 outline-none hover:bg-slate-300"
                    value={topic.name}
                  >
                    {topic.name}
                  </option>
                ))}
                ;
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
  );
};

export default ReportPublication;
