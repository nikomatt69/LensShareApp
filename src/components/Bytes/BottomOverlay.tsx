import { formatNumber } from "@/utils/functions/formatNumber"
import { Profile, Publication } from "@/utils/lens/generatedLenster"
import getProfilePicture from "@/utils/lib/getProfilePicture"
import Link from "next/link"
import { FC, useState } from "react"
import Follow from "../Profile/Follow"
import FollowButton from "../Buttons/FollowButton"
import UnfollowButton from "../Buttons/UnfollowButton"
import getAvatar from "@/lib/getAvatar"
import useAverageColor from "@/utils/hooks/useAverageColor"

type Props = {
  video: Publication
}

const BottomOverlay: FC<Props> = ({ video }) => {
  const subscribeType = video.profile?.followModule?.__typename
  const channel = video.profile
  const [following, setFollowing] = useState(false);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1] bg-gradient-to-t from-trasparent to-transparent px-3 pb-3 mb-32 md:rounded-b-xl">
      <div className="pb-2">
        <Link href={`/bytes/${video?.id}`} key={video.id}>
        <h1 className="line-clamp-2 text-white">{video.metadata.name}</h1>
        </Link>
      </div>
      <div className="flex items-center justify-between">
        <div className="min-w-0">
          <Link
            href={`/u/${channel?.id}`}
            className="flex flex-none cursor-pointer items-center space-x-2"
          >
            <img
              src={getAvatar(channel)}
              className="h-9 w-9 rounded-full"
              draggable={false}
              alt={channel?.handle}
            />
            <div className="flex min-w-0 flex-col items-start text-white">
              <h6 className="flex max-w-full items-center space-x-1">
                <span className="truncate">
                  {(channel?.name)}
                </span>
                
              </h6>
              <span className="inline-flex items-center space-x-1 text-xs">
                {formatNumber(channel?.stats.totalFollowers)} Followers
              </span>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
        {following ? (
                <UnfollowButton
                  setFollowing={setFollowing}
                  profile={channel as Profile}
                />
              ) : (
                <FollowButton
                  setFollowing={setFollowing}
                  profile={channel as Profile}
                />
              )}
        </div>
      </div>
    </div>
  )
}

export default BottomOverlay


