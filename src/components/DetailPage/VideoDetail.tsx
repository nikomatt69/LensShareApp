import React, { useEffect, useRef, useState, FC, Dispatch } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import Comments from "./CommentsBlock/Comments";
import { useQuery } from "@apollo/client";
import { Publication, PublicationDocument, Profile } from "@/types/lens";
import { usePublicationQuery, useUserProfilesQuery } from "@/types/graph";
import getAvatar from "@/lib/getAvatar";
import { copyToClipboard } from "@/utils/clipboard";
import getMedia from "@/lib/getMedia";
import { AiFillHeart, AiFillTwitterCircle } from "react-icons/ai";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import LikeButton from "../Buttons/Likes/LikeButton";
import MirrorButton from "../Buttons/Mirrors/MirrorButton";
import CommentButton from "../Buttons/CommentButton";
import LoginButton from "../Login/LoginButton";
import { useAppStore } from "src/store/app";
import UnfollowButton from "../Buttons/UnfollowButton";
import FollowButton from "../Buttons/FollowButton";
import Like from "../Buttons/Likes/Like";
import { ArrowLeftIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";
import formatHandle from "@/utils/functions/formatHandle";
import CollectButton from "../Buttons/Collects/CollectButton";
import MetaTags from "../UI/MetaTags";
import { APP_NAME } from "@/constants";
import NavbarDetails from "../NavbarDetails";
import Following from "../ProfilePage/Following";
import { Modal } from "../UI/Modal";
import Followers from "../ProfilePage/Followers";


interface Props {
  publication: Publication;
  profile: Profile;
  setFollowing: Dispatch<boolean>;
  following: boolean;
}

const VideoDetail: FC<Props> = ({
  publication,
  profile,
  setFollowing,
  following,
}) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(publication?.stats?.totalUpvotes);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query;

  // const { data, loading, error } = useQuery(PublicationDocument, {
  //   variables: {
  //     request: {
  //       publicationId: id
  //     }
  //    },
  // });
  // const profile = data?.publication?.profile
  // console.log("Profile", profile);

  // const publication = data?.publication
  // console.log("Publication", publication)

  //CHANGE LINK ON DEPLOYMENT TO NEW DOMAIN!
  const Links = `https://lenshareapp.xyz/post/${publication?.id}`;
  const Title = `${formatHandle(profile?.handle)} on LensShare`;

  const itsNotMe = profile?.id !== currentProfile?.id;

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  return (
    <div className="flex flex-col lg:flex-row lg:h-screen items-stretch">
      <MetaTags
        title={`Post • ${APP_NAME}`}
      />
      <Toaster position="bottom-right" />
      <div className="lg:flex-grow flex justify-center items-center relative bg-black">
        <video
          className="w-auto h-auto max-w-full max-h-[450px] "
          ref={videoRef}
          onClick={onVideoClick}
          muted
          loop
          src={getMedia(publication)}
          // poster={video.coverURL}
          controls
          playsInline
          autoPlay
        ></video>
        <div className="absolute top-5 left-5 flex gap-3">
          <button
            onClick={() => router.back()}
            className="w-[40px] h-[40px] rounded-md flex justify-center items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 fill-white font-semibold cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="w-full lg:w-[500px] flex-shrink-0 flex flex-col items-stretch h-screen">
        <div className="px-4 pt-10 pb-4 flex-shrink-0 border-b">
          <div className="flex">
            <Link legacyBehavior href={`/u/${profile?.id}`} key={profile?.id}>
              <a className="mr-3 flex-shrink-0 rounded-full">
                <Image
                  src={getAvatar(profile)}
                  alt="profile pic here"
                  height={62}
                  width={62}
                  className="rounded-full"
                />
              </a>
            </Link>
            <div className="flex p-1 flex-col flex-grow justify-center">
              <Link href={`/u/${profile?.id}`} key={profile?.id}>
                <a className="font-bold block hover:underline items-center text-primary">
                  {profile?.name}
                </a>
              </Link>
              <p prefix="@" className="capitalize font-medium text-sm text-gray-500">
                {formatHandle(profile?.handle)}
              </p>
            </div>

            {<div className="flex-shrink-0">
          { following ? ( 
            <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile } /> 
            ) : (
            <FollowButton setFollowing={ setFollowing } profile={ profile as Profile } />
          )}
        </div>}
          </div>
          <div className="flex gap-4 mt-3 cursor-pointer" onClick={() => { setShowFollowingModal(!showFollowingModal) }}>
                            <div className="flex items-center text-sm margin-1 rounded-3xl gap-2">
                                <span className="font-bold text-sx"> {profile?.stats.totalFollowing} </span>
                                <span>Following</span>
                                <Modal
                                title="Following"
                                show={showFollowingModal}
                                onClose={() => setShowFollowingModal(false)}
                                
                                >
                                    <Following profile={profile as Profile} />
                                </Modal>
                            </div>
                        <div className="flex items-center text-sm  margin-1 rounded-3xl gap-2 cursor-pointer" onClick={() => { setShowFollowersModal(!showFollowersModal) }}>
                            <span className="font-bold text-sx">{profile?.stats.totalFollowers}</span>
                            <span>Followers</span>
                            <Modal
                                title="Followers"
                                show={showFollowersModal}
                                onClose={() => setShowFollowersModal(false)}
                            >
                                <Followers profile={profile?.id} />
                            </Modal>
                        </div>
                        </div>
          <p
            className="my-3 pb-3 text-sm text-gray-600"
            style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
          >
            {publication?.metadata.description?.slice(0, 500)}
          </p>

          {/* BUTTONS */}
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 p-2 bg-[#F1F1F2] fill-black flex justify-center items-center rounded-full">
                  {/* // Like button goes here
                      <AiFillHeart className='w-5 h-5' /> */}
                  <Like
                    publication={publication}
                    setCount={setCount}
                    setLiked={setLiked}
                    count={count}
                    liked={liked}
                  />
                </button>
                <span className="text-center text-xs font-semibold">
                  {publication?.stats.totalUpvotes}
                </span>
              </div>
              <div className="flex items-center gap-1">
               <button className="fill-black w-9 h-9 flex md:pb-3 lg:pb-3 justify-center items-center ">
                  {/* // comments button goes here
                      <FaCommentDots className="w-5 h-5 scale-x-[-1]" /> */}
                  <CollectButton
                    publication={publication} />
                    </button>
                <p className="text-center text-xs font-semibold">
                  {publication?.stats.totalAmountOfCollects}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-9 h-9 bg-[#F1F1F2] fill-black flex justify-center items-center text-center rounded-full">
                  {/* // comments button goes here
                      <FaCommentDots className="w-5 h-5 scale-x-[-1]" /> */}
                  <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-[#57B8FF] font-bold md:text-white" />
                </button>
                <p className="text-center text-xs font-semibold">
                  {publication?.stats.totalAmountOfComments}
                </p>
              </div>
            </div>
            <div className="flex gap-1 rounded-xl items-center">
              <a
                href={`http://twitter.com/share?text=${encodeURIComponent(
                  Title
                )}&url=${encodeURIComponent(Links)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl"
              >
                <AiFillTwitterCircle className="fill-[#05AAF4] w-8 h-8" />
              </a>
            </div>
          </div>

          <div className="flex items-stretch mt-3">
            <input
              // @ts-ignore
              onClick={(e) => e.target?.select?.()}
              className="bg-[#F1F1F2] p-2 flex-grow text-sm border outline-none"
              readOnly
              type="text"
              value={Links}
            />
            <button
              className="flex-shrink-0 border px-2 active:bg-blue-500 cursor-pointer"
              onClick={() => {
                copyToClipboard(Links);
              }}
            >
              Copy link
            </button>
          </div>
        </div>
        <Comments
          key={publication?.profile.id}
          publication={publication as Publication}
        />
      </div>
    </div>
  );
};

export default VideoDetail;
