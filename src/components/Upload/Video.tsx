import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import UploadMethod from './UploadMethod';
import { useAppStore } from '@/store/app';
import useCopyToClipboard from '@/utils/hooks/useCopyToClipboard';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import { Tooltip } from '../UI/Tooltip';
import CopyOutline from '../UI/Icons/CopyOutline';
import getIsFeatureEnabled from '@/utils/functions/getIsFeatureEnabled';

import { Input } from '../UI/Input';
import { FeatureFlag } from '@/utils/data/feature-flags';

const Video = () => {
  const selectedChannel = useAppStore((state) => state.currentProfile);
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo);
  const [copy] = useCopyToClipboard();
  const videoRef = useRef<HTMLVideoElement>(null);

  const onDataLoaded = () => {
    if (videoRef.current?.duration && videoRef.current?.duration !== Infinity) {
      setUploadedVideo({
        durationInSeconds: videoRef.current.duration.toFixed(2)
      });
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadeddata = onDataLoaded;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef]);

  const onCopyVideoSource = async (value: string) => {
    await copy(value);
    toast.success(`Video source copied`);
  };

  return (
    <div className="flex w-full flex-col">
      <div className="relative w-full overflow-hidden rounded-xl rounded-b-none">
        <video
          ref={videoRef}
          className="aspect-[16/9] w-full"
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate"
          poster={sanitizeDStorageUrl(uploadedVideo.thumbnail)}
          controls
          src={uploadedVideo.preview}
        >
          <source
            src={uploadedVideo.preview}
            type={uploadedVideo.videoType || 'video/mp4'}
          />
        </video>
        <div className="absolute left-2 top-2 rounded-full bg-orange-200 px-2 py-0.5 text-xs uppercase text-black">
          {uploadedVideo.file?.size && (
            <span className="whitespace-nowrap font-semibold">
              {uploadedVideo.file?.size}
            </span>
          )}
        </div>
        {uploadedVideo.videoSource && (
          <Tooltip content="Copy permanent video URL">
            <button
              type="button"
              onClick={() => onCopyVideoSource(uploadedVideo.videoSource)}
              className="absolute right-2 top-2 rounded-lg bg-orange-200 p-1 px-1.5 text-xs text-black outline-none"
            >
              <CopyOutline className="h-3.5 w-3.5" />
            </button>
          </Tooltip>
        )}
      </div>
      <Tooltip content={`Uploaded (${uploadedVideo.percent}%)`}>
        <div className="w-full overflow-hidden rounded-b-full bg-gray-200">
          <div
            className={clsx(
              'h-[6px]',
              uploadedVideo.percent !== 0
                ? 'bg-indigo-500'
                : 'bg-gray-300 dark:bg-gray-800'
            )}
            style={{
              width: `${uploadedVideo.percent}%`
            }}
          />
        </div>
      </Tooltip>
      {getIsFeatureEnabled(
        FeatureFlag.POST_WITH_SOURCE_URL,
        selectedChannel?.id
      ) && (
        <div className="mt-4">
          <Input
            label={`Upload from Source Url`}
            placeholder="ar:// or ipfs://"
            value={uploadedVideo.videoSource}
            onChange={(e) =>
              setUploadedVideo({
                videoSource: e.target.value
              })
            }
          />
        </div>
      )}
      <div className="mt-4"></div>
      <ul className="mt-4 list-inside list-disc text-xs">
        <li>Don' switch network or wallet accounts</li>
        <li>
          Stay active in current tab while uploading for faster experience
        </li>
        <li>Video will be stored permanently on-chain and can' be updated</li>
      </ul>
      <div className="rounded-lg">
        <UploadMethod />
      </div>
    </div>
  );
};

export default Video;
