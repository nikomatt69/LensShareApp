import clsx from 'clsx';
import type { Profile, Publication } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import React, {
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import toast from 'react-hot-toast';
import { BsFlag } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

import TopOverlay from '../TopOverlay';
import Comments from './Comments';
import ByteActions from '../ByteActions';
import router, { useRouter } from 'next/router';

import { sanitizeIpfsUrl } from '@/utils/sanitizeIpfsUrl';
import { useAppStore } from '@/store/app';
import imageCdn from '@/lib/imageCdn';
import usePersistStore from '@/store/persist';
import { SIGN_IN_REQUIRED_MESSAGE } from '@/constants';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import VideoPlayer from '@/utils/VideoPlayer';
import FullScreenModal from '@/components/UI/FullScreenModal';

import useAverageColor from '@/utils/hooks/useAverageColor';
import MobileBottomOverlay from '../MobileBottomOverlay';
import CollectModule from '@/components/Buttons/Collects/CollectModule';
import ChevronUpOutline from './ChevronUpOutline';
import ChevronDownOutline from './ChevronDownOutline';
import CommentOptions from '@/components/DetailPage/CommentsBlock/CommentOptions';
import getThumbnailUrl from '@/utils/functions/getThumbnailUrl';

type Props = {
  byte: Publication;
  bytes: Publication[];
  close: () => void;
  isShow: boolean;
  index?: number;
  profile?: Profile;
};
const FullScreen: FC<Props> = ({
  byte,
  close,
  bytes,
  isShow,
  index = 0,
  profile
}) => {
  const { pathname, replace, asPath } = useRouter();
  const setCurrentViewingId = useAppStore((state) => state.setCurrentviewingId);
  const currentViewingId = useAppStore((state) => state.currentviewingId);
  const videoRef = useRef<HTMLMediaElement>();
  const intersectionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [video, setVideo] = useState(byte);
  const [showComments, setShowComments] = useState(false);
  const [following, setFollowing] = useState(false);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(byte?.stats?.totalAmountOfCollects);
  const [showOptions, setShowOptions] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const thumbnailUrl = imageCdn(
    sanitizeIpfsUrl(getThumbnailUrl(video.metadata)),
    'thumbnail_v'
  );
  const { color: backgroundColor } = useAverageColor(thumbnailUrl, true);

  const playVideo = () => {
    if (!videoRef.current) {
      console.log('return xxx');
      return;
    }
    videoRef.current.currentTime = 0;
    videoRef.current.volume = 1;
    videoRef.current.autoplay = true;
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };
  useEffect(() => playVideo(), []);

  useLayoutEffect(() => setVideo(byte), [byte]);

  const pauseVideo = () => {
    if (!videoRef.current) {
      return;
    }
    videoRef.current.volume = 0;
    videoRef.current?.pause();
    videoRef.current.autoplay = false;
    setPlaying(false);
  };

  const refCallback = (ref: HTMLMediaElement) => {
    if (!ref) {
      return;
    }
    videoRef.current = ref;
    playVideo();
  };

  const currentProfile = useAppStore((state) => state.currentProfile);
  const onClickReport = () => {
    if (!currentProfile) {
      return toast.error(SIGN_IN_REQUIRED_MESSAGE);
    }
  };
  const mute = useAppStore((state) => state.isMute);

  const player = (
    <VideoPlayer
      refCallback={refCallback}
      permanentUrl={getPublicationMediaUrl(video)}
      posterUrl={thumbnailUrl}
      ratio="9to16"
      publicationId={video.id}
      options={{
        isCurrentlyShown: true,
        autoPlay: true,
        loop: true,
        loadingSpinner: false,
        muted: true
      }}
    />
  );

  const displayControl = (videoFull: boolean) => {
    const vidEl = document.querySelector(`#videoFull`);
    const elVol =
      vidEl &&
      vidEl.querySelectorAll<HTMLButtonElement>(`#videoFull .c-hmIsCl`)[0];
    if (!elVol) {
      return;
    }
    elVol.style.visibility = videoFull ? 'visible' : 'visible';
  };

  const detailNext = (val: 1 | -1) => {
    const index = bytes.findIndex((b) => b.id === currentViewingId);
    console.log(currentViewingId, index, val);
    const byte = index >= 0 ? bytes[index + val] : bytes[0];
    if (!byte) {
      return;
    }
    const id = byte.id;
    setCurrentViewingId(id);

    const nextUrl = `/${id}`;
    history.pushState({ path: nextUrl }, '', nextUrl);
    setVideo(byte);
    // console.log(currentViewingId, bytes, byte, index)
    playVideo();
  };

  return (
    <>
      <FullScreenModal
        panelClassName="max-w-full rounded-xl border-0 max-h-full"
        show={isShow}
        autoClose
      >
        <div
          className="flex snap-center border-0 bg-[#C0C0C0] "
          data-testid="byte-video"
          id="videoFull"
        >
          <div className="relative grow border-0 bg-black">
            <div
              className="relative  mt-0.5 items-center  bg-black bg-cover bg-center object-contain"
              style={{ backgroundImage: `url(${thumbnailUrl})` }}
            >
              <div className="absolute z-10 m-3">
                <button
                  type="button"
                  className=" rounded-full bg-slate-600 p-1  focus:outline-none"
                  onClick={() => router.back()}
                >
                  <MdOutlineClose className="h-4 w-4 text-white" />
                </button>
              </div>
              <div
                className={clsx('relative backdrop-brightness-[0.2] ')}
                onMouseEnter={() => displayControl(true)}
                onMouseLeave={() => displayControl(false)}
              >
                <div
                  className="m-auto  flex min-w-[50vh] max-w-[1px] items-center border-0 md:rounded-sm"
                  style={{
                    backgroundColor: backgroundColor
                      ? backgroundColor
                      : undefined
                  }}
                >
                  <div
                    className="absolute border-0"
                    ref={intersectionRef}
                    id={video.id}
                  />
                  {currentViewingId === video.id ? (
                    player
                  ) : (
                    <img
                      className="w-full border-0 object-contain"
                      src={thumbnailUrl}
                      alt="thumbnail"
                      draggable={false}
                    />
                  )}
                </div>
                <div className="absolute bottom-40 right-3 z-40 ">
                  <ByteActions
                    publication={video as Publication}
                    publicationId={video as Publication}
                    trigger
                    video={video as Publication}
                    inDetail={true}
                  />
                </div>
              </div>
              {
                <div className="assolute bottom-0.5 left-0 right-0 mt-4 block rounded-b-xl pt-20 ">
                  <MobileBottomOverlay
                    video={video}
                    setFollowing={setFollowing}
                    profile={profile as Profile}
                    following={false}
                  />
                </div>
              }
              <button
                type="button"
                className="  bg-gray-300/2  absolute right-5 top-6 inline-flex items-center space-x-2 rounded-full  px-2 py-1.5 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-800"
              >
                {<CommentOptions video={video} setShowReport={setShowReport} />}
              </button>
              <div className="absolute left-0 top-[calc(50vh-5rem)]  z-10 mr-5 flex flex-col justify-center gap-2">
                <div className="h-[44px] pl-3">
                  {index > 0 && (
                    <button
                      className="rounded-full bg-gray-300/20 hover:bg-gray-800 focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-800"
                      onClick={() => detailNext(-1)}
                    >
                      <ChevronUpOutline className="h-5 w-5 p-2" />
                    </button>
                  )}
                </div>
                <div className="h-25 w-25 pl-3">
                  <button
                    className="rounded-full bg-gray-300/20  hover:bg-gray-800 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-800"
                    onClick={() => detailNext(1)}
                  >
                    <ChevronDownOutline className="h-5 w-5 p-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-screen w-[30vw] max-w-[544px] flex-shrink-0 flex-col items-stretch p-5">
            <Comments key={video.profile.id} comment={video as Publication} />
          </div>
        </div>

        {/* <div className="bg-[url('/compare.png')] bg-cover bg-center absolute z-100 top-0 bottom-0 right-0 left-0"></div> */}
      </FullScreenModal>
    </>
  );
};

export default FullScreen;
