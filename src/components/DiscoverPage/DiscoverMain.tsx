import React, { Dispatch, FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile } from '@/utils/lens/generatedLenster';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import { useAppStore } from 'src/store/app';
import { Router } from 'next/router';

import getAvatar from '@/lib/getAvatar';
import SuggestedAccounts from '@/components/Sidebar/SuggestedAccounts';
import FollowingAccounts from '@/components/Sidebar/FollowingAccounts';
import Categories from '@/components/Sidebar/Categories';
import SearchBarDiscover from '../Search/SearchBarDiscover';

const DiscoverMain = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [selectedTab, setSelectedTab] = useState<
    'suggestedaccounts' | 'categories' | 'search'
  >('suggestedaccounts');

  const suggestedaccountsClass =
    selectedTab === 'suggestedaccounts' ? ' border-black' : 'text-black dark:text-white';
  const categoriesClass =
    selectedTab === 'categories' ? ' border-black' : 'text-black dark:text-white';
  const searchClass = selectedTab === 'search' ? ' border-black' : 'text-black dark:text-white';

  console.log('oioioioio', selectedTab);
  console.log('a', suggestedaccountsClass);
  console.log('b', categoriesClass);
  console.log('c', searchClass);

  return (
    <div className="mx-4 flex justify-center  rounded-full border-blue-700">
      <div className="w-full max-w-[1150px]">
        <div className="flex  w-full items-center justify-center rounded-full border-4 border-black bg-blue-500 p-5">
          <span className="text-center text-xl font-semibold">Discover</span>
        </div>
        <div className="mb-5 flex w-full items-center justify-center gap-10 rounded-full border-2 border-black bg-blue-500  p-5">
          <span
            className={`text-md cursor-pointer rounded-full border-2 border-black px-2 py-2 font-semibold ${suggestedaccountsClass} mt-2`}
            onClick={() => setSelectedTab('suggestedaccounts')}
          >
            Users
          </span>
          <span
            className={`text-md cursor-pointer rounded-full border-2 border-black px-2 py-2 font-semibold  ${categoriesClass} mt-2`}
            onClick={() => setSelectedTab('categories')}
          >
            Categories
          </span>
          <span
            className={`text-md cursor-pointer rounded-full border-2 border-black px-2 py-2 font-semibold ${searchClass} mt-2`}
            onClick={() => setSelectedTab('search')}
          >
            Search
          </span>
        </div>
        {selectedTab === 'suggestedaccounts' && (
          <>
            <SuggestedAccounts />
            <FollowingAccounts />
          </>
        )}
        {selectedTab === 'categories' && <Categories />}
        {selectedTab === 'search' && (
          <div className="content-center items-center justify-center">
            <SearchBarDiscover />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverMain;
