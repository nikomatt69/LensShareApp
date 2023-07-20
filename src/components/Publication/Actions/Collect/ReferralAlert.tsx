
import Slug from '@/components/UI/Slug';
import formatHandle from '@/utils/functions/formatHandle';
import { ElectedMirror, Publication } from '@/utils/lens/generatedLenster';
import { HeartIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';

interface ReferralAlertProps {
  mirror: Publication;
  referralFee?: number;
  electedMirror?: ElectedMirror;
}

const ReferralAlert: FC<ReferralAlertProps> = ({
  mirror,
  electedMirror,
  referralFee = 0
}) => {
  if ((mirror.__typename !== 'Mirror' && !electedMirror) || referralFee === 0) {
    return null;
  }
  const publication = electedMirror ?? mirror;

  return (
    <div className="lt-text-gray-500 flex items-center space-x-1.5 pt-1 text-sm">
      <HeartIcon className="h-4 w-4 text-pink-500" />
      <Slug slug={formatHandle(publication?.profile?.handle)} prefix="@" />
      <span>
        {' '}
        
          will get <b>{referralFee}%</b> referral fee
       
      </span>
    </div>
  );
};

export default ReferralAlert;
