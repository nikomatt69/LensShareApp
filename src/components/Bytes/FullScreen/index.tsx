
import clsx from 'clsx'
import type { Profile, Publication } from '@/types/lens'
import type { FC } from 'react'
import React, { useLayoutEffect, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { BsFlag } from 'react-icons/bs'
import { MdOutlineClose } from 'react-icons/md'

import TopOverlay from '../TopOverlay'
import Comments from './Comments'
import ByteActions from '../ByteActions'
import router, { useRouter } from 'next/router'
import getThumbnailUrl from '@/utils/functions/getThumbnailUrl'
import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl'
import { useAppStore } from '@/store/app'
import imageCdn from '@/lib/imageCdn'
import usePersistStore from '@/store/persist'
import { SIGN_IN_REQUIRED_MESSAGE } from '@/constants'
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl'
import VideoPlayer from '@/utils/VideoPlayer'
import FullScreenModal from '@/components/UI/FullScreenModal'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'
import useAverageColor from '@/utils/hooks/useAverageColor'
import MobileBottomOverlay from '../MobileBottomOverlay'

type Props = {
    byte: Publication
    bytes: Publication[]
    close: () => void
    isShow: boolean
    index?: number
    profile?: Profile
}
const FullScreen: FC<Props> = ({ byte,
    close,
    bytes,
    isShow,
    index = 0,
    profile

}) => {
    const { pathname, replace, asPath } = useRouter()
    const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId)
    const currentViewingId = useAppStore((state) => state.currentviewingId)
    const videoRef = useRef<HTMLMediaElement>()
    const intersectionRef = useRef<HTMLDivElement>(null)
    const [playing, setPlaying] = useState(false)
    const [video, setVideo] = useState(byte)
    const [showComments, setShowComments] = useState(false)
    const [following, setFollowing] = useState(false)
    const [show, setShow] = useState(false)




    const thumbnailUrl = imageCdn(
        sanitizeIpfsUrl(getThumbnailUrl(video)),
        'thumbnail_v'
    )
    const { color: backgroundColor } = useAverageColor(thumbnailUrl, true)

    const playVideo = () => {
        if (!videoRef.current) {
            console.log("return xxx")
            return
        }
        videoRef.current.currentTime = 0
        videoRef.current.volume = 1
        videoRef.current.autoplay = true
        videoRef.current?.play().catch(() => { })
        setPlaying(true)
    }
    useEffect(() => playVideo(), [])

    useLayoutEffect(() => setVideo(byte), [byte])

    const pauseVideo = () => {
        if (!videoRef.current) {
            return
        }
        videoRef.current.volume = 0
        videoRef.current?.pause()
        videoRef.current.autoplay = false
        setPlaying(false)
    }

    const refCallback = (ref: HTMLMediaElement) => {
        if (!ref) {
            return
        }
        videoRef.current = ref
        playVideo()
    }


    const currentProfileId = usePersistStore((state) => state.currentProfileId)
    const onClickReport = () => {
        if (!currentProfileId) {
            return toast.error(SIGN_IN_REQUIRED_MESSAGE)
        }
    }
    const mute = useAppStore((state) => state.isMute)

    const player = <VideoPlayer
        refCallback={refCallback}
        permanentUrl={getPublicationMediaUrl(video)}
        posterUrl={thumbnailUrl}
        ratio="9to16"
        publicationId={video.id}
   


        options={{
            isCurrentlyShown: true,
            autoPlay: true,
            loop: true,
            loadingSpinner: true,
            muted: mute
        }}
    />

    const displayControl = (videoFull: boolean) => {
        const vidEl = document.querySelector(`#videoFull`)
        const elVol = vidEl && vidEl.querySelectorAll<HTMLButtonElement>(`#videoFull .c-hmIsCl`)[0]
        if (!elVol) {
            return
        }
        elVol.style.visibility = videoFull ? "visible" : "visible"
    }


    const detailNext = (val: 1 | -1) => {
        const index = bytes.findIndex(b => b.id === currentViewingId)
        console.log(currentViewingId, index,val)
        const byte = index >= 0 ? bytes[index + val] : bytes[0]
        if (!byte) {
            return
        }
        const id = byte.id
        setCurrentViewingId(id)

        const nextUrl = `/${id}`
        history.pushState({ path: nextUrl }, '', nextUrl)
        setVideo(byte)
        // console.log(currentViewingId, bytes, byte, index)
        playVideo()
    }


    return (<>

       
        <FullScreenModal
        
            

            panelClassName="max-w-full  max-h-full"
            show={isShow}
            autoClose
        >
            <div
                className="flex bg-cyan-300  snap-center "
                data-testid="byte-video"
                id="videoFull"
            >
                <div className='grow bg-black relative'>
                    
                    <div className='relative  mt-0.5 bg-black  bg-cover bg-center object-contain items-center' style={{ backgroundImage: `url(${thumbnailUrl})` }} >
                        <div className='z-10 absolute'>
                            <button
                                type="button"
                                className=" focus:outline-none rounded-full p-3  bg-slate-600"
                                onClick={() => router.back()}
                            >
                                <MdOutlineClose className='text-white w-6 h-6' />
                            </button>
                        </div>
                        <div className= {clsx("relative backdrop-brightness-[0.2] ")}
                           onMouseEnter={() => displayControl(true)}
                           onMouseLeave={() => displayControl(false)}
                        
                        >
                       
                            <div
                                className="flex  items-center  min-w-[50vh] max-w-[1px] md:rounded-sm m-auto"
                                style={{
                                    backgroundColor: backgroundColor ? backgroundColor : undefined
                                }}
                            >

                                <div
                                    className="absolute"
                                    ref={intersectionRef}
                                    id={video.id}
                                />
                                {currentViewingId === video.id ? player : (
                                    <img
                                        className="w-full  object-contain"
                                        src={thumbnailUrl}
                                        alt="thumbnail"
                                        draggable={false}
                                    />
                                )}
                            </div>
                            <div className="absolute z-40 right-3 bottom-40 ">
                                <ByteActions trigger video={video} inDetail={true} />
                            </div>
                            

                        </div>
                        {<div className="block assolute rounded-b-xl bottom-0.5 left-0 pt-20 mt-4 right-0 ">
                            <MobileBottomOverlay video={video} setFollowing={setFollowing} profile={profile as Profile} following={false}  />
                            </div>}
                        <button
                            type="button"
                            onClick={() => onClickReport()}
                            className=" max-md:hidden inline-flex  bg-gray-300/2 items-center space-x-2 rounded-full px-2 py-1.5 dark:bg-gray-700  hover:bg-gray-800 dark:hover:bg-gray-800 absolute right-5 top-6"
                        >
                            <BsFlag className="h-3.5 w-3.5" fill='white' />
                            <span className="whitespace-nowrap text-white">Report</span>
                        </button>
                        <div className='flex flex-col gap-2 justify-center absolute left-0 top-[calc(50vh-5rem)] z-10 mr-5'>

                            <div className="h-[44px]" >
                                {index > 0 && (<button
                                    className="rounded-full bg-gray-300/20 pl-3 focus:outline-none dark:bg-gray-700  hover:bg-gray-800 dark:hover:bg-gray-800"
                                    onClick={() => detailNext(-1)}
                                >
                                    <ChevronUpIcon className="h-5 w-5" />
                                </button>)}
                            </div>
                            <div className="h-25 w-25" >
                                <button
                                    className="rounded-full bg-gray-300/20 pl-3 focus:outline-none dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-800"
                                    onClick={() => detailNext(1)}
                                >
                                    <ChevronDownIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                       
                    </div>
                </div>
                <div className='flex flex-col w-[30vw] max-w-[544px] p-5 flex-shrink-0 h-screen items-stretch'>
                    <Comments  key={video.profile.id}
                      comment={video as Publication} />
                </div>
            </div>

            {/* <div className="bg-[url('/compare.png')] bg-cover bg-center absolute z-100 top-0 bottom-0 right-0 left-0"></div> */}
        </FullScreenModal>
    </>
    )
}

export default FullScreen
