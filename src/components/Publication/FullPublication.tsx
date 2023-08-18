import dayjs from 'dayjs';
import type { FC } from 'react';

import PublicationActions from './Actions';

import PublicationStats from './PublicationStats';

import PublicationHeader from '../Composer/PublicationHeader';
import HiddenPublication from '../Composer/HiddenPublication';
import PublicationBody from '../Composer/PublicationBody';
import { Profile, Publication } from '@/utils/lens/generatedLenster';
import getAppName from '@/utils/functions/getAppName';
import { formatTime } from '@/lib/formatTime4';
import PublicationType from './Type';

interface FullPublicationProps {
  publication: Publication;
  profile: Profile;
}

const FullPublication: FC<FullPublicationProps> = ({
  publication,
  profile
}) => {
  const isMirror = publication.__typename === 'Mirror';
  const timestamp = isMirror
    ? publication?.mirrorOf?.createdAt
    : publication?.createdAt;

  // Count check to show the publication stats only if the publication has a comment, like or collect
  const mirrorCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfMirrors
    : publication?.stats?.totalAmountOfMirrors;
  const reactionCount = isMirror
    ? publication?.mirrorOf?.stats?.totalUpvotes
    : publication?.stats?.totalUpvotes;
  const collectCount = isMirror
    ? publication?.mirrorOf?.stats?.totalAmountOfCollects
    : publication?.stats?.totalAmountOfCollects;
  const showStats = mirrorCount > 0 || reactionCount > 0 || collectCount > 0;

  return (
    <article className="p-5" data-testid={`publication-${publication.id}`}>
      <PublicationType profile={profile} publication={publication} showType />

      <div className='border-blue-700 rounded-xl'>
        <PublicationHeader profile={profile} publication={publication} />
        <div className="ml-[53px]">
          {publication?.hidden ? (
            <HiddenPublication type={publication.__typename} />
          ) : (
            <>
              <PublicationBody profile={profile} publication={publication} />
              <div className="lt-text-blue-500 my-3 text-sm">
                <span>
                  {dayjs(new Date(timestamp)).format('hh:mm A · MMM D, YYYY')}
                </span>
                {publication?.appId ? (
                  <span> · Posted via {getAppName(publication?.appId)}</span>
                ) : null}
              </div>
              {showStats && (
                <>
                  <div className="divider" />
                  <PublicationStats publication={publication} />
                </>
              )}
              <div className="divider" />
              <PublicationActions publication={publication} showCount />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default FullPublication;
