
import Profiles from '@/components/Publication/Profiles';
import { MirrorEvent } from '@/utils/lens/generatedLenster';

import type { FC } from 'react';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';

interface MirroredProps {
  mirrors: MirrorEvent[];
}

const Mirrored: FC<MirroredProps> = ({ mirrors }) => {
  const getMirroredProfiles = () => {
    let profiles = mirrors.map((event) => event.profile);
    profiles = profiles.filter(
      (profile, index, self) =>
        index === self.findIndex((t) => t.id === profile.id)
    );
    return profiles;
  };

  return (
    <div className="lt-text-gray-500 flex items-center space-x-1 pb-4 text-[13px]">
      <HiOutlineSwitchHorizontal className="h-4 w-4" />
      <Profiles profiles={getMirroredProfiles()} context={`mirrored`} />
    </div>
  );
};

export default Mirrored;
