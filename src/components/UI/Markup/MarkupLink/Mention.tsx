import Link from 'next/link';
import type { FC } from 'react';
import type { MarkupLinkProps } from 'src/typesLenster';

import Slug from '../../Slug';
import UserPreview from '../../UserPreview';

import stopEventPropagation from '@/lib/stopEventPropagation';
import formatHandle from '@/utils/functions/formatHandle';
import { Profile } from '@/utils/lens/generatedLenster';

const Mention: FC<MarkupLinkProps> = ({ href, title = href }) => {
  const handle = title?.slice(1);

  if (!handle) {
    return null;
  }

  const profile = {
    __typename: 'Profile',
    handle: handle,
    name: null,
    id: null
  };

  return (
    <Link
      href={`/u/${profile.id}`}
      onClick={(event) => {
        stopEventPropagation(event);
      }}
    >
      {profile.id ? (
        <UserPreview
          isBig={false}
          profile={profile as Profile}
          followStatusLoading={false}
        >
          <Slug slug={formatHandle(profile.handle)} prefix="@" />
        </UserPreview>
      ) : (
        <Slug slug={formatHandle(profile.handle)} prefix="@" />
      )}
    </Link>
  );
};

export default Mention;
