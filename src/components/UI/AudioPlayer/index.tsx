import type { Publication } from '@/utils/lens/generatedLenster';
import Link from 'next/link';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { BiPause, BiPlay } from 'react-icons/bi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import { getTimeFromSeconds } from '@/utils/functions/formatTime2';
import { getPublicationMediaUrl } from '@/utils/functions/getPublicationMediaUrl';
import {getThumbnailUrl} from '@/utils/functions/getThumbnailUrl';
import type WaveSurfer from 'wavesurfer.js';
import { Image } from '@/components/UI/Image';
import imageKit from '@/lib/imageKit';

type Props = {
  selectedTrack: Publication;
};

const AudioPlayer: FC<Props> = ({ selectedTrack }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const waveSurfer = useRef<WaveSurfer>();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentPlayingTime, setCurrentPlayingTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const getAudioPlayerOptions = (ref: HTMLDivElement) => ({
    container: ref,
    waveColor: 'gray',
    progressColor: '#81c7af',
    cursorColor: 'orangered',
    cursorWidth: 2,
    barWidth: 1,
    barRadius: 3,
    hideScrollbar: true,
    responsive: true,
    height: 20,
    normalize: true,
    partialRender: true
  });

  const playTrack = () => {
    waveSurfer.current?.play();
    setPlaying(true);
  };

  const setPlayerVolume = (volumeToSet: number) => {
    const userVolume = volumeToSet ?? volume;
    waveSurfer.current?.setVolume(userVolume);
    setVolume(userVolume);
  };

  const createPlayer = async () => {
    const WaveSurferInstance = (await import('wavesurfer.js')).default;
    if (!waveformRef.current) {
      return;
    }
    const options = getAudioPlayerOptions(waveformRef.current);
    waveSurfer.current = WaveSurferInstance.create(options);
    if (selectedTrack) {
      waveSurfer.current?.load(getPublicationMediaUrl(selectedTrack));
    }

    waveSurfer.current.on('ready', () => {
      playTrack();
      setPlayerVolume(volume);
      const trackDuration = getTimeFromSeconds(
        waveSurfer.current?.getDuration().toString() ?? '0'
      );
      setDuration(trackDuration ?? '0');
    });
    waveSurfer.current.on('audioprocess', (time) => {
      setCurrentPlayingTime(getTimeFromSeconds(time.toString()) ?? '0');
    });
    waveSurfer.current.on('finish', () => {
      setPlaying(false);
    });
  };

  useEffect(() => {
    setPlaying(false);
    createPlayer();
    return () => {
      if (waveSurfer.current) {
        waveSurfer.current.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    waveSurfer.current?.playPause();
  };

  const rewind = () => {
    if (waveSurfer.current) {
      const current = waveSurfer.current.getCurrentTime();
      waveSurfer.current?.setCurrentTime(current > 5 ? Number(current - 5) : 0);
    }
  };

  const forward = () => {
    if (waveSurfer.current) {
      const current = waveSurfer.current.getCurrentTime();
      waveSurfer.current?.setCurrentTime(Number(current + 5));
    }
  };

  const onChangeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerVolume(Number(event.target.value) / 100);
  };

  const onClickVolume = () => {
    waveSurfer.current?.toggleMute();
  };

  if (!selectedTrack) {
    return null;
  }

  return (
    <div className="flex w-full flex-row flex-wrap items-center gap-y-2 ">
      <div className="flex w-1/2 items-center">
        <div className="flex">
          <div className="h-16 w-16 flex-none">
            <Image
              src={getThumbnailUrl(selectedTrack)}
              width={500}
              height={500}
              className="h-full w-full"
              alt={selectedTrack.profile.id}
            />
          </div>
          <div className="mx-4 flex flex-col justify-between text-black dark:text-white">
            <h5 className="line-clamp-1">{selectedTrack.metadata.name}</h5>
            <Link
              href={`/u/${selectedTrack?.profile?.id}`}
              className="truncate text-[11px] font-medium uppercase text-black dark:text-white opacity-90 hover:underline"
            >
              {selectedTrack.profile.handle}
            </Link>
            <div className="flex items-center text-xs">
              <div className="w-10 dark:text-white text-black">{currentPlayingTime}</div>
              <span className="pr-0.5">/</span>
              <div className="w-10 text-center dark:text-white text-black">{duration}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center text-black dark:text-white">
        <div
          id="waveform"
          className="m-2 w-full text-black  dark:text-white"
          ref={waveformRef}
        />
        <div className="flex w-full items-center justify-between text-black dark:text-white">
          {/* <Reactions selectedTrack={selectedTrack} /> */}
          <div className="flex items-center space-x-4 text-black dark:text-white">
            <button
              onClick={rewind}
              className="flex items-center space-x-1 text-black dark:text-white"
            >
              <FiChevronLeft /> <span>5</span>
            </button>
            <button
              onClick={handlePlayPause}
              className="mx-4 rounded-full  bg-blue-500 p-2 text-black dark:text-white outline-none"
            >
              {playing ? (
                <BiPause className="text-xl" />
              ) : (
                <BiPlay className="pl-0.5 text-xl" />
              )}
            </button>
            <button
              onClick={forward}
              className="flex items-center space-x-1 text-black dark:text-white"
            >
              <span>5</span>
              <FiChevronRight />
            </button>
          </div>
          <div className="flex items-center">
            <button onClick={() => onClickVolume()}>
              {waveSurfer.current?.getMute() ? (
                <GiSpeakerOff className="h-5 w-5" />
              ) : (
                <GiSpeaker className="h-5 w-5" />
              )}
            </button>
            <input
              type="range"
              step={10}
              value={volume * 100}
              onChange={onChangeVolume}
              className="h-1 w-[100px] cursor-pointer appearance-none overflow-hidden rounded-lg bg-green-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
