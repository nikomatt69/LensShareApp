import logo from "@/images/Lenstoknewlogo.png";
import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";
import { useAppStore } from "src/store/app";
import  {sanitizeIpfsUrl}  from '@/utils/sanitizeIpfsUrl';
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import LoginButtonMobile from "./Login/LoginButtonMobile";
import SearchBar from "./Search/SearchBar";
import getAvatar from "@/lib/getAvatar";
import { Menu } from "@headlessui/react";
import MenuTransition from "./UI/MenuTransition";
import { NextLink2 } from "./UI/NextLink2";

import MessageIcon from "./Messages/MessageIcon";
import { ChatBubbleLeftEllipsisIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import SearchBarDiscover from "./Search/SearchBarDiscover";
import { FaHeadphones } from "react-icons/fa";
import { FcVideoCall } from "react-icons/fc";
import MainButton from "./Buttons/Rainbow/mainbutton";
import router from "next/router";
import NotificationIcon from "./Notifications/NotificationIcon";








const Navbar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const { id } = router.query
  const profilePic = currentProfile?.picture
  console.log('CURRENT PROFILE', currentProfile?.picture)
  
  return (
    <div className="w-full flex justify-between bg-black rounded-lg bg-gradient-to-b from-gray-900 to-transparent items-center  border-4 border-blue-500 p-2 ">
       <Link href='/discover'>
     <button className='flex px-2 pt-3 py-2 md:px-4 text-md font-semibold   items-center gap-2 cursor-pointer 
         rounded-full text-md border-[#57B8FF] text-blue-500 hover:bg-[#57B8FF]' >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      </Link>
      {/* //discover page */}
    <SearchBar />
     {/* //home */}
     <Link href="/">
        <div className="w-[100px] md:w-[129px]">
          <Image
            className="cursor-pointer"
            src={logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>
    <div>
     <div className='flex pl-2 centre-item gap-5 md:gap-10 '>
    

    
       
        <button>
        <NotificationIcon/>


        </button>
      <div className="flex">
        {currentProfile ? (
           <div className='w-12 h-12'>
          <Link href={`/u/${currentProfile.id}`} key={currentProfile.id}>
            { profilePic?.__typename === "MediaSet" ? (
              profilePic.original?.url.includes("ipfs") ? (
                    <Image
                    src={sanitizeIpfsUrl(profilePic?.original.url)}
                    width={40}
                    height={40}
                    className='rounded-full cursor-pointer'
                    alt={currentProfile.id.handle}
                    layout='responsive'
                    />
                    ) : (
                      <Image
                      src={profilePic?.original.url}
                      width={40}
                      height={40}
                      className='rounded-full cursor-pointer'
                      alt={currentProfile.id.handle}
                      layout='responsive'
                      />
                    )
                    ) : <div className="bg-blue-900 w-8 h-8 rounded-full" />}
           </Link>
             </div>
        ) : (
          <div className='block'>
            <MainButton/>
          </div>
        )}
        </div>
      </div>
     </div>
    </div>
  );
};

export default Navbar;

