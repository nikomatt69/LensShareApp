import { useAppStore } from '@/store/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillCalendar, AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

const SearchSidebar = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showSidebar, setShowSidebar] = useState(true);
  const { query } = useRouter();

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center lg:justify-start curser-pointer font-semibold text-blue-700 rounded';

  return (
    <div>
      <div
        className="m-2 ml-4 mt-3 block text-xl lg:hidden"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="w-100 mb-10 flex flex-col justify-start border-r-2 border-gray-100 p-3 lg:w-400 xl:border-0">
          <div className="border-gray-200 lg:border-b-2 xl:pb-4">
            <Link href={`/search?q=${query.q}&type=profiles`}>
              <div className={normalLink}>
                <a className="text-md cursor-pointer lg:block">Profiles</a>
              </div>
            </Link>
            <Link href={`/search?q=${query.q}&type=pubs`}>
              <div className={normalLink}>
                <a className="text-md text-blu-700 cursor-pointer lg:block">
                  Publications
                </a>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSidebar;
