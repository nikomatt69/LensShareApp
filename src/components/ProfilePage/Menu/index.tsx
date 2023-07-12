import MenuTransition from '@/components/UI/MenuTransition';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import type { Publication } from '@/utils/lens/generatedLenster';
import stopEventPropagation from '@/lib/stopEventPropagation';
import type { FC } from 'react';
import { Fragment } from 'react';
import { useAppStore } from 'src/store/app';

import { BiDotsVertical } from 'react-icons/bi';
import Delete from '@/components/Publication/Actions/Menu/Delete';

interface Props {
  publication: Publication;
}

const PublicationMenu: FC<Props> = ({ publication }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const iconClassName = 'w-[15px] sm:w-[18px]';

  return (
    <Menu as="div" className="relative right-2">
      <Menu.Button as={Fragment}>
        <button
          className="rounded-full p-1.5 hover:bg-gray-300/20"
          onClick={stopEventPropagation}
          aria-label="More"
        >
          <BiDotsVertical
            className={clsx('lt-text-gray-500 right-2', iconClassName)}
          />
        </button>
      </Menu.Button>
      <MenuTransition>
        <Menu.Item>
          <div className="absolute right-0 z-[5] mt-1 w-max rounded-xl border bg-white shadow-sm focus:outline-none">
            {currentProfile?.id === publication?.profile?.id ? (
              <Delete publication={publication} />
            ) : (
              <Delete publication={publication} />
            )}
          </div>
        </Menu.Item>
      </MenuTransition>
    </Menu>
  );
};

export default PublicationMenu;
