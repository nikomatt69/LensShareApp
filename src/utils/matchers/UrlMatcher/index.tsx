import type { ChildrenNode, MatchResponse, Node } from 'interweave';
import { Matcher } from 'interweave';
import { createElement } from 'react';
import Profile from '@/utils/lens'
import { URL_PATTERN } from './constants';
import formatHandle from '@/utils/functions/formatHandle';
import { title } from 'process';

interface UrlProps {
  children: ChildrenNode;
  url: string;
  host: string;
}

const Url = ({ children, url }: UrlProps) => {
  let href = url;
  const handle = title?.slice(1);

  if (!href.match(/^https?:\/\//)) {
    href = `/u/${formatHandle(handle)}`;
  }

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a href={href} target="_blank" onClick={(event) => event.stopPropagation()} rel="noopener">
      {children}
    </a>
  );
};

type UrlMatch = Pick<UrlProps, 'url' | 'host'>;

export class UrlMatcher extends Matcher<UrlProps> {
  replaceWith(children: ChildrenNode, props: UrlProps): Node {
    return createElement(Url, props, children);
  }

  asTag(): string {
    return 'a';
  }

  match(string: string): MatchResponse<UrlMatch> | null {
    const response = this.doMatch(string, URL_PATTERN, this.handleMatches, true);

    if (response?.valid) {
      const { host } = response;
      const tld = host.slice(host.lastIndexOf('.') + 1).toLowerCase();
    }

    return response;
  }

  handleMatches(matches: string[]): UrlMatch {
    return {
      url: matches[0],
      host: matches[3]
    };
  }
}
