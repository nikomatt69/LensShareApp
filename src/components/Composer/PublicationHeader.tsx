
import stopEventPropagation from '@/lib/stopEventPropagation';
import { FeedItem, Publication } from '@/utils/lens/generatedLenster';
import clsx from 'clsx';
import type { FC } from 'react';
import { usePublicationStore } from 'src/store/publication4';
import UserProfile from '../ProfilePage/UserProfile';
import PublicationMenu from '../ProfilePage/Menu';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Source from './Source';
import useModMode from '@/lib/useModMode';



interface PublicationHeaderProps {
  publication: Publication;
  feedItem?: FeedItem;
  quoted?: boolean;
  isNew?: boolean;
}

const PublicationHeader: FC<PublicationHeaderProps> = ({
  publication,
  feedItem,
  quoted = false,
  isNew = false
}) => {
  const setQuotedPublication = usePublicationStore(
    (state) => state.setQuotedPublication
  );
  const { allowed: modMode } = useModMode();
  const isMirror = publication.__typename === 'Mirror';
  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem
    ? firstComment
      ? firstComment
      : feedItem?.root
    : publication;
  const profile = feedItem
    ? rootPublication.profile
    : isMirror
    ? publication?.mirrorOf?.profile
    : publication?.profile;
  const timestamp = feedItem
    ? rootPublication.createdAt
    : isMirror
    ? publication?.mirrorOf?.createdAt
    : publication?.createdAt;

  return (
    <div
      className={clsx(
        quoted ? 'pb-2' : 'pb-4',
        'relative flex justify-between space-x-1.5'
      )}
      data-testid={`publication-${publication.id}-header`}
    >
      <span onClick={stopEventPropagation} aria-hidden="true">
        {quoted ? (
          <UserProfile profile={profile} timestamp={timestamp} />
        ) : (
          <UserProfile profile={profile} timestamp={timestamp} showStatus />
        )}
      </span>
      <div className="!-mr-[7px] flex items-center space-x-1">
        { <Source publication={publication} />}
       
        {quoted && isNew && (
          <button
            className="rounded-full border p-1.5"
            onClick={(event) => {
              stopEventPropagation(event);
              setQuotedPublication(null);
            }}
            aria-label="Remove Quote"
          >
            <XCircleIcon className="lt-text-gray-500 w-[15px] sm:w-[18px]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PublicationHeader;
