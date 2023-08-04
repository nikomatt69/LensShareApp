import { Menu } from '@headlessui/react';

import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment } from 'react';
import { useAppStore } from 'src/store/app';

import CopyPostText from './CopyPostText';
import Delete from './Delete';

import Report from './Report';
import Share from './Share';
import Translate from './Translate';
import { Publication } from '@/utils/lens/generatedLenster';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { BiDotsVertical } from 'react-icons/bi';
import MenuTransition from '@/components/UI/MenuTransition';

interface PublicationMenuProps {
  publication: Publication;
}

const PublicationMenu: FC<PublicationMenuProps> = ({ publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const iconClassName = 'w-[15px] sm:w-[18px]';

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Fragment}>
        <button
          className="rounded-full p-1.5 hover:bg-gray-300/20"
          onClick={stopEventPropagation}
          aria-label="More"
          data-testid={`publication-${publication.id}-menu`}
        >
          <BiDotsVertical className={clsx('lt-text-gray-500', iconClassName)} />
        </button>
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          static
          className="absolute right-0 cursor-pointer z-[5] mt-1 w-max rounded-xl border bg-white dark:bg-gray-900/70 shadow-sm focus:outline-none dark:border-gray-700 dark:bg-gray-300"
          data-testid={`publication-${publication.id}-menu-items`}
        >
          {currentProfile?.id === publication?.profile?.id ? (
            <Delete publication={publication} />
          ) : (
            <Report publication={publication} />
          )}

          <Share publication={publication} />
          <Translate publication={publication} />
          <CopyPostText publication={publication} />
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

export default PublicationMenu;
