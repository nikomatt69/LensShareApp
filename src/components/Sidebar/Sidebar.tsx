import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { AiFillHome, AiOutlineMenu, AiFillCalendar } from "react-icons/ai";
import { RiLiveLine } from "react-icons/ri"
import Link from "next/link";
import { useRouter } from "next/router";

import SuggestedAccounts from "@/components/Sidebar/SuggestedAccounts";
import FollowingAccounts from "@/components/Sidebar/FollowingAccounts";
import Footer from "./Footer";
import LoginButton from "@/components/Login/LoginButton";
import { useAppStore } from '@/store/app';

import ButtonTest from "@/components/Login/ButtonTest";
import Categories from "@/components/Sidebar/Categories";

const Sidebar = () => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  const [showSidebar, setShowSidebar] = useState(true);
  const { pathname } = useRouter();

  const userProfile = false;

  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start cursor-pointer font-semibold text-[#57B8FF] rounded";

  const normalLink =
  'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start curser-pointer font-semibold text-[#000000] rounded';

  return (
    <div>
      <div
        className="block lg:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="lg:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
        <div className="lg:border-b-2 border-gray-200 xl:pb-4">
            <Link href="/">
            <div className={pathname === '/' ? activeLink : normalLink}>
                    <p className="text-2xl">
                        <AiFillHome />
                    </p>
                <a className="text-md hidden lg:block cursor-pointer">For You</a>
              </div>
            </Link>
            <Link href="/latest">
            <div className={pathname === '/latest' ? activeLink : normalLink}>
                <p className="text-2xl">
                  <AiFillCalendar />
                </p>
                <a className="text-md hidden lg:block cursor-pointer">
                  Latest
                </a>
              </div>
            </Link>
            <Link href="/live">
            <div className={pathname === '/live' ? activeLink : normalLink}>
                <p className="text-2xl">
                <RiLiveLine />
                </p>
                <a className="text-md hidden lg:block cursor-pointer">
                  LIVE
                </a>
              </div>
            </Link>
          </div>
            <div className="px-2 py-4 hidden lg:block">
              <p className="text-gray-400">
                Log in to like and comment on videos
              </p>
              {/* <LoginButton /> */}
              <ButtonTest/>
            </div>
          <SuggestedAccounts />
          {currentProfile ? (
            <FollowingAccounts />
          ) : (
            null) 
          }
       
          <Categories />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;