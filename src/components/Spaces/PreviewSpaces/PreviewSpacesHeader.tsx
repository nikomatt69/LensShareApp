import React, { FC } from 'react';
import { useSpacesStore } from 'src/store/spaces';
import type { Profile, } from '@/utils/lens/generatedLenster';
import { Icons } from '../Common/assets/Icons';
import { useProfilesQuery } from '@/utils/lens/generatedLenster';
import Slug from '@/components/UI/Slug';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const PreviewSpacesHeader: FC = () => {
  const setShowSpacesLobby = useSpacesStore(
    (state) => state.setShowSpacesLobby
  );
  const space = useSpacesStore((state) => state.space);

  const { data } = useProfilesQuery({
    variables: {
      request: { ownedBy: [space.host] }
    }
  });

  const hostProfile = data?.profiles?.items?.find(
    (profile) => profile?.ownedBy === space.host
  ) as Profile;

  return (
    <div className="relative border-b border-gray-300 bg-gray-100 p-3 dark:border-gray-800 dark:bg-gray-800">
      <div className="mx-auto flex w-fit items-center gap-2 text-gray-900 dark:text-gray-100">
        {hostProfile?.name}

        <span className="text-sm"> | </span>
        <Slug slug={`@${hostProfile.handle}`} />
      </div>
      <div className="pt-2 text-base font-normal text-gray-500 dark:text-gray-300">
        {space.title}
      </div>
      <XMarkIcon
        className="absolute right-4 top-4 h-5 w-5 cursor-pointer"
        onClick={() => setShowSpacesLobby(false)}
      />
    </div>
  );
};

export default PreviewSpacesHeader;
