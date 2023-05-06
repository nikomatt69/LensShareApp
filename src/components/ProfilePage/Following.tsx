import getAvatar from "@/lib/getAvatar"
import { Dispatch, FC, useEffect, useState } from "react";
import { useFollowingQuery } from "@/types/graph"
import { Profile } from "@/utils/lens"
import { GoVerified } from "react-icons/go"
import InfiniteScroll from "react-infinite-scroll-component"
import InfiniteLoader from "../UI/InfiniteLoader"
import Loader from "../UI/Loader"
import SuggestedAccounts from "@/components/Sidebar/SuggestedAccounts";
import FollowingAccounts from "@/components/Sidebar/FollowingAccounts";
import Categories from "@/components/Sidebar/Categories";
import { useAppStore } from "src/store/app";
import formatHandle from "@/utils/functions/formatHandle";
import Link from "next/link";
import Image from "next/image";
interface Props {
    profile: Profile
    onProfileSelected?: (profile: Profile) => void;
}

const Following: FC<Props> = ({profile}) => {

    const request = { address: profile?.ownedBy, limit: 50 }

    const { data, loading, error, fetchMore } = useFollowingQuery({
        variables: { request },
        skip: !profile?.id
    })

    const following = data?.following?.items
    const pageInfo = data?.following?.pageInfo
    const hasMore = pageInfo?.next && following?.length !== pageInfo.totalCount
    const currentProfile = useAppStore((state) => state.currentProfile);
    const [selectedTab, setSelectedTab] = useState <"following" | "categories" | "search">("following");

    const loadMore = async () => {
        await fetchMore({
            variables: { request: { ...request, cursor: pageInfo?.next} }
        })
    }

    if (loading) {
        return <Loader message="Loading Following" />
    }

    if (following?.length === 0) {
        return (
        <div className="p-5">
            No Following
        </div>
        )
    }
    const iFollow = data?.following.items
    console.log('I Follow', iFollow);

  return (
    <div className="overflow-y-auto max-h-[80vh]" id="scrollableDiv">
        <InfiniteScroll
            dataLength={following?.length ?? 0}
            scrollThreshold={0.5}
            hasMore={hasMore}
            next={loadMore}
            loader={<InfiniteLoader />}
            scrollableTarget="scrollableDiv"
        > 
        <div>
        {iFollow?.map((following) => (
          <Link href={`/u/${following?.profile.id}`} key={following?.profile.id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
              <div className="relative h-[32px] w-[32px]">
                <Image
                  src={getAvatar(following?.profile)}
                  alt="profilepic"
                  className="rounded-full"
                  layout="fill"
                />
              </div>
              <div/>
              <div >
                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                  {formatHandle(following?.profile.handle)}
                </p>
                <p className="capitalize text-gray-400 text-xs">
                {following?.profile.name} {""}
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

export default Following