
import { Player , AspectRatio} from '@livepeer/react'
import type { FC } from 'react'
import React from 'react'
import {  IS_MAINNET, STATIC_ASSETS_URL } from '@/constants'
import {IPFS_GATEWAY } from '@/utils/const'

export interface PlayerProps {
  playerRef?: (ref: HTMLMediaElement) => void
  permanentUrl: string
  posterUrl?: string
  ratio?: AspectRatio
  showControls?: boolean
  options: {
    autoPlay?: boolean
    muted?: boolean
    loop?: boolean
    loadingSpinner: boolean
    isCurrentlyShown: boolean
  }
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
    <Player
      src={permanentUrl}
      poster={posterUrl}
      showTitle={false}
      objectFit="contain"
      aspectRatio={ratio}
      showPipButton
      mediaElementRef={playerRef}
      loop={options.loop ?? true}
      showUploadingIndicator={false}
      muted={options?.muted ?? true}
      controls={{ defaultVolume: 1 }}
      autoPlay={options.autoPlay ?? true}
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
  )
}

export default React.memo(PlayerInstance)
