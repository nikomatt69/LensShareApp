import type { Dispatch, FC } from 'react';
import React, { useState } from 'react';
import { RiShareForwardLine } from 'react-icons/ri';
import CommentModal from './CommentModal';
import { FaRegCommentAlt } from 'react-icons/fa';
import ShareModal from '../HomePage/ShareModal';
import ReportModal from '../DetailPage/ReportModal';
import { Profile, Publication } from '@/utils/lens/generatedLenster';
import MirrorButton from '../Buttons/Mirrors/MirrorButton';
import Like from '../Buttons/Likes/Like';
import CollectButton from '../Buttons/Collects/CollectButton';
import CommentButton from '../Buttons/CommentButton';
import LikeButton from '../Buttons/Likes/LikeButton';
import Comments from './FullScreen/Comments';
import ShareButton from '../Buttons/ShareButton';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '@/store/app';
import { useRouter } from 'next/router';
import { profile } from 'console';
import MirrorModal from './MirrorModal';
import ShareMenu from '../Publication/Actions/Share';
import Collect from '../Publication/Actions/Collect';

type Props = {
  video: Publication;
  showDetail?: () => void;
  inDetail?: boolean;
  trigger: React.ReactNode;
  publicationId: Publication;
  publication: Publication;
};

const ByteActions: FC<Props> = ({ video, showDetail, inDetail, trigger }) => {
  const [showShare, setShowShare] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [show, setShow] = useState(false);
  const currentProfile = useAppStore((state) => state.currentProfile);
  const router = useRouter();
  const { id } = router.query;
  const [following, setFollowing] = useState(false);
  const isMirror = video.__typename === 'Mirror';
  const comments = isMirror
    ? video.mirrorOf.stats.totalAmountOfComments
    : video.stats.totalAmountOfComments;

  const profile = id ? currentProfile : video?.profile;

  return (
    <div className="mb-14 ml-4 w-14 flex-col items-center justify-between md:flex md:w-14 md:max-xl:mb-16">
      <div className="items-center space-y-1.5 pt-2.5 md:flex md:flex-col">
        <div className="w-full  text-center text-white md:text-inherit">
          <LikeButton publication={video as Publication} />
        </div>

        <div
          className="w-full pr-7 text-center text-white md:text-inherit"
          onClick={() => setShow(true)}
        >
          <button>
            <CommentModal
              publication={video as Publication}
              trigger={trigger}
              setFollowing={setFollowing}
              following={following}
              profile={currentProfile as Profile}
            />
          </button>
          <p className="hidden text-xs font-semibold text-gray-400 lg:block">
            {comments}
          </p>
        </div>

        <div className="w-full  text-center text-white md:text-inherit">
          <ShareMenu publication={video as Publication} showCount={true} />
        </div>

        <div className="w-full text-center text-white md:text-inherit">
          <Collect publication={video as Publication} showCount={false} />
        </div>
        {/* {video?.collectModule?.__typename !== 'RevertCollectModuleSettings' && (
          <div className="hidden w-full pb-3 text-center md:block">
            <CollectVideo video={video} />
            <div className="text-center text-xs leading-3">
              {video.stats?.totalAmountOfCollects || 'Collect'}
            </div>
          </div>
        )} */}
        <div
          className="w-full  text-center text-white md:text-inherit"
          onClick={() => setShowShare(true)}
        >
          <ShareButton publication={video as Publication} />
        </div>
      </div>
    </div>
  );
};

export default ByteActions;
