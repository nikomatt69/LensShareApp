import {
  Profile,
  Publication,
  PublicationMainFocus,
  PublicationTypes,
  PublicationsQueryRequest,
  useProfileFeedQuery
} from '@/utils/lens/generatedLenster';

import type { FC } from 'react';
import { useState } from 'react';
import { useInView } from 'react-cool-inview';
import { ProfileFeedType } from 'src/enums';
import { useAppStore } from 'src/store/app';

import { EmptyState } from '../UI/EmptyState';
import formatHandle from '@/utils/functions/formatHandle';
import { BsCollection } from 'react-icons/bs';
import { ErrorMessage } from '../ErrorMessage';
import { Card } from '../UI/Card';
import SinglePublication from '../Composer/SinglePublication';
import PublicationHeader from '../Composer/PublicationHeader';
import { useProfileFeedStore } from '@/store/profile-feed';
import PublicationActions from '../Publication/Actions';
import VideoCard from '../HomePage/VideoCard';
import Loading from '../Loading';

interface FeedProps {
  profile: Profile;

  type:
    | ProfileFeedType.Feed
    | ProfileFeedType.Replies
    | ProfileFeedType.Media
    | ProfileFeedType.Collects
    
}

const Feed: FC<FeedProps> = ({ profile, type }) => {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const mediaFeedFilters = useProfileFeedStore(
    (state) => state.mediaFeedFilters
  );
  const [hasMore, setHasMore] = useState(true);

  const getMediaFilters = () => {
    let filters: PublicationMainFocus[] = [];
    if (mediaFeedFilters.images) {
      filters.push(PublicationMainFocus.Image);
    }
    if (mediaFeedFilters.video) {
      filters.push(PublicationMainFocus.Video);
    }
    if (mediaFeedFilters.audio) {
      filters.push(PublicationMainFocus.Audio);
    }
    return filters;
  };

  // Variables
  const publicationTypes =
    type === ProfileFeedType.Feed
      ? [PublicationTypes.Post, PublicationTypes.Mirror]
      : type === ProfileFeedType.Replies
      ? [PublicationTypes.Comment]
      : type === ProfileFeedType.Media
      ? [PublicationTypes.Post, PublicationTypes.Comment]
      : [
          PublicationTypes.Post,
          PublicationTypes.Comment,
          PublicationTypes.Mirror
        ];
  const metadata =
    type === ProfileFeedType.Media
      ? {
          mainContentFocus: getMediaFilters()
        }
      : null;
  const request: PublicationsQueryRequest = {
    publicationTypes,
    metadata,
    ...(type !== ProfileFeedType.Collects
      ? { profileId: profile?.id }
      : { collectedBy: profile?.ownedBy }),
    limit: 10
  };
  const reactionRequest = currentProfile
    ? { profileId: currentProfile?.id }
    : null;
  const profileId = currentProfile?.id ?? null;

  const { data, loading, error, fetchMore } = useProfileFeedQuery({
    variables: { request, reactionRequest, profileId },
    skip: !profile?.id
  });

  const publications = data?.publications?.items;
  const pageInfo = data?.publications?.pageInfo;

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

  if (loading) {
    return <Loading />;
  }

  if (publications?.length === 0) {
    const emptyMessage =
      type === ProfileFeedType.Feed
        ? 'has nothing in their feed yet!'
        : type === ProfileFeedType.Media
        ? 'has no media yet!'
        : type === ProfileFeedType.Replies
        ? "hasn't replied yet!"
        : type === ProfileFeedType.Collects
        ? "hasn't collected anything yet!"
        :'';

    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{formatHandle(profile?.handle)}
            </span>
            <span>{emptyMessage}</span>
          </div>
        }
        icon={<BsCollection className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return <ErrorMessage title={`Failed to load profile feed`} error={error} />;
  }

  return (
    <Card
      className=" m-1 divide-y-1 rounded-xl border-1 p-2"
      dataTestId={`profile-feed-type-${type.toLowerCase()}`}
    >
      {publications?.map((publication, index) => (
        <VideoCard
          publication={publication as Publication}
          key={`${publication.id}_${index}`}
          onDetail={function (video: Publication): void {
            throw new Error('Function not implemented.');
          }}
        />
      ))}
      {pageInfo?.next && (
        <span ref={observe} className="flex  justify-center p-10">
          <Loading />
        </span>
      )}

      {hasMore && <span ref={observe} />}
    </Card>
  );
};

export default Feed;
