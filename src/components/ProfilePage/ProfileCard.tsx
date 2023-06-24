//this is just the profile pic and info 

import React, { Dispatch, FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile, Publication} from '@/types/lens';
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
import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import buildConversationId from '@/utils/functions/buildConversationId';
import { buildConversationKey } from '@/utils/functions/conversationKey';
import router from 'next/router';
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





interface Props {
    profile: Profile
    setFollowing: Dispatch<boolean>
    following: boolean
    space: SpaceMetadata
    video : Publication
    }
    const ProfileCard: FC<Props> = ({ profile, setFollowing, following,space,video}) => {
        const currentProfile = useAppStore((state) => state.currentProfile);
        const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
        const [showUserMirrorVideos, setShowUserMirrorVideos] = useState<Boolean>(true);
        const [showCollectedUserVideosModal, setShowCollectedUserVideosModal] = useState(false);
        const [showFollowersModal, setShowFollowersModal] = useState(false);
        const [showFollowingModal, setShowFollowingModal] = useState(false);
        const [showStatsModal, setShowStatsModal] = useState(false);
        const [showUserAudio, setShowUserAudio] = useState<Boolean>(true);
        
        
        


        const itsNotMe = profile?.id !== currentProfile?.id
        const videos = showUserVideos ? 'text-center border-2 border-black text-white' : 'border-2 border-black text-center text-black';
        const mirrorvideos = !showUserMirrorVideos ? 'text-center border-2 border-black text-white' : 'border-2 border-black text-center text-black';
        const liked = !showUserVideos ? 'text-center border-2 border-black text-white' : 'border-2 border-black text-center text-black';

        const [conversationKey, setConversationKey] = useState<string | null>(null);
        const [profileId, setProfileId] = useState<string | null>(null);

        const [showSearchModal, setShowSearchModal] = useState(false);
    
        
        const isActivePath = (path: string) => router.pathname === path


        return (
            <div className="flex justify-center mx-4">
             <MetaTags title={`User • ${profile?.name} ${APP_NAME}`}/>
                <div className="w-full  max-w-[1150px]">   
                <Cover
                
                  cover={
                    profile?.coverPicture?.__typename === 'MediaSet'
                      ? profile?.coverPicture?.original?.url
                      : imageCdn(`${STATIC_IMAGES_URL}`)}/>
                     <div className="flex border-4 bg-gradient-to-b from-gray-900 to-transparent rounded-3xl bg-blue-500 border-black justify-center">
                            <Image
                            src={getAvatar(profile)}
                            alt={getAvatar(profile)}
                            height={80}
                            width={80}
                            className="rounded-full intrinsic border-2 border-blue-500"
                            />
                        </div>
                        <div className="flex bg-cyan-200 border-4 border-t-2 h-45 border-black rounded-2xl p-2 gap-0.2">
                            <div className='flex flex-col justify-center p-1'>
                                <h1 className="text-lg break-words p-1  font-bold capitalize">
                                {profile?.name}
                                </h1>
                                <Slug className=" pl-1.5 xs:text-base" slug={formatHandle(profile?.handle)} prefix="@" /> 
                           
                               <div className="mr-0 font-semibold sm:mr-10 pt-3 break-word leading-md linkify text-xs"
                               style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                               {profile?.bio} 
                               </div>
                   </div>
                       <div className="right-2 display:inline-block pt-1 ">
                           {itsNotMe ? (
                             <div className='right-2 fl'>
                            { following ? (
                                <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile } />
                            ) : (
                               <FollowButton setFollowing={ setFollowing } profile={ profile as Profile }/>
                            )
                            }
                            </div>
                           ) : (
                            <div className='right-1'>
                                 <button className='active:bg-violet-600 py-1 px-1 drop-shadow-xl rounded-full text-xs mt-2 border-2 border-black  hover:text-[#000000] hover:bg-[#57B8FF] transition cursor-pointer bg-blue-500 text-[#000000] font-semibold'>
                                <Link href={`/musicfeed`}>MusicFeed</Link>
                            </button>
                            
                            </div>
                           )
                           }    
                        </div> 
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Link href={(profileId ? `/messages/${conversationKey}` : '/messages')} >
                            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 font-bold mt-2 cursor-pointer" />
                        </Link>

                        <Link href='/settings'>
                        <Cog6ToothIcon
                            className="h-6 w-6 mt-2 cursor-pointer"
                           />
                        </Link>
                        <button onClick={() => setShowStatsModal(true)} >
                           <span className="flex justify-center">
                            <ChartBarIcon className="h-5 w-5 mt-2 cursor-pointer" />
                          </span>
                            <Modal
                                title="Stats"
                                show={showStatsModal}
                                onClose={() => setShowStatsModal(!showStatsModal)}
                            >
                               <Stats profileId={profile?.id} icon={undefined} count={0} text={`Stats • ${profile?.name}`} publications={profile?.stats?.totalPosts} data={{
                                    commentsTotal: profile?.id.stats?.totalComments,
                                    id:currentProfile?.id,
                                    mirrorsTotal: profile?.id.stats?.totalMirrors,
                                    postsTotal: profile?.id.stats?.totalPosts,
                                    publicationsTotal: profile?.id.stats?.totalPublications,
                                    /** Total collects count */
                                    totalCollects: profile?.id.stats?.totalCollects,
                                    totalComments: profile?.id.stats?.totalComments,
                                    totalFollowers: profile?.id.stats?.totalFollowers,
                                    totalFollowing: profile?.id.stats?.totalFollowing,
                                    totalMirrors: profile?.id.stats?.totalMirrors,
                                    totalPosts: profile?.id.stats?.totalPosts,
                                    totalPublications: profile?.id.stats?.totalPublications,
                                  
                                    
                                  


                                  
                                }}  revenue={0}  /> 
                            </Modal>
                       </button>
                        
                    </div>       
                    <div className="flex justify-center items-center text-center object-center gap-4 mt-3 cursor-pointer" onClick={() => { setShowFollowingModal(!showFollowingModal) }}>
                            <div className="flex items-center text-sm margin-1 rounded-3xl gap-2">
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
                            
                        <div className="flex items-center text-sm  margin-1 rounded-3xl gap-2 cursor-pointer" onClick={() => { setShowFollowersModal(!showFollowersModal) }}>
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
                    <div className='flex-1 text-center gap-8 p-4 border-4 mb-5 mt-5 items-center content-center  rounded-full border-black bg-blue-100 w-full'>
                        <span className={`text-sm  bg-blue-500  rounded-full items-center content-center py-3 px-3 hover:text-white font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(true)}>
                        Videos
                        </span>
                        <span className={`text-sm  bg-blue-500  rounded-full items-center content-center py-3 px-3 hover:text-white font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                        Mirrors
                        </span>
                        <span className={`text-sm  bg-blue-500  rounded-full items-center content-center py-3 px-3 hover:text-white font-semibold cursor-pointer ${liked} mt-2`} onClick={() => { setShowCollectedUserVideosModal (!showCollectedUserVideosModal) }}>
                        Collected
                        </span>
                      
                       


                        <div className='p-1 items-center rounded-xl'>    
                        <Modal 
                         title="Collected Videos"
                         show={showCollectedUserVideosModal}
                         onClose={() => setShowCollectedUserVideosModal(false)}
                         
                         >
                        <div className='p-1 items-center rounded-xl'>
                         <Card className=' w-full object-contain object-center' >
                            <CollectedVideos profile={profile as Profile} />
                         </Card >
                         </div>
                        </Modal>
                        </div>
                    </div>
                    {(showUserVideos) ? <ProfileVideos /> :  <MirrorVideos />}
                    
                   
                   </div>
                <BottomNav />
            </div>
            )
    }

export default ProfileCard;
