
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
import Tooltip from '../Upload/Tooltip';
import MirrorOutline from '../UI/Icons/MirrorOutline';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';

type Props = {
  video: Publication;
  

};

const ByteActions: FC<Props> = ({ video }) => {
  const [showShare, setShowShare] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const setMute = useAppStore((state) => state.setMute)
  const [isPlaying, setPlay] = useState(true)
  const mute = useAppStore((state) => state.isMute)
  const vidEl = document.querySelector(`#currentVideo`)
  const handleClickMute = (e: any) => {
  
    e.stopPropagation();
    const elVol = vidEl && vidEl.querySelectorAll<HTMLButtonElement>(`button[volume]`)[0]
    if (!elVol) {
      return
    }
    const vol = elVol.getAttribute('title')
    const isMuted = vol ? vol?.includes('Mute') : false;
    if (mute) {
      isMuted && elVol.click()
    } else {
      !isMuted && elVol.click()
    }
    setMute && setMute(isMuted);
  }

  return (
    <div className="w-12 flex-col items-center justify-between md:flex md:w-14">
      <div className="flex justify-center space-y-4 p-2 md:flex-col">
       
      </div>
      <div className="items-center space-y-1.5 pt-2.5 md:flex md:flex-col">
        <div className='cursor-pointer '>
        <button className='mr-5' onClick={handleClickMute}>
    {mute ? <MdVolumeOff className='w-6 h-6' fill='white' />
      : <MdVolumeUp className='w-6 h-6' fill='white' />}
  </button>
        </div>
        <div className="text-white pr-1 pb-2 md:pr-5 md:text-inherit">
        <LikeButton publication={video}  />
        </div>
        <div className="w-full pr-6 pb-2 text-center text-white md:text-inherit">
          <CommentModal
            trigger
            
            publication={video}
          />
        </div>
        <button className="mt-0.5  dark:text-white md:pr-5 block pb-2 pr-2">
          <ShareMenu
            publication={video as Publication}
            showCount={true}
          />
        </button>
        {video?.collectModule?.__typename !== 'RevertCollectModuleSettings' && (
          <div className="hidden w-full pb-3 text-center md:block">
             <Collect publication={video as Publication} showCount={false} />
            
          </div>
        )}
      </div>
      <ShareModal publication={video} show={showShare} setShowShare={setShowShare} />
     
    </div>
  )
}

export default ByteActions
