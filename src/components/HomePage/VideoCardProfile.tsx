import Link from 'next/link';
import Image from 'next/image';
import { FC, useEffect, useRef, useState } from 'react';
import type { Profile, Publication } from '@/utils/lens/generatedLenster';
import Video from './Video';
import { GoVerified } from 'react-icons/go';
import getAvatar from '@/lib/getAvatar';
import { timeStamp } from 'console';
import UnfollowButton from '../Buttons/UnfollowButton';
import FollowButton from '../Buttons/FollowButton';
import { useAppStore } from '@/store/app';
import LikeButton from '@/components/Buttons/Likes/LikeButton';
import CommentButton from '../Buttons/CommentButton';
import MirrorButton from '../Buttons/Mirrors/MirrorButton';
import CollectButton from '../Buttons/Collects/CollectButton';
import formatHandle from '@/utils/functions/formatHandle';
import Slug from '../UI/Slug';
import MetaTags from '../UI/MetaTags';
import ShareModal from './ShareModal';
import { ShareIcon } from '@heroicons/react/24/outline';
import ShareButton from '../Buttons/ShareButton';
import ViewCount from './ViewCount';
import BytesVideo from '../Bytes';
import ByteVideo from '../Bytes/ByteVideo';
import { useRouter } from 'next/router';
import InterweaveContent from '../UI/InterweaveContent';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import clsx from 'clsx';
import ReportModal from '../DetailPage/ReportModal';
import CommentOptions from '../DetailPage/CommentsBlock/CommentOptions';
import { SIGN_IN_REQUIRED_MESSAGE } from '@/constants';
import toast from 'react-hot-toast';
import { getRelativeTime } from '@/utils/functions/formatTime2';
import PublicationReaction from '../DetailPage/CommentsBlock/PublicationReaction';
import ProfileVideos from '../ProfilePage/ProfileVideos';

