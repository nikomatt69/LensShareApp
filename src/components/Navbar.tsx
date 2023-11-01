import logo from '@/images/Lenstoknewlogo3.png';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import { useState, type FC, useEffect } from 'react';
import { useAppStore } from 'src/store/app';

import { MagnifyingGlassIcon, VideoCameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
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
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon
} from '@heroicons/react/24/solid';
import { Cog6ToothIcon, MusicalNoteIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/outline';
import SearchBarDiscover from './Search/SearchBarDiscover';
import { FaHeadphones } from 'react-icons/fa';
import { FcVideoCall } from 'react-icons/fc';
import MainButton from './Buttons/Rainbow/mainbutton';
import router from 'next/router';
import NotificationIcon from './Notifications/NotificationIcon';

import { Profile } from '@/utils/lens/generatedLenster';
import { ProfileFeedType } from '@/enums';
import StreamOutline from './UI/Icons/StreamOutline';
import { STATIC_ASSETS_URL } from '@/constants';
import { useTheme } from 'next-themes';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import sanitizeIpfsUrl from '@/utils/sanitizeIpfsUrl';
import Search from './HomePage/Search';

const Navbar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { id } = router.query;
  const profilePic = currentProfile?.picture;
  console.log('CURRENT PROFILE', currentProfile?.picture);
  const [showSearch, setShowSearch] = useState(false);

  const onProfileSelected = (profile: Profile) => {
    router.push(`/u/${(profile?.id)}`);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const { resolvedTheme } = useTheme();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header>
    <div
      className={`sticky z-10 flex h-[50px] w-full items-center justify-between rounded-md rounded-t-sm border-2 border-b  border-t-0 border-blue-700 bg-white/70  p-2  dark:bg-gray-900/70 ${
        visible ? 'top-0' : ''
      } `}
    >
      <button
              className="inline-flex items-center justify-center mr-1 rounded-md text-gray-500 focus:outline-none md:hidden"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? (
                <XMarkIcon className="h-6 w-6 text-blue-700" />
              ) : (
                <MagnifyingGlassIcon className="h-6 w-6 text-blue-700" />
              )}
            </button>
      {/* //discover page */}
      <SearchBar />
      {/* //home */}
      <Link href="/">
        <div className="w-[100px] md:w-[129px]">
          {resolvedTheme === 'dark' ? (
            <Image
              className="cursor-pointer"
              src={`${STATIC_ASSETS_URL}/images/Lenstoknewlogo3.png`}
              alt="logo"
            />
          ) : (
            <Image
              className="cursor-pointer"
              src={`${STATIC_ASSETS_URL}/images/Lenstoknewlogo.png`}
              alt="logo"
            />
          )}
        </div>
      </Link>

      <div>
        <div className="centre-item flex gap-5 pl-2 md:gap-10 ">
          <button>
            <NotificationIcon />
          </button>

          <div className="block">
            <MainButton />
          </div>
        </div>
      </div>
     
    </div>
    
    {showSearch ? (
      <div className="m-3 md:hidden">
        <Search hideDropdown onProfileSelected={onProfileSelected} />
      </div>
    ) : null}
    </header>
  );
};

export default Navbar;
