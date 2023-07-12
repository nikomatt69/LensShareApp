import clsx from 'clsx';
import {
  Profile,
  ProfileInterestsDocument,
  ProfileSearchResult
} from '@/utils/lens/generatedLenster';
import {
  CustomFiltersTypes,
  SearchRequestTypes,
  useSearchProfilesLazyQuery
} from '@/utils/lens/generatedLenster';
import formatHandle from '@/utils/functions/formatHandle';
import { useRouter } from 'next/router';
import type { ChangeEvent, FC } from 'react';
import { useRef, useState } from 'react';

import Profiles from '@/components/ProfilePage/Profiles';
import { Input } from '../UI/Input';
import { Card } from '../UI/Card';
import { Spinner } from '../UI/Spinner';
import { HiSearchCircle } from 'react-icons/hi';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useOnClickOutside from '@/utils/hooks/useOnClickOutside';
import UserProfile from '../ProfilePage/UserProfiles';
import UserProfiles from '../ProfilePage/UserProfiles';
import SearchProfiles from './SearchProfiles';
import { id } from 'ethers/lib/utils.js';

interface SearchProps {
  hideDropdown?: boolean;
  onProfileSelected?: (profile: Profile) => void;
  placeholder?: string;
  modalWidthClassName?: string;
}

const Search: FC<SearchProps> = ({
  hideDropdown = false,
  onProfileSelected,
  placeholder = `Search…`,
  modalWidthClassName = 'max-w-md'
}) => {
  const { push, pathname, query } = useRouter();
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setSearchText(''));

  const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] =
    useSearchProfilesLazyQuery();

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const keyword = evt.target.value;
    setSearchText(keyword);
    if (pathname !== '/search' && !hideDropdown) {
      searchUsers({
        variables: {
          request: {
            type: SearchRequestTypes.Profile,
            query: keyword,
            customFilters: [CustomFiltersTypes.Gardeners],
            limit: 8
          }
        }
      });
    }
  };

  const handleKeyDown = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (pathname === '/search') {
      push(`/search?q=${encodeURIComponent(searchText)}&type=${query.type}`);
    } else {
      push(`/search?q=${encodeURIComponent(searchText)}&type=profiles`);
    }
    setSearchText('');
  };

  const searchResult = searchUsersData?.search as ProfileSearchResult;
  const isProfileSearchResult =
    searchResult && searchResult.hasOwnProperty('items');
  const profiles = isProfileSearchResult ? searchResult.items : [];

  return (
    <div aria-hidden="true" className="w-full pb-4" data-testid="global-search">
      <form onSubmit={handleKeyDown}>
        <Input
          type="text"
          className="px-3 py-2 text-sm"
          placeholder={placeholder}
          value={searchText}
          iconLeft={<HiSearchCircle />}
          iconRight={
            <XMarkIcon
              className={clsx(
                'cursor-pointer',
                searchText ? 'visible' : 'invisible'
              )}
              onClick={() => setSearchText('')}
            />
          }
          onChange={handleSearch}
        />
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div
          className={clsx(
            'justify-content absolute mt-2 flex w-[90%] flex-col  items-center rounded-xl text-xs',
            modalWidthClassName
          )}
          ref={dropdownRef}
          data-testid="search-profiles-dropdown"
        >
          <Card className="justify-content max-h-[80vh] items-center overflow-y-auto rounded-xl bg-white py-2 text-xs">
            {searchUsersLoading ? (
              <div className="space-y-2 px-4 py-2 text-center text-sm font-bold">
                <Spinner size="sm" className="mx-auto" />
                <div>Searching users</div>
              </div>
            ) : (
              <>
                {profiles.map((profile: Profile) => (
                  <div
                    key={profile?.handle}
                    className="cursor-pointer bg-white px-4 py-2 "
                    onClick={() => {
                      if (onProfileSelected) {
                        onProfileSelected(profile);
                      }
                      setSearchText('');
                    }}
                    data-testid={`search-profile-${formatHandle(
                      profile?.handle
                    )}`}
                  >
                    <SearchProfiles
                      query={`${formatHandle(profile?.handle)}`}
                    />
                  </div>
                ))}
                {profiles.length === 0 && (
                  <div className="px-4 py-2">No matching users</div>
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default Search;
