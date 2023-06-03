import { STATIC_IMAGES_URL } from '@/constants';
import getIPFSLink from '@/lib/getIPFSLink';
import { COVER} from '@/constants';
import type { FC } from 'react';
import imageProxy2 from '@/lib/imageProxy2';
import imageCdn from '@/lib/imageCdn';

interface Props {
  cover: string;
}

const Cover: FC<Props> = ({ cover }) => {
  return (
    <div
      className="h-28 border-4 border-black border-b-2 rounded-xl h-28"
      style={{
        backgroundImage: `url(${
          cover ? imageCdn(getIPFSLink(cover)) : `${STATIC_IMAGES_URL}/placeholder.png`
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
