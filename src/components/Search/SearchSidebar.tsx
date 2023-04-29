import { useAppStore } from '@/store/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { AiFillCalendar, AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

const SearchSidebar = () => {
    const currentProfile = useAppStore((state) => state.currentProfile)
    const [showSidebar, setShowSidebar] = useState(true);
    const { query } = useRouter();

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start curser-pointer font-semibold text-[#57B8FF] rounded';

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
            <Link href={`/search?q=${query.q}&type=profiles`}>
                <div className={normalLink}>
                    <a className="text-md hidden lg:block cursor-pointer">Profiles</a>
                </div>
            </Link>
            <Link href={`/search?q=${query.q}&type=pubs`}>
              <div className={normalLink}>
                <a className="text-md hidden lg:block text-[#000000] cursor-pointer">
                  Publications
                </a>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchSidebar