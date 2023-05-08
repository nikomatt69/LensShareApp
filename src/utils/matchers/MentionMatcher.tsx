import Slug from '@/components/UI/Slug';
import { Matcher } from 'interweave';
import Link from 'next/link';
import { createElement } from 'react';
import type { Profile } from '@/utils/lens';
import formatHandle from '@/utils/functions/formatHandle';
import { stopEventPropagation } from '@/lib/stopEventPropagation';
import type { FC } from 'react';
import type { MarkupLinkProps } from 'src/types/app';
import { title } from 'process';
import { id } from 'ethers/lib/utils.js';


export const Mention = ({href, title = href }: any) => {
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
    <Link href={`/u/${[id]}`} onClick={stopEventPropagation}>
      {profile?.handle ? (
          <Slug slug={formatHandle(handle)} prefix="@" />
      ) : (
        <Slug slug={formatHandle(handle)} prefix="@" />
      )}
    </Link>
  );
};
export class MentionMatcher extends Matcher {
  replaceWith(match: string, props: any) {
    return createElement(Mention, props, match);
  }

  asTag(): string {
    const profile = title?.slice(1);
    return (
      
      `${<Link href={`/u/${[id]}`} onClick={stopEventPropagation}>
    
      <Slug slug={profile} prefix="@" />
    
  </Link>}`);
  }

  match(value: string) {
    return this.doMatch(value, /@[\w.-]+/, (matches) => {
      return {
        display: matches[0]
      };
    });
  }
}
