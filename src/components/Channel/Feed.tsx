import SinglePublication from '@/components/Composer/SinglePublication2';

import type {
  ExplorePublicationRequest,
  Publication
} from '@/utils/lens/generatedLenster';
import {
  PublicationSortCriteria,
  PublicationTypes,
  useExploreFeedQuery
} from '@/utils/lens/generatedLenster';
import type { Channel } from '@/types/lenster';

import type { FC } from 'react';
import { useInView } from 'react-cool-inview';
import { useAppStore } from 'src/store/app';
import Loading from '../Loading';
import { BsCollection } from 'react-icons/bs';
import { ErrorMessage } from '../ErrorMessage';
import { Card } from '../UI/Card';
import { EmptyState } from '../UI/EmptyState';

interface FeedProps {
  channel: Channel;
}

const Feed: FC<FeedProps> = ({ channel }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);

  const request: ExplorePublicationRequest = {
    publicationTypes: [PublicationTypes.Post],
    sortCriteria: PublicationSortCriteria.Latest,
    metadata: { tags: { oneOf: channel.tags } },
    limit: 30
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;

  const { data, loading, error, fetchMore } = useExploreFeedQuery({
    variables: { request, reactionRequest, profileId },
    skip: !channel.id
  });

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
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
    return <Loading />;
  }

  if (publications?.length === 0) {
    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">{channel.name}</span>
            <span>{`don't have any publications yet`}</span>
          </div>
        }
        icon={<BsCollection className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return <ErrorMessage title={`Failed to load channel feed`} error={error} />;
  }

  return (
    <Card className="divide-y-[1px] dark:divide-gray-700">
      {publications?.map((publication, index) => (
        <SinglePublication
          key={`${publication.id}_${index}`}
          isFirst={index === 0}
          isLast={index === publications.length - 1}
          publication={publication as Publication}
          profile={profileId}
          showCount={false}
          tags={''}
        />
      ))}
      {hasMore ? <span ref={observe} /> : null}
    </Card>
  );
};

export default Feed;
