import React, { Dispatch, FC, useEffect, useState } from 'react';
import { Image } from '@/components/UI/Image';
import { Profile } from '@/utils/lens/generatedLenster';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import { useAppStore } from 'src/store/app';
import { Router } from 'next/router';

import getAvatar from '@/lib/getAvatar';
import SuggestedAccounts from '@/components/Sidebar/SuggestedAccounts';
import FollowingAccounts from '@/components/Sidebar/FollowingAccounts';
import Categories from '@/components/Sidebar/Categories';
import SearchBarDiscover from '../Search/SearchBarDiscover';
import Search from '../Search/Search';
import { imageCdn } from '@/utils/functions/imageCdn';
import { STATIC_ASSETS_URL } from '@/constants';

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
      <div className="flex mb-5 items-center space-x-2">
          <img
            src={imageCdn(`${STATIC_ASSETS_URL}/images/icon.png`)}
            draggable={false}
            className="h-12 w-12 md:h-16 md:w-16"
            alt="lensshare"
          />
          <h1 className="text-xl font-semibold">Discover</h1>
        </div>
        <div className="mb-5 flex w-full items-center text-blue-700 justify-center gap-10 rounded-full  p-5">
          <span
            className={`text-md cursor-pointer rounded-full  px-2 py-2 text-blue-700 font-semibold ${suggestedaccountsClass} mt-2`}
            onClick={() => setSelectedTab('suggestedaccounts')}
          >
            Users
          </span>
         
          <span
            className={`text-md cursor-pointer rounded-full  px-2 text-blue-700 py-2 font-semibold ${searchClass} mt-2`}
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
            <Search/>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscoverMain;
