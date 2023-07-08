import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import type { FC } from "react";
import type { Publication } from "@/utils/lens/generatedLenster";
import LikeButton from  "@/components/Buttons/Likes/LikeButton";
import MirrorButton from  "@/components/Buttons/Mirrors/MirrorButton";
import CommentButton from  "@/components/Buttons/CommentButton";
import CollectButton from  "@/components/Buttons/Collects/CollectButton";
import getMedia from "@/lib/getMedia";
import { useRouter } from "next/router";
import ShareIcon from "@heroicons/react/24/outline/ShareIcon";

import { getPublicationMediaUrl } from "@/utils/functions/getPublicationMediaUrl";

import imageCdn from "@/lib/imageCdn";
import VideoPlayer from "@/utils/VideoPlayer";
import getThumbnailUrl from "@/utils/functions/getThumbnailUrl";
import { sanitizeIpfsUrl } from "@/utils/sanitizeIpfsUrl";
import { APP_ID, LENSTER_APP_ID, LENSTOK_APP_ID, LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID } from "@/constants";
import { useAppStore } from "@/store/app";
import ShareOutline from "../Bytes/ShareOutline";
import ShareButton from "../Buttons/ShareButton";
import Wrapper from "./Wrapper";
import Item from "./Item";

interface Props {
  publication: Publication;
}
const Audio: FC<Props> = ({ publication }) => {
  const videoWatchTime = useAppStore((state) => state.videoWatchTime)
  const [isHover, setIsHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [url, setUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const isMirror = publication.__typename === 'Mirror'
  const video = isMirror ? publication.mirrorOf : publication
  const nextRouter = useRouter();
  const [showShare, setShowShare] = useState(false)
  

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    });
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
  }, []);

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return
    }
    videoRef
  };
  const handleOnMouseOver = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play();
  };
  const handleOnMouseOut = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause();
  };
  const isBytesVideo = video.appId === LENSTUBE_APP_ID || publication.appId === LENSTOK_APP_ID || publication.appId === APP_ID|| publication.appId === LENSTER_APP_ID


  return (
    <div className="lg:ml-20 rounded-xl border-0 md:flex gap-4 relative">
      <Item publication={publication} />
        <div className='absolute md:relative mr-6 md:flex md:flex-col top-0 right-0 space-x-6 md:space-x-0 flex flex-row p-2 m-2 md:p-0 md:m-0 md:pt-[50px]'>
        <div className="dropdown inline-block relative">
            {/* <button 
           onClick={() => setShowButtons(!showButtons)}
           className="bg-black text-[#57B8FF] md:invisible font-semibold py-2 px-2 rounded inline-flex overflow-auto items-center border-2 border-gray-800">
               <span>
                <ChevronDoubleDownIcon className='w-4 h-4'/>
               </span>
  </button>*/ } 
           {showButtons && (
          <ul className="dropdown-menu hidden md:block pt-1">
            <li><LikeButton publication={video as Publication}/></li>
            <li> <MirrorButton publication={video as Publication}/></li>
            <li><CommentButton publication={video as Publication}/></li>
            <li><CollectButton  publication={video as Publication}/></li>
            <li className=" pt-5">
             <button className="" onClick={() => setShowShare(true)} >
              <ShareButton publication={publication as Publication} />
             </button>
            </li>
            
            
        </ul>
          )}
        </div>
        </div>
        
        </div>

        
  );
};

export default Audio;
