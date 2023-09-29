import Profiles from '@/components/Publication/Profiles';
import { CollectedEvent } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import { BsCollection } from 'react-icons/bs';

interface CollectedProps {
  collects: CollectedEvent[];
}

const Collected: FC<CollectedProps> = ({ collects }) => {
  const getCollectedProfiles = () => {
    let profiles = collects.map((event) => event.profile);
    profiles = profiles.filter(
      (profile, index, self) =>
        index === self.findIndex((t) => t.id === profile.id)
    );
    return profiles;
  };

  return (
    <div className="lt-text-gray-500 flex items-center space-x-1 pb-4 text-[13px]">
      <BsCollection className="h-4 w-4" />
      <Profiles profiles={getCollectedProfiles()} context={`collected`} />
    </div>
  );
};

export default Collected;
