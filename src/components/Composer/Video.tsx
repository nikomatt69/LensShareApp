import 'plyr-react/plyr.css';

import { PlayButton, Player } from '@livepeer/react';
import type { FC } from 'react';
import { memo } from 'react';
import sanitizeDStorageUrl from '@/utils/functions/sanitizeDStorageUrl';
import imageKit from '@/lib/imageKit';
import { IPFS_GATEWAY } from '@/constants';

interface VideoProps {
  src: string;
  poster: string;
}

const Video: FC<VideoProps> = ({ src, poster }) => {
  return (
    <div className="lp-player" data-testid={`attachment-video-${src}`}>
      <Player
        src={src}
        poster={imageKit(sanitizeDStorageUrl(poster))}
        objectFit="contain"
        showLoadingSpinner
       
        theme={{
          borderStyles: {
            containerBorderStyle: 'solid',

            
          },
          colors: {
            accent: '#1d4ed8',
            containerBorderColor:'#1d4ed8'
          },
          space: {
            controlsBottomMarginX: '10px',
            controlsBottomMarginY: '5px',
            controlsTopMarginX: '15px',
            controlsTopMarginY: '8pxpx',
          },
          radii: {
            containerBorderRadius: '16px',
          },
        }}
        showPipButton={false}
        showUploadingIndicator={false}
        controls={{ defaultVolume: 0 }}
        autoUrlUpload={{ fallback: true, ipfsGateway: IPFS_GATEWAY }}
      />
    </div>
  );
};

export default memo(Video);
