import Link from 'next/link';
import { Image } from '@/components/UI/Image';
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

import { SIGN_IN_REQUIRED_MESSAGE } from '@/constants';
import toast from 'react-hot-toast';
import { getRelativeTime } from '@/utils/functions/formatTime2';

import CommentModal from '../Bytes/CommentModal';
import Collect from '../Publication/Actions/Collect';
import CommentOptions from '../Bytes/CommentOptions';

interface Props {
  publication: Publication;
  video: Publication;
  onDetail: (video: Publication) => void;
  following: boolean;
  setFollowing: (following: boolean) => void;

  isShow: boolean;
}
const VideoCard: FC<Props> = ({
  publication,
  onDetail,
  setFollowing,
  following
}) => {
  const router = useRouter();

  const bytesContainer = useRef<HTMLDivElement>(null);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const currentViewingId = useAppStore((state) => state.currentviewingId);
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const [byte, setByte] = useState<Publication>();

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
  const [show, setShow] = useState(false);

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
    <div className="justify-content break-word mt-3 flex w-full flex-col rounded-xl border-0 border-b-2 border-gray-200 bg-[#F2F6F9] dark:bg-black pb-0 md:pb-6">
      
      <div className="cursor-pointer rounded-xl">
        {isMirror ? (
          <>
            <span className="text-xs font-semibold text-gray-500">
              'Mirror by {profile?.id}'
            </span>
            <ByteVideo
              setFollowing={setFollowing}
              key={`${publication?.id}_${publication.createdAt}1`}
              onDetail={onDetail}
              isShow={show}
              video={publication as Publication}
            />
          </>
        ) : (
          <ByteVideo
            setFollowing={setFollowing}
            key={`${publication?.id}_${publication.createdAt}1`}
            onDetail={onDetail}
            isShow={show}
            video={publication as Publication}
          />
        )}
      </div>
    </div>
  );
};

export default VideoCard;
