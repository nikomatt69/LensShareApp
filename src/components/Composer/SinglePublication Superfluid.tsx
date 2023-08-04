import type {
  ElectedMirror,
  FeedItem,
  Profile,
  Publication
} from '@/utils/lens/generatedLenster';
import clsx from 'clsx';
import type { FC } from 'react';

import HiddenPublication from './HiddenPublication';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import PublicationWrapper from './PublicationWrapper';
import DecryptedPublicationBody from '../Publication/DecryptedPublicationBody';
import { useAccessSettingsStore } from '@/store/access';

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
  const superfluidToView = useAccessSettingsStore(
    (state) => state.superfluidToView
  );
  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem
    ? firstComment
      ? firstComment
      : feedItem?.root
    : publication;

  return (
    <div className="vh-88% ml-[20px] mt-2 rounded-xl border-2 border-blue-600 bg-[#F2F6F9] dark:bg-black p-3 ">
        {!superfluidToView ? (
        <>
          <PublicationBody
            publication={rootPublication}
            showMore={showMore}
            profile={profile as Profile}
          />
        </>
     ) :(<DecryptedPublicationBody encryptedPublication={rootPublication}/>)}
        

    </div>
  );
};

export default SinglePublication;
