
import { STATIC_IMAGES_URL } from '@/constants';
import { Matcher } from 'interweave';
import Link from 'next/link';
import { createElement } from 'react';


export const Hashtag = ({ ...props }: any) => {
  const hashflag = props.display.slice(1).toLowerCase();
 
  return (
    <span className="inline-flex items-center space-x-1">
      <span>
        <Link
          href={`/search?q=${props.display.slice(1)}&type=pubs&src=link_click`}
          onClick={(event) => {
            event.stopPropagation();
            
          }}
        >
          {props.display}
        </Link>
      </span>
    </span>
  );
};

export class HashtagMatcher extends Matcher {
  replaceWith(match: string, props: any) {
    return createElement(Hashtag, props, match);
  }

  asTag(): string {
    return 'a';
  }

  match(value: string) {
    return this.doMatch(value, /\B(#\w*[A-Za-z]+\w*\b)(?!;)/, (matches) => {
      return {
        display: matches[0]
      };
    });
  }
}