import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Explore from "@/components/HomePage/Explore";
import BottomNav from "../Navs/BottomNav";

import * as Apollo from '@apollo/client';

import { useEffect, useState } from "react";
import { useAppPersistStore, useAppStore, useReferenceModuleStore } from "@/store/app";
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { Profile, ReferenceModules, UserProfilesDocument, UserProfilesQuery, UserProfilesQueryVariables } from "@/utils/lens/generatedLenster";
import { CHAIN_ID } from "@/constants";
import Loading from "../Loading";
import { Toaster } from "react-hot-toast";
import DiscoverMain from "./DiscoverMain";
import NavbarDetails from "../NavbarDetails";


const DiscoverMob: NextPage = () => {

  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] items-center m-auto overflow-hidden h-[100vh]">
      <Toaster position="bottom-right" />
      <NavbarDetails />
        <div className="flex gap-6 md:gap-20">
          <div className="mt-2 mb-8 pb-8 flex flex-col items-center gap-10 overflow-auto overflow-x-hidden h-[88vh] videos flex-1">
            <DiscoverMain />
          </div>
        </div>
        <div className="block xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden border-0 h-[100vh]">
          <BottomNav/>
        </div>
      </div>
    </div>
  );
};

export default DiscoverMob;
