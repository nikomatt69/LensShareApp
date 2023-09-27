import stopEventPropagation from '@/lib/stopEventPropagation';
import { Publication } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

import cn from '@/components/UI/cn';
import type { FC } from 'react';
import { useGlobalModalStateStore } from 'src/store/modals';

interface ReportProps {
  publication: Publication;
}

const Report: FC<ReportProps> = ({ publication }) => {
  const setShowPublicationReportModal = useGlobalModalStateStore(
    (state) => state.setShowPublicationReportModal
  );

  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        cn(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm text-red-500'
        )
      }
      onClick={(event:any) => {
        stopEventPropagation(event);
        setShowPublicationReportModal(true, publication);
      }}
    >
      <div className="flex items-center space-x-2">
        <ShieldExclamationIcon className="h-4 w-4" />
        <div>Report Post</div>
      </div>
    </Menu.Item>
  );
};

export default Report;
