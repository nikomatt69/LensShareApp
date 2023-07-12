import { useRouter } from 'next/router';
import type { FC } from 'react';

import Commented from './Commented';
import Mirrored from './Mirrored';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Profile, Publication } from '@/utils/lens/generatedLenster';

interface PublicationTypeProps {
  publication: Publication;
  showType: boolean;
  showThread?: boolean;
  profile: Profile;
}

const PublicationType: FC<PublicationTypeProps> = ({
  publication,
  showType,
  showThread = false,
  profile
}) => {
  const { pathname } = useRouter();
  const type = publication.__typename;

  if (!showType) {
    return null;
  }

  return (
    <span onClick={stopEventPropagation} aria-hidden="true">
      {type === 'Mirror' && <Mirrored publication={publication} />}
      {type === 'Comment' && (showThread || pathname === '/posts/[id]') && (
        <Commented profile={profile as Profile} publication={publication} />
      )}
    </span>
  );
};

export default PublicationType;
