import Link from "next/link";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import type { Profile, Publication } from "@/utils/lens";
import Video from './Video'
import { GoVerified } from "react-icons/go";
import getAvatar from "@/lib/getAvatar";
import { timeStamp } from "console";
import UnfollowButton from "../Buttons/UnfollowButton";
import FollowButton from "../Buttons/FollowButton";
import { useAppStore } from "@/store/app";
import LikeButton from  "@/components/Buttons/Likes/LikeButton";
import CommentButton from "../Buttons/CommentButton";
import MirrorButton from "../Buttons/Mirrors/MirrorButton";
import CollectButton from "../Buttons/Collects/CollectButton";
import formatHandle from "@/utils/functions/formatHandle";
import Slug from "../UI/Slug";
import MetaTags from "../UI/MetaTags";


interface Props {
  publication: Publication;
}
const VideoCard: FC<Props> = ({ publication }) => {

  const date = publication.createdAt;
  const timestamp = date.split("T")[0];
  const [following, setFollowing] = useState(false) 
  const currentProfile = useAppStore((state) => state.currentProfile);
  const isMirror = publication?.__typename === 'Mirror'
  const profile = isMirror ? publication?.mirrorOf?.profile : publication?.profile 
  const likes = isMirror ? publication?.mirrorOf?.stats?.totalUpvotes : publication?.stats?.totalUpvotes
  const comments = isMirror ? publication.mirrorOf.stats.totalAmountOfComments : publication.stats.totalAmountOfComments
  const mirrors = isMirror ? publication?.mirrorOf?.stats?.totalAmountOfComments : publication?.stats?.totalAmountOfComments
  const collects = isMirror ? publication?.mirrorOf?.stats?.totalAmountOfCollects : publication?.stats?.totalAmountOfCollects

  useEffect(() => {
    if(profile?.isFollowedByMe === true) {
    setFollowing(true) 
  } else {
    setFollowing(false)
  }
    if (!currentProfile) {
      setFollowing(false)
    }
    }, [profile?.isFollowedByMe])

  return (
    <div className="flex flex-col bg-[#d9dff1f6] justify-content break-word border-b-2 border-gray-200 pb-0 md:pb-6">
      <div className="flex-row flex break-word ">
        <div className="flex-auto gap-3 p-2 mt-4 cursor-pointer break-word font-semibold rounded">
        <Link href={`/profile/${profile.id}`} key={profile.id}/>
          
            <Image
              itemRef={`/profile/${profile.id}`}
              src={getAvatar(profile)}
              width={62}
              height={62}
              alt={profile.handle}
              className="rounded-full"
             />
        <div className="break-word ">
          <Link href={`/profile/${profile.id}`} key={profile.id}>
            <div className="flex items-center gap-2">
              <p className="capitalize flex pl-1 gap-2 items-center md:text-md font-bold text-primary">
                {profile.name}{' '}
              </p>
            </div>
          </Link>
          <Slug className="p-1 pl-1 text-xs text-grey-400 " slug={formatHandle(profile?.handle)} prefix="@" /> 
          <p className="text-xs pl-1 p-1 block font-semibold text-gray-400"> {timestamp}</p>
          <Link 
        className="pointer-events-auto "
        href={`/detail/${publication.id}`} key={publication.id} 
        >
             <div
            className="my-3 pb-3  text-xs break-word text-black font-semibold"
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
              {publication?.metadata?.description?.slice(0, 150)} {""}
            </div>
            <span className="text-grey border-2 border  text-xs flex-shrink-0 p-1 rounded-full bg-blue-300 ">See more</span>
          </Link>
        </div>
        </div>
        
        {<div className="mt-6 mr-6">
          { following ? ( 
            <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile } /> 
            ) : (
            <FollowButton setFollowing={ setFollowing } profile={ profile as Profile } />
          )}
        </div>} 
      </div>
      <Video
       publication={publication as Publication} /> 
      <div className='flex flex-row py-3 space-x-3'>
      <p className="text-xs block md:hidden font-semibold text-black-400 pl-1"> {likes} Likes</p>
      <p className="text-xs block md:hidden font-semibold text-black-400"> {comments} Comments</p>
      <p className="text-xs block md:hidden font-semibold text-black-400"> {mirrors} Mirrors</p>
      <p className="text-xs block md:hidden font-semibold text-black-400"> {collects} Collects</p>  
      </div>
      
      <div className='flex ml-auto'>
      <button className="block md:hidden pr-2 pb-2 ">
        <LikeButton publication={publication as Publication} />
        </button>
        <button className="block md:hidden pr-2 pb-2">
        <CommentButton publication={publication as Publication} />
        </button>
        <button className="block md:hidden pr-2 pb-2">
          <MirrorButton publication={publication as Publication}/>
        </button>
      <button className="block md:hidden pr-2 pb-2">
      <CollectButton publication={publication as Publication}/>
      </button>
      </div>
    </div>
  );
};

export default VideoCard;