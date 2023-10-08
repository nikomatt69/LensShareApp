
import { FeedHighlightsRequest, Profile, Publication, useFeedHighlightsQuery } from '@/utils/lens/generated5';
import { t } from '@lingui/macro';
import type { FC } from 'react';
import { useInView } from 'react-cool-inview';
import { OptmisticPublicationType } from 'src/enums';
import { useAppStore } from 'src/store/app';
import { useTimelineStore } from 'src/store/timeline';
import { useTransactionPersistStore } from 'src/store/transaction';
import Loading from '../Loading';
import { EmptyState } from '../UI/EmptyState';
import { LightBulbIcon } from '@heroicons/react/24/solid';
import { ErrorMessage } from '../ErrorMessage';
import { Card } from '../UI/Card';
import QueuedPublication from '../Composer/QueuedPublication';
import SinglePublication from '../Composer/SinglePublication2';
import { APP_ID, LENSTUBE_APP_ID, LENSTER_APP_ID, LENSTOK_APP_ID, ORB_APP_ID, RIFF_APP_ID, BUTTRFLY_APP_ID, PHAVER_APP_ID } from '@/constants';

const Highlights: FC = (profile) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const txnQueue = useTransactionPersistStore((state) => state.txnQueue);
  const seeThroughProfile = useTimelineStore(
    (state) => state.seeThroughProfile
  );

  // Variables
  const request: FeedHighlightsRequest = {
    profileId: seeThroughProfile?.id ?? currentProfile?.id,
    limit: 30
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;

  const { data, loading, error, fetchMore } = useFeedHighlightsQuery({
    variables: { request, reactionRequest, profileId: currentProfile?.id }
  });

  const publications = data?.feedHighlights?.items;
  const pageInfo = data?.feedHighlights?.pageInfo;
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
          profileId: currentProfile?.id
        }
      });
    }
  });

  if (loading) {
    return <Loading />;
  }

  if (publications?.length === 0) {
    return (
      <EmptyState
        message={`No posts yet!`}
        icon={<LightBulbIcon className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return <ErrorMessage title={`Failed to load highlights`} error={error} />;
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
          profile={profile as Profile}
          showCount
          tags=''
        />
      ))}
      {hasMore ? <span ref={observe} /> : null}
    </Card>
  );
};

export default Highlights;
