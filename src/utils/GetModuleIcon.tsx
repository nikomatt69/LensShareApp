import {
  CollectModules,
  FollowModules,
  ReferenceModules
} from '@/utils/lens/generatedLenster';
import {
  ClockIcon,
  PlusCircleIcon,
  ReceiptRefundIcon,
  ShareIcon,
  StarIcon,
  DocumentPlusIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import type { FC } from 'react';

interface Props {
  module: string;
  size: number;
}

const GetModuleIcon: FC<Props> = ({ module, size }) => {
  switch (module) {
    case CollectModules.FeeCollectModule:
      return <CurrencyDollarIcon className={`h-${size}`} />;
    case CollectModules.LimitedFeeCollectModule:
      return (
        <div className="flex items-center gap-1">
          <StarIcon className={`h-${size}`} />
          <CurrencyDollarIcon className={`h-${size}`} />
        </div>
      );
    case CollectModules.LimitedTimedFeeCollectModule:
      return (
        <div className="flex items-center gap-1">
          <StarIcon className={`h-${size}`} />
          <ClockIcon className={`h-${size}`} />
          <CurrencyDollarIcon className={`h-${size}`} />
        </div>
      );
    case CollectModules.TimedFeeCollectModule:
      return (
        <div className="flex items-center gap-1">
          <ClockIcon className={`h-${size}`} />
          <CurrencyDollarIcon className={`h-${size}`} />
        </div>
      );
    case CollectModules.RevertCollectModule:
      return <ReceiptRefundIcon className={`h-${size}`} />;
    case CollectModules.FreeCollectModule:
      return <DocumentPlusIcon className={`h-${size}`} />;
    case FollowModules.FeeFollowModule:
      return (
        <div className="flex items-center gap-1">
          <CurrencyDollarIcon className={`h-${size}`} />
          <PlusCircleIcon className={`h-${size}`} />
        </div>
      );
    case ReferenceModules.FollowerOnlyReferenceModule:
      return (
        <div className="flex items-center gap-1">
          <PlusCircleIcon className={`h-${size}`} />
          <ShareIcon className={`h-${size}`} />
        </div>
      );
    default:
      return <CurrencyDollarIcon className={`h-${size}`} />;
  }
};

export default GetModuleIcon;
