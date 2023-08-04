import Link from 'next/link';

import { useAppStore } from 'src/store/app';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import ButtonTest from '../Login/ButtonTest';
import LoginWalletMobile from '../Login/LoginWalletMobile';
import {
  ChatBubbleLeftIcon,
  VideoCameraIcon,
  ChatBubbleOvalLeftIcon,
  FilmIcon,
  BellIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline';
import router from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MdVideoLibrary } from 'react-icons/md';
import MessageIcon from '../Messages/MessageIcon';

const BottomNav: React.FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [homePage, setHomePage] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true)
  
 

  return (
    <div>

      <nav className="z-999 fixed bottom-0 left-0 right-0 z-[5] m-auto flex h-[70px] items-center justify-around overflow-hidden rounded-lg  border-2 border-b-0 border-l border-r border-t border-blue-700 bg-white dark:bg-gray-800/70 px-4 py-3 lg:w-[1100px] xl:w-[1200px]">
        {/* //swap timelines */}
        {homePage ? (
          <Link href="/">
            <button
              onClick={() => {
                {
                  setHomePage(false);
                }
              }}
              className="border-gray-800 text-blue-500 hover:text-gray-100 focus:text-gray-100 focus:outline-none"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </button>
          </Link>
        ) : (
          <Link href="/">
            <button
              onClick={() => {
                {
                  setHomePage(true);
                }
              }}
              className="border-gray-800 text-blue-500 hover:text-gray-100 focus:text-gray-100 focus:outline-none"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
            </button>
          </Link>
        )}
        <div>
          {/* //feed */}
          <Link href="/feed">
            <MdVideoLibrary className="h-6 w-6 pb-1 text-blue-500" />{' '}
          </Link>
        </div>
        <div>
          {/* //latest */}
          <Link href="/latest">
            <FilmIcon className="h-6 w-6 pb-1 text-blue-500" />{' '}
          </Link>
        </div>

        {/* //upload */}

        <div>
          {/* //listen */}
          <Link href="/listen">
            <MusicalNoteIcon className="h-6 w-6 pb-1 text-blue-500" />{' '}
          </Link>
        </div>

        <div>
          {/* //messages */}
          <MessageIcon />
        </div>
        {/* //log into lens & profile page */}
        {currentProfile ? (
          <Link href={`/u/${currentProfile.id}`} key={currentProfile.id}>
            <button className="border-gray-800 text-blue-500 hover:text-gray-100 focus:text-gray-100 focus:outline-none">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </button>
          </Link>
        ) : (
          <LoginWalletMobile />
        )}
      </nav>
    </div>
  );
};

export default BottomNav;
