import useEchoStore from '@/store/echos'
import type { FC } from 'react'
import React from 'react'
import AudioPlayer from '@/components/UI/AudioPlayer'
import BottomNav from '../Navs/BottomNav'
import { Publication } from '@/types/lens'

type Props = {
  children: React.ReactNode
  publication: Publication

}

const Wrapper: FC<Props> = ({ children }) => {
  const selectedTrack = useEchoStore((state) => state.selectedTrack)

  return (
   <> <div className="h-full mx-auto mb-10 md:mb-10 lg:mb-10 xs:mb-22 sm:mb-22 display:absolute max-w-[100rem]">
      {children}
      {selectedTrack && (
        <div className="sticky w-full z-[2] display:absolute rounded-xl border-x border-t border-blue-700 bg-blue-500 p-2 backdrop-blur-lg bg-gradient-to-b from-gray-900 to-transparent">
          <AudioPlayer selectedTrack={selectedTrack} />
        </div>
      )}
     </div>
      <BottomNav />
   </>
  )
}

export default Wrapper
