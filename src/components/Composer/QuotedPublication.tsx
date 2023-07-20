import { Profile, Publication } from '@/utils/lens/generatedLenster';
import PublicationBody from './PublicationBody';
import PublicationHeader from './PublicationHeader';
import { FC } from 'react';
import HiddenPublication from './HiddenPublication';
import PublicationWrapper from './PublicationWrapper';

interface QuotedPublicationProps {
  publication: Publication;
  isNew?: boolean;
  profile: Profile;
}

const QuotedPublication: FC<QuotedPublicationProps> = ({
  publication,
  isNew = false,
  profile
}) => {
  return (
    <PublicationWrapper
      className="line-clamp-5 dark:hover:bg-grey-600/50 cursor-pointer break-words truncate border-blue-500 p-5  text-xs first:rounded-t-xl last:rounded-b-xl hover:bg-gray-100"
      publication={publication}
    >
      <PublicationHeader
        profile={profile as Profile}
        publication={publication}
        quoted
        isNew={isNew}
      />
      {publication?.hidden ? (
        <HiddenPublication type={publication.__typename} />
      ) : (
        <PublicationBody
          profile={profile}
          publication={publication}
          showMore
          quoted
        />
      )}
    </PublicationWrapper>
  );
};

export default QuotedPublication;
