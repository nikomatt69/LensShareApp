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
import CommentOutline from '../UI/Icons/CommentOutline';
import Mirror from '../Publication/Actions/Share/Mirror';
import CommentOptions from './CommentOptions';

type Props = {
  video: Publication;
  showDetail?: () => void;
  inDetail?: boolean;
  trigger: React.ReactNode;
  publicationId: Publication;
  publication: Publication;
  showCount?: boolean;
};

const ByteActions: FC<Props> = ({ video, showDetail, inDetail, trigger, showCount }) => {
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
    <div className="w-12 flex-col items-center justify-between md:flex md:w-14">
      <div className='pr-5'><CommentOptions setShowReport={setShowReport}  video={video as Publication}/></div>
      
      <div className="items-center space-y-1.5 pt-2.5 md:flex md:flex-col">
        <div className="text-white md:pr-5 md:text-inherit">
        <LikeButton publication={video}  />
        </div>
        <div className="w-full text-center pr-5 text-white md:text-inherit">
          <CommentModal
            trigger={trigger}
            publication={video as Publication}
            setFollowing={setFollowing}
            following={following}
            profile={currentProfile as Profile}
          />
        </div>
        <div className="w-full text-center text-white md:text-inherit">
         
        </div>

        <div className="w-full  text-center text-white md:text-inherit">
          <ShareMenu publication={video as Publication} showCount={true} />
        </div>

        <div className="w-full text-center text-white md:text-inherit">
          <Collect publication={video as Publication} showCount={false} />
        </div>
       
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
