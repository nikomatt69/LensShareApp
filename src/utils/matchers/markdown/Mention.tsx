import type { Profile } from '@/utils/lens';
import formatHandle from '@/utils/functions/formatHandle';
import { stopEventPropagation } from '@/lib/stopEventPropagation';
import Link from 'next/link';
import type { FC } from 'react';
import type { MarkupLinkProps } from 'src/types/app';

import Slug from '@/components/UI/Slug';


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
    <Link href={`/u/${formatHandle(handle)}`} onClick={stopEventPropagation}>
      {profile?.handle ? (
          <Slug slug={formatHandle(handle)} prefix="@" />
      ) : (
        <Slug slug={formatHandle(handle)} prefix="@" />
      )}
    </Link>
  );
};

export default Mention;
