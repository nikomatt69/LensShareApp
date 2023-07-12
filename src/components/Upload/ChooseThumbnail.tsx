import { logger } from '@/logger';
import { useAppStore } from '@/store/app';

import clsx from 'clsx';
import type { ChangeEvent, FC } from 'react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Loader from '../UI/Loader';

import AddImageOutline from './AddImageOutline';
import { getFileFromDataURL } from './getFileFromDataURL';
import { generateVideoThumbnails } from './generateVideoThumbnails';
import uploadToIPFS, { uploadFileToIPFS } from '@/lib/uploadToIPFS3';

import ThumbnailsShimmer from './ThumbnailsShimmer';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import { IPFSUploadResult } from '@/custom-types';
import { MediaSetWithoutOnChain } from '@/typesLenster';
import { usePublicationStore } from '@/store/publication4';

interface Props {
  label: string;
  file: File | null;
}

const DEFAULT_THUMBNAIL_INDEX = 0;
export const THUMBNAIL_GENERATE_COUNT = 8;

type Thumbnail = {
  blobUrl: string;
  ipfsUrl: string;
  mimeType: string;
};

const ChooseThumbnail: FC<Props> = () => {
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(-1);
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo);

  const [imageUploading, setImageUploading] = useState(false);

  const attachments = usePublicationStore((state) => state.attachments);
  const videoThumbnail = usePublicationStore((state) => state.videoThumbnail);
  const uploadedVideo = useAppStore((state) => state.uploadedVideo);
  const setVideoThumbnail = usePublicationStore(
    (state) => state.setVideoThumbnail
  );
  const { file } = attachments[0];

  const uploadThumbnailToIpfs = async (fileToUpload: File) => {
    setVideoThumbnail({ uploading: true });
    const result: MediaSetWithoutOnChain = await uploadFileToIPFS(fileToUpload);
    if (!result.original.url) {
      toast.error(`Failed to upload thumbnail`);
    }
    setVideoThumbnail({
      url: result.original.url,
      type: fileToUpload.type || 'image/jpeg',
      uploading: false
    });

    return result;
  };

  const onSelectThumbnail = async (index: number) => {
    setSelectedThumbnailIndex(index);
    if (thumbnails[index]?.ipfsUrl === '') {
      setVideoThumbnail({ uploading: true });
      getFileFromDataURL(
        thumbnails[index].blobUrl,
        'thumbnail.jpeg',
        async (file: any) => {
          if (!file) {
            return toast.error(`Please upload a custom thumbnail`);
          }
          const ipfsResult = await uploadThumbnailToIpfs(file);
          setThumbnails(
            thumbnails.map((thumbnail, i) => {
              if (i === index) {
                thumbnail.ipfsUrl = ipfsResult.original.url;
              }
              return thumbnail;
            })
          );
        }
      );
    } else {
      setVideoThumbnail({
        url: thumbnails[index]?.ipfsUrl,
        type: thumbnails[index]?.mimeType || 'image/jpeg',
        uploading: false
      });
    }
  };

  const generateThumbnails = async (fileToGenerate: File) => {
    try {
      const thumbnailArray = await generateVideoThumbnails(
        fileToGenerate,
        THUMBNAIL_GENERATE_COUNT
      );
      const thumbnailList: Thumbnail[] = [];
      thumbnailArray.forEach((thumbnailBlob) => {
        thumbnailList.push({
          blobUrl: thumbnailBlob,
          ipfsUrl: '',
          mimeType: 'image/jpeg'
        });
      });
      setThumbnails(thumbnailList);
      setSelectedThumbnailIndex(DEFAULT_THUMBNAIL_INDEX);
    } catch {}
  };

  useEffect(() => {
    onSelectThumbnail(selectedThumbnailIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThumbnailIndex]);

  useEffect(() => {
    if (file) {
      generateThumbnails(file).catch((error) =>
        logger.error('[Error Generate Thumbnails from File]', error)
      );
    }
    return () => {
      setSelectedThumbnailIndex(-1);
      setThumbnails([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      try {
        setImageUploading(true);
        setSelectedThumbnailIndex(-1);
        const file = e.target.files[0];
        const result = await uploadThumbnailToIpfs(file);
        const preview = window.URL?.createObjectURL(file);
        setThumbnails([
          {
            blobUrl: preview,
            ipfsUrl: result.original.url,
            mimeType: file.type || 'image/jpeg'
          },
          ...thumbnails
        ]);
        setSelectedThumbnailIndex(0);
      } catch (error) {
        console.error('Failed to upload thumbnail', error);
        toast.error(`Failed to upload thumbnail`);
      } finally {
        setImageUploading(false);
      }
    }
  };

  const isUploading = videoThumbnail.uploading;

  return (
    <div className="w-full">
      <div className="flex justify-between gap-1 rounded-lg border p-0.5">
        {!thumbnails.length && <ThumbnailsShimmer />}
        {thumbnails.map((thumbnail, idx) => {
          return (
            <button
              key={idx}
              type="button"
              disabled={
                uploadedVideo.uploadingThumbnail &&
                selectedThumbnailIndex === idx
              }
              onClick={() => onSelectThumbnail(idx)}
              className={clsx(
                'h-32 max-w-[5rem]',
                selectedThumbnailIndex === idx
                  ? 'rounded-lg  brightness-100'
                  : 'brightness-50'
              )}
            >
              <img
                className={clsx(
                  'w-18 h-32 rounded-lg object-cover',
                  selectedThumbnailIndex === idx &&
                    'min-w-[4rem] scale-105 !ring !ring-[#30BFA8] '
                )}
                src={sanitizeDStorageUrl(thumbnail.blobUrl)}
                alt="thumbnail"
                draggable={false}
              />
              {uploadedVideo.uploadingThumbnail &&
                selectedThumbnailIndex === idx && (
                  <div className="absolute right-1 top-1">
                    <span>
                      <Loader />
                    </span>
                  </div>
                )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseThumbnail;
