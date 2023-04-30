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

interface Props {
    profileId: string
    onProfileSelected?: (profile: Profile) => void;
}

const Followers: FC<Props> = ({profileId}) => {

    const request = { profileId: profileId, limit: 50 }

    const { data, loading, error, fetchMore } = useFollowersQuery({
        variables: { request },
        skip: !profileId
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
        <Link href={`/u/${profileId}`} key={profileId}/>
            <div className="divide-y">
                {followers?.map((follow) => (
                    <div className="p-5" key={follow?.wallet?.defaultProfile?.id}
                    onClick={() => setSelectedTab("followers")}>
                        {follow?.wallet?.defaultProfile ? (
                            <div className="flex gap-1 hover:bg-primary p-2 cursor-pointer font-semibold rounded-full items-center">
                                <div>
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded cursor-pointer"
                                        src={getAvatar(follow?.wallet?.defaultProfile)}
                                        alt={follow?.wallet?.defaultProfile?.handle}
                                    />
                                </div>
                                <div className="lg:block">
                                    <p className="flex gap-1 items-center text-md font-bold text lowercase">
                                        {follow?.wallet?.defaultProfile?.name} {""}
                                        <p className="cpaitalize text-grey text-xs">
                                            {follow?.wallet?.defaultProfile?.handle} {""}
                                        </p>
                                    </p>
                                </div>
                            </div>
                        ) : (
                            null
                        ) }
                        
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    </div>
  )
}

export default Followers
