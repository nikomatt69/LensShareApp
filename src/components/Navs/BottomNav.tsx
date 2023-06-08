import Link from 'next/link'

import { useAppStore } from "src/store/app";
import { toast } from "react-hot-toast";
import { useState } from 'react';
import ButtonTest from '../Login/ButtonTest';
import LoginWalletMobile from '../Login/LoginWalletMobile';
import { ChatBubbleLeftIcon, VideoCameraIcon ,ChatBubbleOvalLeftIcon, FilmIcon, BellIcon } from '@heroicons/react/24/outline';
import router from 'next/router';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { MdVideoLibrary } from 'react-icons/md';

const BottomNav: React.FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [homePage, setHomePage] = useState(true);

  return (
    <div>
    <nav className="fixed  bottom-0 left-0 right-0 h-[70px] border-blue-700 rounded-lg border-2  bg-blue-500 bg-gradient-to-b from-gray-900 to-transparent z-999 flex items-center justify-around px-4 py-3">
     {/* //swap timelines */}
    { homePage ? (
      <Link href='/'>
        <button  
        onClick= {() => {
        {setHomePage(false);}
        }} 
       className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      </button>
      </Link>
    ) : (
      <Link href='/'>
        <button  
        onClick= {() => {
        {setHomePage(true);}
        }} 
       className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      </button>
      </Link>
      )}
      <div>
      {/* //feed */}
     <Link href='/feed'>
       
        <MdVideoLibrary className="text-brand-500 pb-1 h-6 w-6" />{' '}
       
      </Link>
      </div>
       <div>
      {/* //latest */}
     <Link href='/latest'>
     
        <FilmIcon className="text-brand-500 pb-1 h-6 w-6" />{' '}
      
      </Link>
      </div>

      {/* //upload */}
      <Link href='/upload'>
      
        <VideoCameraIcon className="pb-1 h-6 text-white-500" />{' '}
         
      </Link>

      <div>
      {/* //notifications */}
     <Link href='/notifications'>

        <BellIcon className="text-brand-500 pb-1 h-6 w-6" />{' '}
       
      </Link>
      </div>

      <div>
      {/* //messages */}
     <Link href='/messages'>
 
        <ChatBubbleOvalLeftIcon className="text-brand-500 pb-1 h-6 w-6" />{' '}
        
      </Link>
      </div>
        {/* //log into lens & profile page */}
      {currentProfile ? (
      <Link href={`/u/${currentProfile.id}`} key={currentProfile.id}>
      <button className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
      </button>
      </Link>
      ) : ( 
        <LoginWalletMobile />
      )}
    </nav>
    </div>
  )
}

export default BottomNav