import { Comment, Profile, Publication } from '@/utils/lens/generatedLenster';
import type { Dispatch, FC } from 'react';
import React, { useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import FullScreenModal from '../UI/FullScreenModal';
import Comments from '../DetailPage/CommentsBlock/Comments';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid';
import { Modal } from '../UI/Modal';
import Link from 'next/link';
import getAvatar from '@/lib/getAvatar';
import formatHandle from '@/utils/functions/formatHandle';
import UnfollowButton from '../Buttons/UnfollowButton';
import FollowButton from '../Buttons/FollowButton';
import Image from 'next/image';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import getMedia from '@/lib/getMedia';
import CommentsVideo from '../DetailPage/CommentsBlock/Comments';
import CommentsByte from './FullScreen/Comments';
import { useAppStore } from '@/store/app';
import PublicationActions from '../Publication/Actions';
import Feed from '../Comment/Feed';
import NewPublication from '../Composer/NewPublication';
type Props = {
  trigger: React.ReactNode;
  publication: Publication;
  profile: Profile;
  setFollowing: Dispatch<boolean>;
  following: boolean;
};

const CommentModal: FC<Props> = ({
  trigger,
  publication,
  profile,
  setFollowing,
  following
}) => {
  const [show, setShow] = useState(false);
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const currentViewingId = useAppStore((state) => state.currentviewingId);

  return (
    <>
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setShow(true)}
      >
        <div className="flex items-center overflow-y-auto rounded-full bg-gray-600/50 p-2  drop-shadow-lg dark:bg-gray-600/50 md:bg-gray-200">
          <FaRegCommentAlt className="h-3 w-3 font-bold" />
        </div>
        {trigger}
      </button>
      <FullScreenModal
        panelClassName="max-w-lg bg-[#C0C0C0] overflow-y-hidden overflow-y-auto rounded-xl lg:ml-9"
        show={show}
        autoClose
      >
        <div className="z-10 max-md:absolute">
          <button
            type="button"
            className="m-4 rounded-full bg-slate-600 p-1  focus:outline-none"
            onClick={() => setShow(false)}
          >
            <MdOutlineClose className="h-4 w-4 text-white" />
          </button>
        </div>
        <div className="ml-12 mt-5 items-center justify-center p-5 text-center">
          <PublicationActions publication={publication} />
        </div>
        <div className="scrollbar-text-blue flex max-h-[75%] overflow-y-auto  bg-white  pt-3">
          <Feed publication={publication as Comment} />
        </div>
        <NewPublication publication={publication} />
      </FullScreenModal>
    </>
  );
};

export default CommentModal;
