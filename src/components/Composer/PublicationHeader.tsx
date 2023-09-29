import stopEventPropagation from '@/lib/stopEventPropagation';
import { FeedItem, Profile, Publication } from '@/utils/lens/generatedLenster';
import cn from '@/components/UI/cn';
import type { FC } from 'react';
import { usePublicationStore } from 'src/store/publication4';
import UserProfile from '../ProfilePage/UserProfile';
import PublicationMenu from '../ProfilePage/Menu';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Source from './Source';
import useModMode from '@/lib/useModMode';
import Profiles from '../ProfilePage/Profiles';

interface PublicationHeaderProps {
  publication: Publication;
  feedItem?: FeedItem;
  quoted?: boolean;
  isNew?: boolean;
  profile: Profile;
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
      className={cn(
        quoted ? 'pb-2' : 'pb-4',
        'relative m-2 flex justify-between space-x-1.5 pt-3'
      )}
      data-testid={`publication-${publication.id}-header`}
    >
      <span onClick={stopEventPropagation} aria-hidden="true">
        {quoted ? (
          <UserProfile profile={profile as Profiles} timestamp={timestamp} />
        ) : (
          <UserProfile
            profile={profile as Profiles}
            timestamp={timestamp}
            showStatus
          />
        )}
      </span>
      <div className="!-mr-[7px] flex items-center space-x-1">
        {quoted && isNew && (
          <button
            className="rounded-full  p-1.5"
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
