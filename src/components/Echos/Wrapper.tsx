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
          <div className="display:absolute sticky z-[8] w-full rounded-xl border-x border-t border-blue-700 bg-blue-500 bg-gradient-to-b from-gray-900 to-transparent p-2 backdrop-blur-lg">
            <AudioPlayer selectedTrack={selectedTrack} />
          </div>
        )}
      </div>
      <BottomNav />
    </>
  );
};

export default Wrapper;
