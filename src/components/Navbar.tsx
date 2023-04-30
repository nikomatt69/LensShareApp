import logo from "@/images/Lenstoknewlogo.png";
import Link from "next/link";
import Image from "next/image";
import type { FC } from "react";
import { useAppStore } from "src/store/app";
import  {sanitizeIpfsUrl}  from '@/utils/sanitizeIpfsUrl';
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import LoginButtonMobile from "./Login/LoginButtonMobile";
import SearchBar from "./Search/SearchBar";
import getAvatar from "@/lib/getAvatar";
import { Menu } from "@headlessui/react";
import MenuTransition from "./UI/MenuTransition";
import { NextLink2 } from "./UI/NextLink2";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import MessageIcon from "./Messages/MessageIcon";
import { ChatBubbleLeftEllipsisIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";





const Navbar: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const profilePic = currentProfile?.picture
  console.log('CURRENT PROFILE', currentProfile?.picture)
  
  return (
    <div className="w-full flex justify-between rounded-lg items-center border-4 border-blue-500 p-2 ">
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

    <SearchBar />
    


    



    <div>
      
      <div className='flex pl-2 centre-item gap-5 md:gap-10 '>
        <Link href='/upload'>
        <button className='flex px-2 pt-3 py-2 md:px-4 text-md font-semibold items-center gap-2 cursor-pointer
         rounded-full text-md border-[#57B8FF] text-[#000000] hover:bg-[#57B8FF]' >
         {/*className='border-2 px-2 py-2 md:px-4 text-md font-semibold flex items-center gap-2'*/}
         <VideoCameraIcon className='h-6 h-6 text-black' />{' '}
         <span className='hidden '>Upload </span>
        </button>  
      </Link>





      
      


      
        
       

        

      
         


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
          <ConnectButton />
          </div>
        )}
        </div>
      </div>
     </div>
    </div>
  );
};

export default Navbar;