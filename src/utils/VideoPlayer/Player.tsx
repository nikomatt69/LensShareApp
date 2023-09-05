import 'plyr-react/plyr.css';

import { Player, AspectRatio } from '@livepeer/react';
import type { FC } from 'react';
import React from 'react';
import { IS_MAINNET, STATIC_ASSETS_URL } from '@/constants';
import { IPFS_GATEWAY } from '@/utils/const';

export interface PlayerProps {
  playerRef?: (ref: HTMLMediaElement) => void;
  permanentUrl: string;
  posterUrl?: string;
  ratio?: AspectRatio;
  showControls?: boolean;
  options: {
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    loadingSpinner: boolean;
    isCurrentlyShown: boolean;
    roundCorners?: boolean;
  };
}

const PlayerInstance: FC<PlayerProps> = ({
  ratio,
  permanentUrl,
  posterUrl,
  playerRef,
  options,
  showControls
}) => {
  return (
    <div className='lensshare-player'>
    <Player
      src={permanentUrl}
      poster={posterUrl}
      showTitle={false}
      objectFit="contain"
      aspectRatio={ratio}
      showPipButton
      theme={{
        borderStyles: {
          containerBorderStyle: 'solid',
          
        },
        colors: {
          accent: '#1d4ed8',
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
      mediaElementRef={playerRef}
      loop={options.loop ?? true}
      showUploadingIndicator={true}
      muted={options?.muted ?? false}
      controls={{ defaultVolume: 1 }}
      autoPlay={options.autoPlay ?? false}
      showLoadingSpinner={options.loadingSpinner}
      _isCurrentlyShown={options.isCurrentlyShown}
      autoUrlUpload={
        IS_MAINNET && {
          fallback: true,
          ipfsGateway: IPFS_GATEWAY
        }
      }
    >
      {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
      {!showControls ? <></> : null}
    </Player>
    </div>
  );
};

export default React.memo(PlayerInstance);
