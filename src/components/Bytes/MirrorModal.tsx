import { Profile, Publication } from '@/utils/lens/generatedLenster';
import type { Dispatch, FC } from 'react';
import React, { useState } from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import FullScreenModal from '../UI/FullScreenModal';

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

import CommentsByte from './FullScreen/Comments';
import MirroredList from '@/components/Bytes/MirrorList';
import MirrorOutline from '../Buttons/MirrorOutline';
type Props = {
  trigger: React.ReactNode;
  video: Publication;
  profile: Profile;
  setFollowing: Dispatch<boolean>;
  following: boolean;
  publicationId: Publication;
};

const MirrorModal: FC<Props> = ({
  trigger,
  profile,
  publicationId,
  setFollowing,
  following
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button
        type="button"
        className="cursor-pointer focus:outline-none"
        onClick={() => setShow(true)}
      >
        <div className="flex items-center rounded-full border-2 bg-gray-600/50  p-2 drop-shadow-lg dark:bg-gray-600/50 md:bg-gray-200 md:p-3">
          <MirrorOutline className="h-3 w-3  font-bold" />
        </div>
        {trigger}
      </button>
      <FullScreenModal panelClassName="max-w-lg lg:ml-9" show={show} autoClose>
        <div className="z-10 max-md:absolute">
          <button
            type="button"
            className="m-4 rounded-full bg-slate-600 p-1  focus:outline-none"
            onClick={() => setShow(false)}
          >
            <MdOutlineClose className="h-4 w-4 text-white" />
          </button>
        </div>
        <div className="scrollbar flex max-h-[80%]  pt-3">
          <MirroredList
            publication={publicationId as Publication}
            key={publicationId?.id}
            publicationId={''}
          />
        </div>
      </FullScreenModal>
    </>
  );
};

export default MirrorModal;
