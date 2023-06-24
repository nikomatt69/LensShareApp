import logo from "@/images/icon.png";
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
import { ArrowLeftIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import { FaHeadphones } from "react-icons/fa";
import { ConnectKitButton } from "connectkit";
import MainButton from "./Buttons/Rainbow/mainbutton";





const Navbar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const profilePic = currentProfile?.picture
  console.log('CURRENT PROFILE', currentProfile?.picture)
  
  return (
    <div className="w-full flex justify-between rounded-lg bg-black bg-gradient-to-b from-gray-900 to-transparent items-center border-4 border-blue-500 p-2 ">
      <button
            onClick={() => router.back()}
            className="text-black w-6px h-6px rounded-md flex justify-center items-center"
          >
            <ArrowLeftIcon className="w-6 h-6 fill-blue-500 cursor-pointer" />
          </button>
    <SearchBar  />
    <Link href='/discover'>
      <button className="text-blue-500 hover:text-gray-100 focus:outline-none lg:hidden xl:hidden focus:text-gray-100 border-gray-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      </Link>
 
    <div className='flex pl-2 centre-item gap-5 md:gap-10 '>
    
    <Link href='/notifications'>
        <button className='flex px-2 pt-3 py-2 md:px-4 text-md font-semibold items-center gap-2 cursor-pointer
         rounded-full text-md border-[#57B8FF] text-blue-500 hover:bg-[#57B8FF]' >
         {/*className='border-2 px-2 py-2 md:px-4 text-md font-semibold flex items-center gap-2'*/}
         <BellIcon className='h-6 text-blue-500' />{' '}
       
        </button>
        </Link> 
      <div className='flex pl-full centre-item gap-5 md:gap-10 '>
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
  );
};

export default Navbar;