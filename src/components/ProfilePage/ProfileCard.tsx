//this is just the profile pic and info 

import React, { Dispatch, FC, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile, Publication} from '@/utils/lens/generatedLenster';
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import FollowButton from  "@/components/Buttons/FollowButton";
import { useAppStore } from "src/store/app";
import MesssageIcon from 'src/components/Messages/MessageIcon';
import clsx from 'clsx';
import ProfileVideos from "@/components/ProfilePage/ProfileVideos";
import UnfollowButton from '../Buttons/UnfollowButton';
import getAvatar from '@/lib/getAvatar';
import CollectedVideos from '@/components/ProfilePage/CollectedVideos';
import { Modal } from '../UI/Modal';
import Followers from './Followers';
import Following from './Following';
import Link from 'next/link';
import { RiLiveLine } from 'react-icons/ri';
import { GoVerified } from 'react-icons/go'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid';
import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, Cog6ToothIcon, CogIcon, MapIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import buildConversationId from '@/utils/functions/buildConversationId';
import { buildConversationKey } from '@/utils/functions/conversationKey';
import router, { useRouter } from 'next/router';
import Cover from './Cover';
import { APP_NAME, STATIC_IMAGES_URL } from '@/constants';
import formatHandle from '@/utils/functions/formatHandle';
import Slug from '../UI/Slug';
import { format } from 'url';
import BottomNav from '../Navs/BottomNav';
import MetaTags from '../UI/MetaTags';
import getProfilePicture from '@/utils/functions/getProfilePicture';
import MirrorVideos from '../Buttons/Mirrors/MirrorVideos';
import { Card } from '../UI/Card';
import StatsCard from '@/abi/Stats';
import { count } from 'console';
import Stats from '@/abi/Stats';
import imageCdn from '@/lib/imageCdn';
import CogOutline from '../UI/Icons/CogOutline';
import { SpaceMetadata } from '@/typesLenster';
import getPublicationAttribute from '@/utils/functions/getPublicationAttribute';
import { useProfilesQuery } from '@/utils/lens/generatedLenster';
import InterweaveContent from '../UI/InterweaveContent';
import ProfileAudio from './ProfileAudio';
import ProfileAudioFeed from './ProfileAudioFeed';
import { useCounter } from 'usehooks-ts';
import NewPost from '../Composer/Post/New';
import NewPublication from '../Composer/NewPublication';
import { useGlobalModalStateStore } from '@/store/modals';
import Message from '../Profile/Message';
import { TabValues, useMessageStore } from '@/store/message';
import { useTheme } from 'next-themes';
import { useMessageDb } from '@/lib/useMessageDb';
import { MessageTabs } from '@/enums';
import sanitizeDisplayName from '@/utils/sanitizeDisplayName';
import { LightBox } from '../UI/LightBox';
import formatAddress from '@/lib/formatAddress';
import getProfileAttribute from '@/lib/getProfileAttribute';
import { Button } from '../UI/Button';





