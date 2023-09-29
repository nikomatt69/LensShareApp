import useEchoStore from '@/store/echos';
import type { FC } from 'react';
import React from 'react';
import AudioPlayer from '@/components/UI/AudioPlayer';
import BottomNav from '../Navs/BottomNav';
import { Publication } from '@/utils/lens/generatedLenster';

type Props = {
  children: React.ReactNode;
  publication: Publication;
};

const Wrapper: FC<Props> = ({ children }) => {
  const selectedTrack = useEchoStore((state) => state.selectedTrack);

  return (
    <>
      {' '}
      <div className="xs:mb-22 sm:mb-22 display:absolute mx-auto mb-10 h-full max-w-[100rem] md:mb-10 lg:mb-10">
        {children}
        {selectedTrack && (
          <div className="z-999 xs:max-h-10 fixed bottom-14 left-0 right-0 z-[5] m-auto flex  items-center justify-around overflow-hidden rounded-lg  border-2 border-b-0 border-l border-r border-t border-blue-700 bg-white px-4 py-3 dark:bg-gray-800 lg:w-[1100px] xl:w-[1200px]">
            <AudioPlayer selectedTrack={selectedTrack} />
          </div>
        )}
      </div>
    </>
  );
};

export default Wrapper;
