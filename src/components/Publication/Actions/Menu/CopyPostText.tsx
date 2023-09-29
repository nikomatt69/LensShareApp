import stopEventPropagation from '@/lib/stopEventPropagation';
import { Publication } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

import cn from '@/components/UI/cn';
import type { FC } from 'react';
import toast from 'react-hot-toast';

interface CopyPostTextProps {
  publication: Publication;
}

const CopyPostText: FC<CopyPostTextProps> = ({ publication }) => {
  const isMirror = publication.__typename === 'Mirror';
  const publicationType = isMirror
    ? publication.mirrorOf.__typename
    : publication.__typename;

  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        cn(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm'
        )
      }
      onClick={async (event: any) => {
        stopEventPropagation(event);
        await navigator.clipboard.writeText(
          publication?.metadata?.content || ''
        );
        toast.success(`Copied to clipboard!`);
      }}
    >
      <div className="flex items-center space-x-2">
        <ClipboardIcon className="h-4 w-4" />
        <div>
          {publicationType === 'Comment'
            ? 'Copy comment text'
            : 'Copy post text'}
        </div>
      </div>
    </Menu.Item>
  );
};

export default CopyPostText;
