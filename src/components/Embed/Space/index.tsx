import { useSpacesStore } from "@/store/spaces";
import { SpaceMetadata } from "@/typesLenster";

import getPublicationAttribute from "@/utils/lib/getPublicationAttribute";
import { getLensAccessToken, getLensMessage } from "@huddle01/auth";
import { FC } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Wrapper from "../Wrapper";
import clsx from 'clsx';
import { Spinner } from "@/components/UI/Spinner";
import { ClockIcon, MicrophoneIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/UI/Button";
import SmallUserProfile from "@/components/SmallUserProfile";
import { Profile, Publication, useProfilesQuery } from "@/utils/lens/generatedLenster";
import { Icons } from "@/components/Spaces2/Common/assets/Icons";
import { useRouter } from "next/router";
import { useLobby, useRoom } from "@huddle01/react/hooks";




interface SpaceProps {
  publication: Publication;
}

const Space: FC<SpaceProps> = ({ publication }) => {
  const { address } = useAccount();
  const { metadata } = publication;
  const setShowSpacesWindow = useSpacesStore(
    (state) => state.setShowSpacesWindow
  );
  const setLensAccessToken = useSpacesStore(
    (state) => state.setLensAccessToken
  );
  const lensAccessToken = useSpacesStore((state) => state.lensAccessToken);
  const setSpace = useSpacesStore((state) => state.setSpace);

  const space: SpaceMetadata = JSON.parse(
    getPublicationAttribute(metadata.attributes, 'audioSpace')
  );

  const { signMessage, isLoading: signing } = useSignMessage({
    onSuccess: async (data) => {
      const token = await getLensAccessToken(data, address as string);
      if (token.accessToken) {
        setShowSpacesWindow(true);
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
        <b className="text-sm">{metadata.content}</b>
        <Button
          className="!mt-4 flex w-full justify-center"
          disabled={signing}
          size="sm"
          icon={
            signing ? (
              <Spinner size="xs" className="mr-1" />
            ) : (
              <MicrophoneIcon className="h-5 w-5" />
            )
          }
          onClick={async () => {
            if (lensAccessToken) {
              setShowSpacesWindow(true);
              setSpace({
                ...space,
                title: metadata.content
              });
              return;
            }
            const msg = await getLensMessage(address as string);
            signMessage({ message: msg.message });
          }}
        >
          Open Space
        </Button>
      </div>
    </Wrapper>
  );
};

export default Space;