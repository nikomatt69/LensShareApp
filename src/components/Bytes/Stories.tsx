
import { Comment, FeedEventItemType, Profile, Publication, PublicationMainFocus, PublicationSortCriteria, useExploreFeedLazyQuery, usePublicationLazyQuery } from '@/utils/lens/generatedLenster';
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
import { Image } from '@/components/UI/Image';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import getMedia from '@/lib/getMedia';


import { useAppStore } from '@/store/app';
import PublicationActions from '../Publication/Actions';

import NewPublication from '../Composer/NewPublication';
import ByteVideo from './ByteVideo';
import { Card } from '../UI/Card';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { APP_ID, LENSTUBE_BYTES_APP_ID } from '@/constants';
import router from 'next/router';
import Video from '../HomePage/Video';
import SinglePublication from '../Composer/SinglePublication';
import Feed from '../Subscriptions/Feed';
import FeedRender from '../Subscriptions';
import Stories from '@/components/Stories';
import FeedStory from '../Subscriptions/FeedStory';
import InfiniteScroll from 'react-infinite-scroll-component';
import InfiniteLoader from '../UI/InfiniteLoader';
import { useFeedQuery } from '@/utils/lens/generated';
import ProfileVideos from '../ProfilePage/ProfileVideos';
import StoryRender from '../Subscriptions/StoryRender';
type Props = {
  trigger: React.ReactNode;
  publication: Publication;
  profile :Profile

};

const StoriesRender: FC<Props> = ({
  trigger,
  publication,
  profile

}) => {
  const [show, setShow] = useState(false);
  const [currentViewingId, setCurrentViewingId] = useState('')
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [showModal, setShowModal] = useState(false);
  const profilePic = currentProfile?.picture;



  return (
    <>
      <button
        type="button"
        className="focus:outline-none"
        onClick={() => setShow(true)}
      >
         <div
        className="w-14 h-14 md:w-22 overflow-y-auto pl-4 md:h-22 md:mx-auto"
    
      >
        
          <Image
            
            src={getAvatar(profile)}
            className="rounded-full"
         
            alt={formatHandle(profile?.handle)}
            data-testid="profile-avatar"
          />
         
          
        
      </div>
        {trigger}
      </button>
      <FullScreenModal
        panelClassName="max-w-lg bg-[#F2F6F9] dark:bg-black sm:h-[80vh] scrollbar overflow-y-auto  rounded-xl lg:ml-9"
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
        <div className=' overflow-y-auto'>
        
       <ProfileVideos/>
       </div>
      
        


      </FullScreenModal>
    </>
  );
};

export default StoriesRender;
  
