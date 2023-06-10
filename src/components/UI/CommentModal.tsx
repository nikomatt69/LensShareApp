
import type { FC } from 'react'
import React, { useState } from 'react'
import { FaRegCommentAlt } from 'react-icons/fa'
import { MdOutlineClose } from 'react-icons/md'
import FullScreenModal from './FullScreenModal'
import Comments from '../DetailPage/CommentsBlock/Comments'
import { Profile, Publication } from '@/types/lens'

type Props = {
  trigger: React.ReactNode
  video: Publication
  profile: Profile
}

const CommentModal: FC<Props> = ({ trigger, video,profile }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setShow(true)}
      >
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
        <div className="no-scrollbar max-h-[40vh] overflow-y-auto pt-3">
          <Comments profile={profile as Profile} publication={video as Publication}/>
        </div>
      </FullScreenModal>
    </>
  )
}

export default CommentModal
