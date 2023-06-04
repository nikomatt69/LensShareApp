import type { FC } from 'react'
import React, { useState, useEffect } from 'react'
import { GiPauseButton, GiPlayButton } from 'react-icons/gi'
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md'
import {useAppStore }from '@/store/app'

type Props = {
  onClickVideo: (event: any) => void
  id: string
  full?: boolean
}

const TopOverlay: FC<Props> = ({ onClickVideo, full, id }) => {

  const [width, setWidth] = useState<number>(window.innerWidth);
  const currentViewingId = useAppStore((state) => state.currentviewingId)
  const [mouseEnter, setMouseEnter] = useState(false)
  const setMute = useAppStore((state) => state.setMute)
  const [isPlaying, setPlay] = useState(true)
  const mute = useAppStore((state) => state.isMute)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }
  
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const isMobile = width <= 768;

  const vidEl = document.querySelector(`#currentVideo`)

  if (currentViewingId === id) {
    const elVol = vidEl && vidEl.querySelectorAll<HTMLButtonElement>(`button[volume]`)[0]
    if (elVol) {
      const vol = elVol.getAttribute('title')
      const isMuted = vol ? vol?.includes('Mute') : false;
      if (mute) {
        isMuted && elVol.click()
      } else {
        !isMuted && elVol.click()
      }
    }

  }


  // const vol = el && el.getAttribute('title')
  // const isMuted = vol ? vol?.includes('Mute') : false;
  // if(mute){
  //   isMuted&& el&& el.click()
  // } else{
  //   !isMuted&& el&& el.click()
  // }

  const handleClickMute = (e: any) => {

    e.stopPropagation();
    const elVol = vidEl && vidEl.querySelectorAll<HTMLButtonElement>(`button[volume]`)[0]
    if (!elVol) {
      return
    }
    const vol = elVol.getAttribute('title')
    const isMuted = vol ? vol?.includes('Mute') : false;
    if (mute) {
      isMuted && elVol.click()
    } else {
      !isMuted && elVol.click()
    }
    setMute && setMute(isMuted);
  }
  const handleClickPlay = (e: any) => {

    e.stopPropagation();
    const el = vidEl && vidEl.querySelectorAll<HTMLButtonElement>(`.c-louZZk`)[0]
    el && el.click()
    const title = el && el.getAttribute('title')
    setPlay(title ? title?.includes('Play') : false)
  }


  return (
    <div
      role="button"
      onClick={onClickVideo}
      className="absolute top-0 bottom-[40px] md:max-xl:bottom-[80px] left-0 right-0 z-[1] w-full cursor-default outline-none"
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
    >
      <div className=" items-center justify-between h-full">
        {!isPlaying && <div className='m-auto p-3 bg-[#b4b4b47d] rounded-md hover:cursor-pointer'>
          <GiPlayButton className="text-2xl text-white" />
        </div>}
        {!full && <div className='absolute bottom-0 z-[2] flex justify-between w-full'>
          {(mouseEnter || isMobile )? <button className='ml-5' onClick={handleClickPlay}>
            {isPlaying ? <GiPauseButton className='w-6 h-6' fill='white' />
              : <GiPlayButton className='w-6 h-6' fill='white' />}
          </button> : <div></div>}
          <button className='mr-5' onClick={handleClickMute}>
            {mute ? <MdVolumeOff className='w-6 h-6' fill='white' />
              : <MdVolumeUp className='w-6 h-6' fill='white' />}
          </button>
        </div>}
      </div>
    </div>
  )
}

export default TopOverlay
