import { APP_ID } from '@/constants'



import type { GlobalProtocolStats, ProfileStats, Publication } from '@/utils/lens/generatedLenster'

import dynamic from 'next/dynamic'
import React, { FC } from 'react'
import { BsPin, BsPinAngle } from 'react-icons/bs'
import { HiHeart, HiOutlineChatAlt2 } from 'react-icons/hi'
import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { RiArrowLeftRightFill, RiShoppingBag3Fill } from 'react-icons/ri'
import useIsMounted from '@/utils/hooks/useIsMounted'
import { useAppStore } from '@/store/app'
import MetaTags from '@/components/UI/MetaTags'
import Loader from '@/components/UI/Loader'
import { useProfileQuery } from '@/utils/lens/generatedLenster'

interface Props {
    icon: React.ReactNode
    count: number
    text: string
    publications: any
    data : ProfileStats 
    profileId : string
    revenue : number
   
}

const StatCard = dynamic(() => import('./StatCard'))


const Stats : FC<Props> = (
  
   
) => {
    const { mounted } = useIsMounted()
    const currentProfile = useAppStore((state) => state.currentProfile)

    const { data, loading  } = useProfileQuery({
        variables: {
        request: {
            profileId: currentProfile?.id,
            
                
                
        
         
        
            
      
        },
      

            
        
        }
    })



    const stats = data as ProfileStats

    return (
        <>
            <MetaTags title="LensShare Stats" />
            {loading && !mounted ?
                (
                    <Loader />
                ) : (
                    <>
                        <div className='max-w-5xl mx-auto p-3 px-4 md:px-0'>
                            <div className="flex items-center p-3 justify-center mb-7">
                                <h1 className="text-sm font-black uppercase brandGradientText tracking-widest pb-4 relative">
                                    <span>LensShare Stats</span>
                                    <span className="absolute p-2 w-1/2 right-0 mx-auto bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-[#070000]" />
                                </h1>    
                            </div>    
                            <div className="grid grid-cols-2 gap-4 text-xs p-3 justify-center center-items object-center md:grid-cols-2 lg:grid-cols-5">
                                <StatCard
                                    icon={<BsPin size={20} />}
                                    count={currentProfile?.id.stats?.postsTotal}
                                    text="Total Posts"
                                />
                                <StatCard
                                    icon={<HiOutlineChatAlt2 size={20} />}
                                    count={currentProfile?.id.stats?.commentsTotal}
                                    text="Total Comments"
                                />
                                <StatCard
                                    icon={<RiArrowLeftRightFill size={20} />}
                                    count={currentProfile?.id.stats?.mirrorsTotal}
                                    text="Total Mirrors"
                                />
                                
                               
                               
                               
                                
                                
                                
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Stats
