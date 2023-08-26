import { Modal } from '@/components/UI/Modal';
import type { Publication } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import { FC, useState } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import { LENSTOK_URL, STATIC_ASSETS_URL } from '@/constants';

import imageKit from '@/lib/imageKit';
import useCopyToClipboard from '@/utils/hooks/useCopyToClipboard';

import EmbedVideo from './EmbedVideo';

import { BiCopy } from 'react-icons/bi';
import { GiMirrorMirror } from 'react-icons/gi';
import { getSharableLink } from '@/utils/functions/getSharableLink';
import { Card } from '../UI/Card';


import FullScreenModal from '../UI/FullScreenModal';
import { MdOutlineClose } from 'react-icons/md';

type Props = {
  publication: Publication;
  show: boolean;
  setShowShare: React.Dispatch<boolean>;
};

const ShareModal: FC<Props> = ({ setShowShare, publication, show }) => {
  const [copy] = useCopyToClipboard();

  const onCopyVideoUrl = async () => {
    await copy(`${LENSTOK_URL}/post/${publication.id}`);
    toast.success(`Permalink copied to clipboard`);
  };

  return (
    <FullScreenModal
      title="Share"
      onClose={() => setShowShare(false)}
      show={show}
    >
      <div className="z-10 max-md:absolute">
        <button
          type="button"
          className="right-1 m-4 rounded-full bg-slate-600 p-1  focus:outline-none"
          onClick={() => setShowShare(false)}
        >
          <MdOutlineClose className="h-4 w-4 text-white" />
        </button>
      </div>
      <div className="mt-20 rounded-xl bg-white dark:bg-gray-900/70">
        <Card className="rounded-xl border-0 object-contain object-center p-2 ">
          <div className="no-scrollbar mb-4 flex flex-nowrap items-center space-x-3 overflow-x-auto">
            <EmbedVideo
              videoId={publication.id}
              onClose={() => setShowShare(false)}
            />
            <Link
              className="rounded-full"
              target="_blank"
              rel="noreferrer"
              href={getSharableLink('lenster', publication)}
            >
              <img
                src={imageKit(
                  `${STATIC_ASSETS_URL}/images/social/lenster.png`,
                  'avatar_lg'
                )}
                className="h-10 w-10 max-w-none rounded-full"
                alt="lenster"
                draggable={false}
              />
            </Link>
            <Link
              className="rounded-full"
              target="_blank"
              rel="noreferrer"
              href={getSharableLink('twitter', publication)}
            >
              <img
                src={imageKit(
                  `${STATIC_ASSETS_URL}/images/social/twitter.png`,
                  'avatar_lg'
                )}
                className="h-10 w-10 max-w-none rounded-full"
                alt="twitter"
                draggable={false}
              />
            </Link>
            <Link
              href={getSharableLink('reddit', publication)}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={imageKit(
                  `${STATIC_ASSETS_URL}/images/social/reddit-logo.png`,
                  'avatar_lg'
                )}
                className="h-10 w-10 max-w-none rounded-full"
                alt="reddit"
                draggable={false}
              />
            </Link>
            <Link
              href={getSharableLink('linkedin', publication)}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={imageKit(
                  `${STATIC_ASSETS_URL}/images/social/linkedin.png`,
                  'avatar_lg'
                )}
                alt="linkedin"
                className="h-10 w-10 max-w-none rounded-full"
                draggable={false}
              />
            </Link>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 p-2 dark:border-gray-800">
            <div className="select-all truncate text-sm">
              {LENSTOK_URL}/post/{publication.id}
            </div>
            <button
              className="ml-2 hover:opacity-60 focus:outline-none"
              onClick={() => onCopyVideoUrl()}
              type="button"
            >
              <BiCopy className="h-4 w-4" />
            </button>
          </div>
        </Card>
      </div>
    </FullScreenModal>
  );
};

export default ShareModal;
