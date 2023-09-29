import type {
  ElectedMirror,
  FeedItem,
  Profile,
  Publication
} from '@/utils/lens/generatedLenster';
import cn from '@/components/UI/cn';
import type { FC } from 'react';

import HiddenPublication from './HiddenPublication';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import PublicationWrapper from './PublicationWrapper';

interface SinglePublicationProps {
  publication: Publication;
  feedItem?: FeedItem;
  showType?: boolean;
  showActions?: boolean;
  showModActions?: boolean;
  showThread?: boolean;
  showMore?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  profile: Profile;
}

const SinglePublication: FC<SinglePublicationProps> = ({
  publication,
  feedItem,
  showThread = true,
  profile,

  showType = true,
  showActions = true,
  showModActions = false,

  showMore = true,
  isFirst = false,
  isLast = false
}) => {
  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem
    ? firstComment
      ? firstComment
      : feedItem?.root
    : publication;

  return (
    <div className="vh-88% ml-[20px] mt-2 rounded-xl  bg-[#F2F6F9] p-3 dark:bg-black ">
      {publication?.hidden ? (
        <HiddenPublication type={publication.__typename} />
      ) : (
        <>
          <PublicationBody
            publication={rootPublication}
            showMore={showMore}
            profile={profile as Profile}
          />
        </>
      )}
    </div>
  );
};

export default SinglePublication;
