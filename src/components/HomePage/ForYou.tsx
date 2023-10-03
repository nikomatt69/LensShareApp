
import { Publication, PublicationForYouRequest, useForYouQuery } from '@/utils/lens/generated5';
import type { FC } from 'react';
import { useInView } from 'react-cool-inview';
import { OptmisticPublicationType } from 'src/enums';
import { useAppStore } from 'src/store/app';
import { useTimelineStore } from 'src/store/timeline';
import { useTransactionPersistStore } from 'src/store/transaction';
import Loading from '../Loading';
import { EmptyState } from '../UI/EmptyState';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ErrorMessage } from '../UI/ErrorMessage';
import { Card } from '../UI/Card';
import QueuedPublication from '../Composer/QueuedPublication';
import SinglePublication from '../Composer/SinglePublication2';

const ForYou: FC = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const seeThroughProfile = useTimelineStore(
    (state) => state.seeThroughProfile
  );

  // Variables
  const request: PublicationForYouRequest = {
    for: seeThroughProfile?.id ?? currentProfile?.id,
    limit: 30
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;

  const { data, loading, error, fetchMore } = useForYouQuery({
    variables: { request, reactionRequest, profileId }
  });

  const publications = data?.forYou?.items;
  const pageInfo = data?.forYou?.pageInfo;
  const hasMore = pageInfo?.next;

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
      });
    }
  });

  if (loading) {
    return <Loading/>;
  }

  if (publications?.length === 0) {
    return (
      <EmptyState
        message={`No posts yet!`}
        icon={<SparklesIcon className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return <ErrorMessage title={`Failed to load for you`} error={error} />;
  }

  return (
    <Card className="divide-y-[1px] rounded-xl border-2 border-blue-700 dark:divide-blue-700">
      {txnQueue.map((txn) =>
        txn?.type === OptmisticPublicationType.NewPost ? (
          <div key={txn.id}>
            <QueuedPublication txn={txn} />
          </div>
        ) : null
      )}
      {publications?.map((publication, index) => (
        <SinglePublication
          key={`${publication?.id}_${index}`}
          isFirst={index === 0}
          isLast={index === publications.length - 1}
          publication={publication as Publication}
          profile={profileId}
          showCount
          tags=''
        />
      ))}
      {hasMore ? <span ref={observe} /> : null}
    </Card>
  );
};

export default ForYou;
