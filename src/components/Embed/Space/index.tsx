
import Wrapper from '../Wrapper';
import SpacePlayer from './SpacePlayer';
import { Profile, Publication} from '@/types/lens';
import SmallUserProfile from './SmallUserProfile';
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
import getPublicationAttribute from '@/utils/functions/getPublicationAttribute';
import { FC, useState } from 'react';
import { SpaceMetadata } from '@/typesLenster';
import { useProfilesQuery } from '@/utils/lens/generatedLenster';
import { Growthbook } from '@/utils/functions/growthbook';
import { FeatureFlags } from '@/utils/data/feature-flags';
import useCreateSpace from './useCreateSpace';
import { usePublicationQuery } from '@/utils/lens/generatedLenster';

interface SpaceProps {
  publication: Publication;


}

const Spaces: FC<SpaceProps> = ({ publication }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [createSpace] = useCreateSpace();
  const {metadata} = publication
  const spaceObject = getPublicationAttribute(metadata.attributes, 'spaces');
  const { on: isSpacesEnabled } = Growthbook.feature(FeatureFlags.Spaces);
  const showSpaceEditor = isSpacesEnabled && !Boolean(spaceObject);
  const space: SpaceMetadata = JSON.parse(
    getPublicationAttribute(metadata.attributes, 'spaces')
  );

  const { data, loading } = useProfilesQuery({
    variables: {
      request: { ownedBy: [space.host] }
    }
  });


  let spaceId = null;
  if (showSpaceEditor) {
    spaceId =  createSpace();
  }





  if (loading) {
    return <div>Loading...</div>;
  }

  const hostProfile = data?.profiles?.items?.find(
    (profile) => profile?.ownedBy === space.host && profile?.isDefault
  ) as Profile;

  return (
    <Wrapper className=" border-brand-400 mt-0 !p-3">
      <SmallUserProfile profile={hostProfile} smallAvatar />
      <div className="mt-2 space-y-3">
        <b className="text-lg">{metadata.content}</b>
        <Button
          className="!mt-4 flex w-full justify-center"
          icon={<MicrophoneIcon className="h-5 w-5" />}
          onClick={() => setShowPlayer(true)}
        >
          Open Space
        </Button>
      </div>
      <Modal
        show={showPlayer}
        onClose={() => setShowPlayer(false)}
        size="md"
        title="Space"
        icon={<MicrophoneIcon className="text-brand h-5 w-5" />}
      >
        <SpacePlayer
          publication={publication}
          space={{
            id: space.id,
            host: hostProfile
          }}
        />
      </Modal>
    </Wrapper>
  );
};

export default Spaces;
