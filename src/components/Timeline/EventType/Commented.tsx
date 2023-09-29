import ThreadBody from '@/components/Publication/ThreadBody';
import { FeedItem, Profile } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';

interface CommentedProps {
  feedItem: FeedItem;
  profile: Profile;
}

const Commented: FC<CommentedProps> = ({ feedItem, profile }) => {
  const publication = feedItem.root;
  const firstComment = feedItem.comments?.[0];
  const firstCommentParent =
    publication.__typename === 'Comment' && publication?.commentOn;

  return firstComment ? (
    <>
      {firstCommentParent ? (
        <ThreadBody
          profile={profile as Profile}
          publication={firstCommentParent}
        />
      ) : null}
      <ThreadBody profile={profile as Profile} publication={publication} />
    </>
  ) : firstCommentParent ? (
    <ThreadBody profile={profile as Profile} publication={firstCommentParent} />
  ) : null;
};

export default Commented;
