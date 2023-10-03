import dayjs from 'dayjs';
import { useEffect, type FC, useRef } from 'react';

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
  showCount: boolean;
}

const FullPublication: FC<FullPublicationProps> = ({
  publication,
  profile,
  showCount
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
  const publicationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (publicationRef?.current) {
      publicationRef.current.style.scrollMargin = '4.2rem';
      publicationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <article className="p-5" data-testid={`publication-${publication.id}`}>
      <PublicationType profile={profile} publication={publication} showType />

      <div ref={publicationRef} className="rounded-xl  border-blue-700">
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
              <PublicationActions
                publication={publication}
                showCount={showCount}
              />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default FullPublication;
