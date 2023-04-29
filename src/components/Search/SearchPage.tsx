import { useRouter } from 'next/router'
import React from 'react'
import SearchProfiles from './SearchProfiles'
import { NextPage } from 'next'
import Sidebar from '../Sidebar/Sidebar'
import { Toaster } from 'react-hot-toast'
import Navbar from '../Navbar'
import SearchSidebar from './SearchSidebar'
import SearchPublications from './SearchPublications'

const SearchPage: NextPage = () => {
    const { query } = useRouter()

    if (!query.q || !['pubs', 'profiles'].includes(query.type as any)) {
        return <p>Error</p>
    }

  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden h-[100vh]">
      <Toaster position="bottom-right" />
        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden hidden lg:block lg:hover:overflow-auto">
            <SearchSidebar />
          </div>
          <div className="mt-2 flex flex-col gap-10 overflow-auto overflow-x-hidden h-[88vh] videos flex-1">       
            {query.type === 'profiles' && <SearchProfiles query={query.q} />}
            {query.type === 'pubs' && <SearchPublications query={query.q} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage