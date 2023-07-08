import { useSearchProfilesLazyQuery } from '@/types/graph'
import { Profile, ProfileSearchResult, SearchRequestTypes } from '@/utils/lens/generatedLenster'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { Spinner } from '../UI/Spinner'
import getAvatar from '@/lib/getAvatar'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'
import Image from 'next/image'
import formatHandle from '@/utils/functions/formatHandle'

interface Props {
    hideDropdown?: boolean
}

const SearchBarDiscover: FC<Props> = ({ hideDropdown = false }) => {
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
    <div className='relative items-center justify-center content-center '>
      <form className='absolute md:static top-10 max-w-md' onSubmit={handleKeyDown}>
        <input 
        className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0'
        placeholder='Search accounts and videos'
        value={searchText}
        onChange={handleSearch}
        />
        <button className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
        <BiSearch />
        </button>
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div className='flex absolute flex-col rounded-xl  mt-2 w-full' ref={dropdownRef}>
            <div className='overflow-y-scroll rounded-xl py-2 border bg-white'>
                {searchUsersLoading ? (
                    <div className='py-2 px-4 rounded-xl space-y-2 text-sm font-bold text-center'>
                        <Spinner size="sm" className='mx-auto' />
                        <div>Searching...</div>
                    </div>
                ) : (
                    <>
                        {profiles.map((profile: Profile) => (
                            <div className='p-5' key={profile?.id}>
                                <Link href={`/u/${profile?.id}`}>
                                    <div className='flex gap-3 rounded-xl hover:bg-primary p-2 cursor-pointer font-semibold  items-center'>
                                        <div>
                                            <Image 
                                                width={40}
                                                height={40}
                                                className="rounded-full cursor-pointer"
                                                src={getAvatar(profile)}
                                                alt={formatHandle(profile?.handle)}
                                            />
                                        </div>
                                        <div>
                                            <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>{formatHandle(profile?.handle)}</p>
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

export default SearchBarDiscover