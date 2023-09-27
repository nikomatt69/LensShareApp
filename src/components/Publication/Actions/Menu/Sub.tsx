import SuperfluidSubscribePub from '@/components/Superfluid/SubPublication';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Profile, Publication } from '@/utils/lens/generatedLenster';
import { Menu } from '@headlessui/react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import cn from '@/components/UI/cn';
import type { FC } from 'react';
import toast from 'react-hot-toast';

interface ShareProps {
  publication: Publication;
  profile:Profile
}

const Sub: FC<ShareProps> = ({ publication,profile }) => {
  return (
   
      <div className="flex items-center space-x-2">
        <SuperfluidSubscribePub profile={publication?.profile?.ownedBy} publication={publication}/>
     
      </div>

  );
};

export default Sub;
