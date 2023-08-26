import { STATIC_IMAGES_URL } from '@/constants';
import getIPFSLink from '@/lib/getIPFSLink';
import { COVER } from '@/constants';
import type { FC } from 'react';

import imageKit from '@/lib/imageKit';

interface Props {
  cover: string;
}

const Cover: FC<Props> = ({ cover }) => {
  return (
    <div
      className="h-28 h-28 rounded-xl border-4 border-b-2 border-black"
      style={{
        backgroundImage: `url(${
          cover
            ? imageKit(getIPFSLink(cover))
            : `${STATIC_IMAGES_URL}/placeholder.png`
        })`,
        backgroundColor: '#3b82f6',
        backgroundSize: cover ? 'cover' : '30%',
        backgroundPosition: 'center center',
        backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      }}
    />
  );
};

export default Cover;
