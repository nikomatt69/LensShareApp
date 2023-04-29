import { STATIC_IMAGES_URL } from '@/constants';
import getIPFSLink from '@/lib/getIPFSLink';
import imageProxy from '@/lib/imageProxy';
import { COVER} from '@/constants';
import type { FC } from 'react';

interface Props {
  cover: string;
}

const Cover: FC<Props> = ({ cover }) => {
  return (
    <div
      className="h-28 border-4 border-black border-b-2 rounded-xl h-28"
      style={{
        backgroundImage: `url(${
          cover ? imageProxy(getIPFSLink(cover), COVER) : `${STATIC_IMAGES_URL}`
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
