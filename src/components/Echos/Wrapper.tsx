import useEchoStore from '@/store/echos'
import type { FC } from 'react'
import React from 'react'
import AudioPlayer from '@/components/UI/AudioPlayer'
import BottomNav from '../Navs/BottomNav'

type Props = {
  children: React.ReactNode
}

const Wrapper: FC<Props> = ({ children }) => {
  const selectedTrack = useEchoStore((state) => state.selectedTrack)

  return (
    <><div className="relative mx-auto max-w-[100rem]">
      {children}
      {selectedTrack && (
        <div className="sticky bottom-0 z-10 w-full rounded-t-xl border-x border-t bg-white p-2 backdrop-blur-lg dark:bg-black">
          <AudioPlayer selectedTrack={selectedTrack} />
        </div>
      )}
    </div><div><BottomNav />

      </div></>
  )
}

export default Wrapper
