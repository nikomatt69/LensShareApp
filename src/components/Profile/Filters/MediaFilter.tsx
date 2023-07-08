
import { Checkbox } from '@/components/UI/Checkbox';
import MenuTransition from '@/components/UI/MenuTransition';
import { Tooltip } from '@/components/UI/Tooltip';
import { useProfileFeedStore } from '@/store/profile-feed';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import type { ChangeEvent } from 'react';
import { HiAdjustments } from 'react-icons/hi';


const MediaFilter = () => {
  const mediaFeedFilters = useProfileFeedStore(
    (state) => state.mediaFeedFilters
  );
  const setMediaFeedFilters = useProfileFeedStore(
    (state) => state.setMediaFeedFilters
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMediaFeedFilters({
      ...mediaFeedFilters,
      [e.target.name]: e.target.checked
    });
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="rounded-md hover:bg-gray-300/20">
        <Tooltip placement="top" content={`Filter`}>
          <HiAdjustments className="text-brand h-5 w-5" />
        </Tooltip>
      </Menu.Button>
      <MenuTransition>
        <Menu.Items
          static
          className="absolute right-0 z-[5] mt-1 rounded-xl border bg-white py-1 shadow-sm focus:outline-none dark:border-gray-700 "
        >
          <Menu.Item
            as="label"
            className={({ active }) =>
              clsx(
                { 'dropdown-active': active },
                'menu-item flex cursor-pointer items-center gap-1 space-x-1 rounded-lg'
              )
            }
          >
            <Checkbox
              onChange={handleChange}
              checked={mediaFeedFilters.images}
              name="images"
              label={`Images`}
            />
          </Menu.Item>
          <Menu.Item
            as="label"
            className={({ active }) =>
              clsx(
                { 'dropdown-active': active },
                'menu-item flex cursor-pointer items-center gap-1 space-x-1 rounded-lg'
              )
            }
          >
            <Checkbox
              onChange={handleChange}
              checked={mediaFeedFilters.video}
              name="video"
              label={`Video`}
            />
          </Menu.Item>
          <Menu.Item
            as="label"
            className={({ active }) =>
              clsx(
                { 'dropdown-active': active },
                'menu-item flex cursor-pointer items-center gap-1 space-x-1 rounded-lg'
              )
            }
          >
            <Checkbox
              onChange={handleChange}
              checked={mediaFeedFilters.audio}
              name="audio"
              label={`Audio`}
            />
          </Menu.Item>
        </Menu.Items>
      </MenuTransition>
    </Menu>
  );
};

export default MediaFilter;
