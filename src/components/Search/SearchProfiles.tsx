import { useSearchProfilesLazyQuery, useSearchProfilesQuery } from '@/types/graph'
import { Profile, SearchRequestTypes } from '@/utils/lens/generatedLenster'
import React, { FC } from 'react'
import { Spinner } from '../UI/Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteLoader from '../UI/InfiniteLoader'
import Image from 'next/image'
import getAvatar from '@/lib/getAvatar'
import { GoVerified } from 'react-icons/go'
import Link from 'next/link'
import formatHandle from '@/utils/functions/formatHandle'
import Loading from '../Loading'
import { useInView } from 'react-cool-inview'

interface Props {
    query: string | string[]
}

const SearchProfiles: FC<Props> = ({ query }) => {
    const request = {
        query,
        type: SearchRequestTypes.Profile,
        limit: 5
    }

    const { data, loading, error, fetchMore } = useSearchProfilesQuery({
        variables: { request },
        skip: !query
    })

    // @ts-ignore
    
    const profiles = data?.search?.items as Profile[];
    // @ts-ignore
    const pageInfo = data?.search?.pageInfo
    const hasMore = pageInfo?.next && profiles?.length !== pageInfo.totalCount

    console.log(profiles)

    if (profiles?.length === 0) {
        return (
            <div>
                No profiles for <b>&ldquo;{query}&rdquo;</b>
            </div>
        );
      }

      if (error) {
        return <div>Failed to load profiles</div>;
      }

    const loadMore = async () => {
        await fetchMore({
            variables: { request: { ...request, cursor: pageInfo?.next } }
        })
    }


    if (loading) {
        <>
        <Spinner size="sm" /><p>Loading profiles </p>
        </>
    }

    const { observe } = useInView({

        onEnter: async () => {
          await fetchMore({
            variables: {
              request: {
                cursor: pageInfo?.next,
                ...request
              }
            }
          })
        }
    })
    


  return (
        <div className='space-y-3 rounded-xl'>
            {profiles?.map((profile: Profile) => (
                <div key={profile?.id} className="p-5">
                    <Link href={`/u/${profile?.id}`}>                           
                        <div className="flex gap-3 p-2 cursor-pointer rounded-xl font-semibold  items-center">
                                <Image 
                                    width={62}
                                    height={62}
                                    className="rounded-full cursor-pointer"
                                    src={getAvatar(profile)}
                                    alt={formatHandle(profile?.handle)}
                                />
                            <div className=" lg:block">
                                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">{profile?.name}
                                <p className="capitalize text-gray-400">
                                    {formatHandle(profile?.handle)}{""}
                                </p>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
             {pageInfo?.next && (
            <span ref={observe} className="flex border-0 justify-center p-10">
              <Loading />
            </span>
          )}
            
        </div>
  )
}

export default SearchProfiles