import { HashtagMatcher } from '@/utils/matchers/HashtagMatcher';
import { MDBoldMatcher } from '@/utils/matchers/markdown/MDBoldMatcher';
import { MDCodeMatcher } from '@/utils/matchers/markdown/MDCodeMatcher';
import { MDItalicMatcher } from '@/utils/matchers/markdown/MDItalicMatcher';
import { MDLinkMatcher } from '@/utils/matchers/markdown/MDLinkMatcher';
import { MDQuoteMatcher } from '@/utils/matchers/markdown/MDQuoteMatcher';
import { MDStrikeMatcher } from '@/utils/matchers/markdown/MDStrikeMatcher';
import { MentionMatcher } from '@/utils/matchers/MentionMatcher';
import { UrlMatcher } from '@/utils/matchers/UrlMatcher';
import trimify from '@/lib/trimify';
import { Interweave } from 'interweave';
import type { FC, MouseEvent } from 'react';

interface Props {
  children: string;
  className?: string;
  matchOnlyUrl?: boolean;
}

const Markup: FC<Props> = ({ children, className = '', matchOnlyUrl }) => {
  const defaultMatchers = [
    new MDCodeMatcher('mdCode'),
    new MDLinkMatcher('mdLink'),
    new UrlMatcher('url'),
    new HashtagMatcher('hashtag'),
    new MentionMatcher('mention'),
    new MDBoldMatcher('mdBold'),
    new MDItalicMatcher('mdItalic'),
    new MDStrikeMatcher('mdStrike'),
    new MDQuoteMatcher('mdQuote')
  ];

  return (
    <Interweave
      className={className}
      content={trimify(children)}
      escapeHtml
      allowList={['b', 'i', 'a', 'br', 'code', 'span']}
      matchers={matchOnlyUrl ? [new UrlMatcher('url')] : defaultMatchers}
      onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
    />
  );
};

export default Markup;
