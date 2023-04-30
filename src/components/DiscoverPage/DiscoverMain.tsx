import React, { Dispatch, FC, useEffect, useState } from "react";
import Image from "next/image";
import { Profile } from "@/utils/lens";
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import { useAppStore } from "src/store/app";
import { Router } from "next/router";

import getAvatar from "@/lib/getAvatar";
import SuggestedAccounts from "@/components/Sidebar/SuggestedAccounts";
import FollowingAccounts from "@/components/Sidebar/FollowingAccounts";
import Categories from "@/components/Sidebar/Categories";
import SearchBarDiscover from "../Search/SearchBarDiscover";

const DiscoverMain = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [selectedTab, setSelectedTab] = useState<
    "suggestedaccounts" | "categories" | "search"
  >("suggestedaccounts");

  const suggestedaccountsClass =
    selectedTab === "suggestedaccounts"
      ? " border-black"
      : "text-black";
  const categoriesClass =
    selectedTab === "categories" ? " border-black" : "text-black";
  const searchClass =
    selectedTab === "search" ? " border-black" : "text-black";

  console.log("oioioioio", selectedTab);
  console.log("a", suggestedaccountsClass);
  console.log("b", categoriesClass);
  console.log("c", searchClass);

  return (
    <div className="flex rounded-full border-blue-700  justify-center mx-4">
      <div className="w-full max-w-[1150px]">
        <div className="flex  justify-center items-center p-5 border-4 border-black rounded-full bg-blue-500 w-full">
          <span className="text-xl font-semibold text-center">Discover</span>
        </div>
        <div className="flex rounded-full border-black border-2 bg-blue-500 justify-center items-center gap-10 p-5 mb-5 border-gray-200 bg-white w-full">
          <span
            className={`text-md rounded-full px-2 py-2 border-2 border-black font-semibold cursor-pointer ${suggestedaccountsClass} mt-2`}
            onClick={() => setSelectedTab("suggestedaccounts")}
          >
            Users
          </span>
          <span
            className={`text-md rounded-full px-2 py-2 border-2 border-black font-semibold cursor-pointer  ${categoriesClass} mt-2`}
            onClick={() => setSelectedTab("categories")}
          >
            Categories
          </span>
          <span
            className={`text-md rounded-full border-2 px-2 py-2 border-black font-semibold cursor-pointer ${searchClass} mt-2`}
            onClick={() => setSelectedTab("search")}
          >
            Search
          </span>
        </div>
        {selectedTab === "suggestedaccounts" && (
          <>
            <SuggestedAccounts />
            <FollowingAccounts />
          </>
        )}
        {selectedTab === "categories" && <Categories />}
        {selectedTab === "search" &&
        <div className="items-center justify-between">
          <SearchBarDiscover />
          </div> }
      </div>
    </div>
  );
};

export default DiscoverMain;
