import { useSpacesStore } from "@/store/spaces";
import { SpaceMetadata } from "@/typesLenster";
import { Profile, Publication, useProfilesQuery } from "@/utils/lens/generatedLenster";
import getPublicationAttribute from "@/utils/lib/getPublicationAttribute";
import { getLensAccessToken, getLensMessage } from "@huddle01/auth";
import { FC } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Wrapper from "../Wrapper";
import SmallUserProfile from "./SmallUserProfile";
import { Spinner } from "@/components/UI/Spinner";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/UI/Button";

interface SpaceProps {
  publication: Publication;
}

const Space: FC<SpaceProps> = ({ publication }) => {
  const { address } = useAccount();
  const { metadata } = publication;
  const setShowSpacesLobby = useSpacesStore(
    (state) => state.setShowSpacesLobby
  );
  const setLensAccessToken = useSpacesStore(
    (state) => state.setLensAccessToken
  );
  const lensAccessToken = useSpacesStore((state) => state.lensAccessToken);

  const { signMessage, isLoading: signing } = useSignMessage({
    onSuccess: async (data) => {
      const token = await getLensAccessToken(data, address as string);
      if (token.accessToken) {
        setShowSpacesLobby(true);
        setLensAccessToken(token.accessToken);
      }
    }
  });

  const space: SpaceMetadata = JSON.parse(
    getPublicationAttribute(metadata.attributes, 'audioSpace')
  );

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
          className="!mt-4 flex w-full justify-center"
          disabled={signing}
          icon={
            signing ? (
              <Spinner size="xs" className="mr-1" />
            ) : (
              <MicrophoneIcon className="h-5 w-5" />
            )
          }
          onClick={async () => {
            if (lensAccessToken) {
              setShowSpacesLobby(true);
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