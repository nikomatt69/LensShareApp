import Link from 'next/link'

import { useAppStore } from "src/store/app";
import { toast } from "react-hot-toast";
import { useState } from 'react';
import ButtonTest from '../Login/ButtonTest';
import LoginWalletMobile from '../Login/LoginWalletMobile';
import { ChatBubbleLeftIcon, VideoCameraIcon ,ChatBubbleOvalLeftIcon, FilmIcon } from '@heroicons/react/24/outline';

const BottomNav: React.FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [homePage, setHomePage] = useState(true);

  return (
    <div>
    <nav className="fixed bottom-0 left-0 right-0 h-[70px] rounded-lg border-2 border-grey-700 bg-blue-500 z-999 flex items-center justify-around px-4 py-3">
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
      {/* //latest */}
     <Link href='/latest'>
       <button
       className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <FilmIcon className="text-brand-500 h-6 w-6" />{' '}
        </button>
      </Link>
      </div>
      {/* //upload */}
      <Link href='/upload'>
       <button 
       className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <VideoCameraIcon className="h-6 h-6 text-white-500" />{' '}
        </button>  
      </Link>
      {/* //discover page */}
      <Link href='/discover'>
      <button className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
      </Link>
      <div>
      {/* //messages */}
     <Link href='/messages'>
       <button
       className="text-black hover:text-gray-100 focus:outline-none focus:text-gray-100 border-gray-800">
        <ChatBubbleOvalLeftIcon className="text-brand-500 h-6 w-6" />{' '}
        </button>
      </Link>
      </div>
        {/* //log into lens & profile page */}
      {currentProfile ? (
      <Link href={`/profile/${currentProfile.id}`} key={currentProfile.id}>
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