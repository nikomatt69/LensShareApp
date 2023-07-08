
import type { ElectedMirror, FeedItem, Publication } from '@/utils/lens/generatedLenster';
import clsx from 'clsx';
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
}

const SinglePublication: FC<SinglePublicationProps> = ({
  publication,
  feedItem,

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
 
      
       
     
      <div className="ml-[20px] ">
        {publication?.hidden ? (
          <HiddenPublication type={publication.__typename} />
        ) : (
          <>
            <PublicationBody
              publication={rootPublication}
              showMore={showMore}
            />
           
          </>
        )}
      </div>

  );
};

export default SinglePublication;
