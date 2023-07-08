
import { Profile, Publication } from '@/utils/lens/generatedLenster'
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
import MirroredList from '@/components/Bytes/MirrorList'
import MirrorOutline from '../Buttons/MirrorOutline'
type Props = {
  trigger: React.ReactNode
  video: Publication
  profile: Profile 
  setFollowing: Dispatch<boolean>;
  following: boolean;
  publicationId: Publication

}

const MirrorModal: FC<Props> = ({ trigger,profile,publicationId, setFollowing,
  following,}) => {
  const [show, setShow] = useState(false)

  return (
    <>
    <button
      type="button"
      className="focus:outline-none cursor-pointer"
      onClick={() => setShow(true)}
    >
       <div className="flex items-center drop-shadow-lg border-2 rounded-full  md:bg-gray-200 bg-gray-600/50 dark:bg-gray-600/50 p-2 md:p-3">
          <MirrorOutline  className="w-3 h-3  font-bold" />
           </div>
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
      <div className="flex scrollbar max-h-[80%]  pt-3">
      <MirroredList publication={publicationId as Publication} key={publicationId?.id} publicationId={''}        
          
        
        />
      </div>
    </FullScreenModal>
  </>
  )
}

export default MirrorModal
