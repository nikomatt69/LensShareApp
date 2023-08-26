
import React, { FC } from 'react';
import { useSpacesStore } from 'src/store/spaces';

import { Icons } from '../Common/assets/Icons';
import { Profile, useProfilesQuery } from '@/utils/lens/generatedLenster';
import Slug from '@/components/UI/Slug';
import { XCircleIcon } from '@heroicons/react/24/outline';

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
    <div className="relative border-b border-neutral-300 bg-neutral-100 p-3 dark:border-neutral-800 dark:bg-zinc-800">
      <div className="mx-auto flex w-fit items-center gap-2 text-neutral-900 dark:text-neutral-100">
        {hostProfile?.id}
        
        <span className="text-sm"> | </span>
        <Slug slug={`@${hostProfile.id}`} />
      </div>
      <div className="pt-2 text-base font-normal text-neutral-500 dark:text-neutral-300">
        {space.title}
      </div>
      <XCircleIcon
        className="absolute right-4 top-4 h-5 w-5 cursor-pointer"
        onClick={() => setShowSpacesLobby(false)}
      />
    </div>
  );
};

export default PreviewSpacesHeader;