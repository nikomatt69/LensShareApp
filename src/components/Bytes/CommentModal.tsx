
import { Profile, Publication } from '@/types/lens'
import type { Dispatch, FC } from 'react'
import React, { useState } from 'react'
import { FaRegCommentAlt } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import FullScreenModal from '../UI/FullScreenModal'
import Comments from '../DetailPage/CommentsBlock/Comments'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid'
import { Modal } from '../UI/Modal'
import Link from 'next/link'
import getAvatar from '@/lib/getAvatar'
import formatHandle from '@/utils/functions/formatHandle'
import UnfollowButton from '../Buttons/UnfollowButton'
import FollowButton from '../Buttons/FollowButton'
import Image from 'next/image'
import getProfilePicture from '@/utils/functions/getProfilePicture'
import getMedia from '@/lib/getMedia'
import CommentsVideo from '../DetailPage/CommentsBlock/Comments'
import CommentsByte from './FullScreen/Comments'
type Props = {
  trigger: React.ReactNode
  video: Publication
  profile: Profile 
  setFollowing: Dispatch<boolean>;
  following: boolean;
}

const CommentModal: FC<Props> = ({ trigger, video ,profile, setFollowing,
  following,}) => {
  const [show, setShow] = useState(false)

  return (
    <>
    <button
      type="button"
      className="focus:outline-none"
      onClick={() => setShow(true)}
    >
      <ChatBubbleLeftEllipsisIcon className='w-4 h-4 font-bold text-black' />
      {trigger}
    </button>
    <FullScreenModal
      panelClassName="max-w-lg lg:ml-9"
      show={show}
      autoClose
    >
      <div className='z-10 max-md:absolute'>
        <button
          type="button"
          className="p-1 focus:outline-none m-4 rounded-full  bg-slate-600"
          onClick={() =>  setShow(false)}
        >
          <MdOutlineClose className='text-white w-4 h-4' />
        </button>
      </div>
      <div className="no-scrollbar max-h-[40vh]  pt-3">
      <Comments
          key={video?.profile.id}
          publication={video as Publication}
        />
      </div>
    </FullScreenModal>
  </>
  )
}

export default CommentModal
