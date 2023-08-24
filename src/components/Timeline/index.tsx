
import { FeedEventItemType, FeedItem, FeedRequest, Profile, Publication, useTimelineQuery } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import { useInView } from 'react-cool-inview';
import { OptmisticPublicationType } from 'src/enums';
import { useAppStore, useTransactionPersistStore } from 'src/store/app';
import Loading from '../Loading';
import { EmptyState } from '../UI/EmptyState';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '../ErrorMessage';
import { Card } from '../UI/Card';
import QueuedPublication from '../Composer/QueuedPublication';
import SinglePublication from '../Composer/SinglePublication2';
import { useTimelinePersistStore, useTimelineStore } from '@/store/timeline';
import NewPost from '../Composer/Post/New';
import { Modal } from '../UI/Modal';
import NewPublication from '../Composer/NewPublication';
import { useGlobalModalStateStore } from '@/store/modals';
import { SCROLL_ROOT_MARGIN } from '@/constants';
import Loader from '../UI/Loader';


const Timeline: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const feedEventFilters = useTimelinePersistStore(
    (state) => state.feedEventFilters
  );
  const seeThroughProfile = useTimelineStore(
    (state) => state.seeThroughProfile
  );


  const getFeedEventItems = () => {
    const filters: FeedEventItemType[] = [];
    if (feedEventFilters.posts) {
      filters.push(FeedEventItemType.Post, FeedEventItemType.Comment);
    }
    if (feedEventFilters.collects) {
      filters.push(
        FeedEventItemType.CollectPost,
        FeedEventItemType.CollectComment
      );
    }
    if (feedEventFilters.mirrors) {
      filters.push(FeedEventItemType.Mirror);
    }
    if (feedEventFilters.likes) {
      filters.push(
        FeedEventItemType.ReactionPost,
        FeedEventItemType.ReactionComment
      );
    }
    return filters;
  };

  // Variables
  const request: FeedRequest = {
    profileId: seeThroughProfile?.id ?? currentProfile?.id,
    limit: 30,
    feedEventItemTypes: getFeedEventItems()
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;

  const { data, loading, error, fetchMore } = useTimelineQuery({
    variables: { request, reactionRequest, profileId: currentProfile?.id }
  });

  const publications = data?.feed?.items;
  const pageInfo = data?.feed?.pageInfo;
  const hasMore = pageInfo?.next;

  const { observe } = useInView({
    rootMargin: SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      });
    }
  });

  if (loading) {
    return <Loader />;
  }

  if (publications?.length === 0) {
    return (
      <EmptyState
        message={`No posts yet!`}
        icon={<UserGroupIcon className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return <ErrorMessage title={`Failed to load timeline`} error={error} />;
  }

  return (
   <Card className="divide-y-[1px] border-2 border-blue-700 rounded-xl dark:divide-blue-700">
        {txnQueue.map(
          (txn) => txn?.type === OptmisticPublicationType.NewPost && (
            <div key={txn.id}>
              <QueuedPublication txn={txn} />
            </div>
          )
        )}
        {publications?.map((publication, index) => (
          <SinglePublication
            profile={currentProfile as Profile}
            key={`${publication?.root.id}_${index}`}
            isFirst={index === 0}
            isLast={index === publications.length - 1}
            feedItem={publication as FeedItem}
            publication={publication.root as Publication}
            showCount={true} />
        ))}
       {pageInfo?.next && (
          <span ref={observe} className="flex  justify-center p-10">
            <Loader />
          </span>
        )}
      </Card>
  );
};

export default Timeline;
