import React, { Dispatch, FC, useEffect, useState } from 'react';

import { useAppStore } from 'src/store/app';
import { Router } from 'next/router';

import getAvatar from '@/lib/getAvatar';
import SuggestedAccounts from '@/components/Sidebar/SuggestedAccounts';
import FollowingAccounts from '@/components/Sidebar/FollowingAccounts';
import Categories from '@/components/Sidebar/Categories';
import SearchBarDiscover from '../Search/SearchBarDiscover';
import Search from '../Search/Search';

import { STATIC_ASSETS_URL } from '@/constants';
import imageKit from '@/lib/imageKit';

const DiscoverMain = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [selectedTab, setSelectedTab] = useState<
    'suggestedaccounts' | 'categories' | 'search'
  >('suggestedaccounts');

  const suggestedaccountsClass =
    selectedTab === 'suggestedaccounts'
      ? ' border-black'
      : 'text-black dark:text-white';
  const categoriesClass =
    selectedTab === 'categories'
      ? ' border-black'
      : 'text-black dark:text-white';
  const searchClass =
    selectedTab === 'search' ? ' border-black' : 'text-black dark:text-white';

  console.log('oioioioio', selectedTab);
  console.log('a', suggestedaccountsClass);
  console.log('b', categoriesClass);
  console.log('c', searchClass);

  return (
    <div className="mx-4 flex justify-center  rounded-full border-blue-700">
      <div className="w-full max-w-[1150px]">
        <div className="mb-5 flex items-center space-x-2">
          <img
            src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
            draggable={false}
            className="h-12 w-12 md:h-16 md:w-16"
            alt="lensshare"
          />
          <h1 className="text-xl font-semibold">Discover</h1>
        </div>
        <div className="mb-5 flex w-full items-center justify-center gap-10 rounded-full p-5  text-blue-700">
          <span
            className={`text-md cursor-pointer rounded-full  px-2 py-2 font-semibold text-blue-700 ${suggestedaccountsClass} mt-2`}
            onClick={() => setSelectedTab('suggestedaccounts')}
          >
            Users
          </span>

          <span
            className={`text-md cursor-pointer rounded-full  px-2 py-2 font-semibold text-blue-700 ${searchClass} mt-2`}
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
            <Search />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverMain;
