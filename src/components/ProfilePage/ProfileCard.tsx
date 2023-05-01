//this is just the profile pic and info 

import React, { Dispatch, FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile} from '@/utils/lens';
import{ sanitizeIpfsUrl} from '@/utils/sanitizeIpfsUrl'
import FollowButton from  "@/components/Buttons/FollowButton";
import { useAppStore } from "src/store/app";
import MesssageIcon from 'src/components/Messages/MessageIcon';

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
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
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




interface Props {
    profile: Profile
    setFollowing: Dispatch<boolean>
    following: boolean
}
    const ProfileCard: FC<Props> = ({ profile, setFollowing, following }) => {
        const currentProfile = useAppStore((state) => state.currentProfile);
        const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
        const [showFollowersModal, setShowFollowersModal] = useState(false);
        const [showFollowingModal, setShowFollowingModal] = useState(false);

        const itsNotMe = profile?.id !== currentProfile?.id
        const videos = showUserVideos ? 'flex text-center border-2 border-black' : 'border-2 border-black text-center text-black';
        const liked = !showUserVideos ? 'flex text-center border-2 border-black' : 'border-2 border-black text-center text-black';

        const [conversationKey, setConversationKey] = useState<string | null>(null);
        const [profileId, setProfileId] = useState<string | null>(null);

        const [showSearchModal, setShowSearchModal] = useState(false);
        const onProfileSelected = (profile: Profile) => {
            const conversationId = buildConversationId(currentProfile?.id, profile.id);
            const conversationKey = buildConversationKey(profile.ownedBy, conversationId);
            addProfileAndSelectTab(conversationKey, profile);
            router.push(`/messages/${conversationKey}`);
            setShowSearchModal(false);
        };

        function addProfileAndSelectTab(conversationKey: any, profile: Profile) {
            throw new Error('Function not implemented.');
        }
        
        
        
        
        

        return (
            <div className="flex justify-center mx-4">
             <MetaTags title={`User • ${profile?.name} on ${APP_NAME}`}/>
                <div className="w-full  max-w-[1150px]">   
                <Cover
                  cover={
                    profile?.coverPicture?.__typename === 'MediaSet'
                      ? profile?.coverPicture?.original?.url
                      : `${STATIC_IMAGES_URL}`}/>
                     <div className="flex border-4 rounded-3xl bg-cyan-200 border-black justify-center">
                            <Image
                            src={getAvatar(profile)}
                            alt="profile picture"
                            height={80}
                            width={80}
                            className="rounded-full intrinsic border-2 border-blue-500"
                            />
                        </div>
                        <div className="flex bg-cyan-200 border-4 border-t-2 h-45 border-black rounded-2xl p-2 gap-0.2">
                            <div className='flex flex-col justify-center p-1'>
                                <h1 className="text-lg p-1  font-bold capitalize">
                                {profile?.name}
                                </h1>
                                <Slug className=" pl-1.5 xs:text-base" slug={formatHandle(profile?.handle)} prefix="@" />
                     <div className="flex-shrink-0 pl-1.5 pt-1 ">
                           {itsNotMe ? (
                             <div>
                            { following ? (
                                <UnfollowButton setFollowing={ setFollowing } profile={ profile as Profile } />
                            ) : (
                               <FollowButton setFollowing={ setFollowing } profile={ profile as Profile }/>
                            )
                            }
                            </div>
                           ) : (
                            <div className='flex pl-50'>
                            <button className='active:bg-violet-600 py-1 px-1 drop-shadow-xl rounded-full text-xs mt-2 border-2 border-black  hover:text-[#000000] hover:bg-[#57B8FF] transition cursor-pointer bg-blue-500 text-[#000000] font-semibold'>
                                <Link href='/live'> View Live</Link>
                            </button>
                            </div>
                           )
                           } 
                           
                               <div className="mr-0 font-semibold sm:mr-10 pt-5 break-word leading-md linkify text-xs"
                               style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
                               <text>{profile?.bio}</text>

                     </div>
                             
                    </div>
    
                            </div>
                        </div> 
                        <Link href={`/messages`}>
                            <ChatBubbleOvalLeftIcon  className='h-6 w-6 text-black' />
                            
                        </Link>
                        

    
                        <div className="flex gap-4 mt-3 cursor-pointer" onClick={() => { setShowFollowingModal(!showFollowingModal) }}>
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
                                <Followers profileId={profile?.id} />
                            </Modal>
                        </div>
                        </div>
                        <div className='flex-1 text-center gap-10 p-5 border-4 mb-5 mt-5 border-2 rounded-full border-black bg-blue-100 w-full'>
                        <span className={`text-sm  bg-blue-500  rounded-full items-center  py-3 px-3  font-semibold cursor-pointer ${videos} mt-2`} onClick={() => setShowUserVideos(true)}>
                        Videos
                        </span>
                        <span className={`text-sm bg-blue-500  rounded-full items-center  py-3 px-3 font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                        Collected
                        </span>
                        </div>
                    {(showUserVideos) ? <ProfileVideos /> : <CollectedVideos profile={profile as Profile} />}
                </div>
                <BottomNav />
            </div>
            )
    }

export default ProfileCard;

