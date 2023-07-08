
import type { FC } from 'react';
import { useAppStore } from 'src/store/app';

import Collect from './Collect';
import Comment from './Comment';
import Like from './Like';

import ShareMenu from './Share';
import { ElectedMirror, Publication } from '@/utils/lens/generatedLenster';
import stopEventPropagation from '@/lib/stopEventPropagation';

interface PublicationActionsProps {
  publication: Publication;
  electedMirror?: ElectedMirror;
  showCount?: boolean;
}

const PublicationActions: FC<PublicationActionsProps> = ({
  publication,
  electedMirror,
  showCount = false
}) => {
  
  const currentProfile = useAppStore((state) => state.currentProfile);
  const collectModuleType = publication?.collectModule?.__typename;
  const canMirror = currentProfile ? publication?.canMirror?.result : true;

  return (
    <span
      className="-ml-2 flex flex-wrap items-center gap-x-6 gap-y-1 pt-3 sm:gap-8"
      onClick={stopEventPropagation}
      aria-hidden="true"
    >
      <Comment publication={publication} showCount={showCount} />
      {canMirror && (
        <ShareMenu publication={publication} showCount={showCount} />
      )}
      <Like publication={publication} showCount={showCount} />
      {collectModuleType !== 'RevertCollectModuleSettings' && (
        <Collect
          electedMirror={electedMirror}
          publication={publication}
          showCount={showCount}
        />
      )}
      
    </span>
  );
};

export default PublicationActions;
