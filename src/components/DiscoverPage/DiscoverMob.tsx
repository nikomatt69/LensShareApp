import type { NextPage } from 'next';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';
import Explore from '@/components/HomePage/Explore';
import BottomNav from '../Navs/BottomNav';

import * as Apollo from '@apollo/client';

import { useEffect, useState } from 'react';
import {
  useAppPersistStore,
  useAppStore,
  useReferenceModuleStore
} from '@/store/app';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import {
  Profile,
  ReferenceModules,
  UserProfilesDocument,
  UserProfilesQuery,
  UserProfilesQueryVariables
} from '@/utils/lens/generatedLenster';
import { CHAIN_ID } from '@/constants';
import Loading from '../Loading';
import { Toaster } from 'react-hot-toast';
import DiscoverMain from './DiscoverMain';
import NavbarDetails from '../NavbarDetails';

const DiscoverMob: NextPage = () => {
  return (
    <div>
      <div className="m-auto h-[100vh] items-center overflow-hidden lg:w-[1100px] xl:w-[1200px]">
        <Toaster position="bottom-right" />

        <div className="flex gap-6 md:gap-20">
          <div className="videos mb-8 mt-2 flex h-[88vh] flex-1 flex-col items-center gap-10 overflow-auto overflow-x-hidden pb-8">
            <DiscoverMain />
          </div>
        </div>
        <div className="m-auto block h-[100vh] overflow-hidden border-0 lg:w-[1100px] xl:w-[1200px]">
          <BottomNav />
        </div>
      </div>
    </div>
  );
};

export default DiscoverMob;
