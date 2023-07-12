import MirrorOutline from '@/components/UI/Icons/MirrorOutline';
import { Mirror } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import Profiles from '../Profiles';

interface MirroredProps {
  publication: Mirror;
}

const Mirrored: FC<MirroredProps> = ({ publication }) => {
  return (
    <div className="lt-text-gray-500 flex items-center space-x-1 pb-4 text-[13px]">
      <MirrorOutline className="h-4 w-4" />
      <Profiles profiles={[publication.profile]} context={`mirrored`} />
    </div>
  );
};

export default Mirrored;