interface Props {
  publication: Publication;
  onDetail: (video: Publication) => void;
  setFollowing: (following: boolean) => void;
  following: boolean;
  isShow: boolean;
  profile: Profile;
  profileId: string;
}
const VideoCard: FC<Props> = ({
  publication,
  onDetail,
  setFollowing,
  following,
  isShow
}) => {
  const bytesContainer = useRef<HTMLDivElement>(null);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const currentViewingId = useAppStore((state) => state.currentviewingId);
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const [byte, setByte] = useState<Publication>();
  const router = useRouter();
  const { id } = router.query;

  const [showShare, setShowShare] = useState(false);
  const date = publication.createdAt;
  const timestamp = date.split('T')[0];
  const isMirror = publication?.__typename === 'Mirror';
  const profile = isMirror
    ? publication?.mirrorOf?.profile
    : publication?.profile;
  const likes = isMirror
    ? publication?.mirrorOf?.stats?.totalUpvotes
    : publication?.stats?.totalUpvotes;
  const comments = isMirror
    ? publication.mirrorOf.stats.totalAmountOfComments
    : publication.stats.totalAmountOfComments;
  const mirrors = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfComments
    : publication?.stats?.totalAmountOfComments;
  const collects = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfCollects
    : publication?.stats?.totalAmountOfCollects;
  const [clamped, setClamped] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (publication.metadata?.content.trim().length > 500) {
      setClamped(true);
      setShowMore(true);
    }
  }, [publication.metadata?.content]);

  const onClickReport = () => {
    if (!currentProfile) {
      return toast.error(SIGN_IN_REQUIRED_MESSAGE);
    }
  };
  const mute = useAppStore((state) => state.isMute);

  useEffect(() => {
    if (profile?.isFollowedByMe === true) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
    if (!currentProfile) {
      setFollowing(false);
    }
  }, [profile?.isFollowedByMe]);

  return (
    <div className="justify-content break-word m-3 flex flex-col rounded-xl border-0 border-b-2 border-gray-200 bg-[#F2F6F9] pb-0 md:pb-6">
      <div className="break-word flex flex-row ">
        <div className="break-word mt-4 flex-auto cursor-pointer gap-3 rounded p-2 font-semibold">
          <Link href={`/u/${profile.id}`} key={profile.id} />

          <Image
            itemRef={`/u/${profile.id}`}
            src={getAvatar(profile)}
            width={62}
            height={62}
            alt={profile.handle}
            className="rounded-full border-2 border-blue-500"
          />
          <div className="break-word ">
            <Link href={`/u/${profile.id}`} key={profile.id}>
              <div className="flex items-center gap-2">
                <p className="text-md flex items-center gap-1 pl-1 pt-3 font-bold capitalize text-primary">
                  {profile.name}{' '}
                </p>
              </div>
            </Link>
            <Slug
              className="text-grey-500 pl-1 text-xs "
              slug={formatHandle(profile?.handle)}
              prefix="@"
            />
            <p className="pl-full block p-1 pl-1 pr-4 pt-2 text-xs font-semibold  text-blue-500">
              {' '}
              {timestamp}~
              <span className="pl-2 text-xs text-blue-700 opacity-50">
                {getRelativeTime(publication.createdAt)}
              </span>
            </p>

            <div
              className="break-word my-3  pb-3 text-xs font-semibold text-black"
              style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}
            >
              {publication?.metadata?.content && (
                <p
                  className={clsx(
                    'mt-4 opacity-80',
                    clamped ? 'line-clamp-3' : ''
                  )}
                >
                  <InterweaveContent content={publication.metadata.content} />
                </p>
              )}
              {showMore && (
                <div className="mt-3 inline-flex">
                  <button
                    type="button"
                    onClick={() => setClamped(!clamped)}
                    className="flex items-center text-sm text-blue-700 opacity-80 outline-none hover:opacity-100 dark:text-blue-700"
                  >
                    {clamped ? (
                      <>
                        Show more{' '}
                        <HiOutlineChevronUp className="ml-1 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        Show less{' '}
                        <HiOutlineChevronDown className="ml-1 h-3 w-3" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <Link
            className="pointer-events-auto "
            href={`/post/${publication.id}`}
            key={publication.id}
          >
            <span className="flex-shrink-0 p-1 text-sm font-extralight text-black ">
              Details...
            </span>
          </Link>
        </div>

        {
          <div className="mr-6 mt-6">
            <div>
              <button>
                {
                  <CommentOptions
                    video={publication}
                    setShowReport={setShowReport}
                  />
                }
              </button>
            </div>
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
      <div className="cursor-pointer rounded-xl p-2">
        <ProfileVideos />
      </div>

      <div className="flex flex-row space-x-3 py-3">
        <p className="text-black-400 block pl-1 text-xs font-semibold md:hidden">
          {' '}
          {likes} Likes
        </p>
        <p className="text-black-400 block text-xs font-semibold md:hidden">
          {' '}
          {comments} Comments
        </p>
        <p className="text-black-400 block text-xs font-semibold md:hidden">
          {' '}
          {mirrors} Mirrors
        </p>
        <p className="text-black-400 block text-xs font-semibold md:hidden">
          {' '}
          {collects} Collects
        </p>
      </div>

      <div className="ml-auto flex">
        <button className="block pb-2 pr-2 md:hidden ">
          <LikeButton publication={publication as Publication} />
        </button>
        <button className="block pb-2 pr-2 md:hidden">
          <CommentButton publication={publication as Publication} />
        </button>
        <button className="block pb-2 pr-2 md:hidden">
          <MirrorButton publication={publication as Publication} />
        </button>
        <button className="block pb-2 pr-2 md:hidden">
          <CollectButton publication={publication as Publication} />
        </button>
        <button
          className="block pb-2 pr-2 md:hidden"
          onClick={() => setShowShare(true)}
        >
          <ShareButton publication={publication as Publication} />
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
