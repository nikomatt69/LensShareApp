import type {
  Comment,
  FeedItem,
  Profile,
  ProfilesQuery,
  Publication,
  PublicationsQueryRequest
} from '@/utils/lens/generatedLenster';
import {
  CommentOrderingTypes,
  CommentRankingFilter,
  CustomFiltersTypes,
  ProfileDocument,
  useCommentFeedQuery
} from '@/utils/lens/generatedLenster';

import type { FC } from 'react';
import { useState } from 'react';
import { useInView } from 'react-cool-inview';
import { OptmisticPublicationType } from 'src/enums';
import { useAppStore, useTransactionPersistStore } from 'src/store/app';

import { ErrorMessage } from '../ErrorMessage';
import { EmptyState } from '../UI/EmptyState';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import SinglePublication from '../Composer/SinglePublication2';
import QueuedPublication from '../Composer/QueuedPublication';
import { Card } from '../UI/Card';
import PublicationHeader from '../Composer/PublicationHeader';

interface FeedProps {
  publication?: Publication;
  feedItem?: FeedItem;
}

const Feed: FC<FeedProps> = ({ publication, feedItem }) => {
  const publicationId =
    publication?.__typename === 'Mirror'
      ? publication?.mirrorOf?.id
      : publication?.id;
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const [hasMore, setHasMore] = useState(true);

  // Variables
  const request: PublicationsQueryRequest = {
    commentsOf: publicationId,
    customFilters: [CustomFiltersTypes.Gardeners],
    commentsOfOrdering: CommentOrderingTypes.Ranking,
    commentsRankingFilter: CommentRankingFilter.Relevant,
    limit: 30
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? ProfileDocument;

  const { data, loading, error, fetchMore } = useCommentFeedQuery({
    variables: { request, reactionRequest, profileId },
    skip: !publicationId
  });

  const comments = data?.publications?.items ?? [];
  const pageInfo = data?.publications?.pageInfo;

  const queuedCount = txnQueue.filter(
    (o) => o.type === OptmisticPublicationType.NewComment
  ).length;
  const hiddenCount = comments.filter(
    (o) => o?.__typename === 'Comment' && o.hidden
  ).length;
  const hiddenRemovedComments = comments?.length - hiddenCount;
  const totalComments = hiddenRemovedComments + queuedCount;

  const firstComment = feedItem?.comments && feedItem.comments[0];
  const rootPublication = feedItem
    ? firstComment
      ? firstComment
      : feedItem?.root
    : publication;

  const { observe } = useInView({
    onChange: async ({ inView }) => {
      if (!inView || !hasMore) {
        return;
      }

      await fetchMore({
        variables: {
          request: { ...request, cursor: pageInfo?.next },
          reactionRequest,
          profileId
        }
      }).then(({ data }) => {
        setHasMore(data?.publications?.items?.length > 0);
      });
    }
  });

  if (error) {
    return <ErrorMessage title={`Failed to load comment feed`} error={error} />;
  }

  return (
    <Card
      className="divide-y-[1px] dark:bg-black/70 bg-white border-blue-700 rounded-xl divide-blue-700"
      dataTestId="comments-feed"
    >
      {txnQueue.map(
        (txn) =>
          txn?.type === OptmisticPublicationType.NewComment &&
          txn?.parent === publication?.id && (
            <div key={txn.id}>
              <QueuedPublication txn={txn} />
            </div>
          )
      )}
      {comments?.map((comment, index) =>
        comment?.__typename === 'Comment' && comment.hidden ? null : (
          <SinglePublication
            key={`${publicationId}_${index}`}
            isFirst={index === 0}
            profile={profileId}
            isLast={index === comments.length - 1}
            publication={comment as Comment}
            showType={false}
            showCount={true}
          />
        )
      )}
      {hasMore && <span ref={observe} />}
    </Card>
  );
};

export default Feed;
