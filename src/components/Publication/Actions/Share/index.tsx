import clsx from 'clsx';
import type { FC } from 'react';
import { Fragment, useState } from 'react';

import Mirror from './Mirror';
import Quote from './Quote';
import { Publication } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Spinner } from '@/components/UI/Spinner';
import { Tooltip } from '@/components/UI/Tooltip';
import humanize from '@/lib/humanize';

import MenuTransition from '@/components/UI/MenuTransition';
import nFormatter from '@/lib/nFormatter';
import MirrorOutline from '@/components/UI/Icons/MirrorOutline';

interface PublicationMenuProps {
  publication: Publication;
  showCount: boolean;
}

const ShareMenu: FC<PublicationMenuProps> = ({ publication, showCount }) => {
  const [isLoading, setIsLoading] = useState(false);

  const isMirror = publication.__typename === 'Mirror';
  const count = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;
  const mirrored = isMirror
    ? publication?.mirrorOf?.mirrors?.length > 0
    : // @ts-expect-error
      publication?.mirrors?.length > 0;
      const iconClassName = showCount
      ? 'w-[17px] sm:w-[20px] pt-1.5 '
      : 'w-[15px] sm:w-[18px] pt-1.5';

  return (
    <div className="flex items-center space-x-1">
      <Menu as="div" className="relative">
        <Menu.Button as={Fragment}>
          <button
            className={clsx(
              mirrored ? 'text-green-500' : 'text-brand',
              'rounded-full  hover:bg-gray-300/20'
            )}
            onClick={stopEventPropagation}
            aria-label="Mirror"
          >
            {isLoading ? (
              <Spinner
                variant={mirrored ? 'success' : 'primary'}
                size="xs"
                className="mr-0.5"
              />
            ) : (
              <Tooltip
                placement="top"
                content={count > 0 ? `${humanize(count)} Mirrors` : `Mirror`}
                withDelay
              >
                <MirrorOutline className={iconClassName} />
              </Tooltip>
            )}
          </button>
        </Menu.Button>
        <MenuTransition>
          <Menu.Items
            className="absolute z-[5] mt-1 w-max rounded-xl border bg-white dark:bg-gray-900/70 shadow-sm focus:outline-none dark:border-gray-700"
            static
          >
            <Mirror
              publication={publication}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
            <Quote publication={publication} />
          </Menu.Items>
        </MenuTransition>
      </Menu>
      {count > 0 && !showCount && (
        <span
          className={clsx(
            mirrored ? 'text-green-500' : 'text-brand',
            'text-[11px] sm:text-xs'
          )}
        >
          {nFormatter(count)}
        </span>
      )}
    </div>
  );
};

export default ShareMenu;
