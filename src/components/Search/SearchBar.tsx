import { useSearchProfilesLazyQuery } from '@/types/graph'
import { Profile, ProfileSearchResult, SearchRequestTypes } from '@/utils/lens'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Spinner } from '../UI/Spinner'
import getAvatar from '@/lib/getAvatar'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'

interface Props {
    hideDropdown?: boolean
    onProfileSelected?: (profile: Profile) => void;
    
}

const SearchBar: FC<Props> = ({ hideDropdown = false }) => {
    const { push, pathname, query } = useRouter()
    const [searchText, setSearchText] = useState('')
    const dropdownRef = useRef(null)

    const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] = useSearchProfilesLazyQuery()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value
        setSearchText(keyword)
        if (pathname !== '/search' && !hideDropdown) {
            searchUsers({
                variables: {
                    request: {
                        type: SearchRequestTypes.Profile,
                        query: keyword,
                        limit: 8
                    }
                }
            })
        }
    }

    const handleKeyDown = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pathname === '/search') {
            push(`/search?q=${searchText}&type=${query.type}`)
        } else {
            push(`/search?q=${searchText}&type=profiles`)
        }
        setSearchText('')
        console.log(searchText)
    }

    const searchResult = searchUsersData?.search as ProfileSearchResult
    const isProfileSearchResult = searchResult && searchResult.hasOwnProperty('items')
    const profiles = isProfileSearchResult ? searchResult.items : []

  return (
    <div className='relative items-center hidden md:block'>
      <form className='absolute md:static top-10 -left-20 max-w-md' onSubmit={handleKeyDown}>
        <input 
        className='justify-content bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
        placeholder='Search accounts and videos'
        value={searchText}
        onChange={handleSearch}
        />
        <button className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
        <BiSearch />
        </button>
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div className='flex absolute flex-col mt-2 w-[94%] z-50' ref={dropdownRef}>
            <div className='overflow-y-auto py-2 max-h-[80vh] rounded-none border bg-white'>
                {searchUsersLoading ? (
                    <div className='py-2 px-4 space-y-2 text-sm font-bold text-center'>
                        <Spinner size="sm" className='mx-auto' />
                        <div>Searching...</div>
                    </div>
                ) : (
                    <>
                        {profiles.map((profile: Profile) => (
                            <div className='p-5' key={profile?.id}>
                                <Link href={`/u/${profile?.id}`}>
                                    <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center'>
                                        <div>
                                            <img 
                                                width={40}
                                                height={40}
                                                className="rounded-full cursro-pointer"
                                                src={getAvatar(profile)}
                                                alt={profile?.handle}
                                            />
                                        </div>
                                        <div className='hidden lg:block'>
                                            <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>{profile?.handle}</p>
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
  )
}

export default SearchBar