
import dayjs from 'dayjs';
import type { FC } from 'react';

import PublicationActions from './Actions';

import PublicationStats from './PublicationStats';

import PublicationHeader from '../Composer/PublicationHeader';
import HiddenPublication from '../Composer/HiddenPublication';
import PublicationBody from '../Composer/PublicationBody';
import { Publication } from '@/utils/lens/generatedLenster';
import getAppName from '@/utils/functions/getAppName';
import { formatTime } from '@/lib/formatTime4';

interface FullPublicationProps {
  publication: Publication;
}

const FullPublication: FC<FullPublicationProps> = ({ publication }) => {
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
  
      <div>
        <PublicationHeader publication={publication} />
        <div className="ml-[53px]">
          {publication?.hidden ? (
            <HiddenPublication type={publication.__typename} />
          ) : (
            <>
              <PublicationBody publication={publication} />
              <div className="lt-text-gray-500 my-3 text-sm">
                <span >
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
