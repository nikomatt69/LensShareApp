import getAvatar from '@/lib/getAvatar'
import { Dispatch, FC, useEffect, useState } from "react";
import { useFollowersQuery } from '@/types/graph'
import InfiniteScroll from 'react-infinite-scroll-component'
import InfiniteLoader from '../UI/InfiniteLoader'
import Loader from '../UI/Loader'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import SuggestedAccounts from "@/components/Sidebar/SuggestedAccounts";
import FollowingAccounts from "@/components/Sidebar/FollowingAccounts";
import Categories from "@/components/Sidebar/Categories";
import { useAppStore } from "src/store/app";
import { Profile } from '@/types/lens';
import Link from 'next/link';
import formatHandle from '@/utils/functions/formatHandle';

interface Props {
    profile: string
    onProfileSelected?: (profile: Profile) => void;
}

const Followers: FC<Props> = ({profile}) => {

    const request = { profileId: profile, limit: 50 }

    const { data, loading, error, fetchMore } = useFollowersQuery({
        variables: { request },
        skip: !profile
    })

    const followers = data?.followers?.items
    const pageInfo = data?.followers?.pageInfo
    const hasMore = pageInfo?.next && followers?.length !== pageInfo.totalCount
    const currentProfile = useAppStore((state) => state.currentProfile);
    const [selectedTab, setSelectedTab] = useState<
     "followers" | "categories" | "search"
    >("followers");

    const loadMore = async () => {
        await fetchMore({
            variables: { request: { ...request, cursor: pageInfo?.next} }
        })
    }

    if (loading) {
        return <Loader message="Loading followers" />
    }

    if (followers?.length === 0) {
        return (
        <div className="p-5">
            No Followers
        </div>
        )
    }
    const areFollowers = data?.followers.items
    console.log('Followers', Followers);

  return (

    <div className="overflow-y-auto max-h-[80vh]" id="scrollableDiv">
        <InfiniteScroll
            dataLength={followers?.length ?? 0}
            scrollThreshold={0.5}
            hasMore={hasMore}
            next={loadMore}
            loader={<InfiniteLoader />}
            scrollableTarget="scrollableDiv"
        > 
        <div>
        {areFollowers?.map((followers) => (
          <Link href={`/u/${followers?.wallet?.defaultProfile?.id}`} key={followers?.wallet?.defaultProfile?.id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(followers?.wallet?.defaultProfile)}
                  alt="profilepic"
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              <div/>
              <div >
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                {followers?.wallet?.defaultProfile?.name}
                </p>
                <p className="capitalize text-gray-400 text-xs">
                {formatHandle(followers?.wallet?.defaultProfile?.handle)} {""}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
        </InfiniteScroll>
    </div>
  )
}

export default Followers
