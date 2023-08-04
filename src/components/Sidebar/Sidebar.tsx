import { useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { AiFillHome, AiOutlineMenu, AiFillCalendar } from 'react-icons/ai';
import { RiLiveLine } from 'react-icons/ri';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SuggestedAccounts from '@/components/Sidebar/SuggestedAccounts';
import FollowingAccounts from '@/components/Sidebar/FollowingAccounts';
import Footer from './Footer';
import LoginButton from '@/components/Login/LoginButton';
import { useAppStore } from '@/store/app';

import ButtonTest from '@/components/Login/ButtonTest';
import Categories from '@/components/Sidebar/Categories';

const Sidebar = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showSidebar, setShowSidebar] = useState(true);
  const { pathname } = useRouter();

  const userProfile = false;

  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start cursor-pointer font-semibold text-[#57B8FF] rounded';

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start curser-pointer font-semibold text-black dark:text-white rounded';

  return (
    <div className='hidden lg:block'>
      <div
        className="m-2 ml-4 mt-3 block text-xl lg:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 lg:w-400 xl:border-0">
          <div className="items-center border-gray-200 object-center text-center lg:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={pathname === '/' ? activeLink : normalLink}>
                <a className="text-md hidden dark:text-white cursor-pointer lg:block">Feed</a>
              </div>
            </Link>
            <Link legacyBehavior href="/latest">
              <div className={pathname === '/latest' ? activeLink : normalLink}>
                <span className="text-md dark:text-white hidden cursor-pointer lg:block">
                  Latest
                </span>
              </div>
            </Link>
          </div>
          <div className="hidden px-2 py-4 lg:block">
            <p className="text-gray-400">
              Log in to like and comment on videos
            </p>
            {/* <LoginButton /> */}
            <ButtonTest />
          </div>
          <SuggestedAccounts />
          {currentProfile ? <FollowingAccounts /> : null}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