interface Props {
    profile: Profile
    setFollowing: Dispatch<boolean>
    following: boolean

    }
    const ProfileCard: FC<Props> = ({ profile, setFollowing, following}) => {
        const currentProfile = useAppStore((state) => state.currentProfile);
        const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
        const [showUserMirrorVideos, setShowUserMirrorVideos] = useState<Boolean>(true);
        const [showCollectedUserVideosModal, setShowCollectedUserVideosModal] = useState(false);
        const [showFollowersModal, setShowFollowersModal] = useState(false);
        const [showFollowingModal, setShowFollowingModal] = useState(false);
        const [showStatsModal, setShowStatsModal] = useState(false);
        const [showUserAudio, setShowUserAudio] = useState<Boolean>(true);
        const setShowNewPostModal = useGlobalModalStateStore(
            (state) => state.setShowNewPostModal
            
        );
        
          const showNewPostModal = useGlobalModalStateStore(
            (state) => state.showNewPostModal
        );
        const [expandedImage, setExpandedImage] = useState<string | null>(null);
        
        


        const itsNotMe = profile?.id !== currentProfile?.id
        const videos = showUserVideos ? 'text-center border-2 border-black text-white' : 'border-2 border-black text-center text-black';
        const mirrorvideos = !showUserMirrorVideos ? 'text-center border-2 border-black text-white' : 'border-2 border-black text-center text-black';
        const liked = !showUserVideos ? 'text-center border-2 border-black text-white' : 'border-2 border-black text-center text-black';

        const [conversationKey, setConversationKey] = useState<string | null>(null);
        const [profileId, setProfileId] = useState<string | null>(null);

        const [showSearchModal, setShowSearchModal] = useState(false);

        const router = useRouter();
      
        const { persistProfile } = useMessageDb();
        const setSelectedTab = useMessageStore((state) => state.setSelectedTab);

        const onMessageClick = () => {
            if (!currentProfile) {
              return;
            }
            const conversationId = buildConversationId(currentProfile.id, profile.id);
            const conversationKey = buildConversationKey(
              profile.ownedBy,
              conversationId
            );
            persistProfile(conversationKey, profile);
            const selectedTab: TabValues = profile.isFollowedByMe
              ? MessageTabs.Lens
              : MessageTabs.Requests;
            setSelectedTab(selectedTab);
            router.push(`/messages/${conversationKey}`);
          };

          const MetaDetails = ({
            children,
            icon,
            dataTestId = ''
          }: {
            children: ReactNode;
            icon: ReactNode;
            dataTestId?: string;
          }) => (
            <div className="flex items-center gap-2" data-testid={dataTestId}>
              {icon}
              <div className="text-md truncate">{children}</div>
            </div>
          );
        
          const followType = profile?.followModule?.__typename;
        
        
    
        
        const isActivePath = (path: string) => router.pathname === path


        return (
            <div className="flex justify-center mx-4">
             <MetaTags title={`User • ${profile?.name} ${APP_NAME}`}/>
                <div className="w-full sm:max-w-[680px] xs:max-w-[680px] max-w-[1150px]">   
                
                <div className="relative -mt-24 h-32 w-32 sm:-mt-32 sm:h-52 sm:w-52">
        <Image
          onClick={() => setExpandedImage(getAvatar(profile))}
          src={getAvatar(profile)}
          className="h-32 w-32 cursor-pointer rounded-full bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52"
          height={128}
          width={128}
          alt={formatHandle(profile?.handle)}
          data-testid="profile-avatar"
        />
        <LightBox
          show={Boolean(expandedImage)}
          url={expandedImage}
          onClose={() => setExpandedImage(null)}
        />
      </div>
      <div className="space-y-1 py-2">
        <div className="flex items-center gap-1.5 text-2xl font-bold">
          <div className="truncate" data-testid="profile-name">
            {sanitizeDisplayName(profile?.name) ??
              formatHandle(profile?.handle)}
          </div>
          
          
        </div>
        <div
          className="flex items-center space-x-3"
          data-testid="profile-handle"
        >
          {profile?.name ? (
            <Slug
              className="text-sm sm:text-base"
              slug={formatHandle(profile?.handle)}
              prefix="@"
            />
          ) : (
            <Slug
              className="text-sm sm:text-base"
              slug={formatAddress(profile?.ownedBy)}
            />
          )}
          {currentProfile &&
            currentProfile?.id !== profile?.id &&
            profile?.isFollowing && (
              <div className="rounded-full bg-gray-200 px-2 py-0.5 text-xs dark:bg-gray-700">
               Follows you
              </div>
            )}
        </div>
           
                       <div className="right-2 display:inline-block pt-1 ">
           
                           {itsNotMe ? (
                             <div className='right-2 text-md  fl'>
         
                            { following ? (
                                <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile }  />
                            ) : (
                               <FollowButton setFollowing={ setFollowing } profile={ profile as Profile }/>
                            )
                            }
                            <div className='mt-3'>
                            
            </div>
                            </div>

                       
                           ) : (
                            <div className='right-1'>
                                 {currentProfile?.id === profile?.id }
            <Link href="/settings">
              <Button
                variant="secondary"
                icon={<CogIcon className="h-5 w-5" />}
                outline
              >
                
              </Button>
            </Link>
                            
                            </div>
                           )
                           }  
                          
                        </div> 
                    </div>
                    
                    <div className="flex gap-4 mb-4 justify-center">
                    <div className="flex justify-center items-center text-center object-center gap-4 mt-3 cursor-pointer" onClick={() => { setShowFollowingModal(!showFollowingModal) }}>
                            <div className="flex items-center text-md margin-1 rounded-3xl gap-2">
                                <span className="font-bold text-sx"> {profile?.stats.totalFollowing} </span>
                                <span>Following</span>
                                <Modal
                                title="Following"
                                show={showFollowingModal}
                                onClose={() => setShowFollowingModal(false)}
                                
                                >
                                    <Following profile={profile as Profile} />
                                </Modal>
                            </div>

                        </div>    
                            
                    <div className="flex justify-center items-center text-center object-center gap-4 mt-3 cursor-pointer" onClick={() => { setShowFollowersModal(!showFollowersModal) }}>
                        <div className="flex items-center text-md margin-1 rounded-3xl gap-2">
                            <span className="font-bold text-sx">{profile?.stats.totalFollowers}</span>
                            <span>Followers</span>
                            <Modal
                                title="Followers"
                                show={showFollowersModal}
                                onClose={() => setShowFollowersModal(false)}
                            >
                                <Followers profile={profile?.id} />
                            </Modal>
                        </div>
                    </div>
                        <Message  onClick={onMessageClick}/>

                        
                       </div>
                   
                  
        
         
          {getProfileAttribute(profile?.attributes, 'location') && (
            <MetaDetails
              icon={<MapIcon className="h-4 w-4" />}
              dataTestId="profile-meta-location"
            >
              {getProfileAttribute(profile?.attributes, 'location')}
            </MetaDetails>
          )}
          {profile?.onChainIdentity?.ens?.name && (
            <MetaDetails
              icon={
                <img
                  src={`${STATIC_IMAGES_URL}/social/ens.svg`}
                  className="h-4 w-4"
                  height={16}
                  width={16}
                  alt="ENS Logo"
                />
              }
              dataTestId="profile-meta-ens"
            >
              {profile?.onChainIdentity?.ens?.name}
            </MetaDetails>
          )}
          {getProfileAttribute(profile?.attributes, 'website') && (
            <MetaDetails
              icon={
                <img
                  src={`https://www.google.com/s2/favicons?domain=${getProfileAttribute(
                    profile?.attributes,
                    'website'
                  )
                    ?.replace('https://', '')
                    .replace('http://', '')}`}
                  className="h-4 w-4 rounded-full"
                  height={16}
                  width={16}
                  alt="Website"
                />
              }
              dataTestId="profile-meta-website"
            >
              <Link
                href={`https://${getProfileAttribute(
                  profile?.attributes,
                  'website'
                )
                  ?.replace('https://', '')
                  .replace('http://', '')}`}
                target="_blank"
                rel="noreferrer noopener me"
              >
                {getProfileAttribute(profile?.attributes, 'website')
                  ?.replace('https://', '')
                  .replace('http://', '')}
              </Link>
            </MetaDetails>
          )}
          {getProfileAttribute(profile?.attributes, 'twitter') && (
            <MetaDetails
              icon={
                
                  <img
                    src={`${STATIC_IMAGES_URL}/brands/twitter-dark.svg`}
                    className="h-4 w-4"
                    height={16}
                    width={16}
                    alt="Twitter Logo"
                  />
                
              }
              dataTestId="profile-meta-twitter"
            >
              <Link
                href={`https://twitter.com/${getProfileAttribute(
                  profile?.attributes,
                  'twitter'
                )}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getProfileAttribute(profile?.attributes, 'twitter')?.replace(
                  'https://twitter.com/',
                  ''
                )}
              </Link>
            </MetaDetails>
          )}




          
    </div>
    </div>
  )
}

export default ProfileCard;
