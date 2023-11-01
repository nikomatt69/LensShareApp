import { useRouter } from 'next/router';
import React from 'react';
import SearchProfiles from './SearchProfiles';
import { NextPage } from 'next';
import Sidebar from '../Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Navbar';
import SearchSidebar from './SearchSidebar';
import SearchPublications from './SearchPublications';
import NavbarDetails from '../NavbarDetails';
import BottomNav from '../Navs/BottomNav';
import { Profile } from '@/utils/lens/generated5';

const SearchPage: NextPage = (profile) => {
  const { query } = useRouter();

  if (!query.q || !['pubs', 'profiles'].includes(query.type as any)) {
    return <p>Error</p>;
  }

  return (
    <div>
      <div className="m-auto h-[100vh] overflow-hidden lg:w-[1100px] xl:w-[1200px]">
        <Toaster position="bottom-right" />

        <div className="videos mt-2 flex h-[88vh] flex-1 flex-col gap-10 overflow-auto overflow-x-hidden">
          <div className="flex flex-row gap-4">
            <SearchSidebar />
          </div>
          {query.type === 'profiles' && <SearchProfiles query={query.q} />}
          {query.type === 'pubs' && <SearchPublications query={query.q} profile={profile as Profile}/>}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default SearchPage;
