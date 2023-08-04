import formatHandle from '@/utils/functions/formatHandle';
import {
  Profile,
  Publication,
  useProfilesQuery
} from '@/utils/lens/generatedLenster';
import { Regex } from '@/utils/regex';
import type { FC } from 'react';
import UserProfileShimmer from '../Composer/UserProfileShimmer';
import { Card } from '../UI/Card';
import { ErrorMessage } from '../ErrorMessage';
import UserProfile from '../ProfilePage/UserProfile';

interface RelevantPeopleProps {
  publication: Publication;
}

const RelevantPeople: FC<RelevantPeopleProps> = ({ publication }) => {
  const mentions =
    publication?.metadata?.content?.match(Regex.allHandles, '$1[~$2]') ?? [];

  const processedMentions = mentions.map((mention: string) => {
    const trimmedMention = mention.trim().replace('@', '').replace("'s", '');

    if (trimmedMention.length > 9) {
      return mention.trim().replace("'s", '').replace(Regex.santiizeHandle, '');
    }

    return formatHandle(publication?.profile?.handle);
  });

  const cleanedMentions = processedMentions.reduce(
    (handles: string[], handle: string) => {
      if (!handles.includes(handle)) {
        handles.push(handle);
      }

      return handles;
    },
    []
  );

  const { data, loading, error } = useProfilesQuery({
    variables: { request: { handles: cleanedMentions.slice(0, 5) } },
    skip: mentions.length <= 0
  });

  if (mentions.length <= 0) {
    return null;
  }

  if (loading) {
    return (
      <Card as="aside" className="space-y-4 rounded-3xl p-5">
        <UserProfileShimmer showFollow />
        <UserProfileShimmer showFollow />
        <UserProfileShimmer showFollow />
        <UserProfileShimmer showFollow />
        <UserProfileShimmer showFollow />
      </Card>
    );
  }

  if (data?.profiles?.items?.length === 0) {
    return null;
  }

  return (
    <Card
      as="aside"
      className="space-y-4 rounded-3xl bg-[#F2F6F9] dark:bg-black p-5"
      dataTestId="relevant-profiles"
    >
      <ErrorMessage title={`Failed to load relevant people`} error={error} />
      {data?.profiles?.items?.map((profile, index) => (
        <div key={profile?.id} className="truncate">
          <UserProfile
            profile={profile as Profile}
            isFollowing={profile.isFollowedByMe}
            followUnfollowPosition={index + 1}
            showUserPreview={false}
            showFollow
          />
        </div>
      ))}
    </Card>
  );
};

export default RelevantPeople;
