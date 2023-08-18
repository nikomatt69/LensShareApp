import React, {
  useEffect,
  useRef,
  useState,
  FC,
  Dispatch,
  useCallback
} from 'react';
import { useRouter } from 'next/router';
import { Image } from '@/components/UI/Image';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';


import { useQuery } from '@apollo/client';
import {
  Publication,
  PublicationDocument,
  Profile
} from '@/utils/lens/generatedLenster';
import { usePublicationQuery, useUserProfilesQuery } from '@/types/graph';
import getAvatar from '@/lib/getAvatar';
import { copyToClipboard } from '@/utils/clipboard';
import getMedia from '@/lib/getMedia';
import LoginButton from '../Login/LoginButton';
import { useAppStore } from 'src/store/app';
import UnfollowButton from '../Buttons/UnfollowButton';
import FollowButton from '../Buttons/FollowButton';
import Like from '../Buttons/Likes/Like';
import {
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon
} from '@heroicons/react/24/solid';
import formatHandle from '@/utils/functions/formatHandle';
import CollectButton from '../Buttons/Collects/CollectButton';
import MetaTags from '../UI/MetaTags';
import {
  APP_ID,
  APP_NAME,
  IS_MAINNET,
  LENSTER_APP_ID,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID
} from '@/constants';
import NavbarDetails from '../NavbarDetails';
import Following from '../ProfilePage/Following';
import { Modal } from '../UI/Modal';
import Followers from '../ProfilePage/Followers';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import {imageCdn} from '@/utils/functions/imageCdn';
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import {getThumbnailUrl} from '@/utils/functions/getThumbnailUrl';
import VideoPlayer from '@/utils/VideoPlayer';

interface Props {
  publication: Publication;
  profile: Profile;
  setFollowing: Dispatch<boolean>;
  following: boolean;
  show: boolean;
  setShowShare: React.Dispatch<boolean>;
  isShow: boolean;
}

const VideoDetail: FC<Props> = ({
  publication,
  profile,
  setFollowing,
  following,
  isShow
}) => {
  const videoWatchTime = useAppStore((state) => state.videoWatchTime);
  const [showShare, setShowShare] = useState(false);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(publication?.stats?.totalUpvotes);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const { data, loading, error } = useQuery(PublicationDocument, {
    variables: {
      request: {
        publicationId: id
      }
    }
  });

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
  const playVideo = () => {
    if (!videoRef.current || isShow) {
      return;
    }
    videoRef.current.currentTime = 0;
    videoRef.current.volume = 1;
    videoRef.current.autoplay = true;
    videoRef.current?.play().catch(() => {});
    setIsPlaying(true);
  };

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return;
    }
    videoRef;
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const isBytesVideo =
    publication.appId === LENSTUBE_BYTES_APP_ID ||
    publication.appId === LENSTUBE_APP_ID ||
    publication.appId === APP_ID ||
    publication.appId === LENSTER_APP_ID;

  return (
    <div className="flex flex-col items-stretch lg:h-screen lg:flex-row">
      <MetaTags title={`Post • ${APP_NAME}`} />
      <Toaster position="bottom-right" />
      <div className="relative flex items-center  justify-center bg-black lg:flex-grow">
        <VideoPlayer
          currentTime={videoWatchTime}
          refCallback={refCallback}
          permanentUrl={getMedia(publication as Publication)}
          posterUrl={imageCdn(
            sanitizeIpfsUrl(getThumbnailUrl(publication)),
            isBytesVideo ? 'THUMBNAIL_V' : 'THUMBNAIL'
          )}
          options={{
            autoPlay: true,
            muted: false,
            loop: true,
            loadingSpinner: false,
            isCurrentlyShown: true
          }}
        />
        <div className="absolute left-5 top-5 flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-md"
          >
            <ArrowLeftIcon className="h-5 w-5 cursor-pointer fill-white font-semibold" />
          </button>
        </div>
      </div>
      <div className="flex h-screen w-full flex-shrink-0 flex-col items-stretch lg:w-[500px]">
        <div className="flex-shrink-0 border-b px-4 pb-4 pt-10">
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
            <div className="flex flex-grow flex-col justify-center p-1">
              <Link href={`/u/${profile?.id}`} key={profile?.id}>
                <a className="block items-center font-bold text-primary hover:underline">
                  {profile?.name}
                </a>
              </Link>
              <p
                prefix="@"
                className="text-sm font-medium capitalize text-gray-500"
              >
                {formatHandle(profile?.handle)}
              </p>
            </div>
            {
              <div className="flex-shrink-0">
                {following ? (
                  <UnfollowButton
                    setFollowing={setFollowing}
                    profile={profile as Profile}
                  />
                ) : (
                  <FollowButton
                    setFollowing={setFollowing}
                    profile={profile as Profile}
                  />
                )}
              </div>
            }
          </div>
          <div
            className="mt-3 flex cursor-pointer gap-4"
            onClick={() => {
              setShowFollowingModal(!showFollowingModal);
            }}
          >
            <div className="margin-1 flex items-center gap-2 rounded-3xl text-sm">
              <span className="text-sx font-bold">
                {' '}
                {profile?.stats.totalFollowing}{' '}
              </span>
              <span>Following</span>
              <Modal
                title="Following"
                show={showFollowingModal}
                onClose={() => setShowFollowingModal(false)}
              >
                <Following profile={profile as Profile} />
              </Modal>
            </div>
            <div
              className="margin-1 flex cursor-pointer  items-center gap-2 rounded-3xl text-sm"
              onClick={() => {
                setShowFollowersModal(!showFollowersModal);
              }}
            >
              <span className="text-sx font-bold">
                {profile?.stats.totalFollowers}
              </span>
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
            style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
          >
            {publication?.metadata.description?.slice(0, 500)}
          </p>
          {/* BUTTONS */}
          <div className="flex items-center justify-between">
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F1F2] fill-black p-2">
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
                <button className="flex h-9 w-9 items-center justify-center fill-black md:pb-3 lg:pb-3 ">
                  {/* // comments button goes here
                      <FaCommentDots className="w-5 h-5 scale-x-[-1]" /> */}
                  <CollectButton publication={publication} />
                </button>
                <p className="text-center text-xs font-semibold">
                  {publication?.stats.totalAmountOfCollects}
                </p>
              </div>

              <div className="flex items-center gap-1">
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F1F2] fill-black text-center">
                  {/* // comments button goes here
                      <FaCommentDots className="w-5 h-5 scale-x-[-1]" /> */}
                  <ChatBubbleLeftEllipsisIcon className="h-4 w-4 font-bold text-[#57B8FF] md:text-white" />
                </button>
                <p className="text-center text-xs font-semibold">
                  {publication?.stats.totalAmountOfComments}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-xl">
              <div className="flex items-center gap-1"></div>
            </div>
          </div>

          <div className="mt-3  flex items-stretch">
            <input
              // @ts-ignore
              onClick={(e) => e.target?.select?.()}
              className="flex-grow rounded-xl border bg-[#F1F1F2] p-2 text-sm outline-none"
              readOnly
              type="text"
              value={Links}
            />
            <button
              className="flex-shrink-0 cursor-pointer rounded-xl border px-2 active:bg-blue-500"
              onClick={() => {
                copyToClipboard(Links);
              }}
            >
              Copy link
            </button>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default VideoDetail;
