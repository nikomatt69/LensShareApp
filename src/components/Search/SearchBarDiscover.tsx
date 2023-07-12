import { useSearchProfilesLazyQuery } from '@/types/graph';
import {
  Profile,
  ProfileSearchResult,
  SearchRequestTypes
} from '@/utils/lens/generatedLenster';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FC, useRef, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { Spinner } from '../UI/Spinner';
import getAvatar from '@/lib/getAvatar';
import { GoVerified } from 'react-icons/go';
import Link from 'next/link';
import Image from 'next/image';
import formatHandle from '@/utils/functions/formatHandle';

interface Props {
  hideDropdown?: boolean;
}

const SearchBarDiscover: FC<Props> = ({ hideDropdown = false }) => {
  const { push, pathname, query } = useRouter();
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);

  const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] =
    useSearchProfilesLazyQuery();

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchText(keyword);
    if (pathname !== '/search' && !hideDropdown) {
      searchUsers({
        variables: {
          request: {
            type: SearchRequestTypes.Profile,
            query: keyword,
            limit: 8
          }
        }
      });
    }
  };

  const handleKeyDown = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pathname === '/search') {
      push(`/search?q=${searchText}&type=${query.type}`);
    } else {
      push(`/search?q=${searchText}&type=profiles`);
    }
    setSearchText('');
    console.log(searchText);
  };

  const searchResult = searchUsersData?.search as ProfileSearchResult;
  const isProfileSearchResult =
    searchResult && searchResult.hasOwnProperty('items');
  const profiles = isProfileSearchResult ? searchResult.items : [];

  return (
    <div className="relative content-center items-center justify-center ">
      <form
        className="absolute top-10 max-w-md md:static"
        onSubmit={handleKeyDown}
      >
        <input
          className="md:text-md w-[300px] rounded-full border-2 border-gray-100 bg-primary p-3 font-medium focus:border-2 focus:border-gray-300 focus:outline-none md:top-0 md:w-[350px]"
          placeholder="Search accounts and videos"
          value={searchText}
          onChange={handleSearch}
        />
        <button className="absolute right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 md:right-5">
          <BiSearch />
        </button>
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div
          className="absolute mt-2 flex w-full  flex-col rounded-xl"
          ref={dropdownRef}
        >
          <div className="overflow-y-scroll rounded-xl border bg-white py-2">
            {searchUsersLoading ? (
              <div className="space-y-2 rounded-xl px-4 py-2 text-center text-sm font-bold">
                <Spinner size="sm" className="mx-auto" />
                <div>Searching...</div>
              </div>
            ) : (
              <>
                {profiles.map((profile: Profile) => (
                  <div className="p-5" key={profile?.id}>
                    <Link href={`/u/${profile?.id}`}>
                      <div className="flex cursor-pointer items-center gap-3 rounded-xl p-2 font-semibold  hover:bg-primary">
                        <div>
                          <Image
                            width={40}
                            height={40}
                            className="cursor-pointer rounded-full"
                            src={getAvatar(profile)}
                            alt={formatHandle(profile?.handle)}
                          />
                        </div>
                        <div>
                          <p className="text-md flex items-center gap-1 font-bold lowercase text-primary">
                            {formatHandle(profile?.handle)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
                {profiles.length === 0 && <div>No matching Profiles</div>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBarDiscover;
