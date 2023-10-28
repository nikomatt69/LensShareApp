import type { FC } from 'react';
import React from 'react';
import { useSpacesStore } from 'src/store/spaces';

import PreviewSpaces from './PreviewSpaces/PreviewSpaces';
import SpacesWindow from './SpacesWindow/SpacesWindow';
import Lobby from './Lobby';
import { NextPage } from 'next';
import { useRoom } from '@huddle01/react/hooks';

const AudioSpaces: NextPage = () => {
  const { isRoomJoined } = useRoom();
  const showSpacesWindow = useSpacesStore(
    (state) => state.showSpacesWindow
  );

  return isRoomJoined ? <SpacesWindow /> : <Lobby />;
};

export default AudioSpaces;
