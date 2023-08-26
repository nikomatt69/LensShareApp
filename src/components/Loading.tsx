import type { FC } from 'react';
import logo from '@/images/Lenstoklogo.png';
import { Image } from '@/components/UI/Image';

import { STATIC_ASSETS_URL } from '@/constants';
import MetaTags from './UI/MetaTags';
import imageKit from '@/lib/imageKit';

const Loading: FC = () => {
  return (
    <div className="grid h-screen place-items-center">
      <MetaTags />
      <div className="animate-bounce">
        <img
          src={`${STATIC_ASSETS_URL}/images/icon.png`}
          draggable={false}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="lensshare"
        />
      </div>
    </div>
  );
};

export default Loading;
