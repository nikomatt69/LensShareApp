import logo from '@/images/icon.png';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import type { FC } from 'react';
import { useAppStore } from 'src/store/app';

import { VideoCameraIcon } from '@heroicons/react/24/outline';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import LoginButtonMobile from './Login/LoginButtonMobile';
import SearchBar from './Search/SearchBar';
import getAvatar from '@/lib/getAvatar';
import { Menu } from '@headlessui/react';
import MenuTransition from './UI/MenuTransition';
import { NextLink2 } from './UI/NextLink2';

import MessageIcon from './Messages/MessageIcon';
import {
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/solid';
import { Cog6ToothIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/outline';
import router from 'next/router';
import { FaHeadphones } from 'react-icons/fa';
import { ConnectKitButton } from 'connectkit';
import MainButton from './Buttons/Rainbow/mainbutton';
import NotificationIcon from './Notifications/NotificationIcon';
import sanitizeIpfsUrl from '@/utils/sanitizeIpfsUrl';

const Navbar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const profilePic = currentProfile?.picture;
  console.log('CURRENT PROFILE', currentProfile?.picture);

  return (
    <div className="flex w-full items-center justify-between rounded-lg border-4 border-blue-500 bg-white dark:bg-gray-900/70 bg-gradient-to-b  from-blue-100 to-transparent p-2 ">
      <button
        onClick={() => router.back()}
        className="w-6px h-6px flex items-center justify-center rounded-md text-black dark:text-white"
      >
        <ArrowLeftIcon className="h-6 w-6 cursor-pointer fill-blue-500" />
      </button>
      <SearchBar />
      <Link href="/discover">
        <button className="border-gray-800 text-blue-500 hover:text-gray-100 focus:text-gray-100 focus:outline-none lg:hidden xl:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </Link>

      <div className="centre-item flex gap-5 pl-2 md:gap-10 ">
        <button>
          <NotificationIcon />
        </button>
        <div className="pl-full centre-item flex gap-5 md:gap-10 ">
          {currentProfile ? (
            <div className="h-12 w-12">
              <Link href={`/u/${currentProfile.id}`} key={currentProfile.id}>
                {profilePic?.__typename === 'MediaSet' ? (
                  profilePic.original?.url.includes('ipfs') ? (
                    <Image
                      src={sanitizeIpfsUrl(profilePic?.original.url)}
                      width={40}
                      height={40}
                      className="cursor-pointer rounded-full"
                      alt={currentProfile.id.handle}
                     
                    />
                  ) : (
                    <Image
                      src={profilePic?.original.url}
                      width={40}
                      height={40}
                      className="cursor-pointer rounded-full"
                      alt={currentProfile.id.handle}
                  
                    />
                  )
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-900" />
                )}
              </Link>
            </div>
          ) : (
            <div className="block">
              <MainButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
