import { useRoom } from '@huddle01/react/hooks';
import type { NextPage } from 'next';


import PreviewSpaces from '@/components/Spaces/PreviewSpaces/PreviewSpaces';
import SpacesWindow from '@/components/Spaces/SpacesWindow/SpacesWindow';

const Main: NextPage = () => {
  const { isRoomJoined } = useRoom();

  return isRoomJoined ? <SpacesWindow/>: <PreviewSpaces /> ;
};

export default Main;