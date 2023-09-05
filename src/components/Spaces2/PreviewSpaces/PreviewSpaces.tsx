import {
  useEventListener,
  useHuddle01,
  useLobby,
  useRoom
} from '@huddle01/react/hooks';
import React, { FC, useEffect } from 'react';
import { useAppStore } from 'src/store/app';
import { useSpacesStore } from 'src/store/spaces';


import AvatarGrid from '../Common/AvatarGrid/AvatarGrid';
import SpacesButton from '../Common/SpacesButton';
import PreviewSpacesHeader from './PreviewSpacesHeader';
import { useEffectOnce, useUpdateEffect } from 'usehooks-ts';
import { useRouter } from 'next/router';




const PreviewSpaces: FC = () => {
  const { setShowSpacesLobby, setShowSpacesWindow } = useSpacesStore();
  const { space, lensAccessToken } = useSpacesStore();
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { initialize, roomState } = useHuddle01();
  const { joinLobby, previewPeers } = useLobby();
  const { joinRoom, isRoomJoined } = useRoom();

  useEffectOnce(() => {
    initialize('3kzet_ujpjtF8dzciFefEOAZqrDNpdQS');
  });

  useEventListener('app:initialized', () => {
    joinLobby(space.id, lensAccessToken);
  });

  useEffect(() => {
    if (roomState === 'INIT') {
      joinLobby(space.id, lensAccessToken);
    }
  }, [roomState]);

  useUpdateEffect(() => {
    if (isRoomJoined) {
      setShowSpacesLobby(false);
      setShowSpacesWindow(true);
    }
  }, [isRoomJoined]);

  return (
    <div className="fixed inset-0 z-10 grid place-items-center bg-zinc-900/80 text-center">
      <div className="overflow-hidden rounded-lg bg-neutral-100 dark:bg-black">
        <PreviewSpacesHeader />
        <AvatarGrid isLobbyPreview={previewPeers.length ? true : false} />
        <div className="border-t border-neutral-300 py-4 text-center text-sm text-neutral-500 dark:border-neutral-800">
          Your mic will be off at the start
        </div>
        <div className="pb-3">
          <SpacesButton
            onClick={() => {
              joinRoom();
            }}
          >

              {currentProfile?.ownedBy === space.host
                ? 'Start spaces'
                : 'Start listening'}

          </SpacesButton>
        </div>
      </div>
    </div>
  );
};

export default PreviewSpaces;