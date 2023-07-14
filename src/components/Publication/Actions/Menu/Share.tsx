import stopEventPropagation from '@/lib/stopEventPropagation';
import { Publication } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import type { FC } from 'react';
import toast from 'react-hot-toast';

interface ShareProps {
  publication: Publication;
}

const Share: FC<ShareProps> = ({ publication }) => {
  return (
    <Menu.Item
      as="div"
      className={({ active }) =>
        clsx(
          { 'dropdown-active': active },
          'm-2 block cursor-pointer rounded-lg px-4 py-1.5 text-sm'
        )
      }
      onClick={async (event:any) => {
        stopEventPropagation(event);
        await navigator.clipboard.writeText(
          `${location.origin}/post/${publication?.id}`
        );
        toast.success(`Copied to clipboard!`);
      }}
    >
      <div className="flex items-center space-x-2">
        <ClipboardIcon className="h-4 w-4" />
        <div>Share</div>
      </div>
    </Menu.Item>
  );
};

export default Share;
