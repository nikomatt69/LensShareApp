
import type { Dispatch, FC } from 'react'
import React, { useState } from 'react'
import { RiShareForwardLine } from 'react-icons/ri'
import CommentModal from './CommentModal'
import { FaRegCommentAlt } from 'react-icons/fa'
import ShareModal from '../HomePage/ShareModal'
import ReportModal from '../DetailPage/ReportModal'
import { Profile, Publication } from '@/types/lens'
import MirrorButton from '../Buttons/Mirrors/MirrorButton'
import Like from '../Buttons/Likes/Like'
import CollectButton from '../Buttons/Collects/CollectButton'
import CommentButton from '../Buttons/CommentButton'
import LikeButton from '../Buttons/Likes/LikeButton'
import Comments from './FullScreen/Comments'
import ShareButton from '../Buttons/ShareButton'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/solid'
import { useAppStore } from '@/store/app'
import { useRouter } from 'next/router'
import { profile } from 'console'

type Props = {
  video: Publication
  showDetail?: () => void
  inDetail?: boolean
  trigger: React.ReactNode
  
}

const ByteActions: FC<Props> = ({ video, showDetail, inDetail,trigger }) => {
  const [showShare, setShowShare] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const [show, setShow] = useState(false)
  const currentProfile = useAppStore((state) => state.currentProfile)
  const router = useRouter()
  const { id } = router.query
  const [following, setFollowing] = useState(false)
  const profile =  id ? currentProfile : video?.profile
 

  return (
    <div className="w-14 flex-col items-center justify-between md:flex md:w-14 ml-4 mb-14 md:max-xl:mb-16">
      
      <div className="items-center space-y-1.5 pt-2.5 md:flex md:flex-col">
       
        <div className="w-full  text-center text-white md:text-inherit">
          <LikeButton publication={video as Publication} /> 
           
        </div>

        <div className="w-full text-center text-white md:text-inherit"onClick={() => setShow(true)}>
         <button className="flex items-center drop-shadow-lg border-2 border-black md:border-none bg-blue-500 rounded-lg p-2 md:p-3
          md:hover:bg-[#57B8FF] relative w-max">
            
            <CommentModal video={video as Publication} trigger={trigger} setFollowing={setFollowing} following={following} profile={profile as Profile}  />
          </button>
        </div>

       
        
        <div className="w-full  text-center text-white md:text-inherit">
          <MirrorButton publication={video as Publication} /> 
            
        </div>


        <div className="w-fultext-center text-white md:text-inherit">
          <CollectButton publication={video as Publication} /> 
        </div>
        {/* {video?.collectModule?.__typename !== 'RevertCollectModuleSettings' && (
          <div className="hidden w-full pb-3 text-center md:block">
            <CollectVideo video={video} />
            <div className="text-center text-xs leading-3">
              {video.stats?.totalAmountOfCollects || 'Collect'}
            </div>
          </div>
        )} */}
        <div className="w-full  text-center text-white md:text-inherit"onClick={() => setShowShare(true)}>
          <ShareButton publication={video as Publication} /> 
    </div>
    </div>

     
  </div>
  )
}

export default ByteActions
