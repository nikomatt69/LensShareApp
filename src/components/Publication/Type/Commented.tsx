import { Comment, Profile } from '@/utils/lens/generatedLenster';
import type { FC } from 'react';

import ThreadBody from '../ThreadBody';

interface CommentedProps {
  publication: Comment;
  profile: Profile;
}

const Commented: FC<CommentedProps> = ({ publication, profile }) => {
  const commentOn: Comment | any = publication?.commentOn;
  const mainPost = commentOn?.mainPost;

  return (
    <>
      {mainPost ? (
        <ThreadBody profile={profile} publication={mainPost} />
      ) : null}
      <ThreadBody profile={profile} publication={commentOn} />
    </>
  );
};

export default Commented;
