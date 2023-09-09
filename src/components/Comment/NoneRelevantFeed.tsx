import {
  Comment,
  CommentOrderingTypes,
  CommentRankingFilter,
  CustomFiltersTypes,
  Publication,
  PublicationsQueryRequest,
  useCommentFeedQuery
} from '@/utils/lens/generatedLenster';
import type { FC } from 'react';
import { useState } from 'react';
import { useInView } from 'react-cool-inview';
import { useAppStore } from 'src/store/app';
import { Card } from '../UI/Card';
import SinglePublication from '../Composer/SinglePublication2';
import PublicationHeader from '../Composer/PublicationHeader';

interface NoneRelevantFeedProps {
  publication?: Publication;
}

const NoneRelevantFeed: FC<NoneRelevantFeedProps> = ({ publication }) => {
  const publicationId =
    publication?.__typename === 'Mirror'
      ? publication?.mirrorOf?.id
      : publication?.id;
  const currentProfile = useAppStore((state) => state.currentProfile);
  const [hasMore, setHasMore] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Variables
  const request: PublicationsQueryRequest = {
    commentsOf: publicationId,
    customFilters: [CustomFiltersTypes.Gardeners],
    commentsOfOrdering: CommentOrderingTypes.Ranking,
    commentsRankingFilter: CommentRankingFilter.NoneRelevant,
    limit: 30
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;

  const { data, fetchMore } = useCommentFeedQuery({
    variables: { request, reactionRequest, profileId },
    skip: !publicationId
  });

  const comments = data?.publications?.items ?? [];
  const pageInfo = data?.publications?.pageInfo;
  const totalComments = comments?.length;

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

  if (totalComments === 0) {
    return null;
  }

  return (
    <>
      <Card
        className="cursor-pointer  p-5 text-center"
        onClick={() => {
          setShowMore(!showMore);
        }}
        dataTestId="none-relevant-feed"
      >
        {showMore ? 'Hide more comments' : 'Show more comments'}
      </Card>
      {showMore ? (
        <Card className="divide-y-[1px] dark:bg-black/70 bg-white border-blue-700 rounded-xl divide-blue-700">
          {comments?.map((comment, index) =>
            comment?.__typename === 'Comment' && comment.hidden ? null : (
              <SinglePublication
                key={`${publicationId}_${index}`}
                isFirst={index === 0}
                profile={profileId}
                isLast={index === comments.length - 1}
                publication={comment as Comment}
                showType={false}
                showCount={true} tags={''}              />
            )
          )}
          {hasMore && <span ref={observe} />}
        </Card>
      ) : null}
    </>
  );
};

export default NoneRelevantFeed;
