import logo from '@/images/Lenstoknewlogo3.png';
import Link from 'next/link';
import { Image } from '@/components/UI/Image';
import { useState, type FC, useEffect } from 'react';
import { useAppStore } from 'src/store/app';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
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
import MeetingIcon from './Messages/MeetingIcon';

import { Profile } from '@/utils/lens/generatedLenster';
import { ProfileFeedType } from '@/enums';
import StreamOutline from './UI/Icons/StreamOutline';
import { STATIC_ASSETS_URL } from '@/constants';
import { useTheme } from 'next-themes';


const Navbar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { id } = router.query;
  const profilePic = currentProfile?.picture;
  console.log('CURRENT PROFILE', currentProfile?.picture);


  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)

  const { resolvedTheme } = useTheme();
  
  const handleScroll = () => {
      const currentScrollPos = window.scrollY
  
      if(currentScrollPos > prevScrollPos){
          setVisible(false)
      }else{
          setVisible(true)
      }
  
      setPrevScrollPos(currentScrollPos)
  }
  
  useEffect( () => {
      window.addEventListener('scroll', handleScroll);
  
      return () => window.removeEventListener('scroll', handleScroll)
  })
  

  return (
    <div className={`flex w-full z-10 items-center justify-between  border-2 rounded-t-sm rounded-xl border-b border-t-0 border-l border-r border-blue-700 bg-white/70 dark:bg-gray-900/70  p-2  sticky ${visible ? 'top-0' : ''} `}>

      <Link href="/discover">
        <button
          className="text-md text-md flex cursor-pointer items-center gap-2 rounded-full   border-[#57B8FF] px-2 py-2 
         pt-3 font-semibold text-blue-500 hover:bg-[#57B8FF] md:px-4"
        >
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
           
          />) : (<Image
            className="cursor-pointer"
            src={`${STATIC_ASSETS_URL}/images/Lenstoknewlogo.png`}
            alt="logo"
           
          />)}
        </div>
      </Link>
      
      <div>
        <div className="centre-item flex gap-5 pl-2 md:gap-10 ">
          <button>
            <NotificationIcon />
          </button>

      
          <div className="flex">
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
      </div>
  );
};

export default Navbar;
