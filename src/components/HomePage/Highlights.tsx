import {
  FeedHighlightsRequest,
  Profile,
  Publication,
  useFeedHighlightsQuery
} from '@/utils/lens/generated5';
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
import {
  APP_ID,
  LENSTUBE_APP_ID,
  LENSTER_APP_ID,
  LENSTOK_APP_ID,
  ORB_APP_ID,
  RIFF_APP_ID,
  BUTTRFLY_APP_ID,
  PHAVER_APP_ID,
  STATIC_ASSETS_URL
} from '@/constants';
import imageKit from '@/lib/imageKit';

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
    <div>
    <div className="mb-5 flex items-center space-x-2">
        <img
          src={imageKit(`${STATIC_ASSETS_URL}/images/icon.png`)}
          draggable={false}
          className="h-12 w-12 md:h-16 md:w-16"
          alt="lensshare"
        />
        <h1 className="text-2xl font-semibold">Highlights</h1>
      </div>
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
          tags=""
        />
      ))}
      {hasMore ? <span ref={observe} /> : null}
    </Card>
    </div>
  );
};

export default Highlights;
