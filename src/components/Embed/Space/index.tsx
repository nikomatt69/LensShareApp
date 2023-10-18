import type { FC } from 'react';

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

interface SpaceProps {
  publication: Publication;
}

const Space: FC<SpaceProps> = ({ publication }) => {
  const { address } = useAccount();
  const { metadata } = publication;

  const {
    setShowSpacesLobby,
    setShowSpacesWindow,
    setLensAccessToken,
    lensAccessToken,
    setSpace
  } = useSpacesStore();

  const space: SpaceMetadata = JSON.parse(
    getPublicationAttribute(metadata.attributes, 'audioSpace')
  );

  const { signMessage, isLoading: signing } = useSignMessage({
    onSuccess: async (data) => {
      const token = await getLensAccessToken(data, address as string);
      if (token.accessToken) {
        setShowSpacesLobby(true);
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

  return (
    <Wrapper className="!bg-brand-500/30 border-brand-400 mt-0 !p-3">
      <SmallUserProfile profile={hostProfile} smallAvatar />
      <div className="mt-2 space-y-3">
        <b className="text-lg">{metadata.content}</b>
        <Button
          className={cn(
            'pointer-events-none !mt-4 flex w-full justify-center',
            'Start Listening' ? 'pointer-events-auto' : 'pointer-events-auto'
          )}
          disabled={signing}
          icon={
            signing ? (
              <Spinner size="xs" className="mr-1" />
            ) : 'Start Listening' ? (
              <div className="flex h-5 w-5 items-center justify-center">
                <MicrophoneIcon className="h-5 w-5" />
              </div>
            ) : null
          }
          onClick={async () => {
            if (lensAccessToken) {
              setShowSpacesLobby(true);
              setSpace({
                ...space,
                title: metadata.content
              });
              return setShowSpacesWindow(true);
            }
            const msg = await getLensMessage(address as string);
            signMessage({ message: msg.message });
          }}
        ></Button>
      </div>
    </Wrapper>
  );
};

export default Space;
