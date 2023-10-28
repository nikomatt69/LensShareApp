import { useState, type FC } from 'react';

import Wrapper from '../Wrapper';

import getPublicationAttribute from '@/utils/lib/getPublicationAttribute';
import type { Profile, Publication } from '@/utils/lens/generatedLenster';
import { useProfilesQuery } from '@/utils/lens/generatedLenster';
import SmallUserProfile from '@/components/SmallUserProfile';
import { Button } from '@/components/UI/Button';
import { ClockIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/UI/Modal';
import type { SpaceMetadata } from '@/types/misc';
import { getLensAccessToken, getLensMessage } from '@huddle01/auth';
import { Spinner } from '@/components/UI/Spinner';
import { useAccount, useSignMessage } from 'wagmi';
import { useSpacesStore } from '@/store/spaces';
import cn from '@/components/UI/cn';
import dayjs from 'dayjs';
import Link from 'next/link';
import { BiPhoneIncoming } from 'react-icons/bi';

interface SpaceProps {
  publication: Publication;
}

const Space: FC<SpaceProps> = ({ publication }) => {
  const {
    setShowSpacesLobby,
    setShowSpacesWindow,
    setLensAccessToken,
    lensAccessToken,
    setSpace,
    setSpacesPublicationId
  } = useSpacesStore();
  const [show, setShow] = useState(false);
  const [meetingUrl, setMeetingUrl] = useState('');

  const { address } = useAccount();
  const { metadata } = publication;

  const space: SpaceMetadata = JSON.parse(
    getPublicationAttribute(metadata.attributes, 'audioSpace')
  );

  const { signMessage, isLoading: signing } = useSignMessage({
    onSuccess: async (data) => {
      const token = await getLensAccessToken(data, address as string);
      if (token.accessToken) {
        setShowSpacesLobby(true);
        setSpacesPublicationId(publication.id);
        setLensAccessToken(token.accessToken);
        setSpace({
          ...space,
          title: metadata.content
        });
      }
    }
  });

  const { data, loading } = useProfilesQuery({
    variables: {
      request: { ownedBy: [space.host] }
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const hostProfile = data?.profiles?.items?.find(
    (profile) => profile?.ownedBy === space.host
  ) as Profile;

  const calculateRemainingTime = () => {
    const now = dayjs();
    const targetTime = dayjs(space.startTime);
    const timeDifference = targetTime.diff(now);

    if (timeDifference <= 0) {
      return `Start Listening`;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    let result = `Starts in`;
    result += ' ';

    if (days > 0) {
      result += `${days} day`;
      if (days > 1) {
        result += 's'; // Pluralize "day" when there are more than one day.
      }
      result += ' ';
    }

    if (hours > 0) {
      result += `${hours} hour`;
      if (hours > 1) {
        result += 's'; // Pluralize "hour" when there are more than one hour.
      }
      result += ' ';
    }

    if (minutes > 0) {
      result += `${minutes} minute`;
      if (minutes > 1) {
        result += 's'; // Pluralize "minute" when there are more than one minute.
      }
    }

    if (days === 0 && hours === 0 && minutes === 0) {
      result = `Start Listening`;
    }

    return result;
  };

  return (
    <Wrapper className="!bg-brand-500/30 border-brand-400 mt-0 !p-3">
      <SmallUserProfile profile={hostProfile} smallAvatar />
      <div className="mt-2 space-y-3">
        <b className="text-lg">{metadata.content}</b>
        <Button
          className={cn(
            '!md:pointer-events-none !mt-4 flex w-full justify-center',
            calculateRemainingTime() !== 'Start Listening'
              ? 'pointer-events-none'
              : 'pointer-events-auto'
          )}
          disabled={signing}
          icon={
            signing ? (
              <Spinner size="xs" className="p-1" />
            ) : calculateRemainingTime() !== 'Start Listening' ? (
              <ClockIcon className="h-5 w-5" />
            ) : (
              <MicrophoneIcon className="h-5 w-5" />
            )
          }
          onClick={async () => {
            if (lensAccessToken) {
              const apiCall = await fetch('/api/create-room', {
                mode: 'no-cors',
                method: 'POST',
                body: JSON.stringify({
                  title: 'LensShare-Space'
                }),
                headers: {
                  'Content-Type': 'application/json',
                  'x-api-key': 'wWUkmfVYqMCcYLKEGA8VE1fZ4hWyo5d0' || ''
                }
              });
              const data = (await apiCall.json()) as {
                data: { roomId: string };
              };
              const { roomId } = data.data;
              const currentUrl = window.location.href;
              const url = currentUrl.match(/^https?:\/\/([^/]+)/)?.[0];
              const meetingUrl = `${url}/spaces/${roomId}`;
              

              // Instead of sending a message, set the meeting URL in the state
              setShow(true);
              setMeetingUrl(meetingUrl);
            
            }
            const msg = await getLensMessage(address as string);
            signMessage({ message: msg.message });
          }}
        >
         
        </Button>
        <div className="mx-3 mt-2 ">
            {show && (
              <Link href={meetingUrl}>
                <BiPhoneIncoming className="h-6 w-6 text-green-500" />
              </Link>
            )}
          </div>
      </div>
    </Wrapper>
  );
};

export default Space;